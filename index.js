var _ = require('lodash'),
    inherit = require('inherit'),
    nm = require('nodemailer'),
    transport = require('nodemailer-smtp-transport'),
    stubTransport = require('nodemailer-stub-transport'),
    MailSender;

module.exports = MailSender = inherit({
    _options: undefined,
    _sender: undefined,

    __constructor: function (options) {
        if (!options) {
            throw new Error('Options were not set');
        }

        this._options = options;

        // for testing purposes
        if (this._options === 'stub') {
            this._sender = new nm.createTransport(stubTransport());
            return;
        }

        if (!this._options[ 'host' ]) {
            throw new Error('Host option was not set');
        }

        if (!this._options[ 'port' ]) {
            throw new Error('Port option was not set');
        }


        this._sender = new nm.createTransport(
            transport(_.pick(_.extend({}, this.__self.baseOptions, this._options), ['host', 'port'])));
    },

    /**
     * Validates e-mail sender
     * @param {String} sender of e-mail
     * @returns {Null|String}
     * @private
     */
    _validateSender: function (sender) {
        if (!sender) {
            return 'E-Mail sender was not set or empty';
        } else if (!_.isString(sender)) {
            return 'E-Mail sender type error. Should be string';
        } else {
            return null;
        }
    },

    /**
     * Validates e-mail recipients
     * @param {Array} recipients of e-mail
     * @returns {Null|String}
     * @private
     */
    _validateRecipients: function (recipients) {
        if (!recipients) {
            return 'E-Mail recipients were not set';
        } else if (!_.isArray(recipients)) {
            return 'E-Mail recipients type error. Should be array';
        } else {
            return null;
        }
    },

    /**
     * Validates e-mail subject
     * @param {String} subject of e-mail
     * @returns {Null|String}
     * @private
     */
    _validateSubject: function (subject) {
        if (!subject) {
            return 'E-Mail subject was not set or empty';
        } else if (!_.isString(subject)) {
            return 'E-Mail subject type error. Should be string';
        } else {
            return null;
        }
    },

    _validateHtmlBody: function (htmlBody) {
        if (!htmlBody) {
            return 'Html code of body was not set or empty';
        } else if (!_.isString(htmlBody)) {
            return 'Html message type error. Should be string';
        } else {
            return null;
        }
    },

    _validateAttachments: function (attachments) {
        if (!attachments) {
            return 'E-Mail attachments were not set';
        } else if (!_.isArray(attachments)) {
            return 'E-Mail attachments type error. Should be array';
        } else if (!attachments.length) {
            return 'E-Mail attachments is empty array. Should not be empty';
        } else {
            return null;
        }
    },

    /**
     * Sends e-mail by given options
     * @param {Object} options options for sending mail
     * @param {Function} callback function
     * @private
     */
    _send: function (options, callback) {
        this._sender.sendMail(_.extend({}, this.__self.baseOptions, options), callback);
    },

    /**
     * Sends e-mail with html body
     * @param {String} from - e-mail of sender
     * @param {Array} to - array of recipients e-mails
     * @param {String} subject of e-mail
     * @param {String} html body of e-mail
     * @param {Function} callback function
     * @returns {*}
     */
    sendHtml: function (from, to, subject, html, callback) {
        var options,
            errorMessage =
                this._validateSender(from) ||
                this._validateRecipients(to) ||
                this._validateSubject(subject) ||
                this._validateHtmlBody(html);

        if (errorMessage) {
            return callback && callback(new Error(errorMessage));
        }

        console.info('Sending html e-mail:');
        console.log('From: %s', from);
        console.log('To: %s', to);
        console.log('Subject: %s', subject);

        options = { from: from, to: to, subject: subject, html: html };
        return this._send(options, callback);
    },

    /**
     * Sends e-mail with text body and file attachments
     * @param {String} from - e-mail of sender
     * @param {Array} to - array of recipients e-mails
     * @param {String} subject of e-mail
     * @param {String} text body of e-mail
     * @param {Array} attachments - array of attachment objects
     * @param {Function} callback function
     * @returns {*}
     */
    sendWithAttachments: function (from, to, subject, text, attachments, callback) {
        var options,
            errorMessage =
                this._validateSender(from) ||
                this._validateRecipients(to) ||
                this._validateSubject(subject) ||
                this._validateAttachments(attachments);

        if (errorMessage) {
            return callback && callback(new Error(errorMessage));
        }

        console.info('Sending e-mail with attachment:');
        console.log('From: %s', from);
        console.log('To: %s', to);
        console.log('Subject: %s', subject);
        console.log('Text: %s', text);

        options = { from: from, to: to, subject: subject, test: text, attachments: attachments };
        return this._send(options, callback);
    }
}, {
    baseOptions: { encoding: 'utf-8' },

    create: function (options) {
        return new MailSender(options);
    }
});

