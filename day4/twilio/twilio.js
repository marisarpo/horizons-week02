"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'ACc6ea79951b74698f9dad4830d77ceb90'; //this = TwilioApp
  this.authToken = '84a68145991d52330e46bc8b10d01f43';
  this.fromNumber = "+14243638586";

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
    this.messageSendButton.on('click', this.handleMessageSend.bind(this))
    // YOUR CODE HERE
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    if($.trim(textStr) === ''){
      return false;
    }
    else{
      true;
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    if(phoneStr.length === 11 && !isNaN(Number(phoneStr))){
      return true;
    }
    else{
      return false;
    }
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    var myMessage = this.messageInputField.val();
    var phoneNumber = this.phoneInputField.val();
    var self = this;
    if(this.validateMessageField(message) && 
      this.validatePhoneField(phoneNumber)){

      $.ajax({
      url: 'https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', 
      success: function(x) {
      console.log('Message sent', x);
      self.displayMessage(phoneNumber, myMessage);
      },
      method: 'POST',
      data: {
        From: this.fromNumber,
        To: phoneNumber,
        Body: myMessage
      },
    headers: {
      "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
    }
  });
    // event.preventDefault(); //want this to mean twilio app
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
