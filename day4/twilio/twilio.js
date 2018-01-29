"use strict";
/* eslint-env jquery */

function TwilioApp() {

  // Part 0. Get Twilio credentials
  this.accountId = "AC29200fcb95dc9bf778be591edcb50c70";
  this.authToken = "1be94bd7c9a01cc28fd7d64632f6fcb5";
  this.fromNumber = "17372105075";

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

    $('.message-input-button').on('click',this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    return textStr.trim() !== "";
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    if(isNaN(phoneStr[0])){
      return false;
    }

    if(phoneStr.length !== 11){
      return false;
    }

    return !isNaN(phoneStr);
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    let message = $('.message-input-field').val();
    let phoneNum = $('.phone-input-field').val();
    let twilio = this;
    if(this.validatePhoneField(phoneNum) && this.validateMessageField(message)){
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(x) {
          //TODO @ who? 
          twilio.displayMessage(phoneNum,message);
          $('.message-input-field').val('');
        },
        error: function(x){
          alert(`Message to ${phoneNum} failed`);
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: phoneNum,
          Body: message
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        }
      });
    }
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    // this.displayMessage('9999999999', 'Testing testing!');
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
