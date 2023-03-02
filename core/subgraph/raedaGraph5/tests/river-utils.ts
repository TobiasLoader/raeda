import { newMockEvent } from "matchstick-as"
import { ethereum } from "@graphprotocol/graph-ts"
import {
  riverbidEvent,
  riverbucketEvent,
  riverpendingEvent,
  riverpostEvent,
  riverresetEvent
} from "../generated/river/river"

export function createriverbidEventEvent(
  _postId: i32,
  _bidId: i32,
  _accepted: boolean
): riverbidEvent {
  let riverbidEventEvent = changetype<riverbidEvent>(newMockEvent())

  riverbidEventEvent.parameters = new Array()

  riverbidEventEvent.parameters.push(
    new ethereum.EventParam(
      "_postId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_postId))
    )
  )
  riverbidEventEvent.parameters.push(
    new ethereum.EventParam(
      "_bidId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_bidId))
    )
  )
  riverbidEventEvent.parameters.push(
    new ethereum.EventParam("_accepted", ethereum.Value.fromBoolean(_accepted))
  )

  return riverbidEventEvent
}

export function createriverbucketEventEvent(
  _postId: i32,
  _category: string
): riverbucketEvent {
  let riverbucketEventEvent = changetype<riverbucketEvent>(newMockEvent())

  riverbucketEventEvent.parameters = new Array()

  riverbucketEventEvent.parameters.push(
    new ethereum.EventParam(
      "_postId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_postId))
    )
  )
  riverbucketEventEvent.parameters.push(
    new ethereum.EventParam("_category", ethereum.Value.fromString(_category))
  )

  return riverbucketEventEvent
}

export function createriverpendingEventEvent(
  _postId: i32,
  _dealState: i32
): riverpendingEvent {
  let riverpendingEventEvent = changetype<riverpendingEvent>(newMockEvent())

  riverpendingEventEvent.parameters = new Array()

  riverpendingEventEvent.parameters.push(
    new ethereum.EventParam(
      "_postId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_postId))
    )
  )
  riverpendingEventEvent.parameters.push(
    new ethereum.EventParam(
      "_dealState",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_dealState))
    )
  )

  return riverpendingEventEvent
}

export function createriverpostEventEvent(
  _postId: i32,
  _live: boolean
): riverpostEvent {
  let riverpostEventEvent = changetype<riverpostEvent>(newMockEvent())

  riverpostEventEvent.parameters = new Array()

  riverpostEventEvent.parameters.push(
    new ethereum.EventParam(
      "_postId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_postId))
    )
  )
  riverpostEventEvent.parameters.push(
    new ethereum.EventParam("_live", ethereum.Value.fromBoolean(_live))
  )

  return riverpostEventEvent
}

export function createriverresetEventEvent(_postId: i32): riverresetEvent {
  let riverresetEventEvent = changetype<riverresetEvent>(newMockEvent())

  riverresetEventEvent.parameters = new Array()

  riverresetEventEvent.parameters.push(
    new ethereum.EventParam(
      "_postId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_postId))
    )
  )

  return riverresetEventEvent
}
