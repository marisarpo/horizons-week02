# Horello continued: APIs and AJAX

Remember the first time you left home? Like, ventured out into the real,
big, scary world to meet other people and find yourself and figure out
where you fit in? Hopefully you didn't get punched in the face or fall
off a cliff or something awful like that.  (I did ¯\\_(ツ)_/¯)

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
1. Find the `<script>` tag to add the `client.js` library and paste this
   into the `head` section of `index.html`. You'll add the key and token
   to this in a moment. (You can leave out jQuery since we've already
   loaded this.)
1. Click the `Get your Application Key` button in the first section of
   the page.
1. Copy the key and add it in the `<script>` tag per the instructions.
1. Generate a token manually by clicking on the `Token` link on that page.
1. Click "Allow" on the authentication screen.
1. Now copy this token and add the following string onto the end of the
   `<script src=...>` URL, replacing "[Token]" with your token:

       &token=[Token]

***Note:*** The Trello developer docs mention adding the key parameter
here. Make sure you add the token parameter too, or none of your API
calls will work!

That was pretty easy, right? These two numbers--the key and the
token--are how our application (Horello) authenticates to the Trello
backend. It's how Trello knows which boards, lists, and cards we have
access to, and it's how Trello knows whose pretty face to attach to our
comments.


## Phase 3: Test the API

With authentication in place, we can begin having some fun with data.
Before we try to hook up our frontend to the Trello backend, let's test
the API to make sure a.) that it's working and b.) that we know what the
heck is going on.

