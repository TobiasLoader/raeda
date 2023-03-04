import { newMockEvent } from "matchstick-as"
import { ethereum, Address } from "@graphprotocol/graph-ts"
import { addressEvent, profileEvent } from "../generated/profile/profile"

export function createaddressEventEvent(
  _userId: i32,
  param1: Address
): addressEvent {
  let addressEventEvent = changetype<addressEvent>(newMockEvent())

  addressEventEvent.parameters = new Array()

  addressEventEvent.parameters.push(
    new ethereum.EventParam(
      "_userId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_userId))
    )
  )
  addressEventEvent.parameters.push(
    new ethereum.EventParam("param1", ethereum.Value.fromAddress(param1))
  )

  return addressEventEvent
}

export function createprofileEventEvent(_userId: i32): profileEvent {
  let profileEventEvent = changetype<profileEvent>(newMockEvent())

  profileEventEvent.parameters = new Array()

  profileEventEvent.parameters.push(
    new ethereum.EventParam(
      "_userId",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_userId))
    )
  )

  return profileEventEvent
}
