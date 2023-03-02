import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import {} from "@graphprotocol/graph-ts"
import { bidEvent } from "../generated/schema"
import { bidEvent as bidEventEvent } from "../generated/lake/lake"
import { handlebidEvent } from "../src/lake"
import { createbidEventEvent } from "./lake-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let _postId = 123
    let _bidId = 123
    let _accepted = "boolean Not implemented"
    let newbidEventEvent = createbidEventEvent(_postId, _bidId, _accepted)
    handlebidEvent(newbidEventEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("bidEvent created and stored", () => {
    assert.entityCount("bidEvent", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "bidEvent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_postId",
      "123"
    )
    assert.fieldEquals(
      "bidEvent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_bidId",
      "123"
    )
    assert.fieldEquals(
      "bidEvent",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "_accepted",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
