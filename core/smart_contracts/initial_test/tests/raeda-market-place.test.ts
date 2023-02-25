import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { logEntry } from "../generated/schema"
import { logEntry as logEntryEvent } from "../generated/raedaMarketPlace/raedaMarketPlace"
import { handlelogEntry } from "../src/raeda-market-place"
import { createlogEntryEvent } from "./raeda-market-place-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _id = BigInt.fromI32(234)
    let _providerID = BigInt.fromI32(234)
    let _providerName = "Example string value"
    let _providerAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let _initialGeohash = "Example string value"
    let _finalGeohash = "Example string value"
    let _storageSpace = BigInt.fromI32(234)
    let _live = "boolean Not implemented"
    let _askingPrice = BigInt.fromI32(234)
    let newlogEntryEvent = createlogEntryEvent(
      _id,
      _providerID,
      _providerName,
      _providerAddress,
      _initialGeohash,
      _finalGeohash,
      _storageSpace,
      _live,
      _askingPrice
    )
    handlelogEntry(newlogEntryEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("logEntry created and stored", () => {
    assert.entityCount("logEntry", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "logEntry",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_id",
      "234"
    )
    assert.fieldEquals(
      "logEntry",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_providerID",
      "234"
    )
    assert.fieldEquals(
      "logEntry",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_providerName",
      "Example string value"
    )
    assert.fieldEquals(
      "logEntry",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_providerAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "logEntry",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_initialGeohash",
      "Example string value"
    )
    assert.fieldEquals(
      "logEntry",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_finalGeohash",
      "Example string value"
    )
    assert.fieldEquals(
      "logEntry",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_storageSpace",
      "234"
    )
    assert.fieldEquals(
      "logEntry",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_live",
      "boolean Not implemented"
    )
    assert.fieldEquals(
      "logEntry",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_askingPrice",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
