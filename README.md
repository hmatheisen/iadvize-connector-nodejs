# iAdvize Connector (Node.js)

This is a Node.js version of the iadvize connector previously written in Go

## How to run it :

### Set credentials :

* First, rename the _.env.example_ file to _.env_ : 

```bash
cp .env.example .env
```

* Fill it with your credentials

### Install Dependencies :

```bash
npm install
```

### Run the server :

```bash
npm start
```

The server runs on port `8080`

## Endpoints served : 

```
GET  /external-bots

GET  /bots/:idOperator

POST /conversation

POST /conversations/:conversationId/messages

GET  /availability-strategies
```
