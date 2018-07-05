"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC3e5b547589812093c6fca22497f8b00a";
  this.authToken = "**********************************";
  this.fromNumber = "4178153351";

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

    this.messageSendButton.on("click", this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    var return_val;
    if(textStr.trim() == '') return_val = false;
    else return_val = true;

    console.log('message', return_val);

    return return_val;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    var return_val = true;
    if(phoneStr.length != 11) return_val = false;

    phoneStr.split('').forEach(function(char){
      if(typeof parseInt(char,10) != "number") return_val = false;
    });

    console.log('phone', return_val);

    return return_val;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    var message = this.messageInputField.val();
    var number = this.phoneInputField.val();

    //Validate
    if(this.validateMessageField(message) && this.validatePhoneField(number)){
      console.log('here');
      $.ajax(
        'https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
            failure: function(err){alert("Didn't work")},
            success: function(x) {
              $('h1').text("Congrats! You're set up!");
              console.log('Message sent', x);
            },
            method: 'POST',
            data: {
              From: this.fromNumber,
              To: number,
              Body: message
            },
            headers: {
              "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
            }
          });
    }
    this.displayMessage(number, message);

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
