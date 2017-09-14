"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC056fe00d549be9cb054af65970df6417";
  this.authToken = "1fe0b391af62094b34893f629377a86a";
  this.fromNumber = "2072488331";
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
    })
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if($.trim(textStr) !== ''){
      return true;
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if(phoneStr.length === 11 && phoneStr.match(/^\d+$/)){
      return true;
    }
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    // this.displayMessage('9999999999', 'Testing testing!');
    var message = this.messageInputField.val();
    var phoneNumber = this.phoneInputField.val();
    if(this.validateMessageField(message) && this.validatePhoneField(phoneNumber)){
      var self = this;

      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + self.accountId + '/SMS/Messages', {
        success: function(x) {
          self.displayMessage(phoneNumber, message);
          self.messageInputField.val("");
        },
        error:function(err){
          alert(err);
        },
        method: 'POST',
        data: {
          From: self.fromNumber,
          To: phoneNumber,
          Body: message
        },
        headers: {
          "Authorization": "Basic " + btoa(self.accountId + ":" + self.authToken)
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
