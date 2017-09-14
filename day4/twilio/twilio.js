"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC08780608d253760714bcb62375507727";
  this.authToken = "ec847f4a8847583cdf75cacb4d9da4a3";
  this.fromNumber = "+14243053652";

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
    //the event handler doesn't have the context of the TwilioApp, so bind "this"
    //to the function to preserve that contexts
    this.messageSendButton.on("click", this.handleMessageSend.bind(self));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    if (textStr != "" && textStr.trim() != ""){
      return true;
    }
    return false;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr){
    for (var i = 0; i < phoneStr.length; i++){
      if (parseInt(phoneStr[i]) === NaN){
        return false;
      }
    }
    if (phoneStr.length === 11){
      console.log("checking...")
      return true;
    }
    return false;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    var message = this.messageInputField.val();
    var phoneNum = this.phoneInputField.val();
    if (this.validateMessageField(message) && this.validatePhoneField(phoneNum)){
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(resp) {
          this.displayMessage(phoneNum, message);
          console.log("Message: '" + message + "'was successfully sent to " + phoneNum + ".");
        }.bind(this),
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: phoneNum,
          Body: message
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        }, error: function(e){
          alert("Oh noes! There was a problem accessing the API...");
          console.log("Error: " + e.responseText);
        }
      });
    event.preventDefault(); //prevent default event behavior
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
