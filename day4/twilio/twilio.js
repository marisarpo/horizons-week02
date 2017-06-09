"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC96d309a88f0b356e0afb6adbb34f4cc0";
  this.authToken = "33407d76d023d0fef904387b3ca6f7ea";
  this.fromNumber = "+8326484375";

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
    return ($.trim(textStr).length !== 0);
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    return (phoneStr.length === 10 && $.isNumeric(phoneStr))
  },


  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();

    var self = this;
   
    var toPhone = this.phoneInputField.val();
    var thisMessage = this.messageInputField.val();
    this.displayMessage(toPhone, thisMessage);
    
    if (this.validatePhoneField(toPhone) && this.validateMessageField(thisMessage)) {
      console.log('banana')
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(resp) {
          self.displayMessage(toPhone, thisMessage);  
        },
        error: function(err) {
          alert("This request is not valid");
        }
      })
        
      //   error: function(err){
      //     alert("failure!!!");
      //   }
      // } 

    }
    //   console.log('banana')
    //   $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
    //     success: function(resp) {
    //       this.displayMessage(toPhone, thisMessage);  
    //     }
        
    //     error: function(err){
    //       alert("failure!!!");
    //     }
    //   } 
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
