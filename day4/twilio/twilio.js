"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'ACc693ffef4dc006a03b229399c63b400e';
  this.authToken = '17daffeb4e2683fe4d3bdfe75a320054';
  this.fromNumber = +14159695474;

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
    this.messageSendButton.on('click', this.handleMessageSend.bind(this))
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    var newStr = textStr.trim();
    if (newStr === '') {
      return false
    } else {
      return true
    }

  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    var newArr = phoneStr.split('')
    if (newArr.length !== 11) {
      return false
    }
    newArr.forEach(function (item) {
      if (!('0123456789'.includes(item))) {
        return false
      }
    })

    return true;

  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    event.preventDefault();

    var number = this.phoneInputField.val();
    var message = this.messageInputField.val();

    if (this.validatePhoneField(number) && this.validateMessageField(message)) {
      $.ajax({
        url: 'https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', 
        success: function(x) {

          this.displayMessage(this.fromNumber, this.messageInputField.val());
          this.messageInputField.val('');
        }.bind(this),
        error: function(y) {
          alert('Error');
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: number,
          Body: message
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        }
      });
    } else {
      console.log('Failed');
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
