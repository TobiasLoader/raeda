// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class riverbidEvent extends ethereum.Event {
  get params(): riverbidEvent__Params {
    return new riverbidEvent__Params(this);
  }
}

export class riverbidEvent__Params {
  _event: riverbidEvent;

  constructor(event: riverbidEvent) {
    this._event = event;
  }

  get _postId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _bidId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get _accepted(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class riverbucketEvent extends ethereum.Event {
  get params(): riverbucketEvent__Params {
    return new riverbucketEvent__Params(this);
  }
}

export class riverbucketEvent__Params {
  _event: riverbucketEvent;

  constructor(event: riverbucketEvent) {
    this._event = event;
  }

  get _postId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _category(): string {
    return this._event.parameters[1].value.toString();
  }

  get _bucketValType(): i32 {
    return this._event.parameters[2].value.toI32();
  }
}

export class riverpostEvent extends ethereum.Event {
  get params(): riverpostEvent__Params {
    return new riverpostEvent__Params(this);
  }
}

export class riverpostEvent__Params {
  _event: riverpostEvent;

  constructor(event: riverpostEvent) {
    this._event = event;
  }

  get _postId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get _live(): boolean {
    return this._event.parameters[1].value.toBoolean();
  }
}

export class river__bidsResult {
  value0: BigInt;
  value1: Address;
  value2: BigInt;
  value3: boolean;

  constructor(
    value0: BigInt,
    value1: Address,
    value2: BigInt,
    value3: boolean
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromAddress(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromBoolean(this.value3));
    return map;
  }

  getBidderId(): BigInt {
    return this.value0;
  }

  getBidderEOA(): Address {
    return this.value1;
  }

  getBidAmount(): BigInt {
    return this.value2;
  }

  getAccepted(): boolean {
    return this.value3;
  }
}

export class river__checkBucketResult {
  value0: BigInt;
  value1: boolean;
  value2: string;

  constructor(value0: BigInt, value1: boolean, value2: string) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromBoolean(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    return map;
  }

  getValue0(): BigInt {
    return this.value0;
  }

  getValue1(): boolean {
    return this.value1;
  }

  getValue2(): string {
    return this.value2;
  }
}

export class river__collectionResultIXStruct extends ethereum.Tuple {
  get x(): BigInt {
    return this[0].toBigInt();
  }

  get y(): BigInt {
    return this[1].toBigInt();
  }
}

export class river__collectionResultFXStruct extends ethereum.Tuple {
  get x(): BigInt {
    return this[0].toBigInt();
  }

  get y(): BigInt {
    return this[1].toBigInt();
  }
}

export class river__collectionResult {
  value0: string;
  value1: BigInt;
  value2: Address;
  value3: BigInt;
  value4: river__collectionResultIXStruct;
  value5: river__collectionResultFXStruct;
  value6: BigInt;
  value7: BigInt;
  value8: BigInt;
  value9: boolean;
  value10: BigInt;

  constructor(
    value0: string,
    value1: BigInt,
    value2: Address,
    value3: BigInt,
    value4: river__collectionResultIXStruct,
    value5: river__collectionResultFXStruct,
    value6: BigInt,
    value7: BigInt,
    value8: BigInt,
    value9: boolean,
    value10: BigInt
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
    this.value7 = value7;
    this.value8 = value8;
    this.value9 = value9;
    this.value10 = value10;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromString(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromAddress(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromTuple(this.value4));
    map.set("value5", ethereum.Value.fromTuple(this.value5));
    map.set("value6", ethereum.Value.fromUnsignedBigInt(this.value6));
    map.set("value7", ethereum.Value.fromUnsignedBigInt(this.value7));
    map.set("value8", ethereum.Value.fromUnsignedBigInt(this.value8));
    map.set("value9", ethereum.Value.fromBoolean(this.value9));
    map.set("value10", ethereum.Value.fromUnsignedBigInt(this.value10));
    return map;
  }

  getPostName(): string {
    return this.value0;
  }

  getUserId(): BigInt {
    return this.value1;
  }

  getEOA(): Address {
    return this.value2;
  }

  getPrice(): BigInt {
    return this.value3;
  }

  getIX(): river__collectionResultIXStruct {
    return this.value4;
  }

  getFX(): river__collectionResultFXStruct {
    return this.value5;
  }

  getIT(): BigInt {
    return this.value6;
  }

  getFT(): BigInt {
    return this.value7;
  }

  getExp(): BigInt {
    return this.value8;
  }

  getLive(): boolean {
    return this.value9;
  }

  getWinningBidId(): BigInt {
    return this.value10;
  }
}

export class river extends ethereum.SmartContract {
  static bind(address: Address): river {
    return new river("river", address);
  }

  bids(param0: BigInt, param1: BigInt): river__bidsResult {
    let result = super.call(
      "bids",
      "bids(uint32,uint32):(uint32,address,uint256,bool)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return new river__bidsResult(
      result[0].toBigInt(),
      result[1].toAddress(),
      result[2].toBigInt(),
      result[3].toBoolean()
    );
  }

  try_bids(
    param0: BigInt,
    param1: BigInt
  ): ethereum.CallResult<river__bidsResult> {
    let result = super.tryCall(
      "bids",
      "bids(uint32,uint32):(uint32,address,uint256,bool)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new river__bidsResult(
        value[0].toBigInt(),
        value[1].toAddress(),
        value[2].toBigInt(),
        value[3].toBoolean()
      )
    );
  }

  checkBucket(_postId: BigInt, _category: string): river__checkBucketResult {
    let result = super.call(
      "checkBucket",
      "checkBucket(uint32,string):(uint32,bool,string)",
      [
        ethereum.Value.fromUnsignedBigInt(_postId),
        ethereum.Value.fromString(_category)
      ]
    );

    return new river__checkBucketResult(
      result[0].toBigInt(),
      result[1].toBoolean(),
      result[2].toString()
    );
  }

  try_checkBucket(
    _postId: BigInt,
    _category: string
  ): ethereum.CallResult<river__checkBucketResult> {
    let result = super.tryCall(
      "checkBucket",
      "checkBucket(uint32,string):(uint32,bool,string)",
      [
        ethereum.Value.fromUnsignedBigInt(_postId),
        ethereum.Value.fromString(_category)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new river__checkBucketResult(
        value[0].toBigInt(),
        value[1].toBoolean(),
        value[2].toString()
      )
    );
  }

  collection(param0: BigInt): river__collectionResult {
    let result = super.call(
      "collection",
      "collection(uint32):(string,uint32,address,uint256,(uint32,uint32),(uint32,uint32),uint32,uint32,uint32,bool,uint32)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new river__collectionResult(
      result[0].toString(),
      result[1].toBigInt(),
      result[2].toAddress(),
      result[3].toBigInt(),
      changetype<river__collectionResultIXStruct>(result[4].toTuple()),
      changetype<river__collectionResultFXStruct>(result[5].toTuple()),
      result[6].toBigInt(),
      result[7].toBigInt(),
      result[8].toBigInt(),
      result[9].toBoolean(),
      result[10].toBigInt()
    );
  }

  try_collection(param0: BigInt): ethereum.CallResult<river__collectionResult> {
    let result = super.tryCall(
      "collection",
      "collection(uint32):(string,uint32,address,uint256,(uint32,uint32),(uint32,uint32),uint32,uint32,uint32,bool,uint32)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new river__collectionResult(
        value[0].toString(),
        value[1].toBigInt(),
        value[2].toAddress(),
        value[3].toBigInt(),
        changetype<river__collectionResultIXStruct>(value[4].toTuple()),
        changetype<river__collectionResultFXStruct>(value[5].toTuple()),
        value[6].toBigInt(),
        value[7].toBigInt(),
        value[8].toBigInt(),
        value[9].toBoolean(),
        value[10].toBigInt()
      )
    );
  }

  pendingDeals(param0: BigInt): i32 {
    let result = super.call("pendingDeals", "pendingDeals(uint32):(uint8)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);

    return result[0].toI32();
  }

  try_pendingDeals(param0: BigInt): ethereum.CallResult<i32> {
    let result = super.tryCall("pendingDeals", "pendingDeals(uint32):(uint8)", [
      ethereum.Value.fromUnsignedBigInt(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toI32());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }

  get _profileContractAddress(): Address {
    return this._call.inputValues[0].value.toAddress();
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class AcceptBidCall extends ethereum.Call {
  get inputs(): AcceptBidCall__Inputs {
    return new AcceptBidCall__Inputs(this);
  }

  get outputs(): AcceptBidCall__Outputs {
    return new AcceptBidCall__Outputs(this);
  }
}

export class AcceptBidCall__Inputs {
  _call: AcceptBidCall;

  constructor(call: AcceptBidCall) {
    this._call = call;
  }

  get _postId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _bidId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class AcceptBidCall__Outputs {
  _call: AcceptBidCall;

  constructor(call: AcceptBidCall) {
    this._call = call;
  }
}

export class AddTimesCall extends ethereum.Call {
  get inputs(): AddTimesCall__Inputs {
    return new AddTimesCall__Inputs(this);
  }

  get outputs(): AddTimesCall__Outputs {
    return new AddTimesCall__Outputs(this);
  }
}

export class AddTimesCall__Inputs {
  _call: AddTimesCall;

  constructor(call: AddTimesCall) {
    this._call = call;
  }

  get _postId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _iT(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _fT(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class AddTimesCall__Outputs {
  _call: AddTimesCall;

  constructor(call: AddTimesCall) {
    this._call = call;
  }
}

export class AddToBucketCall extends ethereum.Call {
  get inputs(): AddToBucketCall__Inputs {
    return new AddToBucketCall__Inputs(this);
  }

  get outputs(): AddToBucketCall__Outputs {
    return new AddToBucketCall__Outputs(this);
  }
}

export class AddToBucketCall__Inputs {
  _call: AddToBucketCall;

  constructor(call: AddToBucketCall) {
    this._call = call;
  }

  get _postId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _category(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _valType(): i32 {
    return this._call.inputValues[2].value.toI32();
  }

  get _intVal(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get _boolVal(): boolean {
    return this._call.inputValues[4].value.toBoolean();
  }

  get _strVal(): string {
    return this._call.inputValues[5].value.toString();
  }
}

export class AddToBucketCall__Outputs {
  _call: AddToBucketCall;

  constructor(call: AddToBucketCall) {
    this._call = call;
  }
}

export class BidCall extends ethereum.Call {
  get inputs(): BidCall__Inputs {
    return new BidCall__Inputs(this);
  }

  get outputs(): BidCall__Outputs {
    return new BidCall__Outputs(this);
  }
}

export class BidCall__Inputs {
  _call: BidCall;

  constructor(call: BidCall) {
    this._call = call;
  }

  get _postId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _bidderId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class BidCall__Outputs {
  _call: BidCall;

  constructor(call: BidCall) {
    this._call = call;
  }
}

export class CloseDealCall extends ethereum.Call {
  get inputs(): CloseDealCall__Inputs {
    return new CloseDealCall__Inputs(this);
  }

  get outputs(): CloseDealCall__Outputs {
    return new CloseDealCall__Outputs(this);
  }
}

export class CloseDealCall__Inputs {
  _call: CloseDealCall;

  constructor(call: CloseDealCall) {
    this._call = call;
  }

  get _postId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _userId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class CloseDealCall__Outputs {
  _call: CloseDealCall;

  constructor(call: CloseDealCall) {
    this._call = call;
  }
}

export class InitPostCall extends ethereum.Call {
  get inputs(): InitPostCall__Inputs {
    return new InitPostCall__Inputs(this);
  }

  get outputs(): InitPostCall__Outputs {
    return new InitPostCall__Outputs(this);
  }
}

export class InitPostCall__Inputs {
  _call: InitPostCall;

  constructor(call: InitPostCall) {
    this._call = call;
  }

  get _postName(): string {
    return this._call.inputValues[0].value.toString();
  }

  get _userId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _iXx(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _iXy(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get _fXx(): BigInt {
    return this._call.inputValues[4].value.toBigInt();
  }

  get _fXy(): BigInt {
    return this._call.inputValues[5].value.toBigInt();
  }

  get _exp(): BigInt {
    return this._call.inputValues[6].value.toBigInt();
  }
}

export class InitPostCall__Outputs {
  _call: InitPostCall;

  constructor(call: InitPostCall) {
    this._call = call;
  }
}

export class TakeDownPostCall extends ethereum.Call {
  get inputs(): TakeDownPostCall__Inputs {
    return new TakeDownPostCall__Inputs(this);
  }

  get outputs(): TakeDownPostCall__Outputs {
    return new TakeDownPostCall__Outputs(this);
  }
}

export class TakeDownPostCall__Inputs {
  _call: TakeDownPostCall;

  constructor(call: TakeDownPostCall) {
    this._call = call;
  }

  get _postId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }
}

export class TakeDownPostCall__Outputs {
  _call: TakeDownPostCall;

  constructor(call: TakeDownPostCall) {
    this._call = call;
  }
}
