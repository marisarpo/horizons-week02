"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "ACa728a0d2ec4b7b8af7029cc68d87ff41";
  this.authToken = "4dd4244d864147e349755746a5655177";
  this.fromNumber = "+14243756884";

  // Reference JQuery objects
  this.messageList = $(".message-list");
  this.messageInputField = $(".message-input-field");
  this.phoneInputField = $(".phone-input-field");
  this.messageSendButton = $(".message-input-button");

  // Set up the event handlers
  this.initialize();
  $('this.messageSendButton').on('click',function(){
    handleMessageSend.bind(this);
  })
  console.log("TwilioApp is ready.");
}

TwilioApp.prototype = {
  // Part 1. `initialize()` method
  initialize: function() {
    //  var $this=this;
      var fn=this.handleMessageSend.bind(this);
      this.messageSendButton.on('click', fn)
      console.log("TwilioApp is ready.");
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    var res=textStr.trim();
    if(res.length<=0)return false;
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    if(phoneStr.length>10)return false;
    for(var i=0;i<phoneStr.length;i++){
      if(phoneStr[i]<'0' && phoneStr[i]>'9')
        return false;
    }
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    event.preventDefault();
    //this.displayMessage('9999999999', 'Testing testing!');
    var msg=this.messageInputField.val();
    //console.log(msg);
    var num=this.phoneInputField.val();
    //console.log(num);
    if(this.validateMessageField(msg) && this.validatePhoneField(num)){
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(x) {
          //console.log(x);
          displayMessage(this.fromNumber,msg);
          this.messageInputField.val('');
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: num,
          Body: msg
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
        },
        error: function(data){
          console.log(data);
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
