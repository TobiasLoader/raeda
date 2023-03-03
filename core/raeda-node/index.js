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
const bigToLittleEndianness = (string) => {
	const result = [];
	let len = string.length - 2;
	while (len >= 0) {
	  result.push(string.substr(len, 2));
	  len -= 2;
	}
	return result.join('');
}

function intToBytesLittleEndian(v){
	return '0x'+bigToLittleEndianness(ethers.utils.hexZeroPad('0x'+(v).toString(16), 4).substring(2));	
}

// get the bids as a lake (ie. supplier)
async function getPost(postId){
	// get from `the graph`
	// PARAMS: postId
	// let v = ethers.utils.hexZeroPad(ethers.utils.hexlify(1), 32)
	// let postid = changeEndianness(ethers.utils.hexlify(parseInt(postId)));
	// let v = BigInt(1);
	// console.log(postid)
	// console.log(ethers.hexZeroPad(v.toString(16), 32))

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

	return res.data.posts;
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
	// return [
	// 	{
	// 		'postid':1,
	// 		'bidprice':'0.12',
	// 		'info':'post1 on Rishin'
	// 	},
	// 	{
	// 		'postid':2,
	// 		'bidprice':'0.10',
	// 		'info':'post2 on Hamzah'
	// 	},
	// 	{
	// 		'postid':3,
	// 		'bidprice':'0.09',
	// 		'info':'post3 on Mary'
	// 	}
	// ];
}

// get the users (a lake) open posts
async function lakeMyOpenPosts(profileName){
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
		profileNameVar: profileName
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
	let iXx_gt = lng-radius+180;
	let iXx_lt = lng+radius+180;
	let iXy_gt = lat-radius+90;
	let iXy_lt = lat+radius+90;

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
	return res.data.posts;
	
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