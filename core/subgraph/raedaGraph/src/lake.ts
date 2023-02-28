import {
  lake,
  bidEvent as bidEventEvent,
  bucketEvent as bucketEventEvent,
  postEvent as postEventEvent
} from "../generated/lake/lake"
import { bidEvent, bucketEvent, postEvent, Post, Bucket, Bid } from "../generated/schema"
import { BigInt, Result } from '@graphprotocol/graph-ts'
import { Bytes } from '@graphprotocol/graph-ts'

export function handlebidEvent(event: bidEventEvent): void {
  let entity = new bidEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._postId = event.params._postId
  entity._bidId = event.params._bidId
  entity._accepted = event.params._accepted

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  const contract = lake.bind(event.address)

  let entity2 = new Bid(Bytes.fromI32(event.params._bidId.toI32()))

  entity2.EOA = contract.bids(event.params._postId,event.params._bidId).getBidderEOA()
  entity2.amount = contract.bids(event.params._postId,event.params._bidId).getBidAmount()
  entity2.accepted = contract.bids(event.params._postId,event.params._bidId).getAccepted()
  entity2.post = Bytes.fromI32(event.params._postId.toI32())
  entity2.bidder = Bytes.fromI32(contract.bids(event.params._postId,event.params._bidId).getBidderId().toI32())

  entity2.save()
}

export function handlebucketEvent(event: bucketEventEvent): void {
  let entity = new bucketEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._postId = event.params._postId
  entity._category = event.params._category
  entity._bucketValType = event.params._bucketValType

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  const contract = lake.bind(event.address)

  let entity2 = new Bucket(event.transaction.hash.concatI32(event.logIndex.toI32()).concatI32(1))

  entity2.category = event.params._category
  entity2.value = contract.checkBucket(event.params._postId,event.params._category).value2
  entity2.post = Bytes.fromI32(event.params._postId.toI32())

  entity2.save()

}

export function handlepostEvent(event: postEventEvent): void {

  const contract = lake.bind(event.address)



  let entity = new postEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._postId = event.params._postId
  entity._live = event.params._live

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  const IdBytes = Bytes.fromI32(event.params._postId.toI32())

  let entity2 = Post.load(IdBytes)

  if (entity2 == null) {
    entity2 = new Post(IdBytes)
  }

  const postFromCont = contract.collection(event.params._postId)

  entity2.postName = postFromCont.getPostName()
  entity2.EOA = postFromCont.getEOA()
  entity2.price = postFromCont.getPrice()
  //INSERT LOCATION GATHERER FUNCTION
  entity2.iT = postFromCont.getIT()
  entity2.fT = postFromCont.getFT()
  entity2.exp = postFromCont.getExp()
  entity2.live = postFromCont.getLive()

  
  entity2.poster = Bytes.fromI32(postFromCont.value1.toI32())
  //NB PROBLEM WITH SAME ID FOR LAKE AND RIVER POST
  
  entity2.save()
    
    
}