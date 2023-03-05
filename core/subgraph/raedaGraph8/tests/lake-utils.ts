import { newMockEvent } from "matchstick-as"
import { ethereum } from "@graphprotocol/graph-ts"
import {
  bidEvent,
  bucketEvent,
  postEvent,
  resetEvent
} from "../generated/lake/lake"

export function createbidEventEvent(_postId: i32, _bidId: i32): bidEvent {
  let bidEventEvent = changetype<bidEvent>(newMockEvent())

  bidEventEvent.parameters = new Array()

  bidEventEvent.parameters.push(
    new ethereum.EventParam(
      "_postId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_postId))
    )
  )
  bidEventEvent.parameters.push(
    new ethereum.EventParam(
      "_bidId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_bidId))
    )
  )

  return bidEventEvent
}

export function createbucketEventEvent(
  _postId: i32,
  _category: string
): bucketEvent {
  let bucketEventEvent = changetype<bucketEvent>(newMockEvent())

  bucketEventEvent.parameters = new Array()

  bucketEventEvent.parameters.push(
    new ethereum.EventParam(
      "_postId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_postId))
    )
  )
  bucketEventEvent.parameters.push(
    new ethereum.EventParam("_category", ethereum.Value.fromString(_category))
  )

  return bucketEventEvent
}

export function createpostEventEvent(_postId: i32, _postState: i32): postEvent {
  let postEventEvent = changetype<postEvent>(newMockEvent())

  postEventEvent.parameters = new Array()

  postEventEvent.parameters.push(
    new ethereum.EventParam(
      "_postId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_postId))
    )
  )
  postEventEvent.parameters.push(
    new ethereum.EventParam(
      "_postState",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_postState))
    )
  )

  return postEventEvent
}

export function createresetEventEvent(_postId: i32): resetEvent {
  let resetEventEvent = changetype<resetEvent>(newMockEvent())

  resetEventEvent.parameters = new Array()

  resetEventEvent.parameters.push(
    new ethereum.EventParam(
      "_postId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_postId))
    )
  )

  return resetEventEvent
}
