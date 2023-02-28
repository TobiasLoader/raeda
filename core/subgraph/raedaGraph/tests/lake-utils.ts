import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import { bidEvent, bucketEvent, postEvent } from "../generated/lake/lake"

export function createbidEventEvent(
  _postId: BigInt,
  _bidId: BigInt,
  _accepted: boolean
): bidEvent {
  let bidEventEvent = changetype<bidEvent>(newMockEvent())

  bidEventEvent.parameters = new Array()

  bidEventEvent.parameters.push(
    new ethereum.EventParam(
      "_postId",
      ethereum.Value.fromUnsignedBigInt(_postId)
    )
  )
  bidEventEvent.parameters.push(
    new ethereum.EventParam("_bidId", ethereum.Value.fromUnsignedBigInt(_bidId))
  )
  bidEventEvent.parameters.push(
    new ethereum.EventParam("_accepted", ethereum.Value.fromBoolean(_accepted))
  )

  return bidEventEvent
}

export function createbucketEventEvent(
  _postId: BigInt,
  _category: string,
  _bucketValType: i32
): bucketEvent {
  let bucketEventEvent = changetype<bucketEvent>(newMockEvent())

  bucketEventEvent.parameters = new Array()

  bucketEventEvent.parameters.push(
    new ethereum.EventParam(
      "_postId",
      ethereum.Value.fromUnsignedBigInt(_postId)
    )
  )
  bucketEventEvent.parameters.push(
    new ethereum.EventParam("_category", ethereum.Value.fromString(_category))
  )
  bucketEventEvent.parameters.push(
    new ethereum.EventParam(
      "_bucketValType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_bucketValType))
    )
  )

  return bucketEventEvent
}

export function createpostEventEvent(
  _postId: BigInt,
  _live: boolean
): postEvent {
  let postEventEvent = changetype<postEvent>(newMockEvent())

  postEventEvent.parameters = new Array()

  postEventEvent.parameters.push(
    new ethereum.EventParam(
      "_postId",
      ethereum.Value.fromUnsignedBigInt(_postId)
    )
  )
  postEventEvent.parameters.push(
    new ethereum.EventParam("_live", ethereum.Value.fromBoolean(_live))
  )

  return postEventEvent
}
