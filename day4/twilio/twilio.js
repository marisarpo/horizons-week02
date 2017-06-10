"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'ACfe7f1bcc6d934e6fde323bc3dc306817';
  this.authToken = '89186c1c10d5af967c22cb949099d9b3';
  this.fromNumber = "+13367777876";

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
    var self = this;
       this.messageSendButton.click(function(event){
       event.preventDefault();
       self.handleMessageSend(event);
    }
  }
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    if(textStr.trim()===''){
      return false;
    }
    return true;
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if(phoneStr.length===10 && Number.isInteger(phoneStr)===true){
      return true;
    }
    return false;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    var message = this.messageInputField.val();
    var num = this.phoneInputField.val();
    if(this.validateMessageField(message)===true && this.validatePhoneField(num)===true){
        $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(x) {
          $('h1').text(message);
          console.log('Message sent', x);
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: num,
          Body: 'Congratulations your Twillio account is working!'
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        }
      });
    }
    this.displayMessage(num, message);

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
