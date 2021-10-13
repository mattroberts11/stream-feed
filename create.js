const { connect } = require('getstream');
const { async } = require('regenerator-runtime');

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
const feedA = serverClient.feed('user', 'feedA');
const feedB = serverClient.feed('user', 'feedB');

const getToken = () => {
  // const userToken = serverClient.createUserToken('eric')
   console.log('token', userToken);
}

const createFeed = () => {
  // console.log('FEED A', feedA);
  console.log('FEED B', feedB);
}

const createActivity = async () => {

  const activity = {
    actor: 'user:feedA',
    verb: 'like',
    object: 'place:1'
  };

  const customActivity = {
    'actor': 'user:feedA',
    'verb': 'ski',
    'object': 'ski:1',
    'resort': 'Steamboat',
    'runs_skied': ['Heavenly Daze', 'Side Burns', 'Three Brothers Trees', 'Biscuits', 'Chute 1', 'Teds', 'Chute 2', 'Chute 3'],
    'pow_day': false,
    'vertical_skied': 31221
  }

  await feedA.addActivity(customActivity)
    .then( r => console.log("activity response", r))

}

const fetchFeed = async () => {
  await feedA.get()
    .then( r => console.log('FETCH FEED', r))
}

const deleteActivity = async () => {
  await feedA.removeActivity('d01a00f9-2c6e-11ec-97cc-0ac74274a1c1')
    .then( r => console.log('delete activity', r ))
}
// getToken();
// createFeed();
createActivity();
// fetchFeed();
//  deleteActivity();