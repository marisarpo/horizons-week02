"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACb48a3f9684f7c7e97ba8ce84aa5fdd0e";
  this.authToken = "7ba723638f1718d558b9214be554f31d";
  this.fromNumber = "+17372049284";

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
    var thata = this;
    $(".message-input-button").on('click', function(event){
      event.preventDefault();
      thata.handleMessageSend();
    })
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {

  return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {

  return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {

    var phoneNumber = this.phoneInputField.val();
    var message = this.messageInputField.val();
    var account = this.accountId;
    var froaNumber = this.fromNumber;
    var token = this.authToken;
    var that = this;

    if(this.validatePhoneField(phoneNumber) && this.validateMessageField(message))
    {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + account + '/SMS/Messages', {
    success: function(x) {
      that.displayMessage(froaNumber, message);
    },
    method: 'POST',
    data: {
      From: froaNumber,
      To: phoneNumber,
      Body: message,
    },
    headers: {
      "Authorization": "Basic " + btoa(account + ":" + token)
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
