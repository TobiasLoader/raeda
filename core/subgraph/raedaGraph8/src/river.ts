import {
  river,
  bidEvent as riverbidEventEvent,
  bucketEvent as riverbucketEventEvent,
  postEvent as riverpostEventEvent,
  resetEvent as riverresetEventEvent
} from "../generated/river/river"
import {
  Post,
  Bucket,Bid
} from "../generated/schema"
import { BigInt, Result } from '@graphprotocol/graph-ts'
import { Bytes } from '@graphprotocol/graph-ts'
import { store } from '@graphprotocol/graph-ts'
import { log } from '@graphprotocol/graph-ts'


export function handleriverbidEvent(event: riverbidEventEvent): void {
  const contract = river.bind(event.address)

  let entity2 = new Bid(event.params._bidId.toString())

  entity2.EOA = contract.bids(event.params._postId,event.params._bidId).getBidderEOA()
  entity2.amount = contract.bids(event.params._postId,event.params._bidId).getBidAmount()
  entity2.post = Bytes.fromI32(event.params._postId)
  entity2.bidder = Bytes.fromI32(contract.bids(event.params._postId,event.params._bidId).getBidderId())
  

  entity2.save()
}

export function handleriverbucketEvent(event: riverbucketEventEvent): void {
  const contract = river.bind(event.address)

  let entity2 = new Bucket(event.transaction.hash.concatI32(event.logIndex.toI32()).concatI32(1))

  entity2.category = event.params._category
  entity2.value = contract.checkBucket(event.params._postId,event.params._category)
  entity2.post = Bytes.fromI32(event.params._postId)

  entity2.save()
}

export function handleriverpostEvent(event: riverpostEventEvent): void {
  const contract = river.bind(event.address)
  const IdBytes = Bytes.fromI32(event.params._postId)

  let postEntity = Post.load(IdBytes)
  if (postEntity==null){
    postEntity = new Post(IdBytes)
  }
  

  const postFromCont = contract.collection(event.params._postId)

  postEntity.postName = postFromCont.getPostName()
  postEntity.EOA = postFromCont.getEOA()
  postEntity.price = postFromCont.getPrice()
  postEntity.iT = postFromCont.getIT()
  postEntity.fT = postFromCont.getFT()
  postEntity.exp = postFromCont.getExp()
  postEntity.description = postFromCont.getDescription()
  const post_deal = postFromCont.getPostState()

  //FIX

  // let ix = 0
  // let iy = 0
  // let fx = 0
  // let fy = 0
  // let z = 0

  const initialLocation = contract.getInitialLocation(event.params._postId)
  const finalLocation = contract.getFinalLocation(event.params._postId)
  
  postEntity.iXx = initialLocation.value0
  postEntity.iXy = initialLocation.value1
  postEntity.fXx = finalLocation.value0
  postEntity.fXy = finalLocation.value1

  postEntity.poster = Bytes.fromI32(postFromCont.getProfileId())

  if (post_deal == 0){
    postEntity.postState = "LIVE"
  }
  else if (post_deal == 1){
    postEntity.postState = "PENDING"
    postEntity.winningBid = postFromCont.getWinningBidId().toString()
  }
  else if (post_deal == 3){
    postEntity.postState = "LAKECLOSED"
  }
  else if (post_deal == 4){
    postEntity.postState = "RIVERCLOSED"
  }
  else if (post_deal == 5){
    postEntity.postState = "CLOSED"
  }

  postEntity.save()

}

export function handleriverresetEvent(event: riverresetEventEvent): void {

  const contract = river.bind(event.address)
  const IdBytes = Bytes.fromI32(event.params._postId)

  let postEntity = Post.load(IdBytes)
  if (postEntity==null){
    postEntity = new Post(IdBytes)
  }

  let bids = postEntity.bids
  if (bids==null){
    bids = []
  }

  for (let i = 0; i<bids.length;i++){
    // let bidEntity = Bid.load(bids[i])
    // if (bidEntity==null){
    //   bidEntity = new Bid(bids[i])
    // }
    store.remove('Bid',bids[i])

  }
}
