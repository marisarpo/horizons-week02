"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials

  this.accountId = "AC990fb012f902f1d159288dfdb29d4b75";
  this.authToken = "6967e56b96a88f18e3e29da67b3f6343";
  this.fromNumber = "+16012025248";


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
    // YOUR CODE HERE
    this.messageSendButton.on('click', function(event){
      event.preventDefault();

      this.handleMessageSend();
    }.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if ($.trim(textStr) !== ""){
      return true;
    }
    return false;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if( (phoneStr.length === 10) && (parseInt(phoneStr) == phoneStr)){
      return true;
    }
    return false;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    // this.displayMessage('9999999999', 'Testing');
    if (this.validateMessageField(this.messageInputField.val()) && this.validatePhoneField(this.phoneInputField.val())){
        var self = this;
        $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
          success: function(x) {
            // $('h1').text("Congrats! You're set up!");
            // console.log('Message sent', x);
            self.displayMessage(self.fromNumber, self.messageInputField.val());
          },

          error: function(err){
            alert(err);
          },

          method: 'POST',
          data: {
            From: this.fromNumber,
            To: this.phoneInputField.val(),
            Body: this.messageInputField.val(),
          },
          headers: {
            "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
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
