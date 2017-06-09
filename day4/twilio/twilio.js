"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC6430c524a718a412db8021e1cbe135fd";
  this.authToken = "71c8e8bed39bd62fa2dad7afa903caf1";
  this.fromNumber = "+13254003864";

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
    return !!$.trim(textStr)
  },


  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    if(phoneStr.length !== 11) {
      return false
    }
    for(var i = 0; i<11; i++) {
      var el = parseInt(phoneStr.substring(i,i+1))
      if(!$.isNumeric(el)) {
        return false
      }
    }
    return true
  },


  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    var message = this.messageInputField.val();
    var phone = this.phoneInputField.val();
    if(this.validatePhoneField(phone) && this.validateMessageField(message)) {
      var that = this
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + that.accountId + '/SMS/Messages', {
        success: function(dat) {
          var incomingMessage = $(dat).find("Body").text().substring(37)
          var incomingSender = $(dat).find("From").text().substring(1)
          that.displayMessage(incomingSender, incomingMessage);
          that.messageInputField.val("")
        },
        error: function(err){
          alert(error)
        },
        method: "post",
        data: {
          From: that.fromNumber,
          To: phone,
          Body: message
        },
        headers: {
          "Authorization": "Basic " + btoa(that.accountId + ":" + that.authToken)
        }




      })
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
