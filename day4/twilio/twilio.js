"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACe0cd5615e0796e974d23befb362f4403";
  this.authToken = "645e91cca7964f8de8f77c9485b61de2";
  this.fromNumber = "+17347252107";

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
    console.log("before click");
    this.messageSendButton.on("click", function(event) {
      event.preventDefault();
      this.handleMessageSend(event);
    }.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    if ($.trim(textStr) === "") {return false}
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    return !isNaN(phoneStr);
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    var message = this.messageInputField.val();
    var num = this.phoneInputField.val();

    if (!this.validatePhoneField(num)) {
      alert("Error: Incorrect Phone Number Format");
    } else if (!this.validateMessageField(message)) {
      alert("Error: Incorrect Message Format");
    } else {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(x) {
          console.log('Message sent', x);
          this.displayMessage(num, message);
          this.messageInputField.val("");
        }.bind(this),
        error: function(err) {
          alert("Something Went Wrong");
          console.log(err);
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: "+" + num,
          Body: message
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
