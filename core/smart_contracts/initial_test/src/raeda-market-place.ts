import {
  logEntry as logEntryEvent,
  supEntry as supEntryEvent
} from "../generated/raedaMarketPlace/raedaMarketPlace"
import { logEntry, supEntry } from "../generated/schema"

export function handlelogEntry(event: logEntryEvent): void {
  let entity = new logEntry(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._idb = event.params._id
  entity._providerID = event.params._providerID
  entity._providerName = event.params._providerName
  entity._providerAddress = event.params._providerAddress
  entity._initialGeohash = event.params._initialGeohash
  entity._finalGeohash = event.params._finalGeohash
  entity._storageSpace = event.params._storageSpace
  entity._live = event.params._live
  entity._askingPrice = event.params._askingPrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlesupEntry(event: supEntryEvent): void {
  let entity = new supEntry(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._idb = event.params._id
  entity._supplierID = event.params._supplierID
  entity._supplierName = event.params._supplierName
  entity._supplierAddress = event.params._supplierAddress
  entity._initialGeohash = event.params._initialGeohash
  entity._finalGeohash = event.params._finalGeohash
  entity._storageQuantity = event.params._storageQuantity
  entity._live = event.params._live
  entity._offerPrice = event.params._offerPrice

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
