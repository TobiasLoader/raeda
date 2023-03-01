import { profile, profileEvent as profileEventEvent } from "../generated/profile/profile"
import { profileEvent, Profile } from "../generated/schema"
import { BigInt, Result } from '@graphprotocol/graph-ts'
import { Bytes } from '@graphprotocol/graph-ts'

export function handleprofileEvent(event: profileEventEvent): void {
  const contract = profile.bind(event.address)
  
  let entity = new profileEvent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._userId = event.params._userId
  entity._waterType = event.params._waterType
  entity._userName = event.params._userName
  entity._summary = event.params._summary

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()

  const profileId = Bytes.fromI32(event.params._userId.toI32())
  // console.log(type(profileId))
  let waterType: i32
  let username: string
  let summary: string

  const result = contract.profiles(event.params._userId)
  waterType=result.value0
  username=result.value1
  summary=result.value2

  let entity2 = new Profile(profileId)
  entity2.userName = username
  if (waterType == 0){
    entity2.waterType = "LAKE"
  }
  else if (waterType == 1){
    entity2.waterType = "RIVER"
  }
  entity2.Summary = summary

  entity2.save()


}
