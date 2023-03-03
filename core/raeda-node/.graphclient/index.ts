// @ts-nocheck
import { GraphQLResolveInfo, SelectionSetNode, FieldNode, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import type { GetMeshOptions } from '@graphql-mesh/runtime';
import type { YamlConfig } from '@graphql-mesh/types';
import { PubSub } from '@graphql-mesh/utils';
import { DefaultLogger } from '@graphql-mesh/utils';
import MeshCache from "@graphql-mesh/cache-localforage";
import { fetch as fetchFn } from '@whatwg-node/fetch';

import { MeshResolvedSource } from '@graphql-mesh/runtime';
import { MeshTransform, MeshPlugin } from '@graphql-mesh/types';
import GraphqlHandler from "@graphql-mesh/graphql"
import BareMerger from "@graphql-mesh/merger-bare";
import { createMeshHTTPHandler, MeshHTTPHandler } from '@graphql-mesh/http';
import { getMesh, ExecuteMeshFn, SubscribeMeshFn, MeshContext as BaseMeshContext, MeshInstance } from '@graphql-mesh/runtime';
import { MeshStore, FsStoreStorageAdapter } from '@graphql-mesh/store';
import { path as pathModule } from '@graphql-mesh/cross-helpers';
import { ImportFn } from '@graphql-mesh/types';
import type { RaedaGraph5Types } from './sources/raedaGraph5/types';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };



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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string | ((fieldNode: FieldNode) => SelectionSetNode);
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Bid: ResolverTypeWrapper<Bid>;
  Bid_filter: Bid_filter;
  Bid_orderBy: Bid_orderBy;
  BigDecimal: ResolverTypeWrapper<Scalars['BigDecimal']>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']>;
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Bucket: ResolverTypeWrapper<Bucket>;
  Bucket_filter: Bucket_filter;
  Bucket_orderBy: Bucket_orderBy;
  Bytes: ResolverTypeWrapper<Scalars['Bytes']>;
  Float: ResolverTypeWrapper<Scalars['Float']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  OrderDirection: OrderDirection;
  Post: ResolverTypeWrapper<Post>;
  Post_filter: Post_filter;
  Post_orderBy: Post_orderBy;
  Profile: ResolverTypeWrapper<Profile>;
  Profile_filter: Profile_filter;
  Profile_orderBy: Profile_orderBy;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Subscription: ResolverTypeWrapper<{}>;
  _Block_: ResolverTypeWrapper<_Block_>;
  _Meta_: ResolverTypeWrapper<_Meta_>;
  _SubgraphErrorPolicy_: _SubgraphErrorPolicy_;
  dealStates: dealStates;
  waterTypes: waterTypes;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Bid: Bid;
  Bid_filter: Bid_filter;
  BigDecimal: Scalars['BigDecimal'];
  BigInt: Scalars['BigInt'];
  BlockChangedFilter: BlockChangedFilter;
  Block_height: Block_height;
  Boolean: Scalars['Boolean'];
  Bucket: Bucket;
  Bucket_filter: Bucket_filter;
  Bytes: Scalars['Bytes'];
  Float: Scalars['Float'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Post: Post;
  Post_filter: Post_filter;
  Profile: Profile;
  Profile_filter: Profile_filter;
  Query: {};
  String: Scalars['String'];
  Subscription: {};
  _Block_: _Block_;
  _Meta_: _Meta_;
}>;

export type entityDirectiveArgs = { };

export type entityDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = entityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type subgraphIdDirectiveArgs = {
  id: Scalars['String'];
};

export type subgraphIdDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = subgraphIdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type derivedFromDirectiveArgs = {
  field: Scalars['String'];
};

export type derivedFromDirectiveResolver<Result, Parent, ContextType = MeshContext, Args = derivedFromDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type BidResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Bid'] = ResolversParentTypes['Bid']> = ResolversObject<{
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  EOA?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  amount?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  accepted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  bidder?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  post?: Resolver<ResolversTypes['Post'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BigDecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigDecimal'], any> {
  name: 'BigDecimal';
}

export interface BigIntScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type BucketResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Bucket'] = ResolversParentTypes['Bucket']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  value?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export interface BytesScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Bytes'], any> {
  name: 'Bytes';
}

