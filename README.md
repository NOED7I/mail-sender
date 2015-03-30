# -mail-sender
E-Mail sending helper. Simple wrapper around nodemailer module

[![NPM](https://nodei.co/npm/bem-site-mail-sender.png)](https://nodei.co/npm/bem-site-mail-sender/)

[![Coveralls branch](https://img.shields.io/coveralls/bem-site/mail-sender/master.svg)](https://coveralls.io/r/bem-site/mail-sender?branch=master)
[![Travis](https://img.shields.io/travis/bem-site/mail-sender.svg)](https://travis-ci.org/bem-site/mail-sender)
[![David](https://img.shields.io/david/bem-site/mail-sender.svg)](https://david-dm.org/bem-site/mail-sender)
[![David](https://img.shields.io/david/dev/bem-site/mail-sender.svg)](https://david-dm.org/bem-site/mail-sender#info=devDependencies)

## Usage

Add mail-sender dependency to your project:
```
npm install --save bem-site-mail-sender
```

Add mail-sender requirement to the code of your module:

```
var sender = require('bem-site-mail-sender').create({
    host: 'smtp.yandex.net', // your smtp e-mail host
    port: 25 // your smtp e-mail port
});
```

## API

### sendHtml

For sending e-mails with html body

Arguments:
* {String} from - e-mail of sender
* {Array} to - array of recipients e-mails
* {String} subject of e-mail
* {String} html body of e-mail
* {Function} callback function

Example:
```
sender.sendHtml('from@gmail.com', ['to@gmail.com'], 'Hello World Subject', '<h1>Hello World</h1>', function (err) {
    console.log('done');
});
```

### sendWithAttachments

For sending e-mails with attached file(s)

Arguments:
* {String} from - e-mail of sender
* {Array} to - array of recipients e-mails
* {String} subject of e-mail
* {String} text body of e-mail
* {Array} attachments - array of attachment objects
* {Function} callback function

Example:
```
var attachments = [{
    filename: 'package.json',
    path: './package.json
}];
sender.sendWithAttachments('from@gmail.com', ['to@gmail.com'],
'Hello World Subject', 'Hello World', attachments, function (err) {
    console.log('done');
});
```

## Testing

Run tests:
```
npm run mocha
```

Run tests with istanbul coverage calculation:
```
npm run istanbul
```

Run codestyle verification (jshint and jscs)
```
npm run codestyle
```

Maintainer @tormozz48
Please send your questions and proposals to: tormozz48@gmail.com
