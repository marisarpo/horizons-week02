"use strict";
/* eslint-env jquery */

  function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'AC2cc89cebb87c59534df339f0b6607b86';
  this.authToken = 'ceef9f7b2f82e97152b30cfc220591cc';
  this.fromNumber = '12108803188';

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
    $(this.messageSendButton).on('click', function(event){
      event.preventDefault();
      this.handleMessageSend(event);
    }.bind(this))
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    if (textStr.val()===''||textStr.val().trim()==='')
      return false;
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    if(phoneStr.val().length!==11 || !/^\d+$/.test(phoneStr.val()))
      return false;
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {

    var message=this.messageInputField;
    var number=this.phoneInputField;

    if(this.validatePhoneField(number) && this.validateMessageField(message)){
      console.log('Sent');
      $.ajax({
        url:'https://api.twilio.com/2010-04-01/Accounts/' +this.accountId+'/SMS/Messages',
        method:'POST',
        data:{
          From: '+'+this.fromNumber,
          To: number.val(),
          Body: message.val()
        },
        success: function(x) {
          this.displayMessage(this.fromNumber,message.val())
      }.bind(this),
      eror: function(x){
        alert('Problem with AJAX');
      },
      headers: {
      "Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
    }
  })
}
else{
  alert('Invalid phone number or mesage');
}
event.preventDefault();
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
