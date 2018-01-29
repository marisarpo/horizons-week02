"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC685abfdd8d1f159dba8c95caa1324f1a";
  this.authToken = "0c447ac58b6607d46e03a95388d586ce";
  this.fromNumber = "+14133142621";

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  // Set up the event handlers
  this.initialize();
  this.phoneInputField.val("18605581037");
  this.messageInputField.val("hi");

  console.log("TwilioApp is ready.");
}

TwilioApp.prototype = {
  // Part 1. `initialize()` method
  initialize: function() {
    var app = this; // this is a good place to use bind as well
    this.messageSendButton.on('click', function(event){
      app.handleMessageSend(event);
    }/* .bind(this) would go here*/);
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    if (!textStr){return false;}
    if (textStr.length < 1){return false;}
    if (textStr.trim().length < 1){return false;}
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    var isNum = /^\d+$/.test(phoneStr); // regular expression checking if every char is a digit
    var is11Digits = (phoneStr.length === 11)
    return (isNum && is11Digits);
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();

    // Get the contents of the messageInputField and phoneInputField
    var messageInput = $(this.messageInputField).val();
    var phoneInput = $(this.phoneInputField).val();

    // Validate the message using this.validateMessageField() and the phone number using this.validatePhoneField().
    var messageValid = this.validateMessageField(messageInput);
    var phoneValid = this.validatePhoneField(phoneInput);

    // If both fields are valid, make an AJAX request to Twilio to send a message.
    // Use the AJAX request from the previous exercise and update the from/to phone numbers, account id, token, and the message body.
    // If the AJAX request succeeds, use this.displayMessage() display the sent message to the user and clear the contents of messageInputField.
    // If the AJAX request fails, notify the user using the browser built-in alert() function.
    if (messageValid && phoneValid)
    {
      let app = this;
      console.log("POST", this.accountId, this.authToken);  
      let toNumber = "+" + phoneInput;
      console.log(this.fromNumber, toNumber);  
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
      success: function(x) {
        app.displayMessage(toNumber, messageInput);
        console.log("Success", this.fromNumber, messageInput);
        console.log(x);
      },
      method: 'POST',
      data: {
        From: this.fromNumber,
        To: toNumber,
        Body: messageInput
      },
      headers: {
        "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
      },
      error: function(jqXHR){
        console.log("Error", jqXHR);
        alert("An Error Occured!")
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
