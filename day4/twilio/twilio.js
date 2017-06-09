"use strict";
/* eslint-env jquery */

window.twilio = {};

// Exercise 0. Get Twilio credentials
//
// Please navigate to https://www.twilio.com, and get a free API Key.
//
// You're going to be signing up for the service yourself, and it won't be
// asking you to pay for anything. Enter your name, phone number, and whatever
// else they ask you for (within reason - if they're asking for an ssn, call
// one of us over)
//
// You'll need 3 pieces of information to be able to interact with the Twilio
// API - your `accountId (or SID)`, an `auth token` and your Twilio phone
// number.
//
// Follow the steps listed by Twilio to get familiar with their API console and
// retrieve your first Twilio phone number!
//
// When you have all this information, please replace them in the variables down there.

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC679b7842b23ffbab415e7efb86bf4606";
  this.authToken = "fcc9b27fca958f4ac895813708961e49";
  this.fromNumber = "+12156076520";
  this.toNumber = "+12158733239";

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
    this.messageSendButton.on('click', this.handleMessageSend.bind(this))
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr){

    if (!textStr){
      return false;
    }
    var strArr = textStr.split(" ");
    var content = false;
    strArr.forEach(function(letter) {
      if(letter){
         content = true;
       }
     })
     return content;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr){
    if (phoneStr.length != 10) {
      return false;
    }
    else if (typeof JSON.parse(phoneStr) !== 'number') {
      return false;
    }
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    // YOUR CODE HERE
    var message = $('.message-input-field').val();
    var phone = $('.phone-input-field').val();

    if (this.validateMessageField(message) && this.validatePhoneField(phone)) {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/Messages', {
          success: function(x) {
            this.displayMessage(phone, message);
            $('.message-input-field').val("");
            console.log(this.formNumber);
          }.bind(this),
          method: 'POST',
          data: {
            From: this.fromNumber,
            To: "+1" + phone,
            Body: message,
          },
          headers: {
            "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
          },
          error: function(er){
          alert("failed to send message because Error: " + er);
        },
        });
    }
    else {
      alert(this.validateMessageField(message));
    }

    // REMOVE THE NEXT LINE, IT'S FOR TEST

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
