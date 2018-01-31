"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACadf607a8a0e3c05f24b97867bed09475";
  this.authToken = "808314bf4e5e0aef1b3e4a4ab3e3f428";
  this.fromNumber = "18625052989";

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
  initialize() {
    this.messageSendButton.on('click', this.handleMessageSend.bind(this),);
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    if(!(textStr) || textStr.trim() === ''){
      return false;
    }else{
      return true;
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    debugger;
     return Number(phoneStr) && phoneStr.length === 11;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    debugger;
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    var messageCont = this.messageInputField[0].value;
    var messagePhone = this.phoneInputField[0].value;
    var messageTwilio = this.fromNumber;
    if(this.validateMessageField(messageCont) && this.validatePhoneField(messagePhone)){
      debugger
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
    success: function(x) {
      this.displayMessage(messageTwilio, messageCont)
    }.bind(this),
    method: 'POST',
    data: {
      From: messageTwilio,
      To: messagePhone,
      Body: messageCont
    },
    headers: {
      "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken )
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
// alert(twilio.__proto__ === TwilioApp.prototype);
