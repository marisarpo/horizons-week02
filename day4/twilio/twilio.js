"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACc2cd5a8d5c52aa41ecfbaec439b38515";
  this.authToken = "6ce14725f326759b0bbc4ad6c590e068";
  this.fromNumber = "14243733263";

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
    var app = this;
    $(".message-input-button").on('click',function(event){
      event.preventDefault();
      app.handleMessageSend(event);
    })
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    return (textStr.split(" ").join("")!=="")
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    phoneStr.split("").forEach(function(item){
      if(!isNaN(item)){
        return false;
      }
    })
    if(phoneStr.split("").length !== 11){
      return false
    }
    else{
      return true;
    }
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    var app = this;
    var minput = this.messageInputField.val()
    var phinput = this.phoneInputField.val()
    if(this.validatePhoneField(phinput)&&this.validateMessageField(minput)){
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(x) {
          $('h1').text("Congrats! You're set up!");
          // console.log('Message sent', x);
          app.displayMessage(app.fromNumber,minput);
          $('message-input-field').val('');
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: phinput,
          Body: minput
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        },
        error:function(err){
          alert("NONONONO!");
          // console.log("Error!! NOOOO! --- ",err);
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
