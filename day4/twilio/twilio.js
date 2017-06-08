"use strict";
/* eslint-env jquery */
var fromNumber = '+13213858484';
var token = 'fc6368abfd54034dcd5319b6167033d8';
var account = 'ACe275517637075b7fb777f44f7b549efc';
function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'ACe275517637075b7fb777f44f7b549efc';
  this.authToken = 'fc6368abfd54034dcd5319b6167033d8';
  this.fromNumber = '+13213858484';

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
    var obj = this;
    $('.message-input-button').on('click', function(event){
      obj.handleMessageSend(event);
    })

  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    return !($.trim(textStr) === "");
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    return (!(isNaN(phoneStr)) && (phoneStr.length === 10))
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault()
    var tempThis = this;
    var messageInput = $('.message-input-field').val();
    var phoneInput = $('.phone-input-field').val();

    if(this.validateMessageField(messageInput) && this.validatePhoneField(phoneInput)){
        $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + account + '/SMS/Messages', {
          success: function(x) {

            tempThis.displayMessage(phoneInput, messageInput)
            $('.message-input-field').val("");
          },
          error: function(error){
            alert('error');
          },
          method: 'POST',
          data: {
            From: fromNumber,
            To: phoneInput,
            Body: messageInput
          },
          headers: {
            "Authorization": "Basic " + btoa(account + ":" + token)
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
