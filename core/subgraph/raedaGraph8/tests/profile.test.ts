import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address } from "@graphprotocol/graph-ts"
import { addressEvent } from "../generated/schema"
import { addressEvent as addressEventEvent } from "../generated/profile/profile"
import { handleaddressEvent } from "../src/profile"
import { createaddressEventEvent } from "./profile-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _userId = 123
    let param1 = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let newaddressEventEvent = createaddressEventEvent(_userId, param1)
    handleaddressEvent(newaddressEventEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("addressEvent created and stored", () => {
    assert.entityCount("addressEvent", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "addressEvent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_userId",
      "123"
    )
    assert.fieldEquals(
      "addressEvent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "param1",
      "0x0000000000000000000000000000000000000001"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
