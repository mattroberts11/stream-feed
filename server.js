const express = require('express');
const cors = require('cors');

import { connect } from "getstream";

require('dotenv').config({path: './.env'});

const app = express();
const port = 3004;

const key = process.env.API_KEY;
const secret = process.env.API_SECRET;
const appId = process.env.APP_ID;

// Instantiate a new client (server side)
// Optionally supply the app identifier and an options object specifying the data center to use and timeout for requests (15s)
//const client = connect('YOUR_API_KEY', 'API_KEY_SECRET', 'APP_ID', { location: 'us-east', timeout: 15000 });
const serverClient = connect(key, secret, appId)

// Create a token for user with id "the-user-id"
const userToken = serverClient.createUserToken('USER ID GOES HERE');

