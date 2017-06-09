"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'AC11be3b65346c16099b6cf43a14887b86';
  this.authToken = 'b40e258f02b9dc1e0401623339974a27';
  this.fromNumber = '+12156072981';

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
    this.messageSendButton.on('click',this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    if ($.trim(textStr).length === 0) {
      return false;
    }
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if (typeof JSON.parse(phoneStr) !== 'number' || phoneStr.length !== 10) {
      return false;
    }
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    var myThis = this;
    event.preventDefault();
    var message = this.messageInputField.val();
    var phone = this.phoneInputField.val();
    if(this.validateMessageField(message) && this.validatePhoneField(phone)) {
      //valid inputs
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(x) {
          myThis.displayMessage(myThis.fromNumber, message);
        },
        error: function(err) {
          alert("Problem sending message");
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: phone,
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
