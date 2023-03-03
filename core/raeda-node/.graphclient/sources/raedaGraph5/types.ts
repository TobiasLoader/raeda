// @ts-nocheck

import { InContextSdkMethod } from '@graphql-mesh/types';
import { MeshContext } from '@graphql-mesh/runtime';

export namespace RaedaGraph5Types {
  export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Bid = {
  id: Scalars['String'];
  EOA: Scalars['Bytes'];
  amount: Scalars['BigInt'];
  accepted?: Maybe<Scalars['Boolean']>;
  bidder: Profile;
  post: Post;
};

export type Bid_filter = {
  id?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  EOA?: InputMaybe<Scalars['Bytes']>;
  EOA_not?: InputMaybe<Scalars['Bytes']>;
  EOA_gt?: InputMaybe<Scalars['Bytes']>;
  EOA_lt?: InputMaybe<Scalars['Bytes']>;
  EOA_gte?: InputMaybe<Scalars['Bytes']>;
  EOA_lte?: InputMaybe<Scalars['Bytes']>;
  EOA_in?: InputMaybe<Array<Scalars['Bytes']>>;
  EOA_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  EOA_contains?: InputMaybe<Scalars['Bytes']>;
  EOA_not_contains?: InputMaybe<Scalars['Bytes']>;
  amount?: InputMaybe<Scalars['BigInt']>;
  amount_not?: InputMaybe<Scalars['BigInt']>;
  amount_gt?: InputMaybe<Scalars['BigInt']>;
  amount_lt?: InputMaybe<Scalars['BigInt']>;
  amount_gte?: InputMaybe<Scalars['BigInt']>;
  amount_lte?: InputMaybe<Scalars['BigInt']>;
  amount_in?: InputMaybe<Array<Scalars['BigInt']>>;
  amount_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  accepted?: InputMaybe<Scalars['Boolean']>;
  accepted_not?: InputMaybe<Scalars['Boolean']>;
  accepted_in?: InputMaybe<Array<Scalars['Boolean']>>;
  accepted_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  bidder?: InputMaybe<Scalars['String']>;
  bidder_not?: InputMaybe<Scalars['String']>;
  bidder_gt?: InputMaybe<Scalars['String']>;
  bidder_lt?: InputMaybe<Scalars['String']>;
  bidder_gte?: InputMaybe<Scalars['String']>;
  bidder_lte?: InputMaybe<Scalars['String']>;
  bidder_in?: InputMaybe<Array<Scalars['String']>>;
  bidder_not_in?: InputMaybe<Array<Scalars['String']>>;
  bidder_contains?: InputMaybe<Scalars['String']>;
  bidder_contains_nocase?: InputMaybe<Scalars['String']>;
  bidder_not_contains?: InputMaybe<Scalars['String']>;
  bidder_not_contains_nocase?: InputMaybe<Scalars['String']>;
  bidder_starts_with?: InputMaybe<Scalars['String']>;
  bidder_starts_with_nocase?: InputMaybe<Scalars['String']>;
  bidder_not_starts_with?: InputMaybe<Scalars['String']>;
  bidder_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  bidder_ends_with?: InputMaybe<Scalars['String']>;
  bidder_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bidder_not_ends_with?: InputMaybe<Scalars['String']>;
  bidder_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bidder_?: InputMaybe<Profile_filter>;
  post?: InputMaybe<Scalars['String']>;
  post_not?: InputMaybe<Scalars['String']>;
  post_gt?: InputMaybe<Scalars['String']>;
  post_lt?: InputMaybe<Scalars['String']>;
  post_gte?: InputMaybe<Scalars['String']>;
  post_lte?: InputMaybe<Scalars['String']>;
  post_in?: InputMaybe<Array<Scalars['String']>>;
  post_not_in?: InputMaybe<Array<Scalars['String']>>;
  post_contains?: InputMaybe<Scalars['String']>;
  post_contains_nocase?: InputMaybe<Scalars['String']>;
  post_not_contains?: InputMaybe<Scalars['String']>;
  post_not_contains_nocase?: InputMaybe<Scalars['String']>;
  post_starts_with?: InputMaybe<Scalars['String']>;
  post_starts_with_nocase?: InputMaybe<Scalars['String']>;
  post_not_starts_with?: InputMaybe<Scalars['String']>;
  post_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  post_ends_with?: InputMaybe<Scalars['String']>;
  post_ends_with_nocase?: InputMaybe<Scalars['String']>;
  post_not_ends_with?: InputMaybe<Scalars['String']>;
  post_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  post_?: InputMaybe<Post_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Bid_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Bid_filter>>>;
};

export type Bid_orderBy =
  | 'id'
  | 'EOA'
  | 'amount'
  | 'accepted'
  | 'bidder'
  | 'bidder__id'
  | 'bidder__profileName'
  | 'bidder__waterType'
  | 'bidder__description'
  | 'post'
  | 'post__id'
  | 'post__postName'
  | 'post__description'
  | 'post__EOA'
  | 'post__price'
  | 'post__iXx'
  | 'post__iXy'
  | 'post__fXx'
  | 'post__fXy'
  | 'post__iT'
  | 'post__fT'
  | 'post__exp'
  | 'post__live'
  | 'post__pendingValue';

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

export type Bucket = {
  id: Scalars['Bytes'];
  category: Scalars['String'];
  value: Scalars['String'];
  post?: Maybe<Post>;
};

export type Bucket_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  category?: InputMaybe<Scalars['String']>;
  category_not?: InputMaybe<Scalars['String']>;
  category_gt?: InputMaybe<Scalars['String']>;
  category_lt?: InputMaybe<Scalars['String']>;
  category_gte?: InputMaybe<Scalars['String']>;
  category_lte?: InputMaybe<Scalars['String']>;
  category_in?: InputMaybe<Array<Scalars['String']>>;
  category_not_in?: InputMaybe<Array<Scalars['String']>>;
  category_contains?: InputMaybe<Scalars['String']>;
  category_contains_nocase?: InputMaybe<Scalars['String']>;
  category_not_contains?: InputMaybe<Scalars['String']>;
  category_not_contains_nocase?: InputMaybe<Scalars['String']>;
  category_starts_with?: InputMaybe<Scalars['String']>;
  category_starts_with_nocase?: InputMaybe<Scalars['String']>;
  category_not_starts_with?: InputMaybe<Scalars['String']>;
  category_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  category_ends_with?: InputMaybe<Scalars['String']>;
  category_ends_with_nocase?: InputMaybe<Scalars['String']>;
  category_not_ends_with?: InputMaybe<Scalars['String']>;
  category_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  value?: InputMaybe<Scalars['String']>;
  value_not?: InputMaybe<Scalars['String']>;
  value_gt?: InputMaybe<Scalars['String']>;
  value_lt?: InputMaybe<Scalars['String']>;
  value_gte?: InputMaybe<Scalars['String']>;
  value_lte?: InputMaybe<Scalars['String']>;
  value_in?: InputMaybe<Array<Scalars['String']>>;
  value_not_in?: InputMaybe<Array<Scalars['String']>>;
  value_contains?: InputMaybe<Scalars['String']>;
  value_contains_nocase?: InputMaybe<Scalars['String']>;
  value_not_contains?: InputMaybe<Scalars['String']>;
  value_not_contains_nocase?: InputMaybe<Scalars['String']>;
  value_starts_with?: InputMaybe<Scalars['String']>;
  value_starts_with_nocase?: InputMaybe<Scalars['String']>;
  value_not_starts_with?: InputMaybe<Scalars['String']>;
  value_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  value_ends_with?: InputMaybe<Scalars['String']>;
  value_ends_with_nocase?: InputMaybe<Scalars['String']>;
  value_not_ends_with?: InputMaybe<Scalars['String']>;
  value_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  post?: InputMaybe<Scalars['String']>;
  post_not?: InputMaybe<Scalars['String']>;
  post_gt?: InputMaybe<Scalars['String']>;
  post_lt?: InputMaybe<Scalars['String']>;
  post_gte?: InputMaybe<Scalars['String']>;
  post_lte?: InputMaybe<Scalars['String']>;
  post_in?: InputMaybe<Array<Scalars['String']>>;
  post_not_in?: InputMaybe<Array<Scalars['String']>>;
  post_contains?: InputMaybe<Scalars['String']>;
  post_contains_nocase?: InputMaybe<Scalars['String']>;
  post_not_contains?: InputMaybe<Scalars['String']>;
  post_not_contains_nocase?: InputMaybe<Scalars['String']>;
  post_starts_with?: InputMaybe<Scalars['String']>;
  post_starts_with_nocase?: InputMaybe<Scalars['String']>;
  post_not_starts_with?: InputMaybe<Scalars['String']>;
  post_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  post_ends_with?: InputMaybe<Scalars['String']>;
  post_ends_with_nocase?: InputMaybe<Scalars['String']>;
  post_not_ends_with?: InputMaybe<Scalars['String']>;
  post_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  post_?: InputMaybe<Post_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Bucket_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Bucket_filter>>>;
};

