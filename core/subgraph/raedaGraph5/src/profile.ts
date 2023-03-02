import {
  profile,
  addressEvent as addressEventEvent,
  profileEvent as profileEventEvent
} from "../generated/profile/profile"
import { Profile } from "../generated/schema"
import { Bytes } from '@graphprotocol/graph-ts'
import { BigInt, Result } from '@graphprotocol/graph-ts'
import { log } from '@graphprotocol/graph-ts'

export function handleaddressEvent(event: addressEventEvent): void {
  // let entity = new addressEvent(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity._userId = event.params._userId
  // entity.param1 = event.params.param1

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  // entity.save()

  // const contract = profile.bind(event.address)
  const profileId = Bytes.fromI32(event.params._userId)
  let profileEntity = Profile.load(profileId)
  if (profileEntity == null){
    profileEntity = new Profile(profileId)
  }
  let EOAs = profileEntity.EOAs
  if (EOAs == null){
    EOAs = []
  }
  EOAs.push(event.params.param1)
  profileEntity.EOAs = EOAs
  // let waterType: i32
  // // let profilename: string
  // // let description: string
  // const contract = profile.bind(event.address)


  // const result = contract.profiles(event.params._userId)
  // waterType=result.getWaterType()
  // profileEntity.profileName=result.getProfileName()
  // profileEntity.description=result.getDescription()


  // if (waterType == 0){
  //   log.debug('Watertype is {}',[waterType.toString()])
  //   profileEntity.waterType = "LAKE"
  // }
  // else if (waterType == 1){
  //   profileEntity.waterType = "RIVER"
  // }

  profileEntity.save()

}

export function handleprofileEvent(event: profileEventEvent): void {
  // let entity = new profileEvent(
  //   event.transaction.hash.concatI32(event.logIndex.toI32())
  // )
  // entity._userId = event.params._userId

  // entity.blockNumber = event.block.number
  // entity.blockTimestamp = event.block.timestamp
  // entity.transactionHash = event.transaction.hash

  // entity.save()
  const contract = profile.bind(event.address)

  const profileId = Bytes.fromI32(event.params._userId)

  let profileEntity = Profile.load(profileId)
  if (profileEntity == null){
    profileEntity = new Profile(profileId)
    // profileEntity.EOAs = []
  }
  let waterType: i32
  // let profilename: string
  // let description: string

  const result = contract.profiles(event.params._userId)
  waterType=result.getWaterType()
  profileEntity.profileName=result.getProfileName()
  profileEntity.description=result.getDescription()

  if (waterType == 0){
    log.debug('Watertype is {}',[waterType.toString()])
    profileEntity.waterType = "LAKE"
  }
  else if (waterType == 1){
    profileEntity.waterType = "RIVER"
  }

  profileEntity.save()

  

}
