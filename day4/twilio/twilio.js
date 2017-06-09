"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC54d6ab3db744df6f50e37d511e0747db";
  this.authToken = "67a079bc03b1a55aa280e186fb01a176";
  this.fromNumber = "19292424687";

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  // Set up the event handlers
  this.initialize();

  console.log("TwilioApp is ready.");
}

TwilioApp.prototype = {
  // Part 1. `initialize()` method

  initialize: function() {
    var app = this;
    // YOUR CODE HERE
    this.messageSendButton.on('click', function(event){
      event.preventDefault();
      // console.log(event);
      app.handleMessageSend(event);

      // event.preventDefault();

    })
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    // return $.textStr.trim().length!==0;
    var isvalid =$.trim(textStr).length!==0;
    // console.log("message validity",textStr,isvalid);
    return isvalid;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {

    return $.isNumeric(phoneStr) && $.trim(phoneStr).length ===11;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    var app = this;

    var message_content = app.messageInputField.val();
    var phone_input = app.phoneInputField.val();
    if(app.validateMessageField(message_content) && app.validatePhoneField(phone_input)){
      // console.log("HELLO");
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + app.accountId + '/SMS/Messages', {
        success: function(x) {
          console.log('Message sent', x);
          // app.handleMessageSend();
          app.displayMessage(app.fromNumber,message_content);
          app.messageInputField.val("");

        },
        error: function(err){
          alert("Error sending message", err);
        },
        method: 'POST',
        data: {
          From: app.fromNumber,
          To: phone_input,
          Body: message_content
        },
        headers: {
          "Authorization": "Basic " + btoa(app.accountId + ":" + app.authToken)
        }
      });
    }

  },
  displayMessage: function(sender, message) {
    var listElem = $('<li></li>').addClass('message');
    var senderElem = $('<span></span>').addClass('sender').text(sender);
    var bodyElem = $('<p></p>').text(message);
    listElem.append(senderElem);
    listElem.append(bodyElem);
    this.messageList.append(listElem);
  }
};

window.twilio = new TwilioApp();
