// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Profile extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Profile entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Profile must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Profile", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): Profile | null {
    return changetype<Profile | null>(store.get("Profile", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get profileName(): string {
    let value = this.get("profileName");
    return value!.toString();
  }

  set profileName(value: string) {
    this.set("profileName", Value.fromString(value));
  }

  get waterType(): string {
    let value = this.get("waterType");
    return value!.toString();
  }

  set waterType(value: string) {
    this.set("waterType", Value.fromString(value));
  }

  get EOAs(): Array<Bytes> | null {
    let value = this.get("EOAs");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytesArray();
    }
  }

  set EOAs(value: Array<Bytes> | null) {
    if (!value) {
      this.unset("EOAs");
    } else {
      this.set("EOAs", Value.fromBytesArray(<Array<Bytes>>value));
    }
  }

  get description(): string {
    let value = this.get("description");
    return value!.toString();
  }

  set description(value: string) {
    this.set("description", Value.fromString(value));
  }

  get bids(): Array<string> | null {
    let value = this.get("bids");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set bids(value: Array<string> | null) {
    if (!value) {
      this.unset("bids");
    } else {
      this.set("bids", Value.fromStringArray(<Array<string>>value));
    }
  }

  get posts(): Array<Bytes> | null {
    let value = this.get("posts");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytesArray();
    }
  }

  set posts(value: Array<Bytes> | null) {
    if (!value) {
      this.unset("posts");
    } else {
      this.set("posts", Value.fromBytesArray(<Array<Bytes>>value));
    }
  }
}

export class Post extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Post entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Post must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Post", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): Post | null {
    return changetype<Post | null>(store.get("Post", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get postName(): string {
    let value = this.get("postName");
    return value!.toString();
  }

  set postName(value: string) {
    this.set("postName", Value.fromString(value));
  }

  get description(): string | null {
    let value = this.get("description");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set description(value: string | null) {
    if (!value) {
      this.unset("description");
    } else {
      this.set("description", Value.fromString(<string>value));
    }
  }

  get EOA(): Bytes {
    let value = this.get("EOA");
    return value!.toBytes();
  }

  set EOA(value: Bytes) {
    this.set("EOA", Value.fromBytes(value));
  }

  get price(): BigInt {
    let value = this.get("price");
    return value!.toBigInt();
  }

  set price(value: BigInt) {
    this.set("price", Value.fromBigInt(value));
  }

  get iXx(): BigInt | null {
    let value = this.get("iXx");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set iXx(value: BigInt | null) {
    if (!value) {
      this.unset("iXx");
    } else {
      this.set("iXx", Value.fromBigInt(<BigInt>value));
    }
  }

  get iXy(): BigInt | null {
    let value = this.get("iXy");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set iXy(value: BigInt | null) {
    if (!value) {
      this.unset("iXy");
    } else {
      this.set("iXy", Value.fromBigInt(<BigInt>value));
    }
  }

  get fXx(): BigInt | null {
    let value = this.get("fXx");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set fXx(value: BigInt | null) {
    if (!value) {
      this.unset("fXx");
    } else {
      this.set("fXx", Value.fromBigInt(<BigInt>value));
    }
  }

  get fXy(): BigInt | null {
    let value = this.get("fXy");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set fXy(value: BigInt | null) {
    if (!value) {
      this.unset("fXy");
    } else {
      this.set("fXy", Value.fromBigInt(<BigInt>value));
    }
  }

  get iT(): BigInt | null {
    let value = this.get("iT");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set iT(value: BigInt | null) {
    if (!value) {
      this.unset("iT");
    } else {
      this.set("iT", Value.fromBigInt(<BigInt>value));
    }
  }

  get fT(): BigInt | null {
    let value = this.get("fT");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set fT(value: BigInt | null) {
    if (!value) {
      this.unset("fT");
    } else {
      this.set("fT", Value.fromBigInt(<BigInt>value));
    }
  }

  get exp(): BigInt | null {
    let value = this.get("exp");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set exp(value: BigInt | null) {
    if (!value) {
      this.unset("exp");
    } else {
      this.set("exp", Value.fromBigInt(<BigInt>value));
    }
  }

  get live(): boolean {
    let value = this.get("live");
    return value!.toBoolean();
  }

  set live(value: boolean) {
    this.set("live", Value.fromBoolean(value));
  }

  get bucket(): Array<Bytes> | null {
    let value = this.get("bucket");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toBytesArray();
    }
  }

  set bucket(value: Array<Bytes> | null) {
    if (!value) {
      this.unset("bucket");
    } else {
      this.set("bucket", Value.fromBytesArray(<Array<Bytes>>value));
    }
  }

  get pendingValue(): string | null {
    let value = this.get("pendingValue");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toString();
    }
  }

  set pendingValue(value: string | null) {
    if (!value) {
      this.unset("pendingValue");
    } else {
      this.set("pendingValue", Value.fromString(<string>value));
    }
  }

  get poster(): Bytes {
    let value = this.get("poster");
    return value!.toBytes();
  }

  set poster(value: Bytes) {
    this.set("poster", Value.fromBytes(value));
  }

  get bids(): Array<string> | null {
    let value = this.get("bids");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set bids(value: Array<string> | null) {
    if (!value) {
      this.unset("bids");
    } else {
      this.set("bids", Value.fromStringArray(<Array<string>>value));
    }
  }
}

export class Bucket extends Entity {
  constructor(id: Bytes) {
    super();
    this.set("id", Value.fromBytes(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Bucket entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.BYTES,
        `Entities of type Bucket must have an ID of type Bytes but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Bucket", id.toBytes().toHexString(), this);
    }
  }

  static load(id: Bytes): Bucket | null {
    return changetype<Bucket | null>(store.get("Bucket", id.toHexString()));
  }

  get id(): Bytes {
    let value = this.get("id");
    return value!.toBytes();
  }

  set id(value: Bytes) {
    this.set("id", Value.fromBytes(value));
  }

  get category(): string {
    let value = this.get("category");
    return value!.toString();
  }

  set category(value: string) {
    this.set("category", Value.fromString(value));
  }

  get value(): string {
    let value = this.get("value");
    return value!.toString();
  }

  set value(value: string) {
    this.set("value", Value.fromString(value));
  }

  get post(): Bytes {
    let value = this.get("post");
    return value!.toBytes();
  }

  set post(value: Bytes) {
    this.set("post", Value.fromBytes(value));
  }
}

export class Bid extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Bid entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Bid must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Bid", id.toString(), this);
    }
  }

  static load(id: string): Bid | null {
    return changetype<Bid | null>(store.get("Bid", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get EOA(): Bytes {
    let value = this.get("EOA");
    return value!.toBytes();
  }

  set EOA(value: Bytes) {
    this.set("EOA", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value!.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get accepted(): boolean {
    let value = this.get("accepted");
    return value!.toBoolean();
  }

  set accepted(value: boolean) {
    this.set("accepted", Value.fromBoolean(value));
  }

  get bidder(): Bytes {
    let value = this.get("bidder");
    return value!.toBytes();
  }

  set bidder(value: Bytes) {
    this.set("bidder", Value.fromBytes(value));
  }

  get post(): Bytes {
    let value = this.get("post");
    return value!.toBytes();
  }

  set post(value: Bytes) {
    this.set("post", Value.fromBytes(value));
  }
}
