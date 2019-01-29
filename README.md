# iAdvize Connector (Node.js)

This is the Node.js version of the connector previously written in Go  

This project is a connector for iAdvize, to use IBM Watson as a bot plugin

## How to run it :

### Set credentials :

* First, rename the _.env.example_ file to _.env_ : 

```bash
cp .env.example .env
```

* Fill it with your own Watson credentials

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

## TODOS : 

- [ ] Add NoSQL Database (Cloudant or Mongo)
- [ ] Handle the different types of response from Watson Assistant