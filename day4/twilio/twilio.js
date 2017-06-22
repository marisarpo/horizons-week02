"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACb92a3777fd3c2981ec1c97043115eb07";
  this.authToken = "0d60f744de3f24f0f947d2499a271f92";
  this.fromNumber = "18327426605";

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  // Set up the event handlers
  var newInit = this.initialize.bind(this);
  newInit();

  console.log("TwilioApp is ready.");
}

TwilioApp.prototype = {
  // Part 1. `initialize()` method
  initialize: function() {
    $(this.messageSendButton).on('click', function(e) {
      this.handleMessageSend(e);
    }.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    if (textStr.val().length === 0 || textStr.val().trim().length === 0)
      return false;
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if (phoneStr.val().length !== 11 || !/^\d+$/.test(phoneStr.val()))
      return false;
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE

    var message = this.messageInputField;
    var phone = this.phoneInputField;

    if (this.validateMessageField(message) && this.validatePhoneField(phone)) {
      $.ajax({
        url: 'https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages',
        method: 'POST',
        data: {
          From: '+' + this.fromNumber,
          To: '+' + phone.val(),
          Body: message.val()
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ':' + this.authToken)
        },
        success: function(resp) {
          this.displayMessage(this.fromNumber, message.val());
          console.log('Sent.');
        }.bind(this),
        error: function(err) {
          alert('Something went wrong with AJAX!');
          console.log('Error.');
        }
      });
    } else {
      alert('Invalid phone number or message.');
    }
    event.preventDefault();
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
