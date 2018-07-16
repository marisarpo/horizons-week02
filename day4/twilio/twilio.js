"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'ACf7006e40e04c301f69f7c132d2926f15';
  this.authToken = 'dd87db43d584a24af2c23c9ddd568c81';
  this.fromNumber =  '+19782917421';
  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageSendButton = $(".message-input-button");
  // Set up the event handlers
  this.initialize();
  console.log("TwilioApp is ready.");
}

TwilioApp.prototype = {
  // Part 1. `initialize()` method
  initialize: function() {
    // YOUR CODE HERE
    this.messageSendButton.on("click", this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    return $.trim(textStr).length !== 0;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    var trimmed = phoneStr.trim();
    if (trimmed.length !== 11) {
      return false;
    }
    return /^[0-9]+$/.test(trimmed);
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // only send if both fields are valid
    var phoneInput = $(".phone-input-field").val();
    var message = $(".message-input-field").val();
    var self = this;
    if (this.validatePhoneField(phoneInput) && this.validateMessageField(message)) {
      // send the message
      var account = this.accountId;
      var token = this.authToken;
      var fromNumber = this.fromNumber;

      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + account + '/SMS/Messages', {
        method: 'POST',
        data: {
          From: fromNumber,
          To: phoneInput,
          Body: message
        },
        headers: {
          "Authorization": "Basic " + btoa(account + ":" + token)
        },
        success: function(data) {
          debugger;
          self.displayMessage(phoneInput, message);
          // clear the message field
          self.messageInputField.val('');
        },
        error: function() {
          alert("AJAX request failed");
        }

      });
    } else {
      throw new Error("Invalid fields");
    }
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    //this.displayMessage('9999999999', 'Testing testing!');
    event.stopPropagation();
    return false;
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
