"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC85bc3413cd7ab6ed6161816c9830c0b3";
  this.authToken = "a254f2b1f2d2b4d9ec2459f2985f612b";
  this.fromNumber = "16789321267";

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
    this.messageSendButton.on("click", this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    var text = $.trim(textStr);
    if (text.length !== 0) return true;
    else return false;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    var result = true;
    if (phoneStr.length !== 11) result = false;
    for (var i = 0; i < phoneStr.length; i++) {
      if (parseInt(phoneStr.slice(i, i+1)).toString() === 'NaN') {
        result = false;
      }
    }
    return result;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    event.preventDefault();
    var text = this.messageInputField.val();
    var phone = this.phoneInputField.val();
    var validtext = this.validateMessageField(text);
    var validphone = this.validatePhoneField(phone);
    var self = this;
    if (validtext && validphone) {
      $.ajax({
        url:'https://api.twilio.com/2010-04-01/Accounts/AC85bc3413cd7ab6ed6161816c9830c0b3/SMS/Messages',
        success: function() {
          self.displayMessage(self.phoneInputField.val(), self.messageInputField.val());
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: phone,
          Body: text
        },
        error: function(err) {
          window.alert("wrong number");
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