export type Bucket_orderBy =
  | 'id'
  | 'category'
  | 'value'
  | 'post'
  | 'post__id'
  | 'post__postName'
  | 'post__description'
  | 'post__EOA'
  | 'post__price'
  | 'post__iXx'
  | 'post__iXy'
  | 'post__fXx'
  | 'post__fXy'
  | 'post__iT'
  | 'post__fT'
  | 'post__exp'
  | 'post__live'
  | 'post__pendingValue';

/** Defines the order direction, either ascending or descending */
export type OrderDirection =
  | 'asc'
  | 'desc';

export type Post = {
  id: Scalars['Bytes'];
  postName: Scalars['String'];
  description: Scalars['String'];
  EOA: Scalars['Bytes'];
  price: Scalars['BigInt'];
  iXx: Scalars['BigInt'];
  iXy: Scalars['BigInt'];
  fXx: Scalars['BigInt'];
  fXy: Scalars['BigInt'];
  iT?: Maybe<Scalars['Int']>;
  fT?: Maybe<Scalars['Int']>;
  exp: Scalars['BigInt'];
  live: Scalars['Boolean'];
  bucket?: Maybe<Array<Bucket>>;
  pendingValue?: Maybe<dealStates>;
  poster: Profile;
  bids?: Maybe<Array<Bid>>;
};


