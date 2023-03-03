// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// import { execute } from './.graphclient'
// import { gql, createClient } from '@urql/core';
const urql = require('@urql/core');
const gql = urql.gql;
const createClient = urql.createClient;
const fetch = require("isomorphic-unfetch");
// import {createRequire} from 'module'
// const require = createRequire(import.meta.url)

////////// THIS IS FOR QUERYING SMART CONTRACTS WITH 'THE GRAPH'
////////// + comms with the rust server

/////////////// LAKE -- SUPPLIER ///////////////////

let apiEndpoint = 'https://api.thegraph.com/subgraphs/name/rishin01/raedagraph5'

const postListInfoFragment = gql`
	fragment postListInfo on Post {
		id
		postName
		price
		bids(orderBy:amount,orderDirection:desc,first:1){
			amount
		}
	}
`
const client = createClient({
	url: apiEndpoint
})

// get the bids as a lake (ie. supplier)
// -> for the <lakePost> with id <postId>: get all the <riverBid>'s.
function lakeGetBids(postId){
	// get from `the graph`
	// PARAMS: postId
	return [{
		'postId':postId,
		'riverAddress':'0x01',
		'bidPrice':'0.12eth',
		'bidderId':'102'
	}];
}

// get the bids as a lake (ie. supplier)
async function getPost(postId){
	// get from `the graph`
	// PARAMS: postId
	return {
		'id':postId,
		'postName':'Cargo trousers',
		'price':102,
		'iXx':1,
		'iXy':0,
		'fXx':1,
		'fXy':2,
		'iT':0,
		'fT':0,
		'exp':10000,
		'live':true,
		'bucket': {},
		'pendingValue':'',
		'description':'A good description of the product with data like general shape/size etc.',
		'poster':{
			'profileName':'Toby'
		},
		'bids':[
			{
				'amount':20,
				'accepted':false,
				'bidder': {
					'profileName':'Rishin'
				}
			},
			{
				'amount':25,
				'accepted':true,
				'bidder': {
					'profileName':'Hamzah'
				}
			}
		]
	};
}


// get the users (a lake) open bids
function lakeMyOpenBids(profileName){
	// get from `the graph`
	// PARAMS: addr
	return [
		{
			'postid':1,
			'bidprice':'0.12',
			'info':'post1 on Rishin'
		},
		{
			'postid':2,
			'bidprice':'0.10',
			'info':'post2 on Hamzah'
		},
		{
			'postid':3,
			'bidprice':'0.09',
			'info':'post3 on Mary'
		}
	];
}

// get the users (a lake) open posts
async function lakeMyOpenPosts(profileNamez){
	console.log(profileNamez)
	// get from `the graph`
	// PARAMS: addr
	const query = gql`
		query lakeOwnPosts($profileNameVar:String!){
			posts(where:{poster_:{profileName:$profileNameVar}},first:4){
				...postListInfo
			}
		}
		${postListInfoFragment}
	`;

	let res=  await client.query(query,{
		profileNameVar: profileNamez
	}).toPromise();

	console.log(res.data.posts)
	return res.data.posts;

	// return [
	// 	{
	// 		'postid':4,
	// 		'postname':'POTATOES',
	// 		'maxprice':'0.16',
	// 		'bestprice':'0.11',
	// 	},
	// 	{
	// 		'postid':5,
	// 		'postname':'CARROTS',
	// 		'maxprice':'0.10',
	// 		'bestprice':'',
	// 	},
	// 	{
	// 		'postid':6,
	// 		'postname':'PAPER',
	// 		'maxprice':'0.12',
	// 		'bestprice':'0.08',
	// 	},
	// 	{
	// 		'postid':7,
	// 		'postname':'CHIPS',
	// 		'maxprice':'0.06',
	// 		'bestprice':'',
	// 	}
	// ];
}

// ADD FUNCTION FOR FULL PROFILE VIEW WITH BIDS

// search for river posts (as a lake) wrt simple criteria
async function lakeSimpleSearch(lat,lng,radius,minprice,maxprice){
	// get from `the graph`
	// PARAMS: lat,lng,radius,minprice,maxprice
	// console.log('bellly')
	const query = gql`
		query quickSearch($waterType: WATERTYPE!,$minprice:PRICE!,$maxprice:PRICE!,$centreX:IXX!,$centreY:IXY!,$radius:IXX!){
			posts(where:{poster_:{waterType:$waterType},iXx_gt:$centreX-$radius,iXx_lt:$centreX+$radius,iXy_gt:$centreY-$radius,iXy_lt:$centreY-$radius,price_gt:$minprice,price_lt:$maxprice}){
				...postListInfo
			}
		}
		${postListInfoFragment}
	`;

	const watertype = "LAKE"
	return await client.query(query,{
		watertype,
		minprice,
		maxprice,
		lng,
		lat,
		radius
	}).toPromise()
	
	// return [
	// 	{
	// 		'postid':8,
	// 		'postname':'CHAIR',
	// 		'river':'Hamzah',
	// 		'rivermin':'0.08',
	// 		'bestprice':'0.10'
	// 	},
	// 	{
	// 		'postid':9,
	// 		'postname':'TABLE',
	// 		'river':'Mary',
	// 		'rivermin':'0.14',
	// 		'bestprice':''
	// 	},
	// 	{
	// 		'postid':10,
	// 		'postname':'CLOTH',
	// 		'river':'Rishin',
	// 		'rivermin':'0.16',
	// 		'bestprice':''
	// 	},
	// 	{
	// 		'postid':11,
	// 		'postname':'CLOAK',
	// 		'river':'Toby',
	// 		'rivermin':'0.13',
	// 		'bestprice':'0.13'
	// 	},
	// 	{
	// 		'postid':12,
	// 		'postname':'COAT',
	// 		'river':'Juuso',
	// 		'rivermin':'0.10',
	// 		'bestprice':'0.14'
	// 	}
	// ];
}

async function lakeGetId(addr){
	// returns lake Id from the graph query
	// if no such id, return null
	return 1;
}


// get the bids as a river (ie. logistics)
// -> for the <riverPost> with id <postId>: get all the <lakeBid>'s.
function riverGetBids(postId){
	// get from `the graph`
	// PARAMS: postId
	return [{
		'postid':13,
		'postId':postId,
		'lakeAddress':'0x01',
		'bidPrice':'0.12eth',
	}];
}

/////////////// MESSENGER -- APPLIES TO BOTH LAKE & RIVER ///////////////////

let l = true;

function _rustCall(method, params = null, local=false){
	let url = 'https://rust.raeda.app';
	if (local) url = 'http://0.0.0.0:8000'
	return fetch(url+'/api/'+method, {
		method: 'post',
		body: JSON.stringify(params),
		headers: {'Content-Type': 'application/json'}
	}).then((res) => res.json()).then((body) => {
		return body;
	});
}

function getMessages(from,to){
	return _rustCall('messages',{'from':from,'to':to},l);
}

function postMessage(from,to,msg){
	return _rustCall('messages',{'from':from,'to':to,'msg':msg},l);
}

module.exports = {
	getPost,
	lakeGetBids,
	lakeMyOpenBids,
	lakeMyOpenPosts,
	lakeSimpleSearch,
	lakeGetId,
	riverGetBids,
	getMessages,
	postMessage,
	_rustCall
}