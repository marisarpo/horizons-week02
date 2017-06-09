"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC634e5945aac87c6677c30844090f9529";
  this.authToken = "58feb2b7f5f4a41d79a77e1d4d4b700b";
  this.fromNumber = "+17623830188";

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
    this.messageSendButton.on('click', function(){
      this.handleMessageSend(event);
    }.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    return $.trim(textStr) !== "" ? true : false;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    return !isNaN(phoneStr) && phoneStr.length === 10 ? true : false;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    // this.displayMessage('9999999999', 'Testing testing!');
    event.preventDefault();
    var phoneInput = this.phoneInputField.val(), messageInput = this.messageInputField.val();
    var phoneBool = this.validatePhoneField(phoneInput), messageBool = this.validateMessageField(messageInput);
    if(messageBool && phoneBool){
      this.displayMessage(phoneInput, messageInput);
      //this.phoneInputField.val("");
      this.messageInputField.val("");
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(x) {
          $('h1').text("Congrats! You're set up!");
          console.log('Message sent', x);
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: phoneInput,
          Body: messageInput
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        }
      });
    }
    else{
      alert("Either the phone number or message is incorrectly formatted.");
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
