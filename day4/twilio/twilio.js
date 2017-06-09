"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC14ef6dafeb35d3b1123f3d76dc6620b8";
  this.authToken = "b0cccaad14dacd0ba544007d09dba30a";
  this.fromNumber = "+18563473805";

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
    return (textStr !== "" && (textStr.trim(" ").length !== 0));
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    return (Number.isInteger(parseInt(phoneStr))&&
            phoneStr.length === 10 && 
            !(phoneStr.includes(".")) &&
            !(phoneStr.includes("-")));
    // (/^\d+$.test()) checks string if valid number
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    if (this.validateMessageField(this.messageInputField.val()) &&
        this.validatePhoneField(this.phoneInputField.val())) {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(x) {
          console.log("HERE");
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: this.phoneInputField.val(),
          Body: this.messageInputField.val()
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        },
        error: function(err) {
          alert("Error: cannot reach server.");
        }
      });
      this.displayMessage(this.phoneInputField.val(), this.messageInputField.val());
      this.messageInputField.val("");
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
