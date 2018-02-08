"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACfe212ec164385468f35e1b4ef535c678";
  this.authToken = "bbd40380167b64d1de4a762a18728cfa";
  this.fromNumber = "+17744625669";

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
      this.messageSendButton.on('click',function(event){
      this.handleMessageSend(event)
      return false
    }.bind(this))
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if ($.trim(textStr) !== ""){
      return true
    }
    return false
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    var digits = $.trim(phoneStr)
    if (phoneStr.length!==11) {
      return false
    }
    for (var i = 0;i<digits.length;i++){
      if (typeof(digits[i]) === "number"){
        return false
      }
    }
    return true
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    var mes = this.messageInputField.val()
    var pho = this.phoneInputField.val()
    if (this.validateMessageField(mes) && this.validatePhoneField(pho)){
      this.sendMessage()
      this.displayMessage(pho,mes)
    }
  },

  displayMessage: function(sender, message) {
    var listElem = $('<li></li>').addClass('message');
    var senderElem = $('<span></span>').addClass('sender').text(sender);
    var bodyElem = $('<p></p>').text(message);
    listElem.append(senderElem);
    listElem.append(bodyElem);
    this.messageList.append(listElem);
  },

  sendMessage: function() {
  $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
    success: function(x) {
      $('h1').text("Congrats! You're set up!");
      console.log('Message sent', x);
    },
    error: function(){
      console.log()
      alert(ERROR)
    },
    method: 'POST',
    data: {
      From: this.fromNumber ,
      To: this.phoneInputField.val(),
      Body: 'Congratulations your Twillio account is working!'
    },
    headers: {
      "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
    }
  }
);
}
};

window.twilio = new TwilioApp();
