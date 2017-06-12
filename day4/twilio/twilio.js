"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC172b7dbf1f09f1bfffb4afb3bddc3454";
  this.authToken = "bd5a1e2d36e6f1f945e2457b9d646c8b";
  this.fromNumber = "+12156077612";

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  // Set up the event handlers
  this.initialize();
  console.log($(".message-input-field"))
  console.log("TwilioApp is ready.");
}

TwilioApp.prototype = {
  // Part 1. `initialize()` method
  initialize: function() {
    var self = this

    $(".message-input-button").on("click", function(event){
      // validateMessageField(this.messageInputField.text())
      self.handleMessageSend(event);
    })

  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    var output = textStr.trim()
    if (output.length > 0) {
      return true
    }
  },



  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    for (var i = 0; i<phoneStr.length; i++) {
      if(isNaN(parseInt(phoneStr[i]))) {
          return false
      }
    }
      if(phoneStr.length !== 10) {
        return false
      }
    return true
  },
  // Part 4. `handleMessageSend(evt<Event>)` method

handleMessageSend: function(event) {
    event.preventDefault();

var message = this.messageInputField.val()
var phone = this.phoneInputField.val()

if (this.validateMessageField(message) && this.validatePhoneField(phone)) {
  console.log(message)


  $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
    success: function() {
      alert('Message sent');
    },
    method: 'POST',
    data: {
      From: this.fromNumber,
      To: phone,
      Body: message
    },
    headers: {
      "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
    }
  });


}



  }

  // displayMessage: function(sender, message) {
  //   var listElem = $('<li></li>').addClass('message');
  //   var senderElem = $('<span></span>').addClass('sender').text(sender);
  //   var bodyElem = $('<p></p>').text(message);
  //   listElem.append(senderElem);
  //   listElem.append(bodyElem);
  //   this.messageList.append(listElem);
  // }
  }



window.twilio = new TwilioApp();
