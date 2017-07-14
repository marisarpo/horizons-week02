"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC0340e85c857dadb53abcebd7b19b53d6";
  this.authToken = "05a8168b8c9e4a7b91763f1e5d5e52fd";
  this.fromNumber = "+16572206761";
  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button")

  // Update this.initialize and add a click handler to the this.messageSendButton element that calls this.handleMessageSend. this.initialize
  // is called when the app is started inside the TwilioApp constructor.
  // Update this.handleMessageSend and prevent the default behavior for the click event.
  // When you click send, you should see a test message.

  // Set up the event handlers
  this.initialize();
}

TwilioApp.prototype = {
  // Part 1. `initialize()` method
  initialize: function() {
    this.messageSendButton.on("click", this.handleMessageSend.bind(this));

  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    var newTextStr = textStr.trim();
    if (newTextStr.length === 0) {
      return false;
    } else {
      return true;
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    for (var i=0; i<phoneStr.length; i++) {
      if (phoneStr[i] === '-') {
        return false;
      }
    }
    if (phoneStr.length !== 11) {
      return false;
    }
    return true;
  },



  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    var self = this;
    var msg = this.validateMessageField(this.messageInputField.val());
    var phone = this.validatePhoneField(this.phoneInputField.val());
    if (msg && phone) {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(resp) {
          console.log(this);
          console.log(self);
          self.displayMessage(self.fromNumber, self.messageInputField.val());
          console.log("response: ", resp)
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: this.phoneInputField.val(),
          Body: this.messageInputField.val(),
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        },
        error: function(err) {
          window.alert('broken!');
          console.log("error: ", err)
        }
      })
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
},

window.twilio = new TwilioApp();