Begin by taking a look at the full [Trello API
reference](https://developers.trello.com/advanced-reference). The panel
on the left lists the _resources_ that are available via this
API--things like _board_, _card_, and _list_. (These should look very
familiar by now, but in an API, they're called _resources_ rather than
_classes_.) If you click on one of these resources, you'll see a full
list of the actions that you can take on each of them.

For instance, [GET
/boards/BOARD_ID](https://developers.trello.com/advanced-reference/board#get-1-boards-board-id)
is how we download the metadata for one board from the API. Similarly,
[POST
/cards](https://developers.trello.com/advanced-reference/card#post-1-cards)
is how we create a new card. Recall from class that the four HTTP
actions--POST, GET, PUT, DELETE--correspond to the four CRUD
actions--create, read, update, delete. POST creates a new object (and
usually returns its ID), PUT updates an existing object, GET fetches an
existing object, and DELETE, well... you get one guess.

We're going to be using a few of these API calls in this project so
spend some time getting familiar with them. There are a number of tools
that we can use to test the API. We'll see several of them here.

### Sandbox

Trello gives us a cool sandbox tool that we can use on its developer
site to play around with the API and begin viewing data. Navigate to
https://developers.trello.com/sandbox to check it out. You'll need to
enter your API key here as well. Enter it, then tap Authenticate on the
next screen to kick off the authentication process.

Once you're in the sandbox, play around with the different examples to
see what shows up in the Result box on the right. This is the JSON data
that your app will be receiving from the Trello API. Cool, right?

The most important thing we need is a board ID that we can plug into
Horello. If you tap on Get Boards on the left, then tap Execute, you
should see a list of boards appear on the right. There's a bunch of data
here, but look for the board called "Welcome Board", and copy the value
from its "id" property. Paste this into `index.html` where indicated.

### Raw JSON

Another trick we can use is to view the raw JSON data for an object in
our web browser. This is possible because the entire Trello API is
available via HTTP, i.e., the protocol that's being used under the hood
to exchange data between the Trello JS client and the backend is
actually HTTP, which is the same protocol that's used for web pages. The
URL you need to view the data for a board in Trello is:

    https://trello.com/1/boards/<BOARD_ID>

Copy and paste this URL into your web browser, then replace `<BOARD_ID>`
with the ID you copied above. Hit enter, and you should see some JSON
data which looks something like this:

![JSON board data](./img/board_data.png)

You can do this for cards and lists, too. Give it a shot!

### Curl

Another tool which is incredibly useful for exploring and
troubleshooting APIs is [curl](https://curl.haxx.se/). Curl allows us to
read data from and write it to an API from the commandline. If you're on
an OS X or Linux laptop, this tool should already be installed; if
you're on Windows you may need to download it.

Try reading the same board data using curl. The command should look like
this (fill in your Trello key and token):

    > curl 'https://api.trello.com/1/boards/<BOARD_ID>?key=<TRELLO_KEY>&token=<TRELLO_TOKEN>'

And you should see a response that looks like this:

    {"id":"57433c1bb4895dc978797a84","name":"Welcome Board","desc":"",
    "lists":[{"id":"57587951145a0bf234aac7da","name":"My Cool List"},
    {"id":"57433c1bb4895dcb69bbf586","name":"Intermediate"},{"id":
    "57433c1bb4895dcb69bbf587","name":"Advanced2"},{"id":"
    5758795e14a8ca28660bf656","name":"Another one"},{"id":"
    575879ad714eb0300b3f679d","name":"One more"}]}

Curl is actually more powerful than the previous two tools, since it
allows you to _write_ to the API as well as reading. You can call curl
with the `--data` argument to send data. Full details on using curl are
beyond the scope of this project, but you can see lots of examples using
another API here: https://gist.github.com/caspyin/2288960.

Try using curl to create a new list on the board you just fetched,
and/or a new card on a list. Then reload the official Trello website to
see your changes appear! (Actually, these changes should appear in
realtime if you have the board open--no reloading necessary.)

Or if you prefer an app to a commandline tool, read on...

### REST client

The most powerful tool we can use to play around with an API manually is
something called a REST client. A REST client is basically a graphical
user interface (GUI) on top of curl. Our favorite free REST client,
which is available both as a standalone app and as a Chrome plugin, is
[Postman](https://www.getpostman.com/).

If you prefer using an app over a commandline tool, try installing
Postman and using it to get the list of boards. Then try using it to
create a new list on the board, and/or a new card on a list. Then reload
the official Trello website to see your changes appear! (Actually, these
changes should appear in realtime if you have the board open--no
reloading necessary.)

You'll have to figure out how to use Postman on your own, but it's
pretty intuitive. To fetch data, run a GET query on the resource URL.
Pass `key` and `token` as params. You should be able to create data
using POST.


## Phase 4: Reading from the API

Let's pause to recap where we are. We have access to the Trello API, and
we've used it to read and write data manually. We have an app that can
read JSON data and turn it into objects that we can render. Any guesses
what the final couple of steps are?

Ask Ethan for a delicious PB&J sandwich? Ask Serry for some of that
chicory coffee? (Actually, that doesn't sound like a bad meal...)

Close. Actually, we still need to wire up our app to the API so that we
can read data from the cloud, and write our changes back to the cloud.
This is the most important part of this project, so let's get started.

Step one is to download all of the data for the board we're attaching to
when our app loads. Double-check that you've hardcoded the board ID in
`index.html` in the `<script>` section at the top.

We love you--you should know that by now--but you're on your own for
this part. It's your time to fly, butterfly. Here are some hints to get
you on your way:

- Where, and how, do we want to download the board data from the API so
  that we can display it to the user when they open our app?
- Think carefully about where IDs come from. Plugging into an API
  changes this a bit.
- The Trello JS client makes things relatively straightforward for us.
  It's documented here: https://developers.trello.com/clientjs. We don't
  have to worry about authentication at all, as it handles that for us.
  You can call `Trello.get()` to read a resource, `Trello.put()` to
  update one, etc.
- Each time you call one of the methods of the Trello JS client, you
  need to pass two callbacks, one for success and one for error. E.g.,
  the function signature for `Trello.get` looks like this:

      Trello.get(path[, params], success, error)
- Think about how you want to handle errors. Do something reasonable.
- The Trello API only returns _metadata_ for the resource. For instance,
  if you GET a list, you'll get back that list's name and ID, but you
  won't get back the list of cards it contains. You'll need to make a
  separate API call for that.
- Think carefully about how to structure your API calls, and about what
  order you do things. For example, when loading the lists for a board,
  where do we get the list data? What about the card data? At what point
  can we add the cards to the list, and the lists to the board? How do
  we know that one asynchronous operation--e.g., reading the list of
  lists--has completed before trying to do something with that data?
- Think about where, and when, you need to re-render the board.

Once you're successfully reading list and card data from the Trello API,
reload the page--_et voila!_--you should see more or less the same thing
you see in the official Trello app at Trello.com. Cool beans!


## Phase 5: Write data

Take a deep breath, because you made it to the final phase of this
killer project. There's a light at the end of the tunnel. It's a tiny
light, and it's a really, really long tunnel, but it's there. Move
towards the light.

You're successfully consuming data from the Trello API. The final, final
step (aside from all those bonus steps below, ignore them for now) is to
write our changes back to the API so they persist in the cloud. You're
on your own for this part, too. Here are a few more tips:

- Think carefully about the data flow when creating a new list or a new
  card. Do you create the object locally first, in memory, or do you
  create it using the API first? What are the potential advantages and
  disadvantages of each of these design choices?
- Do you have to create data both locally and using the API?

With this last phase in place, you can officially call yourself an app
developer. That's it. I'm out of funny things to say. See you at
graduation. :drops mic:


## BONUS: Phase 6: Improve it

:picks mic up again:

Okay, you're an ambitious grasshopper. We like ambition 'round these
parts. Well, there's still a bunch of things you can do to make this
here app as smooth as an armadillo's backside:

- You're probably rendering (i.e., calling `horello.mount`) more often
  than you need to. Try to optimize how often you render the board, and
  don't do it more often than necessary, to improve performance.
- Trello automatically detects when the data changes, and displays those
  changes immediately, without needing to reload. Add that.
- Add support for multiple boards.
- Replace your nasty callback code with sexy new
  [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

