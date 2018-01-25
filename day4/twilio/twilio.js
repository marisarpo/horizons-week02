"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACd02c35c3e5d7a4cb527814d9e78b1a3a";
  this.authToken = "0137f92948b7d74a312839e354ae3316";
  this.fromNumber = "+14703308952";

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  // Set up the event handlers
  this.initialize();

  console.log("TwilioApp is ready.");
}
// $(".phone-input-field").val("16787361954");

TwilioApp.prototype = {

  // Part 1. `initialize()` method
  initialize: function() {
    // var app = this;
    this.messageSendButton.on('click',function(event) {
      // console.log(event);
      this.handleMessageSend(event);
      // event.preventDefault();
      return false;
    }.bind(this))// YOUR CODE HERE
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // debugger;
    if(textStr === "") {
      return false;
    }
    return true;
    // YOUR CODE HERE
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // debugger;
    // console.log(phoneStr)
    var isnum = /^\d+$/.test(phoneStr);
    // console.log(isnum);
    return isnum && phoneStr.length === 11;
    // YOUR CODE HERE
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    // var x = this;
    console.log(this.validateMessageField(this.messageInputField.val()));
    console.log(this.validatePhoneField(this.phoneInputField.val()));

    // console.log(this.fromNumber);
    // console.log("+"+this.messageInputField.val());
    event.preventDefault();
      $.ajax({
          url: 'https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages',
          success: function(x) {
            this.displayMessage(this.phoneInputField.val(), this.messageInputField.val());
         }.bind(this),
         method: 'POST',
         data: {
           From:  this.fromNumber,
           To: "+"+this.phoneInputField.val(),
           Body: this.messageInputField.val()
         },
         headers: {
           "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
         }
       });
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
