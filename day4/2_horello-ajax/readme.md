# Horello continued: APIs and AJAX

## Introduction

Today you are going to make your Horello work with the real Trello API to get and
store your data. You are going to use `ajax` to get and send data back to the API.
You can check the final version of the project [here](http://horizons-school-of-technology.github.io/week02/day4/2_horello-ajax/solution/index.html).

## Contents

- Phase 1: [Authentication](#phase-1-authentication)
- Phase 2. [Getting familiar with the API](#phase-2-getting-familiar-with-the-api)
- Phase 3. [Serialization/deserialization](#phase-3-serializationdeserialization)
- Phase 4. [Reading from the API](#phase-4-reading-from-the-api)
- Phase 5. [Writing to the API](#phase-5-writing-to-the-api)
- Phase 6. [(BONUS) Improvements](#bonus-phase-6-improvements)


## Phase 1: How the project works.

To start, we are giving you the models that make up Trello: `board`, `list` and `card`,
These are simple objects that can be instanciated and whenever you load data to them,
they show it on the screen.





TODO: Renderers, create objects. and so on.

1. Create a board with whateverr.
1. put sum stuff in it.
1.



## Phase 1: Authentication

Before we can use someone else's API, we first need to
authenticate ourselves. (Why? Permissions, throttling, etc.)

Step one today is to establish your credentials with Trello--since we're
going to be working with the Trello API.
Head over to http://www.trello.com and sign-up/log-in to your Trello account.

**TODO: this is good**
1. Navigate to the [Trello
   Developers page](https://developers.trello.com/get-started/start-building).
1. Click the `Get your Application Key` button in the first section of
   the page. Copy this key and paste it into `config.js` (you'll see
   where).
1. Generate a token manually by clicking on the `Token` link on that page.
1. Click "Allow" on the authentication screen.
1. Copy this token and paste it into `config.js`.

**TODO**
API KEY
vs auth key
vs board id.

## Phase 2: Getting familiar with the API

We use models to connect the data that comes from the API to your horello app.
Whenever you make an api request the data comes in from Trello looks something
like this:


```javascript
{
  "id":"588942909124b090631636b8",
  "dateLastActivity":"2017-01-26T00:28:00.955Z",
  "desc":"Using the Trello API is fun and easy!",
  "idBoard":"588577bb8423080722cabe8c",
  "labels":[],
  "name":"I just created a new card!",
  "pos":4,
  "shortUrl":"https://trello.com/c/ScscdDsE",
  "url":"https://trello.com/c/ScscdDsE/22-i-just-created-a-new-card",
}
```

We are going to use 3 _resources_ that are available via the
API: _board_, _card_, and _list_. To get more familiar on how each one works take a look
at

[Trello API
reference](https://developers.trello.com/advanced-reference).

We are able to create/read/update/destroy resources through the four HTTP
actions--POST, GET, PUT, DELETE--


$.ajax(URL, {
  data: {
    key: API KEY,
    token: API TOKEN,
    [ other data here as necessary for PUT and POST ]
  },
  success: SUCCESS CALLBACK,
  error: ERROR CALLBACK
}



### TODO

GEt board data.


### jQuery AJAX

jQuery comes with a powerful function called
[`.ajax()`](http://api.jquery.com/jquery.ajax/) that we can use in the
browser console to test the API. ([This
doc](http://www.w3schools.com/jquery/ajax_ajax.asp) is also very
helpful.) Let's try reading the list of boards (which you saw in the
sandbox) using the ajax function. It takes a URL and an object with a
list of settings. The simplest GET command would look like this:

    $.ajax('https://api.trello.com/1/member/me/boards')

This will perform a GET on the specified resource (`/member/me/boards`).
Try running this command in the console and see what happens. You should
see a 400 error appear. This error is appearing since we haven't
authenticated! Let's try the same request again, this time including the
key and token we got above. We can pass these as a `data` parameter in
the options argument to `ajax`. In this case it should look like
(replace `[APP_KEY]` with your Trello app key and `[TOKEN]` with your
token):

    $.ajax('https://api.trello.com/1/member/me/boards', {
      data: {
        key: [APP_KEY],
        token: [TOKEN],
      })

This time, you should see something like the following in the console:

    > Object {readyState: 1}

It worked! The final step is to pass a success callback into the ajax
function so that we can work with the returned data. (Why do we need a
success callback? Why can't we just use the return value of the `ajax`
call? Because the return value of the `ajax` call isn't what you think
it is. Read [the docs](http://api.jquery.com/jquery.ajax/) to see if you
can figure out what it returns.)

Call `$.ajax` one more time like this:

    $.ajax('https://api.trello.com/1/member/me/boards', {
      data: {
        key: [APP_KEY],
        token: [TOKEN],
      },
      success: function(data) { console.log(data[0]) }
    })

This time you should see something which looks like this:

    > Object {name: "Welcome Board", desc: "", descData: null, closed:
    false, idOrganization: null…}

This API call returns a _list_ of boards, so we can peek at `data[0]` to
see the first board. This data should look just like what you saw above
inside the Trello sandbox and the JSON data you saw in the browser.

Now try using `$.ajax` to create a list and a card. Then reload the
official Trello website to see your changes appear! (Actually, these
changes should appear in realtime if you have the board open--no
reloading necessary.)


##To display stuff on the screen.

1. Call board.loadData();
    1. This brings a 'data' array with all the lists.
    1. Call horello.List.fromJSON(data2) for each list
        1. fromJSON converts each list data into a List Object
        1. pushes the list into the board's list array
        1. and calls 'list.loadCards' for each list.

1. list.loadCards();
    1. brings an array of cards for that list
    1. calls fromJSON to create Cards from data.
    1. pushes the Cards into the list's cardarray
       "this.cards = data2.map(horello.Card.fromJSON)"
    1. Calls *horello.mount(board);* THIS IS THE CODE THAT REFFRESHES STUFF.

why does board loadListData? instead of lists loading their own data?



## Phase 3. Passing data to models.?

Recall from class that JSON is a standard data format that's used to
exchange information via APIs. Serialization refers to turning our data
objects--our lists and cards--into JSON for sending "over the wire,"
i.e., into the cloud via the API. Deserialization is the opposite
process: reading JSON data and turning it into the objects that we're
used to working with (this process is called _deserialization_).

Now that we know what the data we're getting from the API looks like,
let's write some deserialization methods for our objects so that we can
turn the data we pull from the API into data that we know how to render
and work with. Open up `data_model.js` (this file should look familiar!)
and fill in the `.fromJSON()` methods of the Card and List classes to
accomplish this.

You may decide, in phase 5 (writing data to the API), that you need to
do something similar in the opposite direction, i.e., that you need
methods that serialize your instances into JSON data. Or you might
decide that you don't need them.

Note that these two methods are _static methods_. A static method is not
called on any particular _instance_ of the class, so it does not receive
a `this` variable. All of its inputs must be explicitly passed in as
variables. In this case, we are _creating a new object_ from JSON data.
It's the job of the static method to create and return the corresponding
object. You can read more about [static
methods](https://en.wikipedia.org/wiki/Method_(computer_programming)#Static_methods)
on Wikipedia.


## Phase 4: Reading from the API


- You should be working in `data_model.js`. You shouldn't need to modify
  the HTML, CSS, or events code.
- You should use `$.ajax()` for all of your AJAX calls. They should look
  like this:

      $.ajax(URL, {
        data: {
          key: API KEY,
          token: API TOKEN,
          [ other data here as necessary for PUT and POST ]
        },
        success: SUCCESS CALLBACK,
        error: ERROR CALLBACK
      }

- ***Make sure you include the API key and token with every single AJAX
  call!*** See the previous item.
- Where, and how, do we want to download the board data from the API so
  that we can display it to the user when they open our app? Where do we
  store the board ID that we grabbed in the previous phase, and how do
  we retrieve this board data when the app loads?
- Think carefully about where IDs come from. Plugging into an API
  changes this a bit.
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
- The function signatures (i.e., the list of arguments they accept and
  what they return) for some of the data model methods might change.
  This might be okay. How do we know whether it's okay?

Once you're successfully reading list and card data from the Trello API,
reload the page--_et voila!_--you should see more or less the same thing
you see in the official Trello app at Trello.com. Cool beans!


## Phase 5: Writing to the API

Take a deep breath, because you made it to the final phase of this
killer project. There's a light at the end of the tunnel. It's a tiny
light, and it's a really, really long tunnel, but it's there. Move
towards the light.

You're successfully consuming data from the Trello API. The final, final
step (aside from all those bonus steps below, ignore them for now) is to
write our changes back to the API so they persist in the cloud. You're
on your own for this part, too. Here are a couple more tips:

- Think carefully about the data flow when creating a new list or a new
  card. Do you create the object locally first, in memory, or do you
  create it using the API first? What are the potential advantages and
  disadvantages of each of these design choices?
- Do you have to create data both locally and using the API?

With this last phase in place, you can officially call yourself an app
developer. That's it. I'm out of funny things to say. See you at
graduation.

:drops mic:


## BONUS: Phase 6: Improvements

:picks mic up again:

Okay, you're an ambitious grasshopper. We like ambition 'round these
parts. Well, there's still a bunch of things you can do to make this
here app as smooth as an armadillo's backside:

- Rather than passing the authentication information with every single
  request, see if you can simplify this using
  [jQuery.ajaxSetup()](https://api.jquery.com/jquery.ajaxsetup/).
- You're probably rendering (i.e., calling `horello.mount`) more often
  than you need to. Try to optimize how often you render the board, and
  don't do it more often than necessary, to improve performance.
- Trello automatically detects when the data changes, and displays those
  changes immediately, without needing to reload. Add that. Boom.
- Add support for multiple boards.
- Replace your nasty callback code with sexy new
  [Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
- Looking for even more? Check out the [list of challenges for the
  week](../../challenges/1_bonus_horello).







  //sep1
  learning models
  var board =new board("boardname");
  var list =new list;
  board.lists.push(list);
  render;

  // step2
  getting data -> ajax

  //sete3
  ajax -> MODELS

  //step 4
  models -> html
  // show a bit of description.
  // Augment the ui a bit.

  // hover over button -> shows trash
  // click -> deletes the card.
  //
