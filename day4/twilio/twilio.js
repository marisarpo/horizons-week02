"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'AC0846d1c707e117d60e4497485d117461';
  this.authToken = '6099e4553f44e33c0abe3649d4016c6b';
  this.fromNumber = +8565796892;

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
    var txt= textStr.trim()
    if(txt.length===0){
      return false;
    }else{
      return true;
    }
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    var arr = phoneStr.split("");
    var valid = (arr.length === 10);

    for (var i = 0; i < arr.length; i++) {
      if(isNaN(parseInt(arr[i], 10))){
        valid = false;
      }
    }
    return valid;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {

    event.preventDefault();
    //this.displayMessage('9999999999', 'Testing testing!');
    var message=this.messageInputField.val();
    var number= this.phoneInputField.val();


    var self=this;
    if(this.validatePhoneField(number) && this.validateMessageField(message)){


      var account=this.accountId;
      var token= this.authToken
      var fromNumber= this.fromNumber
      var toNumber= number;

      function send() {
        $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + account + '/SMS/Messages', {
          success: function(response) {


            self.displayMessage(fromNumber,message);
            self.messageInputField.val("");

          },
          method: 'POST',
          data: {
            From: fromNumber,
            To: toNumber,
            Body: message,
          },
          headers: {
            "Authorization": "Basic " + btoa(account + ":" + token)
          },
          error:function(err){
            alert('Error!')
          }

        });
      }

      send();

    }else{
      alert('Errror in phone number or message entry')
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
