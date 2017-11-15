"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC587e70a0d6be16e924dd8ce21eaf87c2";
  this.authToken = "665a977802ba4d57ee02012a74279df7";
  this.fromNumber = "+15108795884";

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
    this.messageSendButton.on('click', this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    return ($.trim(textStr).length !== 0)

  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    if(phoneStr.length!==11 || ("" + parseInt(phoneStr))!==phoneStr){
      return false;
    }
    return true;
  },

  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    var message = this.messageInputField.val();
    var sendTo = this.phoneInputField.val();
    if (!this.validateMessageField(message) || !this.validatePhoneField(sendTo)) {
      console.log('invalid message or invalid phone.');
      return false;
    }
      var self = this;
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + self.accountId + '/SMS/Messages', {
        success: function(x) {
          self.displayMessage(sendTo,message);
          self.messageInputField.val('');
          console.log("Sent message", message);
        },
        error:function(error){
        alert("Message could not be sent.");
        console.log(error);
        },
        method: 'POST',
        data:
        { From: this.fromNumber,
          To: sendTo,
          Body: message
        },

        headers: {
        "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        }

      })
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
