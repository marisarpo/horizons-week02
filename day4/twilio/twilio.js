"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACf91fa993a9b4e2a003225a1593624110";
  this.authToken = "79e6e898827564d7028ffde891c06634";
  this.fromNumber = "+16173963476";

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
    var trimmed = $.trim(textStr);
    if (trimmed.length === 0){
      return false;
    }
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    for (var i = 0; i < phoneStr.length; i++) {
      if (typeof JSON.parse(phoneStr[i]) !== "number"){
        return false;
      }
    }
    if (phoneStr.length !== 11){
      return false;
    }
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    var hey = this;
    var messageIn = this.messageInputField.val();
    var senderIn = this.phoneInputField.val();
    console.log(typeof messageIn, typeof senderIn);
    if (this.validatePhoneField(senderIn) && this.validateMessageField(messageIn)){
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(x) {
          hey.displayMessage(senderIn, messageIn);
          hey.messageInputField.val('');
        },
        error: function(error){
          console.log(error);
          //alert('No!!!');
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: "+" + senderIn,
          Body: messageIn,
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        }
      });

    }
    event.preventDefault();
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    //this.displayMessage('9999999999', 'Testing testing!');
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
