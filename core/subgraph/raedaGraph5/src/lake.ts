import {
  lake,
  bidEvent as bidEventEvent,
  bucketEvent as bucketEventEvent,
  postEvent as postEventEvent,
  resetEvent as resetEventEvent
} from "../generated/lake/lake"
import {
  Post,
  Bucket,
  Bid
} from "../generated/schema"
import { BigInt, Result } from '@graphprotocol/graph-ts'
import { Bytes } from '@graphprotocol/graph-ts'
import { store } from '@graphprotocol/graph-ts'

export function handlebidEvent(event: bidEventEvent): void {
  // let entity = new bidEvent(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity._postId = event.params._postId
  // entity._bidId = event.params._bidId
  // entity._accepted = event.params._accepted

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  // entity.save()
  const contract = lake.bind(event.address)

  let entity2 = new Bid(event.params._bidId.toString())

  entity2.EOA = contract.bids(event.params._postId,event.params._bidId).getBidderEOA()
  entity2.amount = contract.bids(event.params._postId,event.params._bidId).getBidAmount()
  entity2.accepted = contract.bids(event.params._postId,event.params._bidId).getAccepted()
  entity2.post = Bytes.fromI32(event.params._postId)
  entity2.bidder = Bytes.fromI32(contract.bids(event.params._postId,event.params._bidId).getBidderId())

  entity2.save()
}

export function handlebucketEvent(event: bucketEventEvent): void {
  // let entity = new bucketEvent(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity._postId = event.params._postId
  // entity._category = event.params._category

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  // entity.save()

  const contract = lake.bind(event.address)

  let entity2 = new Bucket(event.transaction.hash.concatI32(event.logIndex.toI32()).concatI32(1))

  entity2.category = event.params._category
  entity2.value = contract.checkBucket(event.params._postId,event.params._category)
  entity2.post = Bytes.fromI32(event.params._postId)

  entity2.save()
}

export function handlepostEvent(event: postEventEvent): void {
  // let entity = new postEvent(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity._postId = event.params._postId
  // entity._live = event.params._live

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  // entity.save()

  const contract = lake.bind(event.address)
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
  postEntity.live = postFromCont.getLive()

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

  postEntity.save()

}

export function handleresetEvent(event: resetEventEvent): void {
  // let entity = new resetEvent(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity._postId = event.params._postId

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  // entity.save()

  const contract = lake.bind(event.address)
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
