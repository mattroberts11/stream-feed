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
const userToken = serverClient.createUserToken('eric');

const getToken = () => {
  // const userToken = serverClient.createUserToken('eric')
   console.log('token', userToken);
}

const feedA = serverClient.feed('user', 'feedA')

const createFeed = () => {
  
  console.log('FEED A', feedA);
}

const createActivity = async () => {

  const activity = {
    actor: 'user:feedA',
    verb: 'like',
    object: 'place:1'
  };

  await feedA.addActivity(activity).then( r => console.log("activity response", r))

}

// getToken();
// createFeed();
createActivity();
