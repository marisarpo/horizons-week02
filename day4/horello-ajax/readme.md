# Horello continued: APIs and AJAX

Remember the first time you left home? Like, ventured out into the real,
big, scary world to meet other people and find yourself and figure out
where you fit in? Hopefully you didn't get punched in the face or fall
off a cliff or something. (I did ¯\\_(ツ)_/¯)

Today is a big day. You're a grown up (more or less), but your app
isn't. Up to now, your app has been sitting pretty on a comfy sofa in
the living room, drinking Coke and watching football. Pretty much. But
Today your app is about to walk out the front door.

After this morning's lesson, you now have the tools--namely, JSON, AJAX,
and APIs--that you need to connect your app to the big bad world. Today,
your app is going to do something _persistent._ It's going to touch data
in the real world. Exciting, right? (And you're going to have to find a
way to deal with the empty nest when it's gone. Time to make another
one?)

## Phase 1. Serialization

Recall from class that JSON is a standard data format that's used to
exchange information via APIs. We have a data model for Horello's board,
lists, and cards, but we need a way to _read JSON data_ from the Trello
API and turn that into the objects that we're used to working with.

Open up `1_data_model.js` (this file should look familiar!) and fill in
the `.fromJSON()` methods of the Card and List classes to accomplish
this.

Note that these two methods are _static methods_. A static method is not
called on any particular _instance_ of the class, so it does not receive
a `this` variable. All of its inputs must be explicitly passed in as
variables. In this case, we are _creating a new object_ from JSON data.
It's the job of the static method to create and return the corresponding
object. You can read more about [static
methods](https://en.wikipedia.org/wiki/Method_(computer_programming)#Static_methods)
on Wikipedia.

## Phase 2: Authentication

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

Finally, we need to use the Trello client to authenticate the user. Open
up `2_authentication.js` and add the relevant authentication code from
https://developers.trello.com/get-started/start-building. This code is
called once when the page loads. After adding the authentication code,
try reloading the page in the browser. If all goes well, you should see
a popup asking the user to grant access to their Trello account to the
application. You'll only see the authentication prompt the first time.
Once you grant the application permission, the authentication process
will be transparent in the future.

***NOTE 1:*** The authentication popup window may be blocked by a popup
blocker in your web browser. If this happens, make sure you enable
popups for this site.

***NOTE 2:*** If, after clicking approve in the popup, you see a blank
screen, and the following error in Chrome:

    Failed to execute 'postMessage' on 'DOMWindow': The target origin
    provided ('file://') does not match the recipient window's origin
    ('null').

You have two choices. The first is to switch to Safari, which should
work. Safari has better support for something called CORS, which causes
this error. The other choice is to launch a lightweight web server on
your laptop and access the files that way instead. If you have Python
installed (it should be installed on Linux and OS X by default), you
should be able to do the following:

    > cd week02/
    > python -m SimpleHTTPServer 8000

Then navigate to http://localhost:8000/day4/horello-ajax/skeleton/ in
Chrome.


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

IDs

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
- Detect changes automatically like Trello
- Support multiple boards
- Promises

