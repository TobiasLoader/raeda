import { newMockEvent } from "matchstick-as"
import { ethereum } from "@graphprotocol/graph-ts"
import {
  riverbidEvent,
  riverbucketEvent,
  riverpostEvent,
  riverresetEvent
} from "../generated/river/river"

export function createriverbidEventEvent(
  _postId: i32,
  _bidId: i32
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

export function createriverpostEventEvent(
  _postId: i32,
  _postState: i32
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
    new ethereum.EventParam(
      "_postState",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_postState))
    )
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
