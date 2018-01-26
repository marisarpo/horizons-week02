"use strict";
/* eslint-env jquery */

function TwilioApp() {
	// Part 0. Get Twilio credentials
	this.accountId = "AC2918fad9f2f592644766fea2cc176d83";
	this.authToken = "0ae1dcc36a330c46a4c5f8a5897b401b";
	this.fromNumber = "+19478005845";

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

		$('.message-input-button').on("click", this.handleMessageSend.bind(this));
		// YOUR CODE HERE
	},
	// Part 2. `validateMessageField(textStr<String>)` method
	validateMessageField: function(textStr) {
		return $.trim(textStr);
	},
	// Part 3. `validatePhoneField(phoneStr<String>)` method
	validatePhoneField: function(phoneStr) {
		if(isNaN(phoneStr[0])) return false;

		if(phoneStr.length !== 11) return false;

		return !isNaN(phoneStr);
	},
	// Part 4. `handleMessageSend(evt<Event>)` method
	handleMessageSend: function(event) {
		// YOUR CODE HERE
		let $this = this;
		let message = this.messageInputField.val();
		let phone = this.phoneInputField.val();

		if(this.validatePhoneField(phone) && this.validateMessageField(message)) {
			///make ajax request
			console.log('hewwo');

			$.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
				success: function (x) {
					$('h1').text("Congrats! You're set up!");
					debugger;
					console.log('within success');
					$this.displayMessage(phone, message);
				},
				error: function (x) {
					alert('failure');
				},
				method: 'POST',
				data: {
					From: this.fromNumber,
					To: phone,
					Body: message
				},
				headers: {
					"Authorization": "Basic " + btoa(this.accountId + ":" + this.authToken)
				}
			});


		}
		// REMOVE THE NEXT LINE, IT'S FOR TEST
		// debugger;
		// this.displayMessage('9999999999', 'Testing testing!');
		return false;

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
