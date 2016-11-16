# ok Chatbot

Chatbot for a swiss retailer that delivers deals to customer.  
Backend service for this bot: https://github.com/janikvonrotz/apometact

![](/readme/screenshot.png)

## Features

* Understands natural language
* Displays rich elements such as cards, quick replies and images
* Implements best practice guidelines
* Translatable into different languages
* Store and retrieve content and user data from a database
* Contact dialog for human interaction

## Installation development

* Copy `default.json` to `development.json`.
* Run `npm install` in your cli.
* Setup required services
  * mLab database
  * Facebook app
    * Set Messenger webhook to `https://[subdomain].localtunnel.me/facebook/receive`.
  * Facebook page
    * Connect app with page
  * Dashbot.io (optional)
  * Sendgrid (optional)
  * api.ai
    * Import `api.ai ok-chatbot.zip`
* Update `development.json`.
* Run `npm run tunnel` in a second cli.
* Update tunnel script command in `package.json` and run `npm run dev` in your cli.
* Go to `https://www.messenger.com` and start messaging with the bot.

## Installation production

* Copy `default.json` to `production.json`.
* Run `npm install` in your cli.
* Setup required services
  * Heroku
  * Facebook App
    * Set Messenger webhook to `https://[appname].herokuapp.com/facebook/receive`.
    * Request messenger permissions.
  * Facebook Page
    * Connect app with page
  * Dashbot.io (optional)
  * Sendgrid (optional)
  * api.ai
    * Import `api.ai ok-chatbot.zip`
* Update `production.json`.
* Go to `https://www.messenger.com` and start messaging with the bot.

## Design

The picture below depicts the service architecture including the backend and shows they communicate with each other.

![](/readme/architecture.png)

Every message in a dialog with the bot is going through same process. This diagram shows how the services handle and process the message.

![](/readme/dataflow.png)
