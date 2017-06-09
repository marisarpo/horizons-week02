"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACa728a0d2ec4b7b8af7029cc68d87ff41";
  this.authToken = "4dd4244d864147e349755746a5655177";
  this.fromNumber = "+14243756884";

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
    this.messageSendButton.on('click', this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    if(textStr !== "" && textStr.trim().length !== 0){
      return true;
    }
    return false;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    if(phoneStr.length !== 10){
      return false;
    }
    for(var i = 0; i < phoneStr.length; i++){
      if(!Number.isInteger(parseInt(phoneStr.charAt(i)))){
        return false;
      }
    }
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    var message = this.messageInputField.val();
    var num = this.phoneInputField.val();
    if(this.validateMessageField(message) && this.validatePhoneField(num)){
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(x) {
          this.displayMessage(num, message);
          this.messageInputField.val("");
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: num,
          Body: message
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        },
        error: function(err){
          alert("you have FAILED");
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
