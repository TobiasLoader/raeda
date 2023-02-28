import {
  riverbidEvent as riverbidEventEvent,
  riverbucketEvent as riverbucketEventEvent,
  riverpostEvent as riverpostEventEvent
} from "../generated/river/river"
import {
  riverbidEvent,
  riverbucketEvent,
  riverpostEvent
} from "../generated/schema"

export function handleriverbidEvent(event: riverbidEventEvent): void {
  let entity = new riverbidEvent(
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

export function handleriverbucketEvent(event: riverbucketEventEvent): void {
  let entity = new riverbucketEvent(
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

export function handleriverpostEvent(event: riverpostEventEvent): void {
  let entity = new riverpostEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._postId = event.params._postId
  entity._live = event.params._live

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
