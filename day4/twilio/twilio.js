"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC1fd1ff78c9c49387b241a2c29fbe9fcf";
  this.authToken = "1f60fe707af98cc822100b497ecff459";
  this.fromNumber = "+14243060616";

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
    this.messageSendButton.on("click", this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    return textStr.trim().length !== 0;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    return Number.isInteger(parseInt(phoneStr)) && String(parseInt(phoneStr)).length === 11;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    if( this.validateMessageField(this.messageInputField.val()) && this.validatePhoneField(this.phoneInputField.val()) )
    {
      $.ajax({
        url: 'https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages',
        success: function(x) {
          this.displayMessage(this.phoneInputField.val(), this.messageInputField.val());
          this.messageInputField.val("");
        }.bind(this),
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: "+"+this.phoneInputField.val(),
          Body: this.messageInputField.val()
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        },
        error: function(err){
          alert("Failed: " + err.statusText);
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
