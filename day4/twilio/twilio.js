"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACa797f4d78e64abc0c8f760ad492b9291";
  this.authToken = "ee57133998b3ba6f19cb7ac6b5cb18b2";
  this.fromNumber = "+16313874080";

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

  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    if($.trim(textStr) !== ""){
      return true;
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    if (JSON.parse(phoneStr).length === 10){
      return true;
    }
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    event.preventDefault();
    var message = this.messageInputField.val()
    var phone = this.phoneInputField.val();
    if (validateMessageField(message) && validatePhoneField(phone)){
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
  success: function(x) {
    $('h1').text("Congrats! You're set up!");
    console.log('Message sent', x);
  },
  method: 'POST',
  data: {
    From: this.fromNumber,
    To: this.fromNumber,
    Body: 'Congratulations your Twillio account is working!'
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
