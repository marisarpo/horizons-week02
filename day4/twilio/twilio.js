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
  this.accountId = "ACc9ed3f4a39058fba29da0aa79efb218d";
  this.authToken = "c9adfaaf42771a3752617a051f3b1252";
  this.fromNumber = "+12408234513";




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
    this.messageSendButton.on('click', this.handleMessageSend.bind(this));


  },

  // Exercise 2. `clearField(jqField<JQuery Element>)` method
  // Write a function that takes a JQuery input fields and clears the text inside it. It should not return anything.
  //
	// hint. use $.trim(), see https://api.jquery.com/jQuery.trim/
  // hint. what does it mean to `clear` a field? Set it to an empty string.
  // hint. user .val() to get (and set) the value of an input object!
  clearField: function(jqField) {
    jqField.val("");
    // YOUR CODE HERE
  },
  // Exercise 3. `validateMessageField(textStr<String>)` method
  // Write a function that validates the message input field. It should return true if the `validateMessageField` passes these conditions:
  // (1) The field should not be a blank string ("")
  // (2) The field should not be an 'empty' string ("           ")
  //
	// hint. $.trim() is useful

  // Part 2. `validateMessageField(textStr<String>)` method

  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if ($.trim(textStr).length === 0 ){
      return false;
    }
    else{
      return true;
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    var okChars = [1,2,3,4,5,6,7,8,9,0]
    for (var i = 0; i < phoneStr.length; i++){
      if (phoneStr[i].indexof(okChars) === -1){
          return false;
      }
    }
      if(!phoneStr.length === 10){
        return false
      }
      return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    evt.preventDefault();
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    var phone = this.phoneInputField.val();
    var msg = this.messageInputField.val();

    if(this.validateMessageField(msg) && this.validatePhoneField(phone)){

      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(resp) {
          //$('h1').text("Congrats! You're set up!");
          //console.log(self);
          self.displayMessage(msg);
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: phone,
          Body: msg
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        },
        error: function(err){
          alert("failure!!!");
        }
      });

    }

  
  }
};

window.twilio = new TwilioApp();
