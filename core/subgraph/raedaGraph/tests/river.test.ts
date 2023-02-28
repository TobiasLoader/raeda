import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { riverbidEvent } from "../generated/schema"
import { riverbidEvent as riverbidEventEvent } from "../generated/river/river"
import { handleriverbidEvent } from "../src/river"
import { createriverbidEventEvent } from "./river-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _postId = BigInt.fromI32(234)
    let _bidId = BigInt.fromI32(234)
    let _accepted = "boolean Not implemented"
    let newriverbidEventEvent = createriverbidEventEvent(
      _postId,
      _bidId,
      _accepted
    )
    handleriverbidEvent(newriverbidEventEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("riverbidEvent created and stored", () => {
    assert.entityCount("riverbidEvent", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "riverbidEvent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_postId",
      "234"
    )
    assert.fieldEquals(
      "riverbidEvent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_bidId",
      "234"
    )
    assert.fieldEquals(
      "riverbidEvent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_accepted",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
