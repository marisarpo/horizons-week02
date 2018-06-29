"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACba5fc5fe1b3fc792b16583393a7c8da4";
  this.authToken = "2e43e0bd0510a4d0a2f8d7c433b6a577";
  this.fromNumber = "+19478005929";

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
    textStr = textStr.trim()
    if (textStr !== '') {
      //console.log('texttrue')
      return true;
    }
    return false;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    //console.log('inside validatePhoneField')
    if (phoneStr.indexOf('-') === -1 && phoneStr.length === 11) {
      //console.log('phonetrue')
      return true;
    }
    return false;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    //console.log('IN');
    event.preventDefault();
    var toPhone = this.phoneInputField.val();
    var text = this.messageInputField.val();
    if (this.validatePhoneField(toPhone) && this.validateMessageField(text)) {
      //console.log('inside if statement')
      $.ajax({
        url: 'https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages',
        success: function(x) {
          //console.log("success", this)
          this.displayMessage(toPhone, text);
          this.messageInputField.val('');
        }.bind(this),
        error: function(y) {
          alert('Something is wrong!!')
          //console.log("error", this)
        }.bind(this),
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: toPhone,
          Body: text
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        }
      });
    }
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
