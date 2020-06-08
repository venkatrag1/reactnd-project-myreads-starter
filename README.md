# MyReads Project

This project displays a list of books from a Udacity backend, and allows organizing
them in one of three shelves by letting you search add, remove and move books across
shelves, keeping the display and backend in sync.


## Installing and Running this app

* install node and npm if not already present.
* clone this repo or download and extract it. cd to the top level directory containing
    package.json file
* install all project dependencies with `npm install`. In addition to the modules
    provided in starter- jsdoc, lodash and react-router-dom were installed
* start the development server with `npm start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file.
├── public
│   ├── favicon.ico # React Icon,
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for the app. Feel free to customize this as you desire.
    ├── App.js # Main app component that routes to ListBooks and SearchBooks.
    ├── ListBooks.js # Represents the "/" page.
    ├── BookShelf.js # Represents one type of bookshelf.
    ├── Book.js # Represents a single Book.
    ├── BookShelfChanger.js # Represents the selector used to change bookshelf on a book.
    ├── Search.js # Represents the "/search" page.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

 The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Architecture

There are two routes at the top level "/" and "/search" which are wrapped Route
components at the top level. Since, both these routes need list of books in shelf,
list of shelves for the slider and the corresponding display text, we push these
two to the top level. The list of books is maintained in state, so that change
in bookshelf attribute on any of the books will trigger re-render. In addition to
this, we also choose to abstract out any calls to BooksAPI at this level, to
allow this to be swapped with a different backend.

From the Book component onwards, the code is reused across both routes.
The BookShelfChanger component further isolates the slider from the Book itself
for modularity.

The SearchBooks allows input onChange default behavior to update the text
while debouncing the calls to the backend server. The state for SearchBooks is
updated with matching books and this triggers render to display the books matching
search term. Any change to the shelf for matching books triggers the same flow
as the ListBooks view, by calling all the way up to App.js to change its state of
books in shelf.

ListBooks handles the overall page structure for "/" route and delegates rendering
of each shelf to BookShelf which loops over individual books and invokes the Book
component.

This modular approach allows for any changes/enhancements to be easily made.
