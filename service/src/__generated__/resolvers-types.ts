import { GraphQLResolveInfo } from 'graphql';
import { MyContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddUserMutationResponse = {
  __typename?: 'AddUserMutationResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addUser?: Maybe<AddUserMutationResponse>;
  cancelReservation?: Maybe<ReservationMutationResponse>;
  completeReservation?: Maybe<ReservationMutationResponse>;
  makeReservation?: Maybe<ReservationMutationResponse>;
  updateReservation?: Maybe<ReservationMutationResponse>;
};


export type MutationAddUserArgs = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};


export type MutationCancelReservationArgs = {
  reservationId: Scalars['String']['input'];
};


export type MutationCompleteReservationArgs = {
  reservationId: Scalars['String']['input'];
};


export type MutationMakeReservationArgs = {
  arrivalDate: Scalars['String']['input'];
  arrivalSlot: Scalars['String']['input'];
  tableSize: Scalars['Int']['input'];
};


export type MutationUpdateReservationArgs = {
  reservationId: Scalars['String']['input'];
  updatedReservation?: InputMaybe<ReservationUpdatedInput>;
  userId: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  ReservationDetail?: Maybe<ReservationDetailInfo>;
  Reservations?: Maybe<Array<Maybe<Reservation>>>;
};


export type QueryReservationDetailArgs = {
  reservationId: Scalars['String']['input'];
};


export type QueryReservationsArgs = {
  queryParams?: InputMaybe<ReservationParamInput>;
};

export type Reservation = {
  __typename?: 'Reservation';
  arrivalDate: Scalars['String']['output'];
  arrivalSlot: Scalars['String']['output'];
  cancelledAt?: Maybe<Scalars['String']['output']>;
  cancelledBy?: Maybe<Scalars['String']['output']>;
  completedAt?: Maybe<Scalars['String']['output']>;
  completedBy?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  reservationId: Scalars['String']['output'];
  status: Scalars['String']['output'];
  tableSize: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
};

export type ReservationDetailInfo = {
  __typename?: 'ReservationDetailInfo';
  arrivalDate: Scalars['String']['output'];
  arrivalSlot: Scalars['String']['output'];
  cancelledAt?: Maybe<Scalars['String']['output']>;
  cancelledBy?: Maybe<Scalars['String']['output']>;
  completedAt?: Maybe<Scalars['String']['output']>;
  completedBy?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  reservationId: Scalars['String']['output'];
  status: Scalars['String']['output'];
  tableSize: Scalars['Int']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  user: User;
  userId: Scalars['String']['output'];
};

export type ReservationFilterInput = {
  arrivalDate?: InputMaybe<Scalars['String']['input']>;
  arrivalSlot?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Array<InputMaybe<ReservationStatusEnum>>>;
  userId?: InputMaybe<Scalars['String']['input']>;
};

export type ReservationMutationResponse = {
  __typename?: 'ReservationMutationResponse';
  message?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ReservationParamInput = {
  filter?: InputMaybe<ReservationFilterInput>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  sortBy?: InputMaybe<SortByInput>;
};

export enum ReservationStatusEnum {
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Confirmed = 'CONFIRMED',
  Outdated = 'OUTDATED',
  Queued = 'QUEUED'
}

export type ReservationUpdatedInput = {
  arrivalDate?: InputMaybe<Scalars['String']['input']>;
  arrivalSlot?: InputMaybe<Scalars['String']['input']>;
  tableSize?: InputMaybe<Scalars['Int']['input']>;
};

export type SortByInput = {
  field: Scalars['String']['input'];
  order: SortOrder;
};

export enum SortOrder {
  Asc = 'ASC',
  Desc = 'DESC'
}

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

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
  AddUserMutationResponse: ResolverTypeWrapper<AddUserMutationResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Reservation: ResolverTypeWrapper<Reservation>;
  ReservationDetailInfo: ResolverTypeWrapper<ReservationDetailInfo>;
  ReservationFilterInput: ReservationFilterInput;
  ReservationMutationResponse: ResolverTypeWrapper<ReservationMutationResponse>;
  ReservationParamInput: ReservationParamInput;
  ReservationStatusEnum: ReservationStatusEnum;
  ReservationUpdatedInput: ReservationUpdatedInput;
  SortByInput: SortByInput;
  SortOrder: SortOrder;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  User: ResolverTypeWrapper<User>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  AddUserMutationResponse: AddUserMutationResponse;
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  Query: {};
  Reservation: Reservation;
  ReservationDetailInfo: ReservationDetailInfo;
  ReservationFilterInput: ReservationFilterInput;
  ReservationMutationResponse: ReservationMutationResponse;
  ReservationParamInput: ReservationParamInput;
  ReservationUpdatedInput: ReservationUpdatedInput;
  SortByInput: SortByInput;
  String: Scalars['String']['output'];
  User: User;
}>;

export type AddUserMutationResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AddUserMutationResponse'] = ResolversParentTypes['AddUserMutationResponse']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  addUser?: Resolver<Maybe<ResolversTypes['AddUserMutationResponse']>, ParentType, ContextType, RequireFields<MutationAddUserArgs, 'email' | 'firstName' | 'lastName' | 'phone'>>;
  cancelReservation?: Resolver<Maybe<ResolversTypes['ReservationMutationResponse']>, ParentType, ContextType, RequireFields<MutationCancelReservationArgs, 'reservationId'>>;
  completeReservation?: Resolver<Maybe<ResolversTypes['ReservationMutationResponse']>, ParentType, ContextType, RequireFields<MutationCompleteReservationArgs, 'reservationId'>>;
  makeReservation?: Resolver<Maybe<ResolversTypes['ReservationMutationResponse']>, ParentType, ContextType, RequireFields<MutationMakeReservationArgs, 'arrivalDate' | 'arrivalSlot' | 'tableSize'>>;
  updateReservation?: Resolver<Maybe<ResolversTypes['ReservationMutationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateReservationArgs, 'reservationId' | 'userId'>>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  ReservationDetail?: Resolver<Maybe<ResolversTypes['ReservationDetailInfo']>, ParentType, ContextType, RequireFields<QueryReservationDetailArgs, 'reservationId'>>;
  Reservations?: Resolver<Maybe<Array<Maybe<ResolversTypes['Reservation']>>>, ParentType, ContextType, Partial<QueryReservationsArgs>>;
}>;

export type ReservationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Reservation'] = ResolversParentTypes['Reservation']> = ResolversObject<{
  arrivalDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  arrivalSlot?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cancelledAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cancelledBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  completedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reservationId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tableSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReservationDetailInfoResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ReservationDetailInfo'] = ResolversParentTypes['ReservationDetailInfo']> = ResolversObject<{
  arrivalDate?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  arrivalSlot?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cancelledAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  cancelledBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  completedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  completedBy?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  reservationId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  tableSize?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReservationMutationResponseResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ReservationMutationResponse'] = ResolversParentTypes['ReservationMutationResponse']> = ResolversObject<{
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  success?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  AddUserMutationResponse?: AddUserMutationResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reservation?: ReservationResolvers<ContextType>;
  ReservationDetailInfo?: ReservationDetailInfoResolvers<ContextType>;
  ReservationMutationResponse?: ReservationMutationResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
}>;

