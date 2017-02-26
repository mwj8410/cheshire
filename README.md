# Cheshire [![CircleCI](https://circleci.com/gh/mwj8410/cheshire.svg?style=svg)](https://circleci.com/gh/mwj8410/cheshire) #

This is a prototype dialogue editor and player intended to create, edit, and navigate complex storytelling and question/answer forms.

## Project Structure ##
- *app*: All server-side logic including static file hosting, server-side rendering functions, and API routs.
- *config*: Expresses all configurations used by any portion of the application. Any environment variables will be wrapped into configuration variables within `production.config.js`. All overrides for local development will be provided in `local.config.js` using an identical structure.
- *notes*: This is for documentation and exploration only. This will have a short lifespan before it is removed from the project and will have *NO CUSTOMER FACING*.
- *player*: This expresses the main client/reader that is exposed to general users. These views are rendered server-side and provided with all data pre-injected as much as possible.
- *tests*: Automated tests.
- *ui*: This is the main editor interface that is used to create, edit, and configure cheshire forms associated with a user's account. It is transpiled into the untracked `./hosted/` folder.

## Required Services ##
* MongoDb - Used for semi-structured document storage.
* MySQL - Used for highly relational data
* Redis - Used for session storage

### Recommended Development ###
```
docker pull mongo
docker pull mysql
docker pull redis
docker run mongo
docker run mysql
docker run redis
```

## Development ##
