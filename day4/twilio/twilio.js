"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC6ae35a649be77453df3d042d405a9ddc";
  this.authToken = "7caab0eaa6dc54b7325146121bd71e9f" ;
  this.fromNumber = "18724697722";

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  // Set up the event handlers
  this.initialize()


  console.log("TwilioApp is ready.");
}

TwilioApp.prototype = {
  // Part 1. `initialize()` method
  initialize: function() {
    // YOUR CODE HERE
    this.messageSendButton.on("click", this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    var trimmed = $.trim(textStr);
    return (trimmed.length !== 0);

  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    //var trimmed = $.trim(phoneStr);
    //return (!(isNaN(trimmed)) && trimmed.length!==0);
    var modStr = $.trim(phoneStr);
		var whiteList = '1234567890';
		for (var i = 0; i <= modStr.length - 1; i++) {
			if (whiteList.indexOf(modStr[i]) === -1) return false;
		}
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // Get the contents of the messageInputField and phoneInputField


    var act= this.accountId.val();
    var tkn = this.authToken.val();
    var frNum = this.fromNumber.val();
    var toNum = this.phoneInputField.val();
    var msg = this.messageInputField.val();
    if (this.validatePhoneField(phone) && this.validateMessageField(message)) {
      this.sendMessage(act, tkn, frNum, toNum, msg);
      this.clearField(this.messageInputField);
    }
    else{
      throw 'incorrect field';
    }
  },
  sendMessage: function(account, token, fromNumber, toNumber, message){
  $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + account + '/SMS/Messages', {
    success: function() {
      this.displayMessage(sender, message)
    },
    error: function(){
      alert('Something went wrong')
    }
    });
    method: 'POST',
    data: {
      From: fromNumber,
      To: toNumber,
      Body: message
    },
    headers: {
      "Authorization": "Basic " + btoa(account + ":" + token)
    }
  });
}
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
