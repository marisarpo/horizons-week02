"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC7b12fba269fb8cbc8bd1ebb1d4f5ed1e";
  this.authToken = "105427eaa507ced9e216988c0284b1a3";
  this.fromNumber = "+17275925884";

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
    var updatedString = textStr.trim();
    if (updatedString.length === 0){
      return false;
    }
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    var isnum = /^\d+$/.test(phoneStr);
    if (isnum){
      if (phoneStr.length===10){
        return true;
      }
    }
    return false;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    //this.displayMessage('9999999999', 'Testing testing!');
    console.log(this);
    var twilio = this;
    var message = this.messageInputField.val();
    var phone = this.phoneInputField.val();
    //console.log(message.val());
    if (this.validatePhoneField(phone) && this.validateMessageField(message)){
      $.ajax(
        'https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages',{
          success: function(x) {
            twilio.displayMessage(phone, message);
            twilio.messageInputField.val("");
          },
          method: 'POST',
          data: {
            From: this.fromNumber,
            To: phone,
            Body: message
          },
          headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
          },
          error: function(err){
            alert('ERROR', err);
          }
      })
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