export type PostResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  postName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  EOA?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  iXx?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  iXy?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fXx?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  fXy?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  iT?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  fT?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  exp?: Resolver<ResolversTypes['BigInt'], ParentType, ContextType>;
  live?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  bucket?: Resolver<Maybe<Array<ResolversTypes['Bucket']>>, ParentType, ContextType, RequireFields<PostbucketArgs, 'skip' | 'first'>>;
  pendingValue?: Resolver<Maybe<ResolversTypes['dealStates']>, ParentType, ContextType>;
  poster?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  bids?: Resolver<Maybe<Array<ResolversTypes['Bid']>>, ParentType, ContextType, RequireFields<PostbidsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = ResolversObject<{
  id?: Resolver<ResolversTypes['Bytes'], ParentType, ContextType>;
  profileName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  waterType?: Resolver<ResolversTypes['waterTypes'], ParentType, ContextType>;
  EOAs?: Resolver<Maybe<Array<ResolversTypes['Bytes']>>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  bids?: Resolver<Maybe<Array<ResolversTypes['Bid']>>, ParentType, ContextType, RequireFields<ProfilebidsArgs, 'skip' | 'first'>>;
  posts?: Resolver<Maybe<Array<ResolversTypes['Post']>>, ParentType, ContextType, RequireFields<ProfilepostsArgs, 'skip' | 'first'>>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  profile?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryprofileArgs, 'id' | 'subgraphError'>>;
  profiles?: Resolver<Array<ResolversTypes['Profile']>, ParentType, ContextType, RequireFields<QueryprofilesArgs, 'skip' | 'first' | 'subgraphError'>>;
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerypostArgs, 'id' | 'subgraphError'>>;
  posts?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerypostsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bucket?: Resolver<Maybe<ResolversTypes['Bucket']>, ParentType, ContextType, RequireFields<QuerybucketArgs, 'id' | 'subgraphError'>>;
  buckets?: Resolver<Array<ResolversTypes['Bucket']>, ParentType, ContextType, RequireFields<QuerybucketsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bid?: Resolver<Maybe<ResolversTypes['Bid']>, ParentType, ContextType, RequireFields<QuerybidArgs, 'id' | 'subgraphError'>>;
  bids?: Resolver<Array<ResolversTypes['Bid']>, ParentType, ContextType, RequireFields<QuerybidsArgs, 'skip' | 'first' | 'subgraphError'>>;
  Search?: Resolver<Array<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QuerySearchArgs, 'text' | 'first' | 'skip' | 'subgraphError'>>;
  _meta?: Resolver<Maybe<ResolversTypes['_Meta_']>, ParentType, ContextType, Partial<Query_metaArgs>>;
}>;

export type SubscriptionResolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = ResolversObject<{
  profile?: SubscriptionResolver<Maybe<ResolversTypes['Profile']>, "profile", ParentType, ContextType, RequireFields<SubscriptionprofileArgs, 'id' | 'subgraphError'>>;
  profiles?: SubscriptionResolver<Array<ResolversTypes['Profile']>, "profiles", ParentType, ContextType, RequireFields<SubscriptionprofilesArgs, 'skip' | 'first' | 'subgraphError'>>;
  post?: SubscriptionResolver<Maybe<ResolversTypes['Post']>, "post", ParentType, ContextType, RequireFields<SubscriptionpostArgs, 'id' | 'subgraphError'>>;
  posts?: SubscriptionResolver<Array<ResolversTypes['Post']>, "posts", ParentType, ContextType, RequireFields<SubscriptionpostsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bucket?: SubscriptionResolver<Maybe<ResolversTypes['Bucket']>, "bucket", ParentType, ContextType, RequireFields<SubscriptionbucketArgs, 'id' | 'subgraphError'>>;
  buckets?: SubscriptionResolver<Array<ResolversTypes['Bucket']>, "buckets", ParentType, ContextType, RequireFields<SubscriptionbucketsArgs, 'skip' | 'first' | 'subgraphError'>>;
  bid?: SubscriptionResolver<Maybe<ResolversTypes['Bid']>, "bid", ParentType, ContextType, RequireFields<SubscriptionbidArgs, 'id' | 'subgraphError'>>;
  bids?: SubscriptionResolver<Array<ResolversTypes['Bid']>, "bids", ParentType, ContextType, RequireFields<SubscriptionbidsArgs, 'skip' | 'first' | 'subgraphError'>>;
  _meta?: SubscriptionResolver<Maybe<ResolversTypes['_Meta_']>, "_meta", ParentType, ContextType, Partial<Subscription_metaArgs>>;
}>;

