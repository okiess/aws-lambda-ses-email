var aws = require('aws-sdk');

exports.handler = function(event, context) {
  console.log("Running aws email message function");
  console.log("==================================");
  console.log("event", event);
  
  aws.config.loadFromPath('config.json');
  var ses = new aws.SES({apiVersion: '2010-12-01'});

  var to = event.to;
  var cc = event.cc;
  var bcc = event.bcc;
  var from = event.from;
  var subject = event.subject;
  var textMessage = event.text_message;
  var htmlMessage = event.html_message;
  var charSet = "UTF-8";
  var params = {
    Destination: {
      BccAddresses: bcc ? bcc : [],
      CcAddresses: cc ? cc : [],
      ToAddresses: to
    },
    Message: {
      Body: {},
      Subject: {
        Data: subject ? subject : "No subject",
        Charset: charSet
      }
    },
    Source: from,
    ReplyToAddresses: [from]
  };
  
  if (textMessage != null && textMessage.length > 0) {
    params["Message"]["Body"]["Text"] = {
      Data: textMessage,
      Charset: charSet
    }
  }
  if (htmlMessage != null && htmlMessage.length > 0) {
    params["Message"]["Body"]["Html"] = {
      Data: htmlMessage,
      Charset: charSet
    }
  }

  ses.sendEmail(params, function(err, data) {
    if (err) {
      console.log(err, err.stack); // an error occurred
    } else {
      console.log(data);           // successful response
      context.done();
    }
  });
}
