"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACeb7303e4159267a09471d1520cd3577c";
  this.authToken = "5d4b82481e2c2776aa2d0e55e78b47f7";
  this.fromNumber = "+13475275962";
  this.toNumber;

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
    this.messageSendButton.on('click', function() {
      this.handleMessageSend(event);
    }.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    return ($.trim(textStr)==='') ? false: true;

  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    return (phoneStr.length === 10 && phoneStr.match(/^\d+$/)) ? true: false;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    event.preventDefault();
    if(this.validateMessageField(this.messageInputField.val()) &&
      this.validatePhoneField(this.phoneInputField.val())){

    $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
      success: function(x) {
      $('h1').text("Congrats! You're set up!");
      console.log('Message sent', x);
      },
      method: 'POST',
      data: {
        From: this.fromNumber,
        To: this.phoneInputField.val(),
        Body: this.messageInputField.val()
      },
      headers: {
        "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
      },
      error: function(error){
        alert('AJAX request fails!');
      }
    })

    this.displayMessage(this.phoneInputField.val(), this.messageInputField.val());
    this.messageInputField.val('');

  }
      // $.ajax({
      //   url: 'https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages',
      //   success: function(x) {
      //     this.displayMessage(this.phoneInputField.val(), this.messageInputField.val());
      //   },
      //   error: function(error){
      //     alert('AJAX request fails!')
      //   }
      // });
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
