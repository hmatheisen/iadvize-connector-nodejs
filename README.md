# iAdvize Connector (Node.js)

> **Note:** This is the Node.js version of the connector previously written in Go

This project is a connector for iAdvize, to use IBM Watson as a bot plugin

<!-- markdown-toc start - Don't edit this section. Run M-x markdown-toc-refresh-toc -->
**Table of Contents**

- [iAdvize Connector (Node.js)](#iadvize-connector-nodejs)
    - [How to run it](#how-to-run-it)
        - [Set credentials :](#set-credentials-)
        - [Install Dependencies :](#install-dependencies-)
        - [Run the server :](#run-the-server-)
    - [Deployment](#deployment)
    - [Endpoints served](#endpoints-served)

<!-- markdown-toc end -->


## How to run it

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

## Deployment

You will need to deploy this connector in order to use it with iAdvize. You can deploy this anywhere so i won't cover this part in this tutorial. [Here is a link](https://cloud.ibm.com/docs/runtimes/nodejs?topic=Nodejs-getting-started#getting-started) to a tutorial to deploy an Node.js Application on IBM Cloud with Cloud Foundry

## Endpoints served

```
GET  /external-bots

GET  /bots/:idOperator

POST /conversation

POST /conversations/:conversationId/messages

GET  /availability-strategies
```
