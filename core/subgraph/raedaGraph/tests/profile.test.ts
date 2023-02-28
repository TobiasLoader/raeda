import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { profileEvent } from "../generated/schema"
import { profileEvent as profileEventEvent } from "../generated/profile/profile"
import { handleprofileEvent } from "../src/profile"
import { createprofileEventEvent } from "./profile-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _userId = BigInt.fromI32(234)
    let _waterType = 123
    let _userName = "Example string value"
    let _summary = "Example string value"
    let newprofileEventEvent = createprofileEventEvent(
      _userId,
      _waterType,
      _userName,
      _summary
    )
    handleprofileEvent(newprofileEventEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("profileEvent created and stored", () => {
    assert.entityCount("profileEvent", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "profileEvent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_userId",
      "234"
    )
    assert.fieldEquals(
      "profileEvent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_waterType",
      "123"
    )
    assert.fieldEquals(
      "profileEvent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_userName",
      "Example string value"
    )
    assert.fieldEquals(
      "profileEvent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_summary",
      "Example string value"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
