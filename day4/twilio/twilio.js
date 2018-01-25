"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'ACbd088e1b76b59f75f8e6829633523597';
  this.authToken = 'e85675ee229e8c273a5ef31dc43fc915';
  this.fromNumber = '+16782646523';

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
    this.messageSendButton.on('click', this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if ($.trim(textStr) === "") return false;
    return true;

  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if (phoneStr.length !== 11) return false;
    for (var i = 0; i < phoneStr.length; i++){
      if (isNaN(parseInt(phoneStr[i])))return false;
    }
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    event.preventDefault();
    console.log('hi');
    // debugger;
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    // this.displayMessage('9999999999', 'Testing testing!');
    var msg = this.messageInputField.val();
    var phone = this.phoneInputField.val();
    if (!this.validatePhoneField(phone)) return false;
    if (!this.validateMessageField(msg)) return false;

    $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
      success: function(x) {
        this.displayMessage(phone, msg);
      }.bind(this),
      error: function(err){
        alert('Request failed');
      },
      method: 'POST',
      data: {
        From: this.fromNumber,
        To: phone,
        Body: msg
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
