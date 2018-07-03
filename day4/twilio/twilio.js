"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACe82884eda3ceaffb245259c1a9c029e9";
  this.authToken = "3296728e418c04c6e35a886d4e22356b";
  this.fromNumber = "+17073666921";

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
    this.messageSendButton.on('click', function(event){
      event.preventDefault();
      this.handleMessageSend();
    }.bind(this)
  );

  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if (textStr.trim().length === 0){
      return false;
    }else{
      return true;
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if ( (phoneStr.trim().length === 11) && ( /^[0-9]+$/.test(phoneStr.trim()) ) ) {
      return true;
    }else{
      return false;
    }
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    //event.preventDefault();
    //this.displayMessage('9999999999', 'Testing testing!');
    //16027368148
    console.log(this.messageInputField.val());
    console.log(this.phoneInputField.val());
    console.log(this.validateMessageField(this.messageInputField.val()));
    console.log(this.validatePhoneField(this.phoneInputField.val()));
    if ( this.validateMessageField(this.messageInputField.val()) &&
        this.validatePhoneField(this.phoneInputField.val() ) ){

    $.ajax(
     {
       url: 'https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages',
       success: function(x) {
         this.displayMessage( this.phoneInputField.val(), this.messageInputField.val());
         this.messageInputField.val("");
       }.bind(this),
       method: 'POST',
       data: {
         From: this.fromNumber,
         To: "+" + this.phoneInputField.val(),
         Body: this.messageInputField.val()
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
