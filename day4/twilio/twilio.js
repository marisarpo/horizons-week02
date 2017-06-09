"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACb15eb482b2232e76865e10c82bb947ae";
  this.authToken = "040785ad50c1e8e36d6ce916a8444bf0";
  this.fromNumber = "18622454431";

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
    this.messageSendButton.on('click',function(event){
       self.handleMessageSend(event)
    })
  },
  // Exercise 2. `clearField(jqField<JQuery Element>)` method
  // Write a function that takes a JQuery input fields and clears the text inside it. It should not return anything.
  //
	// hint. use $.trim(), see https://api.jquery.com/jQuery.trim/
  // hint. what does it mean to `clear` a field? Set it to an empty string.
  // hint. user .val() to get (and set) the value of an input object!
  clearField: function(jqField) {
    console.log('here')
    jqField.val("")
  },
  // Exercise 3. `validateMessageField(textStr<String>)` method
  // Write a function that validates the message input field. It should return true if the `validateMessageField` passes these conditions:
  // (1) The field should not be a blank string ("")
  // (2) The field should not be an 'empty' string ("           ")
  //
	// hint. $.trim() is useful

  // Part 2. `validateMessageField(textStr<String>)` method

  validateMessageField: function(textStr) {
    if($.trim(textStr) === ""){
    }
    else {
      return true; //i.e. message is valid
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    if(phoneStr.length !== 10 || parseInt(phoneStr)=== NaN){
    }
    else {return true;} // i.e phone number is valid
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    event.preventDefault()
    var self= this;
    if(this.validateMessageField(this.messageInputField.val()) &&
      this.validatePhoneField(this.phoneInputField.val())){
          $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
       success: function(x) {
         self.displayMessage(self.phoneInputField.val(),self.messageInputField.val())
       },
       method: 'POST',
       data: {
         From: this.fromNumber,
         To: '9175433323',
         Body: this.messageInputField.val()
       },
       headers: {
         "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
       }
     });
    }
    }
  ,
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
