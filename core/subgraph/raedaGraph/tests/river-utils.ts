import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import {
  riverbidEvent,
  riverbucketEvent,
  riverpostEvent
} from "../generated/river/river"

export function createriverbidEventEvent(
  _postId: BigInt,
  _bidId: BigInt,
  _accepted: boolean
): riverbidEvent {
  let riverbidEventEvent = changetype<riverbidEvent>(newMockEvent())

  riverbidEventEvent.parameters = new Array()

  riverbidEventEvent.parameters.push(
    new ethereum.EventParam(
      "_postId",
      ethereum.Value.fromUnsignedBigInt(_postId)
    )
  )
  riverbidEventEvent.parameters.push(
    new ethereum.EventParam("_bidId", ethereum.Value.fromUnsignedBigInt(_bidId))
  )
  riverbidEventEvent.parameters.push(
    new ethereum.EventParam("_accepted", ethereum.Value.fromBoolean(_accepted))
  )

  return riverbidEventEvent
}

export function createriverbucketEventEvent(
  _postId: BigInt,
  _category: string,
  _bucketValType: i32
): riverbucketEvent {
  let riverbucketEventEvent = changetype<riverbucketEvent>(newMockEvent())

  riverbucketEventEvent.parameters = new Array()

  riverbucketEventEvent.parameters.push(
    new ethereum.EventParam(
      "_postId",
      ethereum.Value.fromUnsignedBigInt(_postId)
    )
  )
  riverbucketEventEvent.parameters.push(
    new ethereum.EventParam("_category", ethereum.Value.fromString(_category))
  )
  riverbucketEventEvent.parameters.push(
    new ethereum.EventParam(
      "_bucketValType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_bucketValType))
    )
  )

  return riverbucketEventEvent
}

export function createriverpostEventEvent(
  _postId: BigInt,
  _live: boolean
): riverpostEvent {
  let riverpostEventEvent = changetype<riverpostEvent>(newMockEvent())

  riverpostEventEvent.parameters = new Array()

  riverpostEventEvent.parameters.push(
    new ethereum.EventParam(
      "_postId",
      ethereum.Value.fromUnsignedBigInt(_postId)
    )
  )
  riverpostEventEvent.parameters.push(
    new ethereum.EventParam("_live", ethereum.Value.fromBoolean(_live))
  )

  return riverpostEventEvent
}
