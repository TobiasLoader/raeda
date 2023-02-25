import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  logEntry,
  supEntry
} from "../generated/raedaMarketPlace/raedaMarketPlace"

export function createlogEntryEvent(
  _id: BigInt,
  _providerID: BigInt,
  _providerName: string,
  _providerAddress: Address,
  _initialGeohash: string,
  _finalGeohash: string,
  _storageSpace: BigInt,
  _live: boolean,
  _askingPrice: BigInt
): logEntry {
  let logEntryEvent = changetype<logEntry>(newMockEvent())

  logEntryEvent.parameters = new Array()

  logEntryEvent.parameters.push(
    new ethereum.EventParam("_id", ethereum.Value.fromUnsignedBigInt(_id))
  )
  logEntryEvent.parameters.push(
    new ethereum.EventParam(
      "_providerID",
      ethereum.Value.fromUnsignedBigInt(_providerID)
    )
  )
  logEntryEvent.parameters.push(
    new ethereum.EventParam(
      "_providerName",
      ethereum.Value.fromString(_providerName)
    )
  )
  logEntryEvent.parameters.push(
    new ethereum.EventParam(
      "_providerAddress",
      ethereum.Value.fromAddress(_providerAddress)
    )
  )
  logEntryEvent.parameters.push(
    new ethereum.EventParam(
      "_initialGeohash",
      ethereum.Value.fromString(_initialGeohash)
    )
  )
  logEntryEvent.parameters.push(
    new ethereum.EventParam(
      "_finalGeohash",
      ethereum.Value.fromString(_finalGeohash)
    )
  )
  logEntryEvent.parameters.push(
    new ethereum.EventParam(
      "_storageSpace",
      ethereum.Value.fromUnsignedBigInt(_storageSpace)
    )
  )
  logEntryEvent.parameters.push(
    new ethereum.EventParam("_live", ethereum.Value.fromBoolean(_live))
  )
  logEntryEvent.parameters.push(
    new ethereum.EventParam(
      "_askingPrice",
      ethereum.Value.fromUnsignedBigInt(_askingPrice)
    )
  )

  return logEntryEvent
}

export function createsupEntryEvent(
  _id: BigInt,
  _supplierID: BigInt,
  _supplierName: string,
  _supplierAddress: Address,
  _initialGeohash: string,
  _finalGeohash: string,
  _storageQuantity: BigInt,
  _live: boolean,
  _offerPrice: BigInt
): supEntry {
  let supEntryEvent = changetype<supEntry>(newMockEvent())

  supEntryEvent.parameters = new Array()

  supEntryEvent.parameters.push(
    new ethereum.EventParam("_id", ethereum.Value.fromUnsignedBigInt(_id))
  )
  supEntryEvent.parameters.push(
    new ethereum.EventParam(
      "_supplierID",
      ethereum.Value.fromUnsignedBigInt(_supplierID)
    )
  )
  supEntryEvent.parameters.push(
    new ethereum.EventParam(
      "_supplierName",
      ethereum.Value.fromString(_supplierName)
    )
  )
  supEntryEvent.parameters.push(
    new ethereum.EventParam(
      "_supplierAddress",
      ethereum.Value.fromAddress(_supplierAddress)
    )
  )
  supEntryEvent.parameters.push(
    new ethereum.EventParam(
      "_initialGeohash",
      ethereum.Value.fromString(_initialGeohash)
    )
  )
  supEntryEvent.parameters.push(
    new ethereum.EventParam(
      "_finalGeohash",
      ethereum.Value.fromString(_finalGeohash)
    )
  )
  supEntryEvent.parameters.push(
    new ethereum.EventParam(
      "_storageQuantity",
      ethereum.Value.fromUnsignedBigInt(_storageQuantity)
    )
  )
  supEntryEvent.parameters.push(
    new ethereum.EventParam("_live", ethereum.Value.fromBoolean(_live))
  )
  supEntryEvent.parameters.push(
    new ethereum.EventParam(
      "_offerPrice",
      ethereum.Value.fromUnsignedBigInt(_offerPrice)
    )
  )

  return supEntryEvent
}
