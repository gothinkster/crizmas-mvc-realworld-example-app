# ![RealWorld Crizmas MVC](crizmas.png)

> ### crizmas-mvc codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://raulsebastianmihaila.github.io/crizmas-mvc-realworld-site/)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with **[crizmas-mvc](https://github.com/raulsebastianmihaila/crizmas-mvc)** including CRUD operations, authentication, routing, pagination, and more.


For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.


# Getting started

1. Clone repo
2. `npm i`
3. `npm start`


By default the local server will run on port 5556, but it can be changed in `webpack.config.js`.


### Making requests to the backend API

For convenience, we're using the API server running at https://conduit.productionready.io/api. You can view [the API spec here](https://github.com/GoThinkster/productionready/blob/master/api) which contains all routes & responses for the server.

The source code for the backend server (available for Node, Rails and Django) can be found in the [main RealWorld repo](https://github.com/gothinkster/realworld).

If you want to change the API URL to a local server, simply edit `src/js/http.js`.


## Functionality overview

The example application is a social blogging site (i.e. a Medium.com clone) called "Conduit". It uses a custom API for all requests, including authentication. You can view a live demo [here](https://raulsebastianmihaila.github.io/crizmas-mvc-realworld-site/).

**General functionality:**

- Authenticate users via JWT (login/signup pages + logout button on settings page)
- CRU* users (sign up & settings page - no deleting required)
- CRUD Articles
- CR*D Comments on articles (no updating required)
- GET and display paginated lists of articles
- Favorite articles
- Follow other users

**The general page breakdown looks like this:**

- Home page (URL: / )
    - List of tags
    - List of articles pulled from either Feed, Global, or by Tag
    - Pagination for list of articles
- Sign in/Sign up pages (URL: /login, /register )
    - Use JWT (store the token in localStorage)
- Settings page (URL: /settings )
- Editor page to create/edit articles (URL: /editor, /editor/article-slug-here )
- Article page (URL: /article/article-slug-here )
    - Delete article button (only shown to article's author)
    - Render markdown from server client side
    - Comments section at bottom of page
    - Delete comment button (only shown to comment's author)
- Profile page (URL: /@username, /@username/favorites )
    - Show basic user info
    - List of articles populated from author's created articles or author's favorited articles
