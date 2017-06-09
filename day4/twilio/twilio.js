"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'AC44fd8c3b9845d8b5573c0f9b7203240c';
  this.authToken = '2b2776a752e694337f38ee4c2f860b33';
  this.fromNumber = '14156501409';

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
    this.messageSendButton.on('click',this.handleMessageSend.bind(this))
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    return ($.trim(textStr) !== 0);
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    var nums = [1,2,3,4,5,6,7,8,9,0];
    var phone = $.trim(phoneStr);
    if(phone.length === 10){
      for(var i=0; i < phone.length; i++){
        if(nums.indexOf(parseInt(phone[i])) === -1){
          return false;
        }
      }
      return true;
    }
    else{
      return false;
    }

  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    event.preventDefault();
    var number = this.phoneInputField.val();
    var message = this.messageInputField.val();
    var account = this.accountId;
    if (this.validatePhoneField(number) && this.validateMessageField(message)){
      console.log('x')
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + account + '/SMS/Messages', {
        success: function() {
          this.displayMessage(this.fromNumber, message);
        }.bind(this),
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: number,
          Body: message,
        },
        headers: {
          "Authorization": "Basic " + btoa(account + ":" + this.authToken )
        },
        error: function(){
          alert('err');
        }
      });
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
