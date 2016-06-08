# Horello continued: APIs and AJAX

Remember the first time you left home? Like, ventured out into the real,
big, scary world to meet other people and find yourself and figure out
where you fit in? Hopefully you didn't get punched in the face or fall
off a cliff or something. (I did ¯\\_(ツ)_/¯)

Today is a big day. You're a grown up, but your app isn't. Up to now,
your app has been sitting pretty on a comfy sofa in the living room,
drinking Coke and watching football. Pretty much. But Today your app is
about to walk out the front door.

After this morning's lesson, you now have the tools--namely, JSON, AJAX,
and APIs--that you need to connect your app to the big bad world. Today,
your app is going to do something _persistent._ It's going to touch data
in the real world. Exciting, right? (And you're going to have to find a
way to deal with empty nest syndrome.)

## Phase 1. Add JSON support to data model

- We are no longer responsible for generating IDs!
- from, toJSON methods
- static methods (fromJSON)

## Phase 2: Authentication

### Note: Web server

This may not work in Chrome without a web server. Use Safari, or a web
server.

- OS X/Linux: `python -m SimpleHTTPServer 8000`
- Windows:

The "real world" that we're going to be venturing into today is the
cloud, i.e., someone else's data server out there somewhere in the
Internet. Before we can do anything in the cloud, or on someone else's
server, and before we can use someone else's API, we first need to
authenticate ourselves. Authentication is like sticking a "Hello, my
name is..." badge on our chest before we ask for data. The other guy is
going to want to know who you are. (Why? Permissions, throttling, etc.)

Step one today is to establish your credentials with Trello--since we're
going to be working with the Trello API.

Head over to http://www.trello.com and log in to your Trello account. If
you don't yet have a Trello account, create one first by clicking "Get
Started" (that beautiful button that you spent so long styling on
Monday...).

Once you've logged into your Trello account:
1. Navigate to the [Trello
   Developers page](https://developers.trello.com/get-started/start-building).
1. Click the `Get your Application Key` button in the first section of
   the page.
1. Copy the key and paste it into `config.js`.
1. Generate a token manually by clicking on the `Token` link on that page.
1. Click "Allow" on the authentication screen.
1. Copy the token string into `config.js` as well.

That was pretty easy, right? These two numbers--the key and the
token--are how our application (Horello) authenticates to the Trello
backend. It's how Trello knows which boards, lists, and cards we have
access to, and it's how Trello knows whose pretty face to attach to our
comments.

Okay, time to start writing some code. Go ahead and open up `index.html`
in your web browser and text editor. There are two more steps required
to get authentication working in Horello. The first is to add the Trello
client JS code--find the link on
https://developers.trello.com/get-started/start-building and add this in
the `head` of `index.html`. Make sure to copy your API key, again, as
part of the `<script>` tag that loads the Trello JS client code.

Finally, we need to use the Trello client to authenticate the user. Add
this JS code:

    Trello.authorize({
      type: 'popup',
      name: 'Horello',
      scope: {
        read: true,
        write: true
      },
      expiration: 'never',
      success: authenticationSuccess,
      error: authenticationFailure
    });

Reload, try to auth. Make sure to allow popups in browser. Note that
this will only appear the first time.

## Phase 3: Test the API

With authentication in place, we can begin having some fun with data.
Before we try to hook up our frontend to the Trello backend, let's test
the API to make sure a.) that it's working and b.) that we know what the
heck is going on.


Sandbox
https://developers.trello.com/sandbox
- Get Boards
- Get Lists
- Create Card

Get boards, get board ID, get lists for that board, get list ID, create
card on that list, then see it appear on the Trello screen.

API docs.

See JSON data for a card in the browser e.g. https://trello.com/1/cards/57433c1cb4895dcb69bbf59f

Curl command to test full API. Another option is Postman REST client.

## Phase 4: Download the board

Add download methods

Read data

Async, error handling



## Phase 5: Write data

- Card
- List

We've successfully authenticated, and we've tested the API to make sure
that it's working, and to make sure that we understand how it works. The
last and most important step is to connect our frontend to it! This is
the moment you've all been waiting for.

## BONUS: Phase 6: Improve it

- Don't render() so much
- Support multiple boards
- Promises

