# classroom_management

This website is an attempt to create a classroom management and reservation system for a university. 

## Local Setup

This project uses Docker and NodeJS v14. You will need to install both of these.


## VSCode dev container setup

1. Have Docker and VSCode installed on your computer
2. Install the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
VSCode extension
3. In the bottom left, there should be a little green button that looks like
  2 arrows pointing in opposite directions. Click on it, and then click "Reopen in Container"
  in the menu that pops up

## (first-time setup) Installing dependencies

You will need to do this in both in the dev container, and when running locally

Run the following commands from the root of the project

```console
$ cd frontend
$ npm ci
$ cd ../backend
$ npm ci
$ npx prisma generate
```

### What is `prisma generate`?
Prisma is an ORM that makes it easier to communicate with the database. Its main
feature is complete type safety (i.e the type definitions are very precise and 
correct for the kind of data that is stored in your database). However, to 
achieve this type safety, it must use code generation techniques (i.e it cannot
just use TypeScript generic types). The command `prisma generate` regenerates
the database client library. You will need to run it any time changes are made
to the data model (which fortunately should not be very often.)


## Running the frontend and backend
In VSCode, open 2 terminals
In one, run 

```console
$ cd frontend
$ npm start
```

and in the other, run

```console
$ cd backend
$ npm start
```

The frontend should be available at [http://localhost:3000](http://localhost:3000) and the backend should be available at [http://localhost:3001](http://localhost:3001).
