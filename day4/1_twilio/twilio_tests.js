"use strict";

describe("<TwilioMessenger> Class", function() {
  var app;
  var field;
  beforeAll(function() {
    field = $("<div></div>").val("Goodbye");
    app = new twilio.TwilioShoutout(twilio.accountId, twilio.authToken, twilio.fromNumber);
  });
  
  describe("you should have gotten your account credentials", function() {
    it("should have your valid accountId", function() {
      expect(twilio.accountId).not.toBe("YOUR ACCOUNT SID HERE");
    });
    
    it("should have your valid authToken", function() {
      expect(twilio.authToken).not.toBe("YOUR AUTHENTICATION TOKEN HERE");
    });
    
    it("should have your valid twilio phone number", function() {
      expect(twilio.fromNumber).not.toBe("YOUR TWILIO NUMBER HERE");
    });
  });
  
  describe("the `initialize()` method", function() {
    it("should set up an event handler for the button", function() {
      spyOn(app.messageSendButton, 'on');
      app.initialize();
      expect(app.messageSendButton.on).toHaveBeenCalled();
    });
  });
  
  describe("the `clearField(jqField<JQuery Element>)` method", function() {
    it("should clear a field given a JQuery Object", function() {
      expect(field.val()).toBe("Goodbye");
      app.clearField(field);
      expect(field.val()).toBe("");
    });
  });
  
  describe("the `validateMessageField(textStr<String>)` method", function() {
    it("should check to see if string is empty", function() {
      expect(app.validateMessageField("")).toBe(false);
    });
    
    it("should check to see if string is blank", function() {
      expect(app.validateMessageField("            ")).toBe(false);
    });
  });
  
  describe("the `validatePhoneField(phoneStr<String>)` method", function() {
    it("should check to see if string is empty", function() {
      expect(app.validatePhoneField("")).toBe(false);
    });
    
    it("should check to see if string is blank", function() {
      expect(app.validatePhoneField("            ")).toBe(false);
    });
    
    it("should check to see if string has non-numeric characters", function() {
      expect(app.validatePhoneField("12344567a9")).toBe(false);
      expect(app.validatePhoneField("12E44567a9")).toBe(false);
      expect(app.validatePhoneField("12E44$67a9")).toBe(false);
      expect(app.validatePhoneField("1234556789")).toBe(true);
    });
  });
  
  describe("the `handleMessageSend(evt<Event>)` method", function() {
    beforeAll(function() {
      app.messageInputField.val("message from Jasmine tes");
      app.phoneInputField.val(app.fromNumber);
    });
    
    it("should send the message if the fields are valid", function() {
      spyOn(app, 'sendMessage');
      app.messageSendButton.click();
      expect(app.sendMessage).toHaveBeenCalled();
    });
  });
  
  describe("the `sendMessage(toNumber<String>, messageBody<String>)` method", function() {
    beforeAll(function() {
      app.messageInputField.val("sup sup this is a message from Jasmine test");
      app.phoneInputField.val(app.fromNumber);
    });
    
    it("should send a valid API call to the Twilio server", function() {
      spyOn(app, 'sendMessage');
      app.messageSendButton.click();
      expect(app.sendMessage).toHaveBeenCalled();
    });
    
    it("should insert a new Message object into the DOM upon completion", function() {
      spyOn(app, 'sendMessage');
      app.phoneInputField.val(app.fromNumber);
      app.messageInputField.val("What a time to be alive");
      app.messageSendButton.click();
      expect(app.sendMessage).toHaveBeenCalled();
    });
  });
});