export type PostbucketArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bucket_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bucket_filter>;
};


export type PostbidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bid_filter>;
};

export type Post_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  postName?: InputMaybe<Scalars['String']>;
  postName_not?: InputMaybe<Scalars['String']>;
  postName_gt?: InputMaybe<Scalars['String']>;
  postName_lt?: InputMaybe<Scalars['String']>;
  postName_gte?: InputMaybe<Scalars['String']>;
  postName_lte?: InputMaybe<Scalars['String']>;
  postName_in?: InputMaybe<Array<Scalars['String']>>;
  postName_not_in?: InputMaybe<Array<Scalars['String']>>;
  postName_contains?: InputMaybe<Scalars['String']>;
  postName_contains_nocase?: InputMaybe<Scalars['String']>;
  postName_not_contains?: InputMaybe<Scalars['String']>;
  postName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  postName_starts_with?: InputMaybe<Scalars['String']>;
  postName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  postName_not_starts_with?: InputMaybe<Scalars['String']>;
  postName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  postName_ends_with?: InputMaybe<Scalars['String']>;
  postName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  postName_not_ends_with?: InputMaybe<Scalars['String']>;
  postName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  EOA?: InputMaybe<Scalars['Bytes']>;
  EOA_not?: InputMaybe<Scalars['Bytes']>;
  EOA_gt?: InputMaybe<Scalars['Bytes']>;
  EOA_lt?: InputMaybe<Scalars['Bytes']>;
  EOA_gte?: InputMaybe<Scalars['Bytes']>;
  EOA_lte?: InputMaybe<Scalars['Bytes']>;
  EOA_in?: InputMaybe<Array<Scalars['Bytes']>>;
  EOA_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  EOA_contains?: InputMaybe<Scalars['Bytes']>;
  EOA_not_contains?: InputMaybe<Scalars['Bytes']>;
  price?: InputMaybe<Scalars['BigInt']>;
  price_not?: InputMaybe<Scalars['BigInt']>;
  price_gt?: InputMaybe<Scalars['BigInt']>;
  price_lt?: InputMaybe<Scalars['BigInt']>;
  price_gte?: InputMaybe<Scalars['BigInt']>;
  price_lte?: InputMaybe<Scalars['BigInt']>;
  price_in?: InputMaybe<Array<Scalars['BigInt']>>;
  price_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  iXx?: InputMaybe<Scalars['BigInt']>;
  iXx_not?: InputMaybe<Scalars['BigInt']>;
  iXx_gt?: InputMaybe<Scalars['BigInt']>;
  iXx_lt?: InputMaybe<Scalars['BigInt']>;
  iXx_gte?: InputMaybe<Scalars['BigInt']>;
  iXx_lte?: InputMaybe<Scalars['BigInt']>;
  iXx_in?: InputMaybe<Array<Scalars['BigInt']>>;
  iXx_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  iXy?: InputMaybe<Scalars['BigInt']>;
  iXy_not?: InputMaybe<Scalars['BigInt']>;
  iXy_gt?: InputMaybe<Scalars['BigInt']>;
  iXy_lt?: InputMaybe<Scalars['BigInt']>;
  iXy_gte?: InputMaybe<Scalars['BigInt']>;
  iXy_lte?: InputMaybe<Scalars['BigInt']>;
  iXy_in?: InputMaybe<Array<Scalars['BigInt']>>;
  iXy_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fXx?: InputMaybe<Scalars['BigInt']>;
  fXx_not?: InputMaybe<Scalars['BigInt']>;
  fXx_gt?: InputMaybe<Scalars['BigInt']>;
  fXx_lt?: InputMaybe<Scalars['BigInt']>;
  fXx_gte?: InputMaybe<Scalars['BigInt']>;
  fXx_lte?: InputMaybe<Scalars['BigInt']>;
  fXx_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fXx_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fXy?: InputMaybe<Scalars['BigInt']>;
  fXy_not?: InputMaybe<Scalars['BigInt']>;
  fXy_gt?: InputMaybe<Scalars['BigInt']>;
  fXy_lt?: InputMaybe<Scalars['BigInt']>;
  fXy_gte?: InputMaybe<Scalars['BigInt']>;
  fXy_lte?: InputMaybe<Scalars['BigInt']>;
  fXy_in?: InputMaybe<Array<Scalars['BigInt']>>;
  fXy_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  iT?: InputMaybe<Scalars['Int']>;
  iT_not?: InputMaybe<Scalars['Int']>;
  iT_gt?: InputMaybe<Scalars['Int']>;
  iT_lt?: InputMaybe<Scalars['Int']>;
  iT_gte?: InputMaybe<Scalars['Int']>;
  iT_lte?: InputMaybe<Scalars['Int']>;
  iT_in?: InputMaybe<Array<Scalars['Int']>>;
  iT_not_in?: InputMaybe<Array<Scalars['Int']>>;
  fT?: InputMaybe<Scalars['Int']>;
  fT_not?: InputMaybe<Scalars['Int']>;
  fT_gt?: InputMaybe<Scalars['Int']>;
  fT_lt?: InputMaybe<Scalars['Int']>;
  fT_gte?: InputMaybe<Scalars['Int']>;
  fT_lte?: InputMaybe<Scalars['Int']>;
  fT_in?: InputMaybe<Array<Scalars['Int']>>;
  fT_not_in?: InputMaybe<Array<Scalars['Int']>>;
  exp?: InputMaybe<Scalars['BigInt']>;
  exp_not?: InputMaybe<Scalars['BigInt']>;
  exp_gt?: InputMaybe<Scalars['BigInt']>;
  exp_lt?: InputMaybe<Scalars['BigInt']>;
  exp_gte?: InputMaybe<Scalars['BigInt']>;
  exp_lte?: InputMaybe<Scalars['BigInt']>;
  exp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  exp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  live?: InputMaybe<Scalars['Boolean']>;
  live_not?: InputMaybe<Scalars['Boolean']>;
  live_in?: InputMaybe<Array<Scalars['Boolean']>>;
  live_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  bucket_?: InputMaybe<Bucket_filter>;
  pendingValue?: InputMaybe<dealStates>;
  pendingValue_not?: InputMaybe<dealStates>;
  pendingValue_in?: InputMaybe<Array<dealStates>>;
  pendingValue_not_in?: InputMaybe<Array<dealStates>>;
  poster?: InputMaybe<Scalars['String']>;
  poster_not?: InputMaybe<Scalars['String']>;
  poster_gt?: InputMaybe<Scalars['String']>;
  poster_lt?: InputMaybe<Scalars['String']>;
  poster_gte?: InputMaybe<Scalars['String']>;
  poster_lte?: InputMaybe<Scalars['String']>;
  poster_in?: InputMaybe<Array<Scalars['String']>>;
  poster_not_in?: InputMaybe<Array<Scalars['String']>>;
  poster_contains?: InputMaybe<Scalars['String']>;
  poster_contains_nocase?: InputMaybe<Scalars['String']>;
  poster_not_contains?: InputMaybe<Scalars['String']>;
  poster_not_contains_nocase?: InputMaybe<Scalars['String']>;
  poster_starts_with?: InputMaybe<Scalars['String']>;
  poster_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poster_not_starts_with?: InputMaybe<Scalars['String']>;
  poster_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  poster_ends_with?: InputMaybe<Scalars['String']>;
  poster_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poster_not_ends_with?: InputMaybe<Scalars['String']>;
  poster_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  poster_?: InputMaybe<Profile_filter>;
  bids_?: InputMaybe<Bid_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Post_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Post_filter>>>;
};

