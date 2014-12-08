// Code example to invoke a lambda function from code...
var aws = require('aws-sdk');
aws.config.loadFromPath('client-config.json');
var lambda = new aws.Lambda({apiVersion: '2014-11-11'});
var params = {
  FunctionName: 'aws-lambda-ses-email-production',
  InvokeArgs: '{"to": ["email@example.com"], "from": "test@test.com", "cc": [], "bcc": [], "subject": "Test Subject", "text_message": "Test Message", "html_message": "<h1>Test Message</h1>"}'
};
lambda.invokeAsync(params, function(err, data) {
  if (err) console.log(err, err.stack); // an error occurred
  else     console.log(data);           // successful response
});
