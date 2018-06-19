"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'AC4d5815e38e075deee1622be45eb8bc66';
  this.authToken = '44f3e509aeb9876053bd65f8de1eafcf';
  this.fromNumber = '(469) 778-4153';

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
    this.messageSendButton.on('click', function(event){
        this.handleMessageSend(event);
      }.bind(this));
    },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    var trimStr = $.trim(textStr);
    if(trimStr) return true;
    return false;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    if(typeof Number(phoneStr) !== 'number' || phoneStr.length !== 11) return false;
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    console.log('first this is ',this);
    var $twilioApp = this;

    event.preventDefault();
    var messageInput = this.messageInputField.val();
    var phoneInput = this.phoneInputField.val();
    console.log(messageInput, phoneInput)

    console.log(this.validateMessageField(messageInput));
    console.log(this.validatePhoneField(phoneInput));
    if(this.validateMessageField(messageInput) && this.validatePhoneField(phoneInput)){
      console.log('entered ');
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(response) {
          console.log('Message sent', response);

          console.log('this is ', this);
          $twilioApp.displayMessage(phoneInput, messageInput);
          $twilioApp.messageInputField.val('');
        },
        error: function(err) {
          console.log('ERROR', err);
          alert('something went wrong');
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: phoneInput,
          Body: messageInput,
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        }
      });
    }


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
};

window.twilio = new TwilioApp();
