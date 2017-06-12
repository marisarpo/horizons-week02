"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC75c050a401caf9877ed8f593e5384813";
  this.authToken = "4be667cc4cf821cb8f2eb2bac62fff21";
  this.fromNumber = "+14159367219";

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
    this.messageSendButton.on('click',function(event){
      event.preventDefault();
      this.handleMessageSend(event);
    }.bind(this))
    // console.log(this);
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    return textStr.split('').join('') !== '';
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    var arr = phoneStr.split('');
    if(arr.length!==11){return false}
    var temp = ['0','1','2','3','4','5','6','7','8','9']
    arr.forEach(function(item){
      if (temp.indexOf(item) === -1){return false}
    })
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  // handleMessageSend: function(event) {
  //   // YOUR CODE HERE
  //   // REMOVE THE NEXT LINE, IT'S FOR TEST
  //   var app = this;
  //   console.log(this);
  //   var minput = this.messageInputField.val()
  //   var phinput = this.phoneInputField.val()
  //   if(this.validatePhoneField(phinput)&&this.validateMessageField(minput)){
  //     $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
  //       success: function(x) {
  //         $('h1').text("Congrats! You're set up!");
  //         // console.log('Message sent', x);
  //         app.displayMessage(app.fromNumber,minput);
  //         $('message-input-field').val('');
  //       },
  //       method: 'POST',
  //       data: {
  //         From: this.fromNumber,
  //         To: phinput,
  //         Body: minput
  //       },
  //       headers: {
  //         "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
  //       },
  //       error:function(err){
  //         alert("NONONONO!");
  //         // console.log("Error!! NOOOO! --- ",err);
  //       }
  //     });
  //   }
  // },
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    // this.displayMessage('9999999999', 'Testing testing!');
    var execute = function(event){
    var messageContent = this.messageInputField.val();
    var phoneNum = this.phoneInputField.val();

    console.log(this);
    if(this.validatePhoneField(phoneNum)&&this.validateMessageField(messageContent)){
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
         success: function(x) {
           $('h1').text("Congrats! You're set up!");
           console.log('Message sent', x);
           this.displayMessage(this.fromNumber,messageContent)
         },
         error:function(fail){
           alert("failuer!"+fail);
         },
         method: 'POST',
         data: {
           From: this.fromNumber,
           To: phoneNum,
           Body: messageContent
         },
         headers: {
           "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
         }
       });
    }
  }.bind(this);
  execute(event);
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
