"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACe192772fc7845e22bb9d17b1dcac74de";
  this.authToken = "3369616a876d0fa02cf9762024d19504";
  this.fromNumber = "+13478307886";

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
    var self = this
    this.messageSendButton.on('click', function(e){
      console.log('f');
      self.handleMessageSend(e)
    })
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if ($.trim(textStr)) {
      return true;
    }
    return false;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if(isNaN(phoneStr)){
      return false;
    }
    if (phoneStr.length !== 10) {
      return false;
    }
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault()
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST

    var validMessage = this.validateMessageField(this.messageInputField.val());
    var validPhone = this.validatePhoneField(this.phoneInputField.val());
    var self = this;
    if (validMessage && validPhone) {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
          success: function(x) {
            self.displayMessage(this.fromNumber, self.messageInputField.val());
            $('h1').text("Congrats! You're set up!");
          },
          error: function(e) {
            alert('error!');
          },
          method: 'POST',
          data: {
            From: this.fromNumber,
            To: this.phoneInputField.val(),
            Body: self.messageInputField.val()
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
