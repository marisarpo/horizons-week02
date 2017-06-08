"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACd06dbf8b6b15e16268636385508a88f3";
  this.authToken = "0e50bcebb4bb99511ea0b78fe210b96a";
  this.fromNumber = "15414184051";

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  // Set up the event handlers
  this.initialize();

  //console.log("TwilioApp is ready.");
}

TwilioApp.prototype = {
  // Part 1. `initialize()` method
  initialize: function() {
    // YOUR CODE HERE
    this.messageSendButton.on("click", function(event){
      this.handleMessageSend(event);

    }.bind(this))
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if($.trim(textStr).length === 0){
      return false;
    }
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    var test = true;
    if(phoneStr.length !== 10){
      return false;
    }
    phoneStr.split("").forEach(function(item){
      if(!Number.isInteger(parseInt(item))){
        test = false;
      }
    })
    return test;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    event.preventDefault();
    var message = this.messageInputField.val();
    var number = this.phoneInputField.val();

    if(!this.validateMessageField(message)){
      return false;
    }
    if(!this.validatePhoneField(number)){
      return false;
    }

    $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
    success: function(x) {
      this.displayMessage(this.fromNumber, this.messageInputField.val())
    }.bind(this),
    error: function(err){
      alert("It's bad, mmmkay!");
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
