import {
  bidEvent as bidEventEvent,
  bucketEvent as bucketEventEvent,
  postEvent as postEventEvent
} from "../generated/lake/lake"
import { bidEvent, bucketEvent, postEvent } from "../generated/schema"

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
}

export function handlepostEvent(event: postEventEvent): void {
  let entity = new postEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._postId = event.params._postId
  entity._live = event.params._live

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
