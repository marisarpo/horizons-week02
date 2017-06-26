"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC9302ebdce9f1c3487cbd6967df869d51";
  this.authToken = "5ec2879ae5841507871cf02e50f66c51";
  this.fromNumber = "+17576459308";

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
    this.messageSendButton.on('click', this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    var trimedText = $.trim(textStr);
    if (trimedText.length !== 0){
      return true;
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    var phoneNum = parseInt(phoneStr);
    if(phoneNum !== 1 && phoneStr.length === 11){
      console.log(phoneStr.length);
      return true;
    }
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    event.preventDefault();

    //get input val
    var message = this.messageInputField.val();
    var sender = this.phoneInputField.val();

    //validate message and phone number
    if (this.validateMessageField(message) === true &&
        this.validatePhoneField(sender) === true){
      var account = this.accountId;
      var token = this.authToken;
      var fromNumber = this.fromNumber
      var toNumber = sender;


        //use AJAX request
        $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + account + '/SMS/Messages', {
          success: function(x) {
            this.displayMessage(sender, message);
            this.messageInputField.empty();

            $('h1').text("Congrats! You're set up!");
            console.log('Message sent', x);
          }.bind(this),

          method: 'POST',
          data: {
            From: fromNumber,
            To: toNumber,
            Body: 'Congratulations your Twillio account is working!'
          },
          headers: {
            "Authorization": "Basic " + btoa(account + ":" + token)
          },

          error: function(err){
            alert('Error!');
          }
        });

    }
    else{
      alert("Invalid number or message!")
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
