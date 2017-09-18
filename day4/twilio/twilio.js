"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = "AC75ad90c0f75c9b048bf77a578b9e71f2";
  this.authToken = "bb829127e08e093d295799f2c932b8b2";
  this.fromNumber = "+12408470806";

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
    var self = this;
    this.messageSendButton.on("click", function(event) {
      self.handleMessageSend(event);
    });
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
      return ($.trim(textStr).length !== 0);
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE
    var modStr = $.trim(phoneStr);
		var whiteList = '1234567890';
		for (var i = 0; i <= modStr.length - 1; i++) {
			if (whiteList.indexOf(modStr[i]) === -1) { return false;
		}

    return (modStr.length !== 0);
  }
},
  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {
    // YOUR CODE HERE
    // REMOVE THE NEXT LINE, IT'S FOR TEST
    event.preventDefault();
    // this.displayMessage('99999999', "testing")
    var toPhone = this.phoneInputField.val();
    var thisMessage = this.messageInputField.val();
    var selfie = this;
    // var url = 'https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages'
    if (this.validatePhoneField(toPhone) && this.validateMessageField(thisMessage)) {
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
          success: function(x) {
            selfie.displayMessage(selfie.fromNumber, thisMessage)
          },
          method: 'POST',
          data: {
            From: selfie.fromNumber,
            To: toPhone,
            Body: thisMessage,
          },
          headers: {
            "Authorization": "Basic " + btoa(selfie.accountId + ":" + selfie.authToken)
          }
        });
      }


     else {
      throw "Invalid fields";
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