export type Post_orderBy =
  | 'id'
  | 'postName'
  | 'description'
  | 'EOA'
  | 'price'
  | 'iXx'
  | 'iXy'
  | 'fXx'
  | 'fXy'
  | 'iT'
  | 'fT'
  | 'exp'
  | 'live'
  | 'bucket'
  | 'pendingValue'
  | 'poster'
  | 'poster__id'
  | 'poster__profileName'
  | 'poster__waterType'
  | 'poster__description'
  | 'bids';

export type Profile = {
  id: Scalars['Bytes'];
  profileName: Scalars['String'];
  waterType: waterTypes;
  EOAs?: Maybe<Array<Scalars['Bytes']>>;
  description: Scalars['String'];
  bids?: Maybe<Array<Bid>>;
  posts?: Maybe<Array<Post>>;
};


export type ProfilebidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bid_filter>;
};


export type ProfilepostsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Post_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Post_filter>;
};

export type Profile_filter = {
  id?: InputMaybe<Scalars['Bytes']>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_gt?: InputMaybe<Scalars['Bytes']>;
  id_lt?: InputMaybe<Scalars['Bytes']>;
  id_gte?: InputMaybe<Scalars['Bytes']>;
  id_lte?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  profileName?: InputMaybe<Scalars['String']>;
  profileName_not?: InputMaybe<Scalars['String']>;
  profileName_gt?: InputMaybe<Scalars['String']>;
  profileName_lt?: InputMaybe<Scalars['String']>;
  profileName_gte?: InputMaybe<Scalars['String']>;
  profileName_lte?: InputMaybe<Scalars['String']>;
  profileName_in?: InputMaybe<Array<Scalars['String']>>;
  profileName_not_in?: InputMaybe<Array<Scalars['String']>>;
  profileName_contains?: InputMaybe<Scalars['String']>;
  profileName_contains_nocase?: InputMaybe<Scalars['String']>;
  profileName_not_contains?: InputMaybe<Scalars['String']>;
  profileName_not_contains_nocase?: InputMaybe<Scalars['String']>;
  profileName_starts_with?: InputMaybe<Scalars['String']>;
  profileName_starts_with_nocase?: InputMaybe<Scalars['String']>;
  profileName_not_starts_with?: InputMaybe<Scalars['String']>;
  profileName_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  profileName_ends_with?: InputMaybe<Scalars['String']>;
  profileName_ends_with_nocase?: InputMaybe<Scalars['String']>;
  profileName_not_ends_with?: InputMaybe<Scalars['String']>;
  profileName_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  waterType?: InputMaybe<waterTypes>;
  waterType_not?: InputMaybe<waterTypes>;
  waterType_in?: InputMaybe<Array<waterTypes>>;
  waterType_not_in?: InputMaybe<Array<waterTypes>>;
  EOAs?: InputMaybe<Array<Scalars['Bytes']>>;
  EOAs_not?: InputMaybe<Array<Scalars['Bytes']>>;
  EOAs_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  EOAs_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  EOAs_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  EOAs_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  description?: InputMaybe<Scalars['String']>;
  description_not?: InputMaybe<Scalars['String']>;
  description_gt?: InputMaybe<Scalars['String']>;
  description_lt?: InputMaybe<Scalars['String']>;
  description_gte?: InputMaybe<Scalars['String']>;
  description_lte?: InputMaybe<Scalars['String']>;
  description_in?: InputMaybe<Array<Scalars['String']>>;
  description_not_in?: InputMaybe<Array<Scalars['String']>>;
  description_contains?: InputMaybe<Scalars['String']>;
  description_contains_nocase?: InputMaybe<Scalars['String']>;
  description_not_contains?: InputMaybe<Scalars['String']>;
  description_not_contains_nocase?: InputMaybe<Scalars['String']>;
  description_starts_with?: InputMaybe<Scalars['String']>;
  description_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  description_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  description_ends_with?: InputMaybe<Scalars['String']>;
  description_ends_with_nocase?: InputMaybe<Scalars['String']>;
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  description_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  bids_?: InputMaybe<Bid_filter>;
  posts_?: InputMaybe<Post_filter>;
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  and?: InputMaybe<Array<InputMaybe<Profile_filter>>>;
  or?: InputMaybe<Array<InputMaybe<Profile_filter>>>;
};

