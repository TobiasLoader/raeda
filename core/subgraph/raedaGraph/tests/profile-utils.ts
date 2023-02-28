import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import { profileEvent } from "../generated/profile/profile"

export function createprofileEventEvent(
  _userId: BigInt,
  _waterType: i32,
  _userName: string,
  _summary: string
): profileEvent {
  let profileEventEvent = changetype<profileEvent>(newMockEvent())

  profileEventEvent.parameters = new Array()

  profileEventEvent.parameters.push(
    new ethereum.EventParam(
      "_userId",
      ethereum.Value.fromUnsignedBigInt(_userId)
    )
  )
  profileEventEvent.parameters.push(
    new ethereum.EventParam(
      "_waterType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_waterType))
    )
  )
  profileEventEvent.parameters.push(
    new ethereum.EventParam("_userName", ethereum.Value.fromString(_userName))
  )
  profileEventEvent.parameters.push(
    new ethereum.EventParam("_summary", ethereum.Value.fromString(_summary))
  )

  return profileEventEvent
}
