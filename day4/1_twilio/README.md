# Pair Programming Exercise: Twillio ShoutOut

## Introduction

In this exercise, you're going to be building a Twilio Shoutout Application that
communicates with Twilio's API (Application Programming Inerface) over AJAX.

In this case, we're going to be using Twilio's device SMS messaging service.
We're going to build an application that lets you `shoutout` (one-way message) a
Twilio-enabled phone number programmatically. You'll be able to send yourself a
text message from your browser (and much more)!

You've been provided with a UI skeleton that you can dig into if you'd like, but
the major focus of this exercise are the AJAX calls and validation.

Open the files `week02/day4/1_twilio/twilio.js` and
`week02/day4/1_twilio/twilio.html`.

## Exercise 0. Get Twilio credentials

Please navigate to https:www.twilio.com, and get a free API Key.

You're going to be signing up for the service yourself, and it won't be
asking you to pay for anything. Enter your name, phone number, and whatever
else they ask you for (within reason - if they're asking for an ssn, call
one of us over)

You'll need 3 pieces of information to be able to interact with the Twilio
API - your `accountId (or SID)`, an `auth token` and your Twilio phone
number.

When you have all this information, update `twilio.js`:

```javascript
twilio.accountId = "YOUR ACCOUNT ID HERE";
twilio.authToken = "YOUR AUTH TOKEN HERE";
twilio.fromNumber = "YOUR TWILIO NUMBER HERE";
```

## Exercise 1. Implement the `initialize` method

When the TwilioShoutout class is constructed, it calls its `initialize()` method.
That method should set up event listener(s) that will allow you to capture and
send data from your web UI. More information is provided at the method.

## Exercise 2. Implement the `clear` method

There are going to be two input fields in the application you're building, and
it would be nice to have some function to clear their values.

## Exercise 3. Implement the `validateMessageField` method

TwilioShoutout has a `validateMessageField` method that needs to be implemented.
The function takes a string and returns true or false based on whether the
string is a valid message or not. More information is provided at the method.

## Exercise 4. Implement the `validatePhoneField` method

TwilioShoutout has a `validatePhoneField` method that needs to be implemented.
The function takes a string and returns true or false based on whether the
string is a valid phone number or not. Validating phone numbers can be extremely
hard, so we're going to be using the simple no-parentheses, non-hyphenated phone
number format, including international code. I.E. +1 (201) - 705 - 1234 becomes
12017051234. More information is provided at the method.

## Exercise 5. Implement the `handleMessageSend` method

The `handleMessageSend` method is going to act as the callback for the event
listener you set up in the initialize() method. It's supposed to make sure all
the necessary fields are valid, and if so, make an ajax call to a Twilio API url
with our data. Otherwise, it should raise an alert, telling the user (you) that
one or both of the input fields are invalid. This is a multipart exercise that
requires a few key steps, and we've provided you with a bit of what you need to
get you going.
