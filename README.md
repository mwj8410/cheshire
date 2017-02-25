# Cheshire #
[![CircleCI](https://circleci.com/gh/mwj8410/cheshire.svg?style=svg)](https://circleci.com/gh/mwj8410/cheshire)

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

## Project Structure ##
This project is divided into three parts.
- *api*: the server portion of the application.
- *ui*: The interface for the editor and configuration application.
- *views*: The engine that allows the user to play through the experience indicated.

## Development ##
