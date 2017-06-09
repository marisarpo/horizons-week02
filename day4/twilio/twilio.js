"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC105acc848f75f15e0857d37772cf64fd";
  this.authToken = "cd6d803f136e5250e7c2bb44d8760af6";
  this.fromNumber = "6319941616";

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  // Set up the event handlers
  this.initialize();

  console.log("TwilioApp is ready!!!!");
}

TwilioApp.prototype = {
  // Part 1. `initialize()` method
  initialize: function() {
    // Save the context of 'this'
    var self = this;
    self.messageSendButton.on('click', self.handleMessageSend.bind(self));

  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    var newTxtStr = $.trim(textStr);
    return newTxtStr !== "";

  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    $.each(phoneStr.split(""), function(index, item){
      if(typeof item !== 'number'){
        return false;
      }
    })
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();

    // Get the contents of the msgInput and phoneInput
    if(this.validateMessageField(this.messageInputField.val())
      && this.validatePhoneField(this.phoneInputField.val())) {

      // Ajax request to twilio
      $.ajax({
        url: 'https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages',
        success: function(x) {
          this.displayMessage(this.fromNumber, this.messageInputField.val());
        }.bind(this),
        error: function(err){
          console.log(err)
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: this.phoneInputField.val(),
          Body: this.messageInputField.val()
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        },
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
