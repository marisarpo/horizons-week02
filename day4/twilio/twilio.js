"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACec32b130e556edbb4cd822d28cc99b71";
  this.authToken = "dc79a83410c596c3bf5499a01ce14abf";
  this.fromNumber = "+12244123158 ";
  this.toNumber = "";

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");


  // Set up the event handlers
  this.initialize();

  /*this.messageSendButton.on('click', function(evt) {
    this.handleMessageSend(evt);
  }.bind(this))*/

  console.log("TwilioApp is ready.");
}

TwilioApp.prototype = {
  // Part 1. `initialize()` method
  initialize: function() {
    // YOUR CODE HERE
    this.messageSendButton.on('click', this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if (textStr.trim() !== '') {
      return true;
    }
    return false;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    var numDigits = 0;
    for (var i = 0; i < phoneStr.length; i++) {
      if (!isNaN(phoneStr[i])) {
        numDigits++;
      } else {
        return false;
      }
    }
    if (numDigits === 11) {
      return true;
    }
    return false;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    event.preventDefault();
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    if (this.validateMessageField(this.messageInputField.val())
      && this.validatePhoneField(this.phoneInputField.val())) {
        this.toNumber = this.phoneInputField.val();
        var msg = this.messageInputField.val();
        $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
          success: function(x) {
            console.log('Message sent', x);
          },
          method: 'POST',
          data: {
            From: this.fromNumber,
            To: this.toNumber,
            Body: msg
          },
          headers: {
            "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
          }
        });
      }
      this.displayMessage(this.fromNumber, msg);
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
