"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.apiUrl = 'https://api.twilio.com/2010-04-01/Accounts/';
  this.accountId = "AC2f5db6fe1f2250bda1f86156504c3141";
  this.authToken = "2edbcfddd4f98c60e2321a15a4468040";
  this.fromNumber = "18577631547";

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
    this.messageSendButton.on("click", this.handleMessageSend.bind(this));
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    if (!textStr.trim().length) {
      return false;
    }
    return true;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    if (phoneStr.length !== 11 || !/\D/.test(phoneStr) === false) {
      return false;
    }
    return true;
  },
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    event.preventDefault();

    if (this.validatePhoneField(this.phoneInputField.val()) && this.validateMessageField(this.messageInputField.val())) {
      this.sendMessage(this.phoneInputField.val(), this.messageInputField.val());
      this.clearField(this.messageInputField);
    } else {
      alert("Invalid Phone Number or Text Input");
    }
  },
  displayMessage: function(sender, message) {
    var listElem = $('<li></li>').addClass('message');
    var senderElem = $('<span></span>').addClass('sender').text(sender);
    var bodyElem = $('<p></p>').text(message);
    listElem.append(senderElem);
    listElem.append(bodyElem);
    $(".message-list").append(listElem);
  },
  clearField: function(jqField) {
    jqField.val("");
  },
  sendMessage: function(toNumber, messageBody) {
    var accountId = this.accountId;
    var authToken = this.authToken;
    var messageList = this.messageList;

    var cb = function(data) {
      messageList.append(TwilioApp.prototype.displayMessage(toNumber, messageBody));
    };

    $.ajax({
      method: "POST",
      url: this.apiUrl + this.accountId + '/SMS/Messages',

      data : {
        "To" : toNumber,
        "From": this.fromNumber,
        "Body": messageBody
      },
      success: cb,
      headers: {
        'Authorization': 'Basic ' + btoa(accountId + ':' + authToken)
      },
      error: function(xhr, textStatus, error) {
        console.log(xhr);
        console.log(xhr.responseText);
      }
    });
  }
};

window.twilio = new TwilioApp();
