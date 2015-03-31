var path = require('path'),
    should = require('should'),
    MailSender = require('../index');

describe('mail-sender', function () {
    var options = {
            host: 'smtp.yandex.net',
            port: 465
        },
        from = 'from@mail-sender.yandex.net',
        to = ['to@mail-sender.yandex.net'];

    describe('initialization', function () {
        it('without options', function () {
            (function () { MailSender.create() }).should.throw('Options were not set');
        });

        it('with empty host parameter', function () {
            (function () { MailSender.create({}); }).should.throw('Host option was not set');
        });

        it('with empty port parameter', function () {
            (function () { MailSender.create({ host: 'smtp.test.host' }); }).should.throw('Port option was not set');
        });

        it('should be initialized with valid parameters', function () {
            var ms = MailSender.create(options);

            ms.should.be.ok;
            ms._options.should.be.ok;
            ms._sender.should.be.ok;
        });
    });

    describe('parameters validation', function () {
        var ms;

        before(function () {
            ms = new MailSender(options);
        });

        describe('_validateSender', function () {
            it('empty', function () {
                ms._validateSender(null).should.equal('E-Mail sender was not set or empty');
            });

            it('not string', function () {
                ms._validateSender(10).should.equal('E-Mail sender type error. Should be string');
            });

            it('valid', function () {
                should(ms._validateSender('from@bse-admin.yandex.net')).equal(null);
            });
        });

        describe('_validateRecipients', function () {
            it('empty', function () {
                ms._validateRecipients(null).should.equal('E-Mail recipients were not set');
            });

            it('not array', function () {
                ms._validateRecipients(10).should.equal('E-Mail recipients type error. Should be array');
            });

            it('valid', function () {
                should(ms._validateRecipients(['to@bse-admin.yandex.net'])).equal(null);
            });
        });

        describe('_validateSubject', function () {
            it('empty', function () {
                ms._validateSubject(null).should.equal('E-Mail subject was not set or empty');
            });

            it('not string', function () {
                ms._validateSubject(10).should.equal('E-Mail subject type error. Should be string');
            });

            it('valid', function () {
                should(ms._validateSubject('test subject')).equal(null);
            });
        });

        describe('_validateHtmlBody', function () {
            it('empty', function () {
                ms._validateHtmlBody(null).should.equal('Html code of body was not set or empty');
            });

            it('not string', function () {
                ms._validateHtmlBody(10).should.equal('Html message type error. Should be string');
            });

            it('valid', function () {
                should(ms._validateHtmlBody('test html body')).equal(null);
            });
        });

        describe('_validateAttachments', function () {
            it('not set', function () {
                ms._validateAttachments(null).should.equal('E-Mail attachments were not set');
            });

            it('not array', function () {
                ms._validateAttachments(10).should.equal('E-Mail attachments type error. Should be array');
            });

            it('empty', function () {
                ms._validateAttachments([]).should.equal('E-Mail attachments is empty array. Should not be empty');
            });

            it('valid', function () {
                should(ms._validateHtmlBody('test html body')).equal(null);
            });
        });
    });

    describe('sendHtml', function () {
        var ms;

        before(function () {
            ms = new MailSender({ host: 'stub' });
        });

        it('should fail', function (done) {
            ms.sendHtml(null, null, 'subject', 'body', function (error) {
                should(error).be.ok;
                done();
            });
        });

        it('should send', function (done) {
            ms.sendHtml(from, to, 'subject', 'body', function (error) {
                should(error).not.be.ok;
                done();
            });
        });
    });

    describe('sendWithAttachments', function () {
        var ms;

        before(function () {
            ms = new MailSender({ host: 'stub' });
        });

        it('should fail', function (done) {
            ms.sendWithAttachments(null, null, 'subject', 'body', null, function (error) {
                should(error).be.ok;
                done();
            });
        });

        it('should send', function (done) {
            var attachments = [{
                filename: 'README.md',
                path: path.join(__dirname, '../README.md')
            }];

            ms.sendWithAttachments(from, to, 'subject', '', attachments,
                function (error) {
                    should(error).not.be.ok;
                    done();
                });
        });
    });
});
