"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACd75a7a66f65068c19d5fd61c526be13f";
  this.authToken = "3c0ed7e55baaee52902ca339eff072ee";
  this.fromNumber = "+12157954774";

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
    // var thisOne = this;
    // console.log(this);
    this.messageSendButton.on('click', function(e){    //"e" for event
      console.log(this);
      // thisOne.handleMessageSend.call(thisOne, e);
      this.handleMessageSend(e);
    }.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if (textStr === "" || textStr.split(" ")[0] === "") {
      return false;
    }
    console.log("message true");
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if (phoneStr.length !== 11) {
      return false;
    }
    for (var i=0; i<phoneStr.length; i++) {
      if(isNaN(parseInt(phoneStr[i]))){
        return false;
      }
    }
    console.log("phone true");
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    event.preventDefault();
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    // this.displayMessage('9999999999', 'Testing testing!');
    var msgInput = this.messageInputField.val();
    var phoneInput = this.phoneInputField.val();
    console.log("message", msgInput);
    console.log("phone", phoneInput);
    var account = this.accountId;
    var token = this.authToken;
    var fromNumber = this.fromNumber;
    if (this.validateMessageField(msgInput) && this.validatePhoneField(phoneInput)) {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + account + '/SMS/Messages', {
        success: function(x) {
          console.log('Message sent', x);
          this.displayMessage(phoneInput, msgInput);
          $(".message-input-field").val('');
        }.bind(this),
        method: 'POST',
        data: {
          From: fromNumber,
          To: phoneInput,
          Body: msgInput,
        },
        headers: {
          "Authorization": "Basic " + btoa(account + ":" + token)
        },
        error: function() {
          alert("Something went wrong");
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
