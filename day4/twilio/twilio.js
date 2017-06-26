"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACa9b991828e662ceb54665a09664a6ec5";
  this.authToken = "8d798e5ebd69e70d2d5bcc4ea06ce3d4";
  this.fromNumber = "+18607244373";

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
  initialize: function() {
      this.messageSendButton.on('click', this.handleMessageSend.bind(this))
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    var text = textStr.trim();
    if (text === "")
        return false
    else
        return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
      var phoneArray = phoneStr.split("")
      var isNum = true;
      for(var i = 0; i < phoneArray.length; i++) {
          console.log();
          if (isNaN(parseFloat(phoneArray[i]))) {
              isNum = false;
          }
      }
      if (isNum && phoneArray.length === 11) {
          return true;
      }
      else {
          return false;
      }
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
      event.preventDefault();
      var messageInput = this.messageInputField.val();
      var phoneInput = this.phoneInputField.val();
      var validateValues = this.validateMessageField(messageInput) && this.validatePhoneField(phoneInput)
      if (validateValues) {
          var self = $(this);
          $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
            success: this.displayMessage(phoneInput, messageInput),
            method: 'POST',
            data: {
              From: this.fromNumber,
              To: phoneInput,
              Body: messageInput
            },
            headers: {
              "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
            },
            error: function(err) {
                if (err) {
                    alert("ERROR!");
                }
            }
          });
          this.messageInputField.val("");
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
