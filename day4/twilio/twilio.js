"use strict";
/* eslint-env jquery */
// var account ="AC0c2eb1fade921040dc524f66e9c091ba"; // YOUR CODE HERE
// var token='c3eee8c1915aa3c410da7fff08b8cbf1'; // YOUR CODE HERE
// var fromNumber =+14142929185 ; // YOUR CODE HERE
// var toNumber =+14145301736; // YOUR CODE HERE
function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC0c2eb1fade921040dc524f66e9c091ba";
  this.authToken = "c3eee8c1915aa3c410da7fff08b8cbf1";
  this.fromNumber = "14142929185";

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
    this.messageSendButton.on('click', this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    if($.trim(textStr) === ''){
      return false;
    }
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    var splitStr = phoneStr.split('');

    splitStr.forEach(function(elem){
      if(typeof elem !== 'number'){
        return false;
      }
    });

    if(splitStr.length !== 11){
      return false;
    }else{
    return true;
    }

  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    var self =this;
    event.preventDefault();
    var mift =this.messageInputField.val();
    var pift =this.phoneInputField.val();
    if(this.validateMessageField(mift) &&
    this.validatePhoneField(pift)){
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(x) {
          console.log('Message sent', x);
          self.displayMessage(pift,mift);
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: pift,
          Body: mift
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        },
        error: function(){
          alert("Your request failed.");
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
