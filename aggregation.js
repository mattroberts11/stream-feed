const { connect } = require('getstream');

require('dotenv').config({path: './.env'});

const key = process.env.API_KEY;
const secret = process.env.API_SECRET;
const appId = process.env.APP_ID;

// Instantiate a new client (server side)
// Optionally supply the app identifier and an options object specifying the data center to use and timeout for requests (15s)
// const client = connect('YOUR_API_KEY', 'API_KEY_SECRET', 'APP_ID', { location: 'us-east', timeout: 15000 });
const serverClient = connect(key, secret, appId);

// Create a token for user with id "the-user-id"
const userToken = serverClient.createUserToken('matt');
const ski_feed = serverClient.feed('timeline_aggregated', 'ski_feed');


const getToken = () => {
  // const userToken = serverClient.createUserToken('eric')
   console.log('token', userToken);
}

const addActivities = async () => {
  const activities = [
    {actor: 'timeline_aggregated:ski_feed', verb: 'post', object: 'place:steamboat'},
    {actor: 'timeline_aggregated:ski_feed', verb: 'post', object: 'place:vail'},
    {actor: 'timeline_aggregated:ski_feed', verb: 'post', object: 'place:a-basin'},
    {actor: 'timeline_aggregated:ski_feed', verb: 'post', object: 'place:winter park'},
    {actor: 'timeline_aggregated:ski_feed', verb: 'comment', object: 'place:big sky'},
    {actor: 'timeline_aggregated:ski_feed', verb: 'like', object: 'place:aspen'},
  ]

  await ski_feed.addActivities(activities)
    .then( r => console.log('AGG Add Activities', r))
    // stop
}

const getActivities = async () => {
  await ski_feed.get()
    .then( r => console.log('Get AGG feeds', r))
}

// addActivities();
getActivities();