// (see EtherscanProvider above for other network examples)
let provider = new InfuraProvider("maticmum");

/////////////// LAKE -- SUPPLIER ///////////////////

// post as a lake (ie. supplier)
function lakePost({postId,lakeId,lakeAddress,authAddress,maxPrice,iX,fX,exp,iT=null,fT=null}){
	// initPost(postId,lakeId,lakeAddress,authAddress,maxPrice,iX,fX,exp)
	// if (iT!=null) setInitialTime(iT)
	// if (fT!=null) setFinalTime(fT)
	return 'post uploaded successfully';
}

// bid as a lake (ie. supplier)
function lakeBid({postId,lakeAddress,bidPrice}){
	// bidPrice > minPrice (of riverPost)
	return 'bid registered successfully';
}

// get the bids as a lake (ie. supplier)
// -> for the <lakePost> with id <postId>: get all the <riverBid>'s.
function lakeGetBids(postId){
	return [{
		'postId':postId,
		'riverAddress':'0x01',
		'bidPrice':'0.12eth',
	}];
}

/////////////// RIVER -- LOGISTICS ///////////////////

// post as a river (ie. logistics)
function riverPost({postId,riverId,riverAddress,authAddress,minPrice,iX,fX,exp,iT=null,fT=null}){
	// initPost(postId,riverId,riverAddress,authAddress,minPrice,iX,fX,exp)
	// if (iT!=null) setInitialTime(iT)
	// if (fT!=null) setFinalTime(fT)
	return 'post uploaded successfully';
}

// bid as a river (ie. logistics)
function riverBid({postId,riverAddress,bidPrice}){
	// bidPrice < maxPrice (of lakePost)
	return 'bid registered successfully';
}

// get the bids as a river (ie. logistics)
// -> for the <riverPost> with id <postId>: get all the <lakeBid>'s.
function riverGetBids(postId){
	return [{
		'postId':postId,
		'lakeAddress':'0x01',
		'bidPrice':'0.12eth',
	}];
}