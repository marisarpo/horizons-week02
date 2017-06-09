"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'AC163bddd41c40090254ca2f9b86f1c143';
  this.authToken = 'bebc0ea91da3cbe593940bbdd0ed4e50';
  this.fromNumber = 14422374106;

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
    this.messageSendButton.on('click', function(event) {
      event.preventDefault();
      this.handleMessageSend();
    }.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    return $.trim(textStr) !== '';
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    return ((phoneStr.length === 11) && ($.isNumeric(phoneStr)));
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    var message = this.messageInputField.val();
    var phone = this.phoneInputField.val();
    console.log(message, phone)
    if (!(this.validateMessageField(message) && this.validatePhoneField(phone))) {
      console.log('bad inputs');
      return false;
    }
    console.log ('GOT HERE');
    $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
    success: function(x) {
      console.log('Message sent', x);
      this.displayMessage(phone, message);
      this.messageInputField.val('');
    }.bind(this),
    error: function() {
      alert('Something went wrong!');
    },
    method: 'POST',
    data: {
      From: '+' + this.fromNumber,
      To: '+' + this.phoneInputField.val(),
      Body: "Congrats, it works!"
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
