// const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
// import { execute } from './.graphclient'
// import { gql, createClient } from '@urql/core';
const urql = require('@urql/core');
const gql = urql.gql;
const createClient = urql.createClient;
const fetch = require("isomorphic-unfetch");
const { ethers } = require("ethers");

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

const postDetailedFragment = gql`
	fragment postDetailed on Post {
		id
		postName
		description
		EOA
		price
		iXx
		iXy
		fXx
		fXy
		iT
		fT
		exp
		live
		bucket{
			category
			value
		}
		poster{
			id
			profileName
			waterType
			description
		}
		bids{
			# id
			amount
			accepted
			bidder {
				profileName
			}
		}
		pendingValue
	}
`

const bidListInfoFragment = gql`
	fragment bidListInfo on Bid {
		amount
		accepted
		post{
			postName
			poster{
				profileName
			}
		}
	}
`

const profileDetailedFragment = gql`
	fragment profileDetailed on Profile {
		id
		profileName
		waterType
		EOAs
		description
		posts {
			...postListInfo
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

// longToByteArray = function(/*long*/long) {
// 	// we want to represent the input as a 8-bytes array
// 	var byteArray = [0, 0, 0, 0, 0, 0, 0, 0];
// 
// 	for ( var index = 0; index < byteArray.length; index ++ ) {
// 		var byte = long & 0xff;
// 		byteArray [ index ] = byte;
// 		long = (long - byte) / 256 ;
// 	}
// 
// 	return byteArray;
// };
// 
const changeEndianness = (string) => {
	const result = [];
	let len = string.length - 2;
	while (len >= 0) {
	  result.push(string.substr(len, 2));
	  len -= 2;
	}
	return result.join('');
}

function intToBytesLittleEndian(v){
	return '0x'+changeEndianness(ethers.utils.hexZeroPad('0x'+Number(v).toString(16), 4).substring(2));	
}

// get the bids as a lake (ie. supplier)
async function getPost(postId){
	// get from `the graph`
	// PARAMS: postId
	const query = gql`
		query onePost($idvar:ID!){
			posts(where:{id:$idvar}){
				...postDetailed
			}
		}
		${postDetailedFragment}
		
	`;
	
	let res =  await client.query(query,{
		idvar: intToBytesLittleEndian(postId)
	}).toPromise();
	
	let posts = res.data.posts;
	const postobj = {};
	if (posts.length>0){
		postobj['found'] = true;
		postobj['idbytes'] = posts[0].id;
		postobj['id'] = parseInt('0x'+changeEndianness(posts[0].id.substring(2)));
		postobj['postName'] = posts[0]['postName'];
		postobj['description'] = posts[0]['description'];
		postobj['price'] = posts[0]['price'];
		postobj['iXx'] = posts[0]['iXx'];
		postobj['iXy'] = posts[0]['iXy'];
		postobj['fXx'] = posts[0]['fXx'];
		postobj['fXy'] = posts[0]['fXy'];
		postobj['iT'] = posts[0]['iT'];
		postobj['fT'] = posts[0]['fT'];
		postobj['exp'] = posts[0]['exp'];
		postobj['live'] = posts[0]['live'];
		postobj['bucket'] = posts[0]['bucket'];
		postobj['poster'] = posts[0]['poster'];
		postobj['bids'] = posts[0]['bids'];
	} else {
		postobj['found'] = false;
	}
	
	return postobj;
	// return []

	// return {
	// 	'id':postId,
	// 	'postName':'Cargo trousers',
	// 	'price':102,
	// 	'iXx':1,
	// 	'iXy':0,
	// 	'fXx':1,
	// 	'fXy':2,
	// 	'iT':0,
	// 	'fT':0,
	// 	'exp':10000,
	// 	'live':true,
	// 	'bucket': {},
	// 	'pendingValue':'',
	// 	'description':'A good description of the product with data like general shape/size etc.',
	// 	'poster':{
	// 		'profileName':'Toby'
	// 	},
	// 	'bids':[
	// 		{
	// 			'amount':20,
	// 			'accepted':false,
	// 			'bidder': {
	// 				'profileName':'Rishin'
	// 			}
	// 		},
	// 		{
	// 			'amount':25,
	// 			'accepted':true,
	// 			'bidder': {
	// 				'profileName':'Hamzah'
	// 			}
	// 		}
	// 	]
	// };
}


// get the users (a lake) open bids
async function lakeMyOpenBids(profileName){
	// get from `the graph`
	// PARAMS: addr
	
	const query = gql`
		query lakeOwnBids($profileNameVar:String!){
			bids(where:{bidder_:{profileName:$profileNameVar},accepted:false},first:4){
				...bidListInfo
			}
		}
		${bidListInfoFragment}
	`;

	let res =  await client.query(query,{
		profileNameVar: profileName
	}).toPromise();
	return res.data.bids;
}

// get the users (a lake) open posts
async function lakeMyOpenPosts(profileName){
	// get from `the graph`
	// PARAMS: addr
	// console.log('lakeMyOpenPosts',profileName);

	const query = gql`
		query lakeOwnPosts($profileNameVar:String!){
			posts(where:{poster_:{profileName:$profileNameVar}},first:40){
				...postListInfo
			}
		}
		${postListInfoFragment}
	`;

	let res =  await client.query(query,{
		profileNameVar: profileName
	}).toPromise();
	return res.data.posts;
}

// get the users (a lake) open bids
async function riverMyOpenBids(profileName){
	// get from `the graph`
	// PARAMS: addr
	
	const query = gql`
		query riverOwnBids($profileNameVar:String!){
			bids(where:{bidder_:{profileName:$profileNameVar},accepted:false},first:4){
				...bidListInfo
			}
		}
		${bidListInfoFragment}
	`;

	let res =  await client.query(query,{
		profileNameVar: profileName
	}).toPromise();
	return res.data.bids;
}

// get the users (a lake) open posts
async function riverMyOpenPosts(profileName){
	// get from `the graph`
	// PARAMS: addr

	const query = gql`
		query riverOwnPosts($profileNameVar:String!){
			posts(where:{poster_:{profileName:$profileNameVar}},first:40){
				...postListInfo
			}
		}
		${postListInfoFragment}
	`;

	let res =  await client.query(query,{
		profileNameVar: profileName
	}).toPromise();
	return res.data.posts;
}


// ADD FUNCTION FOR FULL PROFILE VIEW WITH BIDS

async function getProfile(profileName){

	const query = gql`
		query ProfileRetrieve($profileNameVar:String!){
			profiles(where:{profileName:$profileNameVar}){
				...profileDetailed
			}
		}

		${profileDetailedFragment}
		${postListInfoFragment}
	`
	let res = await client.query(query,{
		profileNameVar: profileName
	}).toPromise();

	let profiles = res.data.profiles;
	const profileobj = {}

	if (profiles.length>0){
		profileobj['found'] = true;
		profileobj['id'] = parseInt('0x'+changeEndianness(profiles[0].id.substring(2)));
		profileobj['profileName'] = profiles[0]['profileName'];
		profileobj['EOAs'] = profiles[0]['EOAs'];
		profileobj['description'] = profiles[0]['description'];
		profileobj['waterType'] = profiles[0]['waterType'];
		profileobj['posts'] = profiles[0]['posts'];
	} else {
		profileobj['found'] = false;
	}
	return profileobj;
}

// search for river posts (as a lake) wrt simple criteria
async function lakeSimpleSearch(lat,lng,radius,minprice,maxprice){
	// get from `the graph`
	// PARAMS: lat,lng,radius,minprice,maxprice
	let iXx_gt = parseInt(10000*(lng-radius/69+180));
	let iXx_lt = parseInt(10000*(lng+radius/69+180));
	let iXy_gt = parseInt(10000*(lat-Math.sin(lat)*Math.sin(lat)*radius/69+90));
	let iXy_lt = parseInt(10000*(lat+Math.sin(lat)*Math.sin(lat)*radius/69+90));

	const query = gql`
		query quickSearch($waterTypevar: String!,$minpricevar:BigInt!,$maxpricevar:BigInt!,$iXx_gt:BigInt!,$iXx_lt:BigInt!,$iXy_gt:BigInt!,$iXy_lt:BigInt!){
			posts(where:{poster_:{waterType:$waterTypevar},iXx_gt:$iXx_gt,iXx_lt:$iXx_lt,iXy_gt:$iXy_gt,iXy_lt:$iXy_lt,price_gt:$minpricevar,price_lt:$maxpricevar}){
				...postListInfo
			}
		}
		${postListInfoFragment}
	`;

	const watertype = "LAKE";
	let res = await client.query(query,{
		waterTypevar: watertype,
		minpricevar: minprice,
		maxpricevar: maxprice,
		iXx_gt: iXx_gt,
		iXx_lt: iXx_lt,
		iXy_gt: iXy_gt,
		iXy_lt: iXy_lt,
	}).toPromise();
	console.log('below res');
	console.log(res);
	return res.data.posts;
}

// search for river posts (as a lake) wrt simple criteria
async function riverSimpleSearch(lat,lng,radius,minprice,maxprice){
	// get from `the graph`
	// PARAMS: lat,lng,radius,minprice,maxprice
	let iXx_gt = parseInt(10000*(lng-radius/69+180));
	let iXx_lt = parseInt(10000*(lng+radius/69+180));
	let iXy_gt = parseInt(10000*(lat-Math.sin(lat)*Math.sin(lat)*radius/69+90));
	let iXy_lt = parseInt(10000*(lat+Math.sin(lat)*Math.sin(lat)*radius/69+90));

	const query = gql`
		query quickSearch($waterTypevar: String!,$minpricevar:BigInt!,$maxpricevar:BigInt!,$iXx_gt:BigInt!,$iXx_lt:BigInt!,$iXy_gt:BigInt!,$iXy_lt:BigInt!){
			posts(where:{poster_:{waterType:$waterTypevar},iXx_gt:$iXx_gt,iXx_lt:$iXx_lt,iXy_gt:$iXy_gt,iXy_lt:$iXy_lt,price_gt:$minpricevar,price_lt:$maxpricevar}){
				...postListInfo
			}
		}
		${postListInfoFragment}
	`;

	const watertype = "LAKE";
	let res = await client.query(query,{
		waterTypevar: watertype,
		minpricevar: minprice,
		maxpricevar: maxprice,
		iXx_gt: iXx_gt,
		iXx_lt: iXx_lt,
		iXy_gt: iXy_gt,
		iXy_lt: iXy_lt,
	}).toPromise();
	console.log('below res');
	console.log(res);
	return res.data.posts;
}

async function lakeGetId(addr,profileName){
	query = gql`
		query lakeGetId($profileNameVar: String!){
			profiles(where:{profileName: $profileNameVar}){
				id
				EOAs
			}
		}
	`;
	
	const res = await client.query(query,{
		profileNameVar: profileName
	}).toPromise();

	let profiles = res.data.profiles;
	const profileobj = {}
	
	if (profiles.length>0){
		profileobj['found'] = true;
		profileobj['id'] = parseInt('0x'+changeEndianness(profiles[0].id.substring(2)));
		profileobj['EOAs'] = profiles[0]['EOAs'];
		if (!(profileobj['EOAs'].includes(addr))){
			console.log("raedaNodeError: address is not associated with profile");
			profileobj['found'] = false;
		}
	} else {
		profileobj['found'] = false;
		console.log("raedaNodeError: profile not found");
	}
	return profileobj;
}

async function riverGetId(addr,profileName){
	query = gql`
		query riverGetId($profileNameVar: String!){
			profiles(where:{profileName: $profileNameVar}){
				id
				EOAs
			}
		}
	`;
	
	const res = await client.query(query,{
		profileNameVar: profileName
	}).toPromise();

	let profiles = res.data.profiles;
	const profileobj = {}
	
	if (profiles.length>0){
		profileobj['found'] = true;
		profileobj['id'] = parseInt('0x'+changeEndianness(profiles[0].id.substring(2)));
		profileobj['EOAs'] = profiles[0]['EOAs'];
		if (!(profileobj['EOAs'].includes(addr))){
			console.log("raedaNodeError: address is not associated with profile");
			profileobj['found'] = false;
		}
	} else {
		profileobj['found'] = false;
		console.log("raedaNodeError: profile not found");
	}
	return profileobj;
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
	riverMyOpenBids,
	riverMyOpenPosts,
	riverSimpleSearch,
	lakeGetId,
	riverGetId,
	riverGetBids,
	getMessages,
	postMessage,
	getProfile,
	_rustCall
}