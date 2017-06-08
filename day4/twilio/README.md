# Pair Programming Exercise: Twilio Messenger

## Introduction

In this exercise, we're going to build an app that can send text messages using
Twilio's API (Application Programming Inerface). The application will send
messages to our Twilio-enabled phone number programmatically.

You've been provided with a static HTML interface. Your task is to write
JavaScript to turn this into a dynamic application.

To get started open `week02/day4/twilio/twilio.js` in your editor and
`week02/day4/twilio/twilio.html` in your browser.

## Part 0. Get Twilio credentials

Add your Twilio credentials from the previous exercise to `twilio.js`:

```javascript
this.accountId = "YOUR ACCOUNT ID HERE";
this.authToken = "YOUR AUTH TOKEN HERE";
this.fromNumber = "YOUR TWILIO NUMBER HERE";
```

## Part 1. Implement the `initialize` method

Update `this.initialize` and add a click handler to the
`this.messageSendButton` element that calls `this.handleMessageSend`.
`this.initialize` is called when the app is started inside the `TwilioApp`
constructor.

<details><summary>
Hint
</summary><p>

Remember that `this` doesn't work inside callbacks (like event handlers)
use `.bind()` or create a variable inside the closure.

</p></details>

## Part 2. Implement the `validateMessageField` method

Write a function that validates the message input field. It should return true
if the given string passes these conditions:

1. The string should not be a empty string i.e. `""`
1. The string should not be an 'blank' string  containing only spaces
i.e. `"           "`

<details><summary >
Hint
</summary><p>

`$.trim()` might be useful

</p></details>

## Part 3. Implement the `validatePhoneField` method

Write a function that validates the phone input field. It should return true
if the given string passes these conditions:

1. The string contains only numbers

    **Good:** 123
    **Bad:** 1-2

1. The string contains exactly 10 digits

    **Good:** 14155005000
    **Bad:** 4155005000

## Part 4. Implement the `handleMessageSend` method

The `handleMessageSend` method is called when the user clicks the `Send` button.
Follow these steps to send an SMS via the Twilio API:

1. Prevent the default behavior for the click `event`.
1. Get the contents of the `messageInputField` and `phoneInputField`
1. Validate the message using `this.validateMessageField()` and the phone number using
`this.validatePhoneField()`.
1. If both fields are valid, make an AJAX request to Twilio to send a message.

    Use the AJAX request from
    [the previous exercise](https://codepen.io/moose-horizons/pen/aZdvWa?editors=1010)
    and update the from/to phone numbers, account id, token, and the message
    body.

    1. If the AJAX request succeeds, use `this.displayMessage()` display the
    sent message to the user and clear the contents of `messageInputField`.
    1. If the AJAX request fails, notify the user using the browser built-in
    [`alert()`](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert)
    function.

#### End goal:

![](https://cl.ly/3J230H00320X/Screen%20Recording%202017-06-07%20at%2011.11%20PM.gif)
