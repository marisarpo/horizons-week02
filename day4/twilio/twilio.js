"use strict";
/* eslint-env jquery */

function TwilioApp() {
  // Part 0. Get Twilio credentials
  this.accountId = 'AC6e496226e51841cb1ac3454eec373a95';
  this.authToken = "ab337f9d98c0997b1556098a1a089a64";
  this.fromNumber = "+19197524648";

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

    this.messageSendButton.on('click', function(event){
      event.preventDefault();
      //default for button is just reloadig page so prevent
      this.handleMessageSend()
    }.bind(this))
  },
  // Part 2. `validateMessageField(textStr<String>)` method
  validateMessageField: function(textStr) {
    // YOUR CODE HERE
    if($.trim(textStr)!==""){
      return true;
    }
    return false;
  },
  // Part 3. `validatePhoneField(phoneStr<String>)` method
  validatePhoneField: function(phoneStr) {
    // YOUR CODE HERE

    if(phoneStr.length===10 &&(parseInt(phoneStr)==phoneStr)){
      return true;
    }
    return false;
  },



  //   var fal=true;



//NEED TO DO .VAL() BEACUSE OTHERWISE AJAX SCREEN WILL FREEZE BECAUSE JUST GETTING
// .VAL() ONLY WORKS WITH INPUT FIELD, OTHERWISE NEED .TEXT()

  // Part 4. `handleMessageSend(evt<Event>)` method
  handleMessageSend: function(event) {

    // REMOVE THE NEXT LINE, IT'S FOR TEST
    // this.displayMessage('9999999999', 'Testing testing!');
    // YOUR CODE HERE
    console.log(this.validatePhoneField(this.phoneInputField));
    console.log(this.validateMessageField(this.phoneInputField));

    if(this.validatePhoneField(this.phoneInputField.val())&&this.validateMessageField(this.messageInputField.val())){
      console.log("this works")
      var self=this;
      $.ajax('https://api.twilio.com/2010-04-01/Accounts/' + this.accountId + '/SMS/Messages', {
        success: function(x) {
          self.displayMessage(self.phoneInputField.val(), self.messageInputField.val());
        },
        method: 'POST',
        data: {
          From: this.fromNumber,
          To: this.phoneInputField.val(),
          Body: this.messageInputField.val()
        },
        headers: {
          "Authorization": "Basic " + btoa(this.accountId+ ":" + this.authToken)
        },

        error: function(err){
          console.log(err);
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
