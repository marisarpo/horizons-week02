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
These are simple objects that can be created and whenever you load data to them,
they show it on the screen. To try this out head over to `skeleton/index.html`,
head over to the `dummyData` function and create your objects there.  

This is an example of our code for creating a couple of lists and cards. Don't forget
to push cards into the lists and lists into the board. Otherwise you wouldn't know
what cards belong to each list and so on.

```javascript
var board = new horello.Board("1");
var list1 = new horello.List("li1", "FirstList");
var list2 = new horello.List("li1", "FirstList");
var card1 = new horello.Card("ca1", "firstCard", "desc", "li1");
board.lists.push(list1);
board.lists.push(list2);
list1.cards.push(card1);
list1.cards.push(card1);
list2.cards.push(card1);
```

This is the result we get from this code:

TODO: Insert capture1 here.  

Ready to get the data from the API into our models? Head over to the part in
`index.html` where `board = dummyData()` is called and comment it out. Uncomment the
`board = realData()` line.

## Phase 2: Trello

Now we know how to make some list and card objects show up on our screen, we are
going to try getting the data from the trello API. To be able to do it, we first
need to set up our account.

1. Head over to http://www.trello.com and sign-up/log-in to your Trello account.
1. Navigate to the [Trello
   Developers page](https://developers.trello.com/get-started/start-building).
1. Click the `Get your Application Key` button in the first section of
   the page. Copy this key and paste it into `config.js`.
1. Generate a token manually by clicking on the `Token` link on that page.
1. Click "Allow" on the authentication screen.
1. Copy this token and paste it into `config.js`.

**TODO**
CREATE A BOARD, get board ID.
create cards and lists on that board.


**TODO**
API KEY
vs auth key
vs board id.

## Phase 2: Getting familiar with the API


We are going to use the same 3 _resources_ we have as models from the Trello API:
 _board_, _card_, and _list_. We are able to create/read/update/destroy resources
 through the four HTTP actions `POST GET PUT DELETE`

To get familiar on how the API we start by making a few api calls from your console.
To get a board. Replace the `TOKEN`, `KEY` and set up all the necessary values for
the request that you are making. The general format of a request looks like this:

```
$.ajax(URL, {
  data: {
    key: API KEY,
    token: API TOKEN,
    [ other data here as necessary for PUT and POST ]
  },
  success: SUCCESS CALLBACK,
  error: ERROR CALLBACK
}
```

We will give you the code to get the board. Copy and paste this code to the console. Remember to change YOURBOARDIDHERE to the id we got on the previous step.

```
$.ajax('https://api.trello.com/1/boards/YOURBOARDIDHERE', {
      data: {
        key: "ac960adda2eff64acbbd98e795c025ca",
        token: "4f056833805f0d9f9942665e386fb731be47e335e7b9a32a5abb87e1e2ea8125",
      },
      success: function(data) { console.log(data) }
    })
```

If you get an object like the following one, you are good to go.

```
{
  "id":"588577bb8423080722cabe8c",
  "name":"Trello Test",
  "desc":"",
  "url":"https://trello.com/b/xFsMS0DK/trello-test",
  "shortUrl":"https://trello.com/b/xFsMS0DK",
  "prefs":{}
}
```

Now let's start to code! Head on to the `data_model` file and filling:
- `horello.List.prototype.getCard`
- `horello.Board.prototype.getList`

On the success callbacks of the functions `console.log` the data to be sure you
are getting the correct board/list data.

If you need help implementing these methods head over to [Trello API
reference](https://developers.trello.com/advanced-reference). For more info on how
the api works.

Note: Remember to include the API KEY and TOKEN in every request.

### From AJAX to models.

Implement the `horello.List.listFromJSON` and `horello.Card.cardFromJSON` methods.
These are called when your ajax ends in success. The data from these ajax calls
is now passed to these methids to create the appropiate objects for cards and lists.
YOu can look at `horello.Board.boardFromJSON` to get an idea of how it works.

## Phase 3: Sanity Check.

If your methods were correctly implemented according to the steps here and on
`data_model.js`, refreshing your page should show you horello with all the data
you had on the real Trello board. If something went wrong along the way, or if you
want to understand how the data comes from the API and ends up in the page, these
are the steps it is taking.

1. Our `index.html` calls `board.loadData();` This method should:
    1. Do an API call to bring the 'data' for all the lists.
    1. Call `horello.List.fromJSON(data)` for each list in the `data`.
        The method `horello.List.listFromJSON(data)` should convert and return each list data into a `List` object.
    1. Push each `List` object into the board's list array -> `board.lists`
    1. Call `list.loadCards` for each list.

1.  `list.loadCards()` should:
    1. Bring an array of cards for that list.
    1. Call `horello.Card.cardFromJSON` to create Cards from data.
    1. Push the `Card` objects into the list's card array. For example:
       `this.cards = data2.map(horello.Card.fromJSON)`
    1. Call `horello.mount(board);`

1. When `horello.mount(board);` is called, it tells our code to rerender everyhting
using the data that is in our models. Every time our model changes, we should call
this method to update the UI. Head over to Trello.com and edit your board. Refresh
the Horello page and you should see your changes.


## Phase 5: Writing to the API



## BONUS: Phase 6: Improvements


Note:
- Think about how you want to handle errors.

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