export type _Block_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Block_'] = ResolversParentTypes['_Block_']> = ResolversObject<{
  hash?: Resolver<Maybe<ResolversTypes['Bytes']>, ParentType, ContextType>;
  number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  timestamp?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type _Meta_Resolvers<ContextType = MeshContext, ParentType extends ResolversParentTypes['_Meta_'] = ResolversParentTypes['_Meta_']> = ResolversObject<{
  block?: Resolver<ResolversTypes['_Block_'], ParentType, ContextType>;
  deployment?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hasIndexingErrors?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MeshContext> = ResolversObject<{
  Bid?: BidResolvers<ContextType>;
  BigDecimal?: GraphQLScalarType;
  BigInt?: GraphQLScalarType;
  Bucket?: BucketResolvers<ContextType>;
  Bytes?: GraphQLScalarType;
  Post?: PostResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  _Block_?: _Block_Resolvers<ContextType>;
  _Meta_?: _Meta_Resolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = MeshContext> = ResolversObject<{
  entity?: entityDirectiveResolver<any, any, ContextType>;
  subgraphId?: subgraphIdDirectiveResolver<any, any, ContextType>;
  derivedFrom?: derivedFromDirectiveResolver<any, any, ContextType>;
}>;

export type MeshContext = RaedaGraph5Types.Context & BaseMeshContext;


const baseDir = pathModule.join(typeof __dirname === 'string' ? __dirname : '/', '..');

const importFn: ImportFn = <T>(moduleId: string) => {
  const relativeModuleId = (pathModule.isAbsolute(moduleId) ? pathModule.relative(baseDir, moduleId) : moduleId).split('\\').join('/').replace(baseDir + '/', '');
  switch(relativeModuleId) {
    case ".graphclient/sources/raedaGraph5/introspectionSchema":
      return import("./sources/raedaGraph5/introspectionSchema") as T;
    
    default:
      return Promise.reject(new Error(`Cannot find module '${relativeModuleId}'.`));
  }
};

const rootStore = new MeshStore('.graphclient', new FsStoreStorageAdapter({
  cwd: baseDir,
  importFn,
  fileType: "ts",
}), {
  readonly: true,
  validate: false
});

export const rawServeConfig: YamlConfig.Config['serve'] = undefined as any
export async function getMeshOptions(): Promise<GetMeshOptions> {
const pubsub = new PubSub();
const sourcesStore = rootStore.child('sources');
const logger = new DefaultLogger("GraphClient");
const cache = new (MeshCache as any)({
      ...({} as any),
      importFn,
      store: rootStore.child('cache'),
      pubsub,
      logger,
    } as any)

const sources: MeshResolvedSource[] = [];
const transforms: MeshTransform[] = [];
const additionalEnvelopPlugins: MeshPlugin<any>[] = [];
const raedaGraph5Transforms = [];
const additionalTypeDefs = [] as any[];
const raedaGraph5Handler = new GraphqlHandler({
              name: "raedaGraph5",
              config: {"endpoint":"https://api.thegraph.com/subgraphs/name/rishin01/raedagraph5"},
              baseDir,
              cache,
              pubsub,
              store: sourcesStore.child("raedaGraph5"),
              logger: logger.child("raedaGraph5"),
              importFn,
            });
sources[0] = {
          name: 'raedaGraph5',
          handler: raedaGraph5Handler,
          transforms: raedaGraph5Transforms
        }
const additionalResolvers = [] as any[]
const merger = new(BareMerger as any)({
        cache,
        pubsub,
        logger: logger.child('bareMerger'),
        store: rootStore.child('bareMerger')
      })

  return {
    sources,
    transforms,
    additionalTypeDefs,
    additionalResolvers,
    cache,
    pubsub,
    merger,
    logger,
    additionalEnvelopPlugins,
    get documents() {
      return [
      
    ];
    },
    fetchFn,
  };
}

export function createBuiltMeshHTTPHandler<TServerContext = {}>(): MeshHTTPHandler<TServerContext> {
  return createMeshHTTPHandler<TServerContext>({
    baseDir,
    getBuiltMesh: getBuiltGraphClient,
    rawServeConfig: undefined,
  })
}


let meshInstance$: Promise<MeshInstance> | undefined;

export function getBuiltGraphClient(): Promise<MeshInstance> {
  if (meshInstance$ == null) {
    meshInstance$ = getMeshOptions().then(meshOptions => getMesh(meshOptions)).then(mesh => {
      const id = mesh.pubsub.subscribe('destroy', () => {
        meshInstance$ = undefined;
        mesh.pubsub.unsubscribe(id);
      });
      return mesh;
    });
  }
  return meshInstance$;
}

export const execute: ExecuteMeshFn = (...args) => getBuiltGraphClient().then(({ execute }) => execute(...args));

export const subscribe: SubscribeMeshFn = (...args) => getBuiltGraphClient().then(({ subscribe }) => subscribe(...args));