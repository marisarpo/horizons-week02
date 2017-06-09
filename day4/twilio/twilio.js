"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC7348e3a6af8063cc21cc7677c0af0599";
  this.authToken = "3a8e24aa5b52d1825934f0a634f244ae";
  this.fromNumber = "+14159918353";

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
    console.log("part 1");
    $(this.messageSendButton).on('click',this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    console.log("part 2");
    if(($.trim(textStr)).length === 0){
      return false;
    }
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    console.log("part 3");
    if(typeof JSON.parse(phoneStr) === 'number' && phoneStr.length === 10){
      return true;
    }
    return false;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    console.log("part 4");
    var message = this.messageInputField.val();
    var phone = this.phoneInputField.val();
    var myThis = this;
    if(this.validateMessageField(message) && this.validatePhoneField(phone)){
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(x) {
          console.log(this);
          myThis.displayMessage(myThis.fromNumber, message);
        },
        error: function(e){
          alert("Problem sending message");
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: phone,
          Body: message
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        }
      });
    }
    // this.displayMessage('9999999999', 'Testing testing!');
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
