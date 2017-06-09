"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC5c6de5cebabecc5c7dd1d16724c151d7";
  this.authToken = "52abdd90ff4c2fea54d254aca96cefb3";
  this.fromNumber = "15412042848";

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

    this.messageSendButton.on('click', this.handleMessageSend.bind(this))
    // YOUR CODE HERE
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    return $.trim(textStr).length === 0 ? false : true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    var test = true;
    if (phoneStr.length !== 10) return false;
    phoneStr.split('').forEach(function(item) {
      if (!Number.isInteger(parseInt(item))) test = false;
    })
    return test;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    event.preventDefault();

    if (!(this.validatePhoneField(this.phoneInputField.val())) || !(this.validateMessageField(this.messageInputField.val()))) {
      alert('wrong number~');
    }
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    // this.displayMessage('9999999999', 'Testing testing!');
    $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
      success: function(x) {
        this.displayMessage(this.fromNumber, this.messageInputField.val());
      }.bind(this),
      error: function(err) {
        alert('123123123');
      },
      method: 'POST',
      data: {
        From: this.fromNumber,
        To: this.phoneInputField.val(),
        Body: this.messageInputField.val()
      },
      headers: {
        "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
      }
    });
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
