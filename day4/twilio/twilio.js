"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACadd0b5c99339d8a8cd30978a4a348463";
  this.authToken = "77fa71f1d931d459d747016d6db4a19e";
  this.fromNumber = "+17328205356";

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
    this.messageSendButton.on("click", function(event){
      event.preventDefault();
      this.handleMessageSend(event);
    }.bind(this));

  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    var trimStr = textStr.trim();
    if(trimStr === ""){
      return false;
    }
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    if(phoneStr.match(/[0-9]{10}/)){
      return true;
    }
    return false;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    var phoneNum = this.phoneInputField.val();
    var msg = this.messageInputField.val();
    if(this.validatePhoneField(phoneNum) && this.validateMessageField(msg)){
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages',
      { method: 'POST',
        data: {
            From: this.fromNumber,
            To: "+1" + phoneNum,
            Body: msg
          },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        },
        success: function(){
          this.displayMessage(this.fromNumber, msg);
          this.messageInputField.val("");
        }.bind(this),

        error: function(e){
          console.log(e);
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
