"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACa6b8c49e684f21d5a501586ecc9b7c69";
  this.authToken = "4f1dc4339d41e457edbff4c928d46525";
  this.fromNumber = "19073122368";

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
    var currentObj = this;

    // this.messageSendButton.on('click', function(event){
    //   event.preventDefault();
    //   console.log("DFSD");
    //   currentObj.handleMessageSend(event);
    // })
    this.messageSendButton.on('click', this.handleMessageSend.bind(this))
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if(textStr.length === 0){
      return false
    }
    if ($.trim(textStr).length === 0){
      return false;
    }
    return true;

  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    if(phoneStr.length !== 10){
      return false
    }
    for(var i = 0; i < phoneStr.length; i++){
      if(isNaN(parseInt(phoneStr[i]))){
        return false
      }
    }
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    event.preventDefault();
    console.log(this.validateMessageField(this.messageInputField.val()), this.validatePhoneField(this.phoneInputField.val()));
    if(this.validateMessageField(this.messageInputField.val()) && this.validatePhoneField(this.phoneInputField.val())) {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(resp) {
          console.log("SENT");
          //console.log(x.'From');
          console.log(resp);
          //console.log(this.x.From);
          this.displayMessage(this.fromNumber,this.messageInputField.val());
          this.messageInputField.val("");
        }.bind(this),
        error: function(y) {
          console.log('fail');
          alert("Error:",y);
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: this.phoneInputField.val(),
          Body: this.messageInputField.val()
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        }
      });
    };
    //this.displayMessage('9999999999', 'Testing testing!');
  },
  displayMessage: function(sender, message) {
    var listElem = $('<li></li>').addClass('message');
    var senderElem = $('<span></span>').addClass('sender').text(sender);
    var bodyElem = $('<p></p>').text(message);
    listElem.append(senderElem);
    listElem.append(bodyElem);
    this.messageList.append(listElem);
  }

  //   The handleMessageSend method is called when the user clicks the Send button. Follow these steps to send an SMS via the Twilio API:
  //
  // Get the contents of the messageInputField and phoneInputField
  //
  // Validate the message using this.validateMessageField() and the phone number using this.validatePhoneField().
  //
  // If both fields are valid, make an AJAX request to Twilio to send a message.
  //
  // Use the AJAX request from the previous exercise and update the from/to phone numbers, account id, token, and the message body.
  //
  // If the AJAX request succeeds, use this.displayMessage() display the sent message to the user and clear the contents of messageInputField.
  // If the AJAX request fails, notify the user using the browser built-in alert() function.
  // Note: In Twilio trial you can only send messages to your own phone number.
};

window.twilio = new TwilioApp();
