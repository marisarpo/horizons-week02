"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC78adcdf1d728a9e862c1b4bcc5693572";
  this.authToken = "d57dbc877fe86e97d3275d380c557078";
  this.fromNumber = "+13213926926";

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  // Set up the event handlers
  this.initialize();

}




TwilioApp.prototype = {
  // Part 1. `initialize()` method
  initialize: function() {
    this.messageSendButton.on('click', this.handleMessageSend.bind(this))

  },

  clear: function($this) {
    //moves up to parent and then searches for any 'input' children/grandchildren
    $this.parent().find('input').val('');

  },

  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    var str = "";
    var textStr = "hello"
    for (var i = 0; i < textStr.length; i++) {
      if(textStr[i] !== " "){
        str += textStr[i]
      }
    }
    return str.length > 0;

  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    var acceptableNums = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']

    if(phoneStr.length !== 10) {
      return false;
    }

    for (var i = 0; i < phoneStr.length; i++) {
      if(acceptableNums.indexOf(phoneStr[i]) === -1) {
        return false;
      }
    }

    return true;

  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();
    var message = this.messageInputField.val();
    var number = this.phoneInputField.val();
    if(this.validatePhoneField(number) && this.validateMessageField(message)) {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(){
            this.displayMessage(number, message);
            this.messageInputField.val('')
        }.bind(this),
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: number,
          Body: message
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        }
      });
    }
    else {
      console.log('yo');
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
$('.message-clear-button').on('click', function() {
  var $this = $(this);
  twilio.clear($this);
  event.preventDefault();
});
