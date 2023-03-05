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

export class addressEvent extends ethereum.Event {
  get params(): addressEvent__Params {
    return new addressEvent__Params(this);
  }
}

export class addressEvent__Params {
  _event: addressEvent;

  constructor(event: addressEvent) {
    this._event = event;
  }

  get _userId(): i32 {
    return this._event.parameters[0].value.toI32();
  }

  get param1(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class profileEvent extends ethereum.Event {
  get params(): profileEvent__Params {
    return new profileEvent__Params(this);
  }
}

export class profileEvent__Params {
  _event: profileEvent;

  constructor(event: profileEvent) {
    this._event = event;
  }

  get _userId(): i32 {
    return this._event.parameters[0].value.toI32();
  }
}

export class profile__profilesResult {
  value0: i32;
  value1: string;
  value2: string;

  constructor(value0: i32, value1: string, value2: string) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set(
      "value0",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(this.value0))
    );
    map.set("value1", ethereum.Value.fromString(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    return map;
  }

  getWaterType(): i32 {
    return this.value0;
  }

  getProfileName(): string {
    return this.value1;
  }

  getDescription(): string {
    return this.value2;
  }
}

export class profile extends ethereum.SmartContract {
  static bind(address: Address): profile {
    return new profile("profile", address);
  }

  checkEOA(_userId: i32, _EOA: Address): boolean {
    let result = super.call("checkEOA", "checkEOA(uint16,address):(bool)", [
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_userId)),
      ethereum.Value.fromAddress(_EOA)
    ]);

    return result[0].toBoolean();
  }

  try_checkEOA(_userId: i32, _EOA: Address): ethereum.CallResult<boolean> {
    let result = super.tryCall("checkEOA", "checkEOA(uint16,address):(bool)", [
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(_userId)),
      ethereum.Value.fromAddress(_EOA)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  profileNames(param0: string): boolean {
    let result = super.call("profileNames", "profileNames(string):(bool)", [
      ethereum.Value.fromString(param0)
    ]);

    return result[0].toBoolean();
  }

  try_profileNames(param0: string): ethereum.CallResult<boolean> {
    let result = super.tryCall("profileNames", "profileNames(string):(bool)", [
      ethereum.Value.fromString(param0)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  profiles(param0: i32): profile__profilesResult {
    let result = super.call(
      "profiles",
      "profiles(uint16):(uint8,string,string)",
      [ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0))]
    );

    return new profile__profilesResult(
      result[0].toI32(),
      result[1].toString(),
      result[2].toString()
    );
  }

  try_profiles(param0: i32): ethereum.CallResult<profile__profilesResult> {
    let result = super.tryCall(
      "profiles",
      "profiles(uint16):(uint8,string,string)",
      [ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(param0))]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new profile__profilesResult(
        value[0].toI32(),
        value[1].toString(),
        value[2].toString()
      )
    );
  }
}

export class AddEOACall extends ethereum.Call {
  get inputs(): AddEOACall__Inputs {
    return new AddEOACall__Inputs(this);
  }

  get outputs(): AddEOACall__Outputs {
    return new AddEOACall__Outputs(this);
  }
}

export class AddEOACall__Inputs {
  _call: AddEOACall;

  constructor(call: AddEOACall) {
    this._call = call;
  }

  get _userId(): i32 {
    return this._call.inputValues[0].value.toI32();
  }

  get _newEOA(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class AddEOACall__Outputs {
  _call: AddEOACall;

  constructor(call: AddEOACall) {
    this._call = call;
  }
}

export class CreateProfileCall extends ethereum.Call {
  get inputs(): CreateProfileCall__Inputs {
    return new CreateProfileCall__Inputs(this);
  }

  get outputs(): CreateProfileCall__Outputs {
    return new CreateProfileCall__Outputs(this);
  }
}

export class CreateProfileCall__Inputs {
  _call: CreateProfileCall;

  constructor(call: CreateProfileCall) {
    this._call = call;
  }

  get _waterType(): i32 {
    return this._call.inputValues[0].value.toI32();
  }

  get _profileName(): string {
    return this._call.inputValues[1].value.toString();
  }

  get _description(): string {
    return this._call.inputValues[2].value.toString();
  }
}

export class CreateProfileCall__Outputs {
  _call: CreateProfileCall;

  constructor(call: CreateProfileCall) {
    this._call = call;
  }
}
