"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC0ccb3d26d83d1e236024c9b70d9efcfc";
  this.authToken = "a69aab99e9834be73ed508e1ac1cecb6";
  this.fromNumber = '+15092608221';

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
    var clickFunc = this.handleMessageSend.bind(this);
    this.messageSendButton.on('click',clickFunc);
  },

  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if (textStr === "" || textStr.trim() === " ") {
      return false;
    }
    return true;
  },

  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    var phoneNum = phoneStr.slice(1,phoneStr.length);
    var phoneInt = parseInt(phoneNum);
    if (phoneNum.length !== 11) {
      return false;
    } else if (isNaN(phoneInt)) {
      return false;
    }
    return true;
  },

  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    var phoneNum = '+'
    phoneNum += this.phoneInputField.val();
    var messCon = this.messageInputField.val();
    console.log(this.validatePhoneField(phoneNum));
    console.log(this.validateMessageField(messCon));
    event.preventDefault();
    var self = this;
    if (this.validatePhoneField(phoneNum) && this.validateMessageField(messCon)) {
      console.log(this.accountId)
      console.log(this.fromNumber)
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function() {
          self.displayMessage(phoneNum.slice(1,phoneNum.length), messCon);
          self.messageInputField.val("");
        },
        error: function(x) {
          alert("error");
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: phoneNum,
          Body: messCon
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
