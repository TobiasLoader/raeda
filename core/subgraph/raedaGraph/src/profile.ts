import { profile, profileEvent as profileEventEvent } from "../generated/profile/profile"
import { profileEvent } from "../generated/schema"

export function handleprofileEvent(event: profileEventEvent): void {
  let contract = profile.bind(event.address)
  
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
}
