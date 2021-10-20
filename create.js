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
    actor: 'user:feedB',
    verb: 'pin',
    object: 'place:1'
  };

  const customActivity = {
    'actor': 'user:feedA',
    'verb': 'ski',
    'object': 'ski:2',
    'resort': 'Beach Mountain',
    'runs_skied': ['Heavenly Daze', 'Side Burns', 'Three Brothers Trees', 'Biscuits', 'Chute 1', 'Teds', 'Chute 2', 'Chute 3'],
    'pow_day': true,
    'vertical_skied': 15005
  }

  await feedB.addActivity(customActivity)
    .then( r => console.log("activity response", r))

}

const batchAddActivities = async () => {

  const activities = [
    {actor: 'user:feedB', verb: 'pin', object: 'place:3'},
    {actor: 'user:feedB', verb: 'like', object: 'place:4'},
    {actor: 'user:feedB', verb: 'watch', object: 'place:5'},
  ];

  await feedB.addActivities(activities)
    .then( r => console.log("BATCH activities response", r))
}

const fetchFeed = async () => {
  await feedA.get({ranking: 'rank2' })
    .then( r => console.log('FETCH FEED', r))
}

const deleteActivity = async () => {
  await feedA.removeActivity('d01a00f9-2c6e-11ec-97cc-0ac74274a1c1')
    .then( r => console.log('delete activity', r ))
}

const followFeed = async () => {
  await feedA.follow('user', 'feedB')
    .then( r => console.log( "Follow Feed", r))
}

const readFollowers = async () => {
  await feedA.followers()
    .then( r => console.log('FOLLOWERS', r))
}

const readFollowing = async () => {
  await feedA.following()
    .then( r => console.log('FOLLOWING', r))
}

const addReaction = async () => {
  await serverClient.reactions.add('comment', '41dcae17-2d14-11ec-8bbc-0ac74274a1c1', {"text": "No bueno"}, {"userId":'bad-person'})
    .then(r => console.log('Add Reaction', r))

  // await serverClient.reactions.add('comment',)
  // await serverClient.feed('user', 'feedA').get().then( r => console.log('FEED GET', r))
  // const id = await serverClient.reactions.add(response.results[0].id)
      
  // await serverClient.reactions.add("like", id)
    // .then( r => console.log('ADD ACTIVITY RESPONSE', r))
}

const deleteReaction = async () => {
  await serverClient.reactions.delete('4e70da47-a20d-44f4-ae4f-83d9c3d64fda')
    .then( r => console.log("DELETE REACTION", r))
}

const getReactions = async () => {
  await serverClient.reactions.filter({
    'activity_id': '41dcae17-2d14-11ec-8bbc-0ac74274a1c1'
  }).then( r => console.log('GET REACTIONS', r))
}


const addUser = async () => {
  await serverClient.user('bad-user').create({
    name: "Bad User",
    occupation: "Robber",
  }).then( r => console.log("Add User", r))
}

const removeUser = async () => {
  await serverClient.user('bad-user').delete()
    .then( r => console.log('Delete User', r))
}

const getUser = async () => {
  await serverClient.user('matt-roberts').get()
    .then( r => console.log('Get User', r))
}

// getToken();
// createFeed();
// createActivity();
// batchAddActivities();
// fetchFeed();
// deleteActivity();
// followFeed(); 
// readFollowers();
// readFollowing();
// addReaction();
// deleteReaction();
getReactions();
// addUser();
// removeUser();
// getUser();