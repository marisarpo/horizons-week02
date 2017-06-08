"use strict";
/* eslint-env jquery */


function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACacb36841ac71242297e9ec04096b3e49";
  this.authToken = "c66a4734327c963d0b297e86b3e88be3";
  this.fromNumber = "+18046554974";

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
    this.messageSendButton.on('click', (function(evt){
      this.handleMessageSend(evt);
    }).bind(this))
  },
  // Part 2. `validateMessageField(textStr<String>)` method

  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if($.trim(textStr) === ""){
      return false;
    }
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if($.trim(phoneStr.toLowerCase()) === ""){
      return false;
    }
    
    return /^\d+$/.test(phoneStr);
  },

  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    
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
