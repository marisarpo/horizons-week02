"use strict";
/* eslint-env jquery */


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
  this.accountId = "AC2d61545ba383c8f9ba0cac6193cec937";
  this.authToken = "1e8696bbfc31d0f84d31f2cefc2061ff";
  this.fromNumber = "+14152756333";

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
    //console.log("this in initalize", this);
    this.messageSendButton.on('click', this.handleMessageSend.bind(this));
  },
  // Exercise 2. `clearField(jqField<JQuery Element>)` method
  // Write a function that takes a JQuery input fields and clears the text inside it. It should not return anything.
  //
	// hint. use $.trim(), see https://api.jquery.com/jQuery.trim/
  // hint. what does it mean to `clear` a field? Set it to an empty string.
  // hint. user .val() to get (and set) the value of an input object!
  clearField: function(jqField) {
    // YOUR CODE HERE
    jqField.val("");
  },

  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if($.trim(textStr)===""){
      return false;
    }
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if(phoneStr.length!==10){
      return false;
    }

    if($.trim(phoneStr)===""){
      return false;
    }

    for(var i=0; i<phoneStr.length; i++){
      if(isNaN(parseInt(phoneStr[i]))){
        return false;
      }
    }
    return true;

  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    event.preventDefault();

    var phone = $('.phone-input-field').val();
    var message = $('.message-input-field').val();

    // console.log(phone);
    // console.log(message);
    var self = this;
    if( this.validatePhoneField(phone) && this.validateMessageField(message) ){
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
          success: function(x) {
            self.clearField($('.message-input-field'));
            self.displayMessage(phone, message);
          },
          method: 'POST',
          data: {
            From: this.fromNumber,
            To: phone, //my phone number
            Body: message //my message
          },
          headers: {
            "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
          }
        });
    }
    else{
      throw "Invalid fields";
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
