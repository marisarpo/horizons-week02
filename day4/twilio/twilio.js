"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'AC8ad708d3f2d10280f485fe3f6ef2d7f1';
  this.authToken = '73186cd32473c0bb0385673e2195f147';
  this.fromNumber = '+17472325259';

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
    var self = this;
    this.messageSendButton.on('click', this.handleMessageSend.bind(self))
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    var string = $.trim(textStr)
    if(string === ""){
      return false
    } else if (string === " "){
      return false
    }
    return true

  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    var number = parseInt(phoneStr)
    if(number.toString().length !== 11){
      return false;
    }


    if(isNaN(number) === true){
      return false
    }

    return true

  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    var message = this.messageInputField.val()
    var phone = this.phoneInputField.val()
    if(this.validateMessageField(message) && this.validatePhoneField(phone)){
      $.ajax(
        'https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
          success: function(x) {

            this.displayMessage(phone, message)
          }.bind(this),
          method: 'POST',
          data: {
            From: this.fromNumber,
            To: phone,
            Body: message
          },
          headers: {
            "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
          },
          error: function(e){
            $(document).alert("Error" )
          }
        });
      }
      return false
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
