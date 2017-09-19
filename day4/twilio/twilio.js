"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC4d3b5cada14db46b6e788e88448abb5b";
  this.authToken = "f6f0125876daf25d04edc111d25dc65e";
  this.fromNumber = "+18598881427";
  this.validToNumber = "+15134263379";

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
    var self = this;
    self.messageSendButton.on('click',self.handleMessageSend.bind(self));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    //Part 2.
    textStr = $.trim(textStr);
    if(textStr===""){
      return false;
    }
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if(phoneStr.length!==11 || ("" + parseInt(phoneStr))!==phoneStr){
      return false;
    }
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    event.preventDefault();
    var input = this.messageInputField.val();
    var phone = this.phoneInputField.val();
    if(!this.validateMessageField(input)||!this.validatePhoneField(phone)){
      this.displayMessage('You','Idiot');
      return false;
    }
    var self = this;
    $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + self.accountId + '/SMS/Messages', {
      success: function(x) {
        self.displayMessage(phone,input);
      },
      error:function(error){
        alert("Message could not be sent.");
        console.log(error);
      },
      method: 'POST',
      data: {
        From: self.fromNumber,
        To: ("+" + phone),
        Body: input
      },
      headers: {
        "Authorization": "Basic " + btoa(self.accountId + ":" + self.authToken)
      }
    });
    return true;
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