export type Profile_orderBy =
  | 'id'
  | 'profileName'
  | 'waterType'
  | 'EOAs'
  | 'description'
  | 'bids'
  | 'posts';

export type Query = {
  profile?: Maybe<Profile>;
  profiles: Array<Profile>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  bucket?: Maybe<Bucket>;
  buckets: Array<Bucket>;
  bid?: Maybe<Bid>;
  bids: Array<Bid>;
  Search: Array<Post>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type QueryprofileArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryprofilesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Profile_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Profile_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypostArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerypostsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Post_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Post_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybucketArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybucketsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bucket_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bucket_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerybidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QuerySearchArgs = {
  text: Scalars['String'];
  first?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Query_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type Subscription = {
  profile?: Maybe<Profile>;
  profiles: Array<Profile>;
  post?: Maybe<Post>;
  posts: Array<Post>;
  bucket?: Maybe<Bucket>;
  buckets: Array<Bucket>;
  bid?: Maybe<Bid>;
  bids: Array<Bid>;
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
};


export type SubscriptionprofileArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionprofilesArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Profile_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Profile_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpostArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionpostsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Post_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Post_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbucketArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbucketsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bucket_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bucket_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidArgs = {
  id: Scalars['ID'];
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionbidsArgs = {
  skip?: InputMaybe<Scalars['Int']>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Bid_orderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  where?: InputMaybe<Bid_filter>;
  block?: InputMaybe<Block_height>;
  subgraphError?: _SubgraphErrorPolicy_;
};


export type Subscription_metaArgs = {
  block?: InputMaybe<Block_height>;
};

export type _Block_ = {
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
  /** Integer representation of the timestamp stored in blocks for the chain */
  timestamp?: Maybe<Scalars['Int']>;
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export type _SubgraphErrorPolicy_ =
  /** Data will be returned even if the subgraph has indexing errors */
  | 'allow'
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  | 'deny';

export type dealStates =
  | 'NOTCLOSED'
  | 'LAKECLOSED'
  | 'RIVERCLOSED'
  | 'BOTHCLOSED';

export type waterTypes =
  | 'LAKE'
  | 'RIVER';

  export type QuerySdk = {
      /** null **/
  profile: InContextSdkMethod<Query['profile'], QueryprofileArgs, MeshContext>,
  /** null **/
  profiles: InContextSdkMethod<Query['profiles'], QueryprofilesArgs, MeshContext>,
  /** null **/
  post: InContextSdkMethod<Query['post'], QuerypostArgs, MeshContext>,
  /** null **/
  posts: InContextSdkMethod<Query['posts'], QuerypostsArgs, MeshContext>,
  /** null **/
  bucket: InContextSdkMethod<Query['bucket'], QuerybucketArgs, MeshContext>,
  /** null **/
  buckets: InContextSdkMethod<Query['buckets'], QuerybucketsArgs, MeshContext>,
  /** null **/
  bid: InContextSdkMethod<Query['bid'], QuerybidArgs, MeshContext>,
  /** null **/
  bids: InContextSdkMethod<Query['bids'], QuerybidsArgs, MeshContext>,
  /** null **/
  Search: InContextSdkMethod<Query['Search'], QuerySearchArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Query['_meta'], Query_metaArgs, MeshContext>
  };

  export type MutationSdk = {
    
  };

  export type SubscriptionSdk = {
      /** null **/
  profile: InContextSdkMethod<Subscription['profile'], SubscriptionprofileArgs, MeshContext>,
  /** null **/
  profiles: InContextSdkMethod<Subscription['profiles'], SubscriptionprofilesArgs, MeshContext>,
  /** null **/
  post: InContextSdkMethod<Subscription['post'], SubscriptionpostArgs, MeshContext>,
  /** null **/
  posts: InContextSdkMethod<Subscription['posts'], SubscriptionpostsArgs, MeshContext>,
  /** null **/
  bucket: InContextSdkMethod<Subscription['bucket'], SubscriptionbucketArgs, MeshContext>,
  /** null **/
  buckets: InContextSdkMethod<Subscription['buckets'], SubscriptionbucketsArgs, MeshContext>,
  /** null **/
  bid: InContextSdkMethod<Subscription['bid'], SubscriptionbidArgs, MeshContext>,
  /** null **/
  bids: InContextSdkMethod<Subscription['bids'], SubscriptionbidsArgs, MeshContext>,
  /** Access to subgraph metadata **/
  _meta: InContextSdkMethod<Subscription['_meta'], Subscription_metaArgs, MeshContext>
  };

  export type Context = {
      ["raedaGraph5"]: { Query: QuerySdk, Mutation: MutationSdk, Subscription: SubscriptionSdk },
      
    };
}
