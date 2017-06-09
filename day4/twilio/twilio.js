"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC7d8dc8198493eff87238cfbb760c8e58";
  this.authToken = "a6ff09099f38b535dd3714de602004df";
  this.fromNumber = "+19093262049";

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  // Set up the event handlers
  this.initialize();
    // this.messageSendButton.on('click',function(){
    // this.handleMessageSend(event);
// };


  console.log("TwilioApp is ready.");
}

TwilioApp.prototype = {
  // Part 1. `initialize()` method
  initialize: function() {
    var self = this;
    this.messageSendButton.click(this.handleMessageSend.bind(self));
    // this.messageSendButton.on('click',this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    if (textStr.trim().length>=1 ){
      return true;
    }
    return false;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    for (var i = 0; i < phoneStr.length; i++) {
      if (!Number.isInteger(parseInt(phoneStr[i]))){
        return false;
      }
    }
    if (phoneStr.length!==10){
      return false;
    }

    return true;

    // YOUR CODE HERE
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    event.preventDefault();
    // this.displayMessage('9999999999', 'Testing testing!');
    var message = this.messageInputField.val();
    var phone =this.phoneInputField.val();
    console.log(message,phone);
    if (this.validateMessageField(message) && this.validatePhoneField(phone)){
      var self=this;
      console.log(message);
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages',{
        success:function(data){
          self.displayMessage(phone,message);
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: '+1'+phone,
          Body: 'Congratulations your Twillio account is working!'
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        },
        error: function(data){
         alert('Error!');
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
