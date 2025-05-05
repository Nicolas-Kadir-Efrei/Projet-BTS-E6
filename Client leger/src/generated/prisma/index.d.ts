
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Game
 * 
 */
export type Game = $Result.DefaultSelection<Prisma.$GamePayload>
/**
 * Model Tournament
 * 
 */
export type Tournament = $Result.DefaultSelection<Prisma.$TournamentPayload>
/**
 * Model TournamentType
 * 
 */
export type TournamentType = $Result.DefaultSelection<Prisma.$TournamentTypePayload>
/**
 * Model TournamentStatus
 * 
 */
export type TournamentStatus = $Result.DefaultSelection<Prisma.$TournamentStatusPayload>
/**
 * Model Team
 * 
 */
export type Team = $Result.DefaultSelection<Prisma.$TeamPayload>
/**
 * Model TeamMember
 * 
 */
export type TeamMember = $Result.DefaultSelection<Prisma.$TeamMemberPayload>
/**
 * Model Match
 * 
 */
export type Match = $Result.DefaultSelection<Prisma.$MatchPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.game`: Exposes CRUD operations for the **Game** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Games
    * const games = await prisma.game.findMany()
    * ```
    */
  get game(): Prisma.GameDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tournament`: Exposes CRUD operations for the **Tournament** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tournaments
    * const tournaments = await prisma.tournament.findMany()
    * ```
    */
  get tournament(): Prisma.TournamentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tournamentType`: Exposes CRUD operations for the **TournamentType** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TournamentTypes
    * const tournamentTypes = await prisma.tournamentType.findMany()
    * ```
    */
  get tournamentType(): Prisma.TournamentTypeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tournamentStatus`: Exposes CRUD operations for the **TournamentStatus** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TournamentStatuses
    * const tournamentStatuses = await prisma.tournamentStatus.findMany()
    * ```
    */
  get tournamentStatus(): Prisma.TournamentStatusDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.team`: Exposes CRUD operations for the **Team** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Teams
    * const teams = await prisma.team.findMany()
    * ```
    */
  get team(): Prisma.TeamDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.teamMember`: Exposes CRUD operations for the **TeamMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TeamMembers
    * const teamMembers = await prisma.teamMember.findMany()
    * ```
    */
  get teamMember(): Prisma.TeamMemberDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.match`: Exposes CRUD operations for the **Match** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Matches
    * const matches = await prisma.match.findMany()
    * ```
    */
  get match(): Prisma.MatchDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Game: 'Game',
    Tournament: 'Tournament',
    TournamentType: 'TournamentType',
    TournamentStatus: 'TournamentStatus',
    Team: 'Team',
    TeamMember: 'TeamMember',
    Match: 'Match'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "game" | "tournament" | "tournamentType" | "tournamentStatus" | "team" | "teamMember" | "match"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Game: {
        payload: Prisma.$GamePayload<ExtArgs>
        fields: Prisma.GameFieldRefs
        operations: {
          findUnique: {
            args: Prisma.GameFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.GameFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findFirst: {
            args: Prisma.GameFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.GameFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          findMany: {
            args: Prisma.GameFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          create: {
            args: Prisma.GameCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          createMany: {
            args: Prisma.GameCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.GameCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          delete: {
            args: Prisma.GameDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          update: {
            args: Prisma.GameUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          deleteMany: {
            args: Prisma.GameDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.GameUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.GameUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>[]
          }
          upsert: {
            args: Prisma.GameUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$GamePayload>
          }
          aggregate: {
            args: Prisma.GameAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateGame>
          }
          groupBy: {
            args: Prisma.GameGroupByArgs<ExtArgs>
            result: $Utils.Optional<GameGroupByOutputType>[]
          }
          count: {
            args: Prisma.GameCountArgs<ExtArgs>
            result: $Utils.Optional<GameCountAggregateOutputType> | number
          }
        }
      }
      Tournament: {
        payload: Prisma.$TournamentPayload<ExtArgs>
        fields: Prisma.TournamentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TournamentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TournamentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          findFirst: {
            args: Prisma.TournamentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TournamentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          findMany: {
            args: Prisma.TournamentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>[]
          }
          create: {
            args: Prisma.TournamentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          createMany: {
            args: Prisma.TournamentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TournamentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>[]
          }
          delete: {
            args: Prisma.TournamentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          update: {
            args: Prisma.TournamentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          deleteMany: {
            args: Prisma.TournamentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TournamentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TournamentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>[]
          }
          upsert: {
            args: Prisma.TournamentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentPayload>
          }
          aggregate: {
            args: Prisma.TournamentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTournament>
          }
          groupBy: {
            args: Prisma.TournamentGroupByArgs<ExtArgs>
            result: $Utils.Optional<TournamentGroupByOutputType>[]
          }
          count: {
            args: Prisma.TournamentCountArgs<ExtArgs>
            result: $Utils.Optional<TournamentCountAggregateOutputType> | number
          }
        }
      }
      TournamentType: {
        payload: Prisma.$TournamentTypePayload<ExtArgs>
        fields: Prisma.TournamentTypeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TournamentTypeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentTypePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TournamentTypeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentTypePayload>
          }
          findFirst: {
            args: Prisma.TournamentTypeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentTypePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TournamentTypeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentTypePayload>
          }
          findMany: {
            args: Prisma.TournamentTypeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentTypePayload>[]
          }
          create: {
            args: Prisma.TournamentTypeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentTypePayload>
          }
          createMany: {
            args: Prisma.TournamentTypeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TournamentTypeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentTypePayload>[]
          }
          delete: {
            args: Prisma.TournamentTypeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentTypePayload>
          }
          update: {
            args: Prisma.TournamentTypeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentTypePayload>
          }
          deleteMany: {
            args: Prisma.TournamentTypeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TournamentTypeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TournamentTypeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentTypePayload>[]
          }
          upsert: {
            args: Prisma.TournamentTypeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentTypePayload>
          }
          aggregate: {
            args: Prisma.TournamentTypeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTournamentType>
          }
          groupBy: {
            args: Prisma.TournamentTypeGroupByArgs<ExtArgs>
            result: $Utils.Optional<TournamentTypeGroupByOutputType>[]
          }
          count: {
            args: Prisma.TournamentTypeCountArgs<ExtArgs>
            result: $Utils.Optional<TournamentTypeCountAggregateOutputType> | number
          }
        }
      }
      TournamentStatus: {
        payload: Prisma.$TournamentStatusPayload<ExtArgs>
        fields: Prisma.TournamentStatusFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TournamentStatusFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentStatusPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TournamentStatusFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentStatusPayload>
          }
          findFirst: {
            args: Prisma.TournamentStatusFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentStatusPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TournamentStatusFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentStatusPayload>
          }
          findMany: {
            args: Prisma.TournamentStatusFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentStatusPayload>[]
          }
          create: {
            args: Prisma.TournamentStatusCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentStatusPayload>
          }
          createMany: {
            args: Prisma.TournamentStatusCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TournamentStatusCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentStatusPayload>[]
          }
          delete: {
            args: Prisma.TournamentStatusDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentStatusPayload>
          }
          update: {
            args: Prisma.TournamentStatusUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentStatusPayload>
          }
          deleteMany: {
            args: Prisma.TournamentStatusDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TournamentStatusUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TournamentStatusUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentStatusPayload>[]
          }
          upsert: {
            args: Prisma.TournamentStatusUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TournamentStatusPayload>
          }
          aggregate: {
            args: Prisma.TournamentStatusAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTournamentStatus>
          }
          groupBy: {
            args: Prisma.TournamentStatusGroupByArgs<ExtArgs>
            result: $Utils.Optional<TournamentStatusGroupByOutputType>[]
          }
          count: {
            args: Prisma.TournamentStatusCountArgs<ExtArgs>
            result: $Utils.Optional<TournamentStatusCountAggregateOutputType> | number
          }
        }
      }
      Team: {
        payload: Prisma.$TeamPayload<ExtArgs>
        fields: Prisma.TeamFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findFirst: {
            args: Prisma.TeamFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          findMany: {
            args: Prisma.TeamFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          create: {
            args: Prisma.TeamCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          createMany: {
            args: Prisma.TeamCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          delete: {
            args: Prisma.TeamDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          update: {
            args: Prisma.TeamUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          deleteMany: {
            args: Prisma.TeamDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeamUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>[]
          }
          upsert: {
            args: Prisma.TeamUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamPayload>
          }
          aggregate: {
            args: Prisma.TeamAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeam>
          }
          groupBy: {
            args: Prisma.TeamGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamCountArgs<ExtArgs>
            result: $Utils.Optional<TeamCountAggregateOutputType> | number
          }
        }
      }
      TeamMember: {
        payload: Prisma.$TeamMemberPayload<ExtArgs>
        fields: Prisma.TeamMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TeamMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TeamMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          findFirst: {
            args: Prisma.TeamMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TeamMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          findMany: {
            args: Prisma.TeamMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>[]
          }
          create: {
            args: Prisma.TeamMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          createMany: {
            args: Prisma.TeamMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TeamMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>[]
          }
          delete: {
            args: Prisma.TeamMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          update: {
            args: Prisma.TeamMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          deleteMany: {
            args: Prisma.TeamMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TeamMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TeamMemberUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>[]
          }
          upsert: {
            args: Prisma.TeamMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TeamMemberPayload>
          }
          aggregate: {
            args: Prisma.TeamMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTeamMember>
          }
          groupBy: {
            args: Prisma.TeamMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<TeamMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.TeamMemberCountArgs<ExtArgs>
            result: $Utils.Optional<TeamMemberCountAggregateOutputType> | number
          }
        }
      }
      Match: {
        payload: Prisma.$MatchPayload<ExtArgs>
        fields: Prisma.MatchFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MatchFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MatchFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          findFirst: {
            args: Prisma.MatchFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MatchFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          findMany: {
            args: Prisma.MatchFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          create: {
            args: Prisma.MatchCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          createMany: {
            args: Prisma.MatchCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MatchCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          delete: {
            args: Prisma.MatchDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          update: {
            args: Prisma.MatchUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          deleteMany: {
            args: Prisma.MatchDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MatchUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MatchUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>[]
          }
          upsert: {
            args: Prisma.MatchUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MatchPayload>
          }
          aggregate: {
            args: Prisma.MatchAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMatch>
          }
          groupBy: {
            args: Prisma.MatchGroupByArgs<ExtArgs>
            result: $Utils.Optional<MatchGroupByOutputType>[]
          }
          count: {
            args: Prisma.MatchCountArgs<ExtArgs>
            result: $Utils.Optional<MatchCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    game?: GameOmit
    tournament?: TournamentOmit
    tournamentType?: TournamentTypeOmit
    tournamentStatus?: TournamentStatusOmit
    team?: TeamOmit
    teamMember?: TeamMemberOmit
    match?: MatchOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    teamMembers: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teamMembers?: boolean | UserCountOutputTypeCountTeamMembersArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTeamMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMemberWhereInput
  }


  /**
   * Count Type GameCountOutputType
   */

  export type GameCountOutputType = {
    tournaments: number
  }

  export type GameCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournaments?: boolean | GameCountOutputTypeCountTournamentsArgs
  }

  // Custom InputTypes
  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the GameCountOutputType
     */
    select?: GameCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * GameCountOutputType without action
   */
  export type GameCountOutputTypeCountTournamentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentWhereInput
  }


  /**
   * Count Type TournamentCountOutputType
   */

  export type TournamentCountOutputType = {
    status: number
    teams: number
    matches: number
  }

  export type TournamentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    status?: boolean | TournamentCountOutputTypeCountStatusArgs
    teams?: boolean | TournamentCountOutputTypeCountTeamsArgs
    matches?: boolean | TournamentCountOutputTypeCountMatchesArgs
  }

  // Custom InputTypes
  /**
   * TournamentCountOutputType without action
   */
  export type TournamentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentCountOutputType
     */
    select?: TournamentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TournamentCountOutputType without action
   */
  export type TournamentCountOutputTypeCountStatusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentStatusWhereInput
  }

  /**
   * TournamentCountOutputType without action
   */
  export type TournamentCountOutputTypeCountTeamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
  }

  /**
   * TournamentCountOutputType without action
   */
  export type TournamentCountOutputTypeCountMatchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
  }


  /**
   * Count Type TournamentTypeCountOutputType
   */

  export type TournamentTypeCountOutputType = {
    tournaments: number
  }

  export type TournamentTypeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournaments?: boolean | TournamentTypeCountOutputTypeCountTournamentsArgs
  }

  // Custom InputTypes
  /**
   * TournamentTypeCountOutputType without action
   */
  export type TournamentTypeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentTypeCountOutputType
     */
    select?: TournamentTypeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TournamentTypeCountOutputType without action
   */
  export type TournamentTypeCountOutputTypeCountTournamentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentWhereInput
  }


  /**
   * Count Type TeamCountOutputType
   */

  export type TeamCountOutputType = {
    members: number
    matchesAsTeam1: number
    matchesAsTeam2: number
  }

  export type TeamCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | TeamCountOutputTypeCountMembersArgs
    matchesAsTeam1?: boolean | TeamCountOutputTypeCountMatchesAsTeam1Args
    matchesAsTeam2?: boolean | TeamCountOutputTypeCountMatchesAsTeam2Args
  }

  // Custom InputTypes
  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamCountOutputType
     */
    select?: TeamCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMemberWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountMatchesAsTeam1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
  }

  /**
   * TeamCountOutputType without action
   */
  export type TeamCountOutputTypeCountMatchesAsTeam2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    pseudo: string | null
    name: string | null
    last_name: string | null
    email: string | null
    password: string | null
    sexe: string | null
    birthday: Date | null
    created_at: Date | null
    last_auth: Date | null
    role: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    pseudo: string | null
    name: string | null
    last_name: string | null
    email: string | null
    password: string | null
    sexe: string | null
    birthday: Date | null
    created_at: Date | null
    last_auth: Date | null
    role: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    pseudo: number
    name: number
    last_name: number
    email: number
    password: number
    sexe: number
    birthday: number
    created_at: number
    last_auth: number
    role: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    pseudo?: true
    name?: true
    last_name?: true
    email?: true
    password?: true
    sexe?: true
    birthday?: true
    created_at?: true
    last_auth?: true
    role?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    pseudo?: true
    name?: true
    last_name?: true
    email?: true
    password?: true
    sexe?: true
    birthday?: true
    created_at?: true
    last_auth?: true
    role?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    pseudo?: true
    name?: true
    last_name?: true
    email?: true
    password?: true
    sexe?: true
    birthday?: true
    created_at?: true
    last_auth?: true
    role?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    pseudo: string
    name: string
    last_name: string
    email: string
    password: string
    sexe: string
    birthday: Date
    created_at: Date
    last_auth: Date
    role: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pseudo?: boolean
    name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
    sexe?: boolean
    birthday?: boolean
    created_at?: boolean
    last_auth?: boolean
    role?: boolean
    teamMembers?: boolean | User$teamMembersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pseudo?: boolean
    name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
    sexe?: boolean
    birthday?: boolean
    created_at?: boolean
    last_auth?: boolean
    role?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pseudo?: boolean
    name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
    sexe?: boolean
    birthday?: boolean
    created_at?: boolean
    last_auth?: boolean
    role?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    pseudo?: boolean
    name?: boolean
    last_name?: boolean
    email?: boolean
    password?: boolean
    sexe?: boolean
    birthday?: boolean
    created_at?: boolean
    last_auth?: boolean
    role?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pseudo" | "name" | "last_name" | "email" | "password" | "sexe" | "birthday" | "created_at" | "last_auth" | "role", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    teamMembers?: boolean | User$teamMembersArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      teamMembers: Prisma.$TeamMemberPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      pseudo: string
      name: string
      last_name: string
      email: string
      password: string
      sexe: string
      birthday: Date
      created_at: Date
      last_auth: Date
      role: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    teamMembers<T extends User$teamMembersArgs<ExtArgs> = {}>(args?: Subset<T, User$teamMembersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly pseudo: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly last_name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly sexe: FieldRef<"User", 'String'>
    readonly birthday: FieldRef<"User", 'DateTime'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly last_auth: FieldRef<"User", 'DateTime'>
    readonly role: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.teamMembers
   */
  export type User$teamMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    where?: TeamMemberWhereInput
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    cursor?: TeamMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Game
   */

  export type AggregateGame = {
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  export type GameAvgAggregateOutputType = {
    id: number | null
  }

  export type GameSumAggregateOutputType = {
    id: number | null
  }

  export type GameMinAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type GameMaxAggregateOutputType = {
    id: number | null
    name: string | null
  }

  export type GameCountAggregateOutputType = {
    id: number
    name: number
    _all: number
  }


  export type GameAvgAggregateInputType = {
    id?: true
  }

  export type GameSumAggregateInputType = {
    id?: true
  }

  export type GameMinAggregateInputType = {
    id?: true
    name?: true
  }

  export type GameMaxAggregateInputType = {
    id?: true
    name?: true
  }

  export type GameCountAggregateInputType = {
    id?: true
    name?: true
    _all?: true
  }

  export type GameAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Game to aggregate.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Games
    **/
    _count?: true | GameCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: GameAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: GameSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: GameMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: GameMaxAggregateInputType
  }

  export type GetGameAggregateType<T extends GameAggregateArgs> = {
        [P in keyof T & keyof AggregateGame]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateGame[P]>
      : GetScalarType<T[P], AggregateGame[P]>
  }




  export type GameGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: GameWhereInput
    orderBy?: GameOrderByWithAggregationInput | GameOrderByWithAggregationInput[]
    by: GameScalarFieldEnum[] | GameScalarFieldEnum
    having?: GameScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: GameCountAggregateInputType | true
    _avg?: GameAvgAggregateInputType
    _sum?: GameSumAggregateInputType
    _min?: GameMinAggregateInputType
    _max?: GameMaxAggregateInputType
  }

  export type GameGroupByOutputType = {
    id: number
    name: string
    _count: GameCountAggregateOutputType | null
    _avg: GameAvgAggregateOutputType | null
    _sum: GameSumAggregateOutputType | null
    _min: GameMinAggregateOutputType | null
    _max: GameMaxAggregateOutputType | null
  }

  type GetGameGroupByPayload<T extends GameGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<GameGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof GameGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], GameGroupByOutputType[P]>
            : GetScalarType<T[P], GameGroupByOutputType[P]>
        }
      >
    >


  export type GameSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    tournaments?: boolean | Game$tournamentsArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["game"]>

  export type GameSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["game"]>

  export type GameSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
  }, ExtArgs["result"]["game"]>

  export type GameSelectScalar = {
    id?: boolean
    name?: boolean
  }

  export type GameOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name", ExtArgs["result"]["game"]>
  export type GameInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournaments?: boolean | Game$tournamentsArgs<ExtArgs>
    _count?: boolean | GameCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type GameIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type GameIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $GamePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Game"
    objects: {
      tournaments: Prisma.$TournamentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      name: string
    }, ExtArgs["result"]["game"]>
    composites: {}
  }

  type GameGetPayload<S extends boolean | null | undefined | GameDefaultArgs> = $Result.GetResult<Prisma.$GamePayload, S>

  type GameCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<GameFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: GameCountAggregateInputType | true
    }

  export interface GameDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Game'], meta: { name: 'Game' } }
    /**
     * Find zero or one Game that matches the filter.
     * @param {GameFindUniqueArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends GameFindUniqueArgs>(args: SelectSubset<T, GameFindUniqueArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Game that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {GameFindUniqueOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends GameFindUniqueOrThrowArgs>(args: SelectSubset<T, GameFindUniqueOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends GameFindFirstArgs>(args?: SelectSubset<T, GameFindFirstArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Game that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindFirstOrThrowArgs} args - Arguments to find a Game
     * @example
     * // Get one Game
     * const game = await prisma.game.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends GameFindFirstOrThrowArgs>(args?: SelectSubset<T, GameFindFirstOrThrowArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Games that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Games
     * const games = await prisma.game.findMany()
     * 
     * // Get first 10 Games
     * const games = await prisma.game.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const gameWithIdOnly = await prisma.game.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends GameFindManyArgs>(args?: SelectSubset<T, GameFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Game.
     * @param {GameCreateArgs} args - Arguments to create a Game.
     * @example
     * // Create one Game
     * const Game = await prisma.game.create({
     *   data: {
     *     // ... data to create a Game
     *   }
     * })
     * 
     */
    create<T extends GameCreateArgs>(args: SelectSubset<T, GameCreateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Games.
     * @param {GameCreateManyArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends GameCreateManyArgs>(args?: SelectSubset<T, GameCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Games and returns the data saved in the database.
     * @param {GameCreateManyAndReturnArgs} args - Arguments to create many Games.
     * @example
     * // Create many Games
     * const game = await prisma.game.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends GameCreateManyAndReturnArgs>(args?: SelectSubset<T, GameCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Game.
     * @param {GameDeleteArgs} args - Arguments to delete one Game.
     * @example
     * // Delete one Game
     * const Game = await prisma.game.delete({
     *   where: {
     *     // ... filter to delete one Game
     *   }
     * })
     * 
     */
    delete<T extends GameDeleteArgs>(args: SelectSubset<T, GameDeleteArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Game.
     * @param {GameUpdateArgs} args - Arguments to update one Game.
     * @example
     * // Update one Game
     * const game = await prisma.game.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends GameUpdateArgs>(args: SelectSubset<T, GameUpdateArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Games.
     * @param {GameDeleteManyArgs} args - Arguments to filter Games to delete.
     * @example
     * // Delete a few Games
     * const { count } = await prisma.game.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends GameDeleteManyArgs>(args?: SelectSubset<T, GameDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends GameUpdateManyArgs>(args: SelectSubset<T, GameUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Games and returns the data updated in the database.
     * @param {GameUpdateManyAndReturnArgs} args - Arguments to update many Games.
     * @example
     * // Update many Games
     * const game = await prisma.game.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Games and only return the `id`
     * const gameWithIdOnly = await prisma.game.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends GameUpdateManyAndReturnArgs>(args: SelectSubset<T, GameUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Game.
     * @param {GameUpsertArgs} args - Arguments to update or create a Game.
     * @example
     * // Update or create a Game
     * const game = await prisma.game.upsert({
     *   create: {
     *     // ... data to create a Game
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Game we want to update
     *   }
     * })
     */
    upsert<T extends GameUpsertArgs>(args: SelectSubset<T, GameUpsertArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Games.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameCountArgs} args - Arguments to filter Games to count.
     * @example
     * // Count the number of Games
     * const count = await prisma.game.count({
     *   where: {
     *     // ... the filter for the Games we want to count
     *   }
     * })
    **/
    count<T extends GameCountArgs>(
      args?: Subset<T, GameCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], GameCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GameAggregateArgs>(args: Subset<T, GameAggregateArgs>): Prisma.PrismaPromise<GetGameAggregateType<T>>

    /**
     * Group by Game.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GameGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends GameGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: GameGroupByArgs['orderBy'] }
        : { orderBy?: GameGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, GameGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGameGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Game model
   */
  readonly fields: GameFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Game.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__GameClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tournaments<T extends Game$tournamentsArgs<ExtArgs> = {}>(args?: Subset<T, Game$tournamentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Game model
   */
  interface GameFieldRefs {
    readonly id: FieldRef<"Game", 'Int'>
    readonly name: FieldRef<"Game", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Game findUnique
   */
  export type GameFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findUniqueOrThrow
   */
  export type GameFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game findFirst
   */
  export type GameFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findFirstOrThrow
   */
  export type GameFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Game to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Games.
     */
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game findMany
   */
  export type GameFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter, which Games to fetch.
     */
    where?: GameWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Games to fetch.
     */
    orderBy?: GameOrderByWithRelationInput | GameOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Games.
     */
    cursor?: GameWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Games from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Games.
     */
    skip?: number
    distinct?: GameScalarFieldEnum | GameScalarFieldEnum[]
  }

  /**
   * Game create
   */
  export type GameCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to create a Game.
     */
    data: XOR<GameCreateInput, GameUncheckedCreateInput>
  }

  /**
   * Game createMany
   */
  export type GameCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game createManyAndReturn
   */
  export type GameCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to create many Games.
     */
    data: GameCreateManyInput | GameCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Game update
   */
  export type GameUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The data needed to update a Game.
     */
    data: XOR<GameUpdateInput, GameUncheckedUpdateInput>
    /**
     * Choose, which Game to update.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game updateMany
   */
  export type GameUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game updateManyAndReturn
   */
  export type GameUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * The data used to update Games.
     */
    data: XOR<GameUpdateManyMutationInput, GameUncheckedUpdateManyInput>
    /**
     * Filter which Games to update
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to update.
     */
    limit?: number
  }

  /**
   * Game upsert
   */
  export type GameUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * The filter to search for the Game to update in case it exists.
     */
    where: GameWhereUniqueInput
    /**
     * In case the Game found by the `where` argument doesn't exist, create a new Game with this data.
     */
    create: XOR<GameCreateInput, GameUncheckedCreateInput>
    /**
     * In case the Game was found with the provided `where` argument, update it with this data.
     */
    update: XOR<GameUpdateInput, GameUncheckedUpdateInput>
  }

  /**
   * Game delete
   */
  export type GameDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
    /**
     * Filter which Game to delete.
     */
    where: GameWhereUniqueInput
  }

  /**
   * Game deleteMany
   */
  export type GameDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Games to delete
     */
    where?: GameWhereInput
    /**
     * Limit how many Games to delete.
     */
    limit?: number
  }

  /**
   * Game.tournaments
   */
  export type Game$tournamentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    where?: TournamentWhereInput
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    cursor?: TournamentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TournamentScalarFieldEnum | TournamentScalarFieldEnum[]
  }

  /**
   * Game without action
   */
  export type GameDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Game
     */
    select?: GameSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Game
     */
    omit?: GameOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: GameInclude<ExtArgs> | null
  }


  /**
   * Model Tournament
   */

  export type AggregateTournament = {
    _count: TournamentCountAggregateOutputType | null
    _avg: TournamentAvgAggregateOutputType | null
    _sum: TournamentSumAggregateOutputType | null
    _min: TournamentMinAggregateOutputType | null
    _max: TournamentMaxAggregateOutputType | null
  }

  export type TournamentAvgAggregateOutputType = {
    id: number | null
    maxParticipants: number | null
    minTeams: number | null
    playersPerTeam: number | null
    totalPlayers: number | null
    gameId: number | null
    tournament_typeId: number | null
  }

  export type TournamentSumAggregateOutputType = {
    id: number | null
    maxParticipants: number | null
    minTeams: number | null
    playersPerTeam: number | null
    totalPlayers: number | null
    gameId: number | null
    tournament_typeId: number | null
  }

  export type TournamentMinAggregateOutputType = {
    id: number | null
    tournamentName: string | null
    startDate: Date | null
    startTime: string | null
    format: string | null
    rules: string | null
    maxParticipants: number | null
    rewards: string | null
    minTeams: number | null
    playersPerTeam: number | null
    totalPlayers: number | null
    createdAt: Date | null
    updatedAt: Date | null
    gameId: number | null
    tournament_typeId: number | null
  }

  export type TournamentMaxAggregateOutputType = {
    id: number | null
    tournamentName: string | null
    startDate: Date | null
    startTime: string | null
    format: string | null
    rules: string | null
    maxParticipants: number | null
    rewards: string | null
    minTeams: number | null
    playersPerTeam: number | null
    totalPlayers: number | null
    createdAt: Date | null
    updatedAt: Date | null
    gameId: number | null
    tournament_typeId: number | null
  }

  export type TournamentCountAggregateOutputType = {
    id: number
    tournamentName: number
    startDate: number
    startTime: number
    format: number
    rules: number
    maxParticipants: number
    rewards: number
    minTeams: number
    playersPerTeam: number
    totalPlayers: number
    createdAt: number
    updatedAt: number
    gameId: number
    tournament_typeId: number
    _all: number
  }


  export type TournamentAvgAggregateInputType = {
    id?: true
    maxParticipants?: true
    minTeams?: true
    playersPerTeam?: true
    totalPlayers?: true
    gameId?: true
    tournament_typeId?: true
  }

  export type TournamentSumAggregateInputType = {
    id?: true
    maxParticipants?: true
    minTeams?: true
    playersPerTeam?: true
    totalPlayers?: true
    gameId?: true
    tournament_typeId?: true
  }

  export type TournamentMinAggregateInputType = {
    id?: true
    tournamentName?: true
    startDate?: true
    startTime?: true
    format?: true
    rules?: true
    maxParticipants?: true
    rewards?: true
    minTeams?: true
    playersPerTeam?: true
    totalPlayers?: true
    createdAt?: true
    updatedAt?: true
    gameId?: true
    tournament_typeId?: true
  }

  export type TournamentMaxAggregateInputType = {
    id?: true
    tournamentName?: true
    startDate?: true
    startTime?: true
    format?: true
    rules?: true
    maxParticipants?: true
    rewards?: true
    minTeams?: true
    playersPerTeam?: true
    totalPlayers?: true
    createdAt?: true
    updatedAt?: true
    gameId?: true
    tournament_typeId?: true
  }

  export type TournamentCountAggregateInputType = {
    id?: true
    tournamentName?: true
    startDate?: true
    startTime?: true
    format?: true
    rules?: true
    maxParticipants?: true
    rewards?: true
    minTeams?: true
    playersPerTeam?: true
    totalPlayers?: true
    createdAt?: true
    updatedAt?: true
    gameId?: true
    tournament_typeId?: true
    _all?: true
  }

  export type TournamentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tournament to aggregate.
     */
    where?: TournamentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tournaments to fetch.
     */
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TournamentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tournaments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tournaments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tournaments
    **/
    _count?: true | TournamentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TournamentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TournamentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TournamentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TournamentMaxAggregateInputType
  }

  export type GetTournamentAggregateType<T extends TournamentAggregateArgs> = {
        [P in keyof T & keyof AggregateTournament]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTournament[P]>
      : GetScalarType<T[P], AggregateTournament[P]>
  }




  export type TournamentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentWhereInput
    orderBy?: TournamentOrderByWithAggregationInput | TournamentOrderByWithAggregationInput[]
    by: TournamentScalarFieldEnum[] | TournamentScalarFieldEnum
    having?: TournamentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TournamentCountAggregateInputType | true
    _avg?: TournamentAvgAggregateInputType
    _sum?: TournamentSumAggregateInputType
    _min?: TournamentMinAggregateInputType
    _max?: TournamentMaxAggregateInputType
  }

  export type TournamentGroupByOutputType = {
    id: number
    tournamentName: string
    startDate: Date
    startTime: string
    format: string
    rules: string
    maxParticipants: number
    rewards: string | null
    minTeams: number
    playersPerTeam: number
    totalPlayers: number
    createdAt: Date
    updatedAt: Date
    gameId: number
    tournament_typeId: number
    _count: TournamentCountAggregateOutputType | null
    _avg: TournamentAvgAggregateOutputType | null
    _sum: TournamentSumAggregateOutputType | null
    _min: TournamentMinAggregateOutputType | null
    _max: TournamentMaxAggregateOutputType | null
  }

  type GetTournamentGroupByPayload<T extends TournamentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TournamentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TournamentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TournamentGroupByOutputType[P]>
            : GetScalarType<T[P], TournamentGroupByOutputType[P]>
        }
      >
    >


  export type TournamentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentName?: boolean
    startDate?: boolean
    startTime?: boolean
    format?: boolean
    rules?: boolean
    maxParticipants?: boolean
    rewards?: boolean
    minTeams?: boolean
    playersPerTeam?: boolean
    totalPlayers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gameId?: boolean
    tournament_typeId?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    tournamentType?: boolean | TournamentTypeDefaultArgs<ExtArgs>
    status?: boolean | Tournament$statusArgs<ExtArgs>
    teams?: boolean | Tournament$teamsArgs<ExtArgs>
    matches?: boolean | Tournament$matchesArgs<ExtArgs>
    _count?: boolean | TournamentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournament"]>

  export type TournamentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentName?: boolean
    startDate?: boolean
    startTime?: boolean
    format?: boolean
    rules?: boolean
    maxParticipants?: boolean
    rewards?: boolean
    minTeams?: boolean
    playersPerTeam?: boolean
    totalPlayers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gameId?: boolean
    tournament_typeId?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    tournamentType?: boolean | TournamentTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournament"]>

  export type TournamentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentName?: boolean
    startDate?: boolean
    startTime?: boolean
    format?: boolean
    rules?: boolean
    maxParticipants?: boolean
    rewards?: boolean
    minTeams?: boolean
    playersPerTeam?: boolean
    totalPlayers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gameId?: boolean
    tournament_typeId?: boolean
    game?: boolean | GameDefaultArgs<ExtArgs>
    tournamentType?: boolean | TournamentTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournament"]>

  export type TournamentSelectScalar = {
    id?: boolean
    tournamentName?: boolean
    startDate?: boolean
    startTime?: boolean
    format?: boolean
    rules?: boolean
    maxParticipants?: boolean
    rewards?: boolean
    minTeams?: boolean
    playersPerTeam?: boolean
    totalPlayers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    gameId?: boolean
    tournament_typeId?: boolean
  }

  export type TournamentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tournamentName" | "startDate" | "startTime" | "format" | "rules" | "maxParticipants" | "rewards" | "minTeams" | "playersPerTeam" | "totalPlayers" | "createdAt" | "updatedAt" | "gameId" | "tournament_typeId", ExtArgs["result"]["tournament"]>
  export type TournamentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    tournamentType?: boolean | TournamentTypeDefaultArgs<ExtArgs>
    status?: boolean | Tournament$statusArgs<ExtArgs>
    teams?: boolean | Tournament$teamsArgs<ExtArgs>
    matches?: boolean | Tournament$matchesArgs<ExtArgs>
    _count?: boolean | TournamentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TournamentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    tournamentType?: boolean | TournamentTypeDefaultArgs<ExtArgs>
  }
  export type TournamentIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    game?: boolean | GameDefaultArgs<ExtArgs>
    tournamentType?: boolean | TournamentTypeDefaultArgs<ExtArgs>
  }

  export type $TournamentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Tournament"
    objects: {
      game: Prisma.$GamePayload<ExtArgs>
      tournamentType: Prisma.$TournamentTypePayload<ExtArgs>
      status: Prisma.$TournamentStatusPayload<ExtArgs>[]
      teams: Prisma.$TeamPayload<ExtArgs>[]
      matches: Prisma.$MatchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tournamentName: string
      startDate: Date
      startTime: string
      format: string
      rules: string
      maxParticipants: number
      rewards: string | null
      minTeams: number
      playersPerTeam: number
      totalPlayers: number
      createdAt: Date
      updatedAt: Date
      gameId: number
      tournament_typeId: number
    }, ExtArgs["result"]["tournament"]>
    composites: {}
  }

  type TournamentGetPayload<S extends boolean | null | undefined | TournamentDefaultArgs> = $Result.GetResult<Prisma.$TournamentPayload, S>

  type TournamentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TournamentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TournamentCountAggregateInputType | true
    }

  export interface TournamentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Tournament'], meta: { name: 'Tournament' } }
    /**
     * Find zero or one Tournament that matches the filter.
     * @param {TournamentFindUniqueArgs} args - Arguments to find a Tournament
     * @example
     * // Get one Tournament
     * const tournament = await prisma.tournament.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TournamentFindUniqueArgs>(args: SelectSubset<T, TournamentFindUniqueArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tournament that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TournamentFindUniqueOrThrowArgs} args - Arguments to find a Tournament
     * @example
     * // Get one Tournament
     * const tournament = await prisma.tournament.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TournamentFindUniqueOrThrowArgs>(args: SelectSubset<T, TournamentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tournament that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentFindFirstArgs} args - Arguments to find a Tournament
     * @example
     * // Get one Tournament
     * const tournament = await prisma.tournament.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TournamentFindFirstArgs>(args?: SelectSubset<T, TournamentFindFirstArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tournament that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentFindFirstOrThrowArgs} args - Arguments to find a Tournament
     * @example
     * // Get one Tournament
     * const tournament = await prisma.tournament.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TournamentFindFirstOrThrowArgs>(args?: SelectSubset<T, TournamentFindFirstOrThrowArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tournaments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tournaments
     * const tournaments = await prisma.tournament.findMany()
     * 
     * // Get first 10 Tournaments
     * const tournaments = await prisma.tournament.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tournamentWithIdOnly = await prisma.tournament.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TournamentFindManyArgs>(args?: SelectSubset<T, TournamentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tournament.
     * @param {TournamentCreateArgs} args - Arguments to create a Tournament.
     * @example
     * // Create one Tournament
     * const Tournament = await prisma.tournament.create({
     *   data: {
     *     // ... data to create a Tournament
     *   }
     * })
     * 
     */
    create<T extends TournamentCreateArgs>(args: SelectSubset<T, TournamentCreateArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tournaments.
     * @param {TournamentCreateManyArgs} args - Arguments to create many Tournaments.
     * @example
     * // Create many Tournaments
     * const tournament = await prisma.tournament.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TournamentCreateManyArgs>(args?: SelectSubset<T, TournamentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tournaments and returns the data saved in the database.
     * @param {TournamentCreateManyAndReturnArgs} args - Arguments to create many Tournaments.
     * @example
     * // Create many Tournaments
     * const tournament = await prisma.tournament.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tournaments and only return the `id`
     * const tournamentWithIdOnly = await prisma.tournament.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TournamentCreateManyAndReturnArgs>(args?: SelectSubset<T, TournamentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Tournament.
     * @param {TournamentDeleteArgs} args - Arguments to delete one Tournament.
     * @example
     * // Delete one Tournament
     * const Tournament = await prisma.tournament.delete({
     *   where: {
     *     // ... filter to delete one Tournament
     *   }
     * })
     * 
     */
    delete<T extends TournamentDeleteArgs>(args: SelectSubset<T, TournamentDeleteArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tournament.
     * @param {TournamentUpdateArgs} args - Arguments to update one Tournament.
     * @example
     * // Update one Tournament
     * const tournament = await prisma.tournament.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TournamentUpdateArgs>(args: SelectSubset<T, TournamentUpdateArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tournaments.
     * @param {TournamentDeleteManyArgs} args - Arguments to filter Tournaments to delete.
     * @example
     * // Delete a few Tournaments
     * const { count } = await prisma.tournament.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TournamentDeleteManyArgs>(args?: SelectSubset<T, TournamentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tournaments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tournaments
     * const tournament = await prisma.tournament.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TournamentUpdateManyArgs>(args: SelectSubset<T, TournamentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tournaments and returns the data updated in the database.
     * @param {TournamentUpdateManyAndReturnArgs} args - Arguments to update many Tournaments.
     * @example
     * // Update many Tournaments
     * const tournament = await prisma.tournament.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tournaments and only return the `id`
     * const tournamentWithIdOnly = await prisma.tournament.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TournamentUpdateManyAndReturnArgs>(args: SelectSubset<T, TournamentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Tournament.
     * @param {TournamentUpsertArgs} args - Arguments to update or create a Tournament.
     * @example
     * // Update or create a Tournament
     * const tournament = await prisma.tournament.upsert({
     *   create: {
     *     // ... data to create a Tournament
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tournament we want to update
     *   }
     * })
     */
    upsert<T extends TournamentUpsertArgs>(args: SelectSubset<T, TournamentUpsertArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tournaments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentCountArgs} args - Arguments to filter Tournaments to count.
     * @example
     * // Count the number of Tournaments
     * const count = await prisma.tournament.count({
     *   where: {
     *     // ... the filter for the Tournaments we want to count
     *   }
     * })
    **/
    count<T extends TournamentCountArgs>(
      args?: Subset<T, TournamentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TournamentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tournament.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TournamentAggregateArgs>(args: Subset<T, TournamentAggregateArgs>): Prisma.PrismaPromise<GetTournamentAggregateType<T>>

    /**
     * Group by Tournament.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TournamentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TournamentGroupByArgs['orderBy'] }
        : { orderBy?: TournamentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TournamentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTournamentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Tournament model
   */
  readonly fields: TournamentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Tournament.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TournamentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    game<T extends GameDefaultArgs<ExtArgs> = {}>(args?: Subset<T, GameDefaultArgs<ExtArgs>>): Prisma__GameClient<$Result.GetResult<Prisma.$GamePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tournamentType<T extends TournamentTypeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TournamentTypeDefaultArgs<ExtArgs>>): Prisma__TournamentTypeClient<$Result.GetResult<Prisma.$TournamentTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    status<T extends Tournament$statusArgs<ExtArgs> = {}>(args?: Subset<T, Tournament$statusArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    teams<T extends Tournament$teamsArgs<ExtArgs> = {}>(args?: Subset<T, Tournament$teamsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    matches<T extends Tournament$matchesArgs<ExtArgs> = {}>(args?: Subset<T, Tournament$matchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Tournament model
   */
  interface TournamentFieldRefs {
    readonly id: FieldRef<"Tournament", 'Int'>
    readonly tournamentName: FieldRef<"Tournament", 'String'>
    readonly startDate: FieldRef<"Tournament", 'DateTime'>
    readonly startTime: FieldRef<"Tournament", 'String'>
    readonly format: FieldRef<"Tournament", 'String'>
    readonly rules: FieldRef<"Tournament", 'String'>
    readonly maxParticipants: FieldRef<"Tournament", 'Int'>
    readonly rewards: FieldRef<"Tournament", 'String'>
    readonly minTeams: FieldRef<"Tournament", 'Int'>
    readonly playersPerTeam: FieldRef<"Tournament", 'Int'>
    readonly totalPlayers: FieldRef<"Tournament", 'Int'>
    readonly createdAt: FieldRef<"Tournament", 'DateTime'>
    readonly updatedAt: FieldRef<"Tournament", 'DateTime'>
    readonly gameId: FieldRef<"Tournament", 'Int'>
    readonly tournament_typeId: FieldRef<"Tournament", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Tournament findUnique
   */
  export type TournamentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournament to fetch.
     */
    where: TournamentWhereUniqueInput
  }

  /**
   * Tournament findUniqueOrThrow
   */
  export type TournamentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournament to fetch.
     */
    where: TournamentWhereUniqueInput
  }

  /**
   * Tournament findFirst
   */
  export type TournamentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournament to fetch.
     */
    where?: TournamentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tournaments to fetch.
     */
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tournaments.
     */
    cursor?: TournamentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tournaments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tournaments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tournaments.
     */
    distinct?: TournamentScalarFieldEnum | TournamentScalarFieldEnum[]
  }

  /**
   * Tournament findFirstOrThrow
   */
  export type TournamentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournament to fetch.
     */
    where?: TournamentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tournaments to fetch.
     */
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tournaments.
     */
    cursor?: TournamentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tournaments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tournaments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tournaments.
     */
    distinct?: TournamentScalarFieldEnum | TournamentScalarFieldEnum[]
  }

  /**
   * Tournament findMany
   */
  export type TournamentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter, which Tournaments to fetch.
     */
    where?: TournamentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tournaments to fetch.
     */
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tournaments.
     */
    cursor?: TournamentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tournaments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tournaments.
     */
    skip?: number
    distinct?: TournamentScalarFieldEnum | TournamentScalarFieldEnum[]
  }

  /**
   * Tournament create
   */
  export type TournamentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * The data needed to create a Tournament.
     */
    data: XOR<TournamentCreateInput, TournamentUncheckedCreateInput>
  }

  /**
   * Tournament createMany
   */
  export type TournamentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tournaments.
     */
    data: TournamentCreateManyInput | TournamentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Tournament createManyAndReturn
   */
  export type TournamentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * The data used to create many Tournaments.
     */
    data: TournamentCreateManyInput | TournamentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tournament update
   */
  export type TournamentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * The data needed to update a Tournament.
     */
    data: XOR<TournamentUpdateInput, TournamentUncheckedUpdateInput>
    /**
     * Choose, which Tournament to update.
     */
    where: TournamentWhereUniqueInput
  }

  /**
   * Tournament updateMany
   */
  export type TournamentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tournaments.
     */
    data: XOR<TournamentUpdateManyMutationInput, TournamentUncheckedUpdateManyInput>
    /**
     * Filter which Tournaments to update
     */
    where?: TournamentWhereInput
    /**
     * Limit how many Tournaments to update.
     */
    limit?: number
  }

  /**
   * Tournament updateManyAndReturn
   */
  export type TournamentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * The data used to update Tournaments.
     */
    data: XOR<TournamentUpdateManyMutationInput, TournamentUncheckedUpdateManyInput>
    /**
     * Filter which Tournaments to update
     */
    where?: TournamentWhereInput
    /**
     * Limit how many Tournaments to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Tournament upsert
   */
  export type TournamentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * The filter to search for the Tournament to update in case it exists.
     */
    where: TournamentWhereUniqueInput
    /**
     * In case the Tournament found by the `where` argument doesn't exist, create a new Tournament with this data.
     */
    create: XOR<TournamentCreateInput, TournamentUncheckedCreateInput>
    /**
     * In case the Tournament was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TournamentUpdateInput, TournamentUncheckedUpdateInput>
  }

  /**
   * Tournament delete
   */
  export type TournamentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    /**
     * Filter which Tournament to delete.
     */
    where: TournamentWhereUniqueInput
  }

  /**
   * Tournament deleteMany
   */
  export type TournamentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tournaments to delete
     */
    where?: TournamentWhereInput
    /**
     * Limit how many Tournaments to delete.
     */
    limit?: number
  }

  /**
   * Tournament.status
   */
  export type Tournament$statusArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentStatus
     */
    select?: TournamentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentStatus
     */
    omit?: TournamentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentStatusInclude<ExtArgs> | null
    where?: TournamentStatusWhereInput
    orderBy?: TournamentStatusOrderByWithRelationInput | TournamentStatusOrderByWithRelationInput[]
    cursor?: TournamentStatusWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TournamentStatusScalarFieldEnum | TournamentStatusScalarFieldEnum[]
  }

  /**
   * Tournament.teams
   */
  export type Tournament$teamsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    cursor?: TeamWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Tournament.matches
   */
  export type Tournament$matchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    cursor?: MatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Tournament without action
   */
  export type TournamentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
  }


  /**
   * Model TournamentType
   */

  export type AggregateTournamentType = {
    _count: TournamentTypeCountAggregateOutputType | null
    _avg: TournamentTypeAvgAggregateOutputType | null
    _sum: TournamentTypeSumAggregateOutputType | null
    _min: TournamentTypeMinAggregateOutputType | null
    _max: TournamentTypeMaxAggregateOutputType | null
  }

  export type TournamentTypeAvgAggregateOutputType = {
    id: number | null
  }

  export type TournamentTypeSumAggregateOutputType = {
    id: number | null
  }

  export type TournamentTypeMinAggregateOutputType = {
    id: number | null
    type: string | null
  }

  export type TournamentTypeMaxAggregateOutputType = {
    id: number | null
    type: string | null
  }

  export type TournamentTypeCountAggregateOutputType = {
    id: number
    type: number
    _all: number
  }


  export type TournamentTypeAvgAggregateInputType = {
    id?: true
  }

  export type TournamentTypeSumAggregateInputType = {
    id?: true
  }

  export type TournamentTypeMinAggregateInputType = {
    id?: true
    type?: true
  }

  export type TournamentTypeMaxAggregateInputType = {
    id?: true
    type?: true
  }

  export type TournamentTypeCountAggregateInputType = {
    id?: true
    type?: true
    _all?: true
  }

  export type TournamentTypeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TournamentType to aggregate.
     */
    where?: TournamentTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentTypes to fetch.
     */
    orderBy?: TournamentTypeOrderByWithRelationInput | TournamentTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TournamentTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TournamentTypes
    **/
    _count?: true | TournamentTypeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TournamentTypeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TournamentTypeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TournamentTypeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TournamentTypeMaxAggregateInputType
  }

  export type GetTournamentTypeAggregateType<T extends TournamentTypeAggregateArgs> = {
        [P in keyof T & keyof AggregateTournamentType]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTournamentType[P]>
      : GetScalarType<T[P], AggregateTournamentType[P]>
  }




  export type TournamentTypeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentTypeWhereInput
    orderBy?: TournamentTypeOrderByWithAggregationInput | TournamentTypeOrderByWithAggregationInput[]
    by: TournamentTypeScalarFieldEnum[] | TournamentTypeScalarFieldEnum
    having?: TournamentTypeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TournamentTypeCountAggregateInputType | true
    _avg?: TournamentTypeAvgAggregateInputType
    _sum?: TournamentTypeSumAggregateInputType
    _min?: TournamentTypeMinAggregateInputType
    _max?: TournamentTypeMaxAggregateInputType
  }

  export type TournamentTypeGroupByOutputType = {
    id: number
    type: string
    _count: TournamentTypeCountAggregateOutputType | null
    _avg: TournamentTypeAvgAggregateOutputType | null
    _sum: TournamentTypeSumAggregateOutputType | null
    _min: TournamentTypeMinAggregateOutputType | null
    _max: TournamentTypeMaxAggregateOutputType | null
  }

  type GetTournamentTypeGroupByPayload<T extends TournamentTypeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TournamentTypeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TournamentTypeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TournamentTypeGroupByOutputType[P]>
            : GetScalarType<T[P], TournamentTypeGroupByOutputType[P]>
        }
      >
    >


  export type TournamentTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    tournaments?: boolean | TournamentType$tournamentsArgs<ExtArgs>
    _count?: boolean | TournamentTypeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournamentType"]>

  export type TournamentTypeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
  }, ExtArgs["result"]["tournamentType"]>

  export type TournamentTypeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
  }, ExtArgs["result"]["tournamentType"]>

  export type TournamentTypeSelectScalar = {
    id?: boolean
    type?: boolean
  }

  export type TournamentTypeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type", ExtArgs["result"]["tournamentType"]>
  export type TournamentTypeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournaments?: boolean | TournamentType$tournamentsArgs<ExtArgs>
    _count?: boolean | TournamentTypeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TournamentTypeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type TournamentTypeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $TournamentTypePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TournamentType"
    objects: {
      tournaments: Prisma.$TournamentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      type: string
    }, ExtArgs["result"]["tournamentType"]>
    composites: {}
  }

  type TournamentTypeGetPayload<S extends boolean | null | undefined | TournamentTypeDefaultArgs> = $Result.GetResult<Prisma.$TournamentTypePayload, S>

  type TournamentTypeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TournamentTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TournamentTypeCountAggregateInputType | true
    }

  export interface TournamentTypeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TournamentType'], meta: { name: 'TournamentType' } }
    /**
     * Find zero or one TournamentType that matches the filter.
     * @param {TournamentTypeFindUniqueArgs} args - Arguments to find a TournamentType
     * @example
     * // Get one TournamentType
     * const tournamentType = await prisma.tournamentType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TournamentTypeFindUniqueArgs>(args: SelectSubset<T, TournamentTypeFindUniqueArgs<ExtArgs>>): Prisma__TournamentTypeClient<$Result.GetResult<Prisma.$TournamentTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TournamentType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TournamentTypeFindUniqueOrThrowArgs} args - Arguments to find a TournamentType
     * @example
     * // Get one TournamentType
     * const tournamentType = await prisma.tournamentType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TournamentTypeFindUniqueOrThrowArgs>(args: SelectSubset<T, TournamentTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TournamentTypeClient<$Result.GetResult<Prisma.$TournamentTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TournamentType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentTypeFindFirstArgs} args - Arguments to find a TournamentType
     * @example
     * // Get one TournamentType
     * const tournamentType = await prisma.tournamentType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TournamentTypeFindFirstArgs>(args?: SelectSubset<T, TournamentTypeFindFirstArgs<ExtArgs>>): Prisma__TournamentTypeClient<$Result.GetResult<Prisma.$TournamentTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TournamentType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentTypeFindFirstOrThrowArgs} args - Arguments to find a TournamentType
     * @example
     * // Get one TournamentType
     * const tournamentType = await prisma.tournamentType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TournamentTypeFindFirstOrThrowArgs>(args?: SelectSubset<T, TournamentTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma__TournamentTypeClient<$Result.GetResult<Prisma.$TournamentTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TournamentTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TournamentTypes
     * const tournamentTypes = await prisma.tournamentType.findMany()
     * 
     * // Get first 10 TournamentTypes
     * const tournamentTypes = await prisma.tournamentType.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tournamentTypeWithIdOnly = await prisma.tournamentType.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TournamentTypeFindManyArgs>(args?: SelectSubset<T, TournamentTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TournamentType.
     * @param {TournamentTypeCreateArgs} args - Arguments to create a TournamentType.
     * @example
     * // Create one TournamentType
     * const TournamentType = await prisma.tournamentType.create({
     *   data: {
     *     // ... data to create a TournamentType
     *   }
     * })
     * 
     */
    create<T extends TournamentTypeCreateArgs>(args: SelectSubset<T, TournamentTypeCreateArgs<ExtArgs>>): Prisma__TournamentTypeClient<$Result.GetResult<Prisma.$TournamentTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TournamentTypes.
     * @param {TournamentTypeCreateManyArgs} args - Arguments to create many TournamentTypes.
     * @example
     * // Create many TournamentTypes
     * const tournamentType = await prisma.tournamentType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TournamentTypeCreateManyArgs>(args?: SelectSubset<T, TournamentTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TournamentTypes and returns the data saved in the database.
     * @param {TournamentTypeCreateManyAndReturnArgs} args - Arguments to create many TournamentTypes.
     * @example
     * // Create many TournamentTypes
     * const tournamentType = await prisma.tournamentType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TournamentTypes and only return the `id`
     * const tournamentTypeWithIdOnly = await prisma.tournamentType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TournamentTypeCreateManyAndReturnArgs>(args?: SelectSubset<T, TournamentTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TournamentType.
     * @param {TournamentTypeDeleteArgs} args - Arguments to delete one TournamentType.
     * @example
     * // Delete one TournamentType
     * const TournamentType = await prisma.tournamentType.delete({
     *   where: {
     *     // ... filter to delete one TournamentType
     *   }
     * })
     * 
     */
    delete<T extends TournamentTypeDeleteArgs>(args: SelectSubset<T, TournamentTypeDeleteArgs<ExtArgs>>): Prisma__TournamentTypeClient<$Result.GetResult<Prisma.$TournamentTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TournamentType.
     * @param {TournamentTypeUpdateArgs} args - Arguments to update one TournamentType.
     * @example
     * // Update one TournamentType
     * const tournamentType = await prisma.tournamentType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TournamentTypeUpdateArgs>(args: SelectSubset<T, TournamentTypeUpdateArgs<ExtArgs>>): Prisma__TournamentTypeClient<$Result.GetResult<Prisma.$TournamentTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TournamentTypes.
     * @param {TournamentTypeDeleteManyArgs} args - Arguments to filter TournamentTypes to delete.
     * @example
     * // Delete a few TournamentTypes
     * const { count } = await prisma.tournamentType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TournamentTypeDeleteManyArgs>(args?: SelectSubset<T, TournamentTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TournamentTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TournamentTypes
     * const tournamentType = await prisma.tournamentType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TournamentTypeUpdateManyArgs>(args: SelectSubset<T, TournamentTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TournamentTypes and returns the data updated in the database.
     * @param {TournamentTypeUpdateManyAndReturnArgs} args - Arguments to update many TournamentTypes.
     * @example
     * // Update many TournamentTypes
     * const tournamentType = await prisma.tournamentType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TournamentTypes and only return the `id`
     * const tournamentTypeWithIdOnly = await prisma.tournamentType.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TournamentTypeUpdateManyAndReturnArgs>(args: SelectSubset<T, TournamentTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TournamentType.
     * @param {TournamentTypeUpsertArgs} args - Arguments to update or create a TournamentType.
     * @example
     * // Update or create a TournamentType
     * const tournamentType = await prisma.tournamentType.upsert({
     *   create: {
     *     // ... data to create a TournamentType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TournamentType we want to update
     *   }
     * })
     */
    upsert<T extends TournamentTypeUpsertArgs>(args: SelectSubset<T, TournamentTypeUpsertArgs<ExtArgs>>): Prisma__TournamentTypeClient<$Result.GetResult<Prisma.$TournamentTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TournamentTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentTypeCountArgs} args - Arguments to filter TournamentTypes to count.
     * @example
     * // Count the number of TournamentTypes
     * const count = await prisma.tournamentType.count({
     *   where: {
     *     // ... the filter for the TournamentTypes we want to count
     *   }
     * })
    **/
    count<T extends TournamentTypeCountArgs>(
      args?: Subset<T, TournamentTypeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TournamentTypeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TournamentType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TournamentTypeAggregateArgs>(args: Subset<T, TournamentTypeAggregateArgs>): Prisma.PrismaPromise<GetTournamentTypeAggregateType<T>>

    /**
     * Group by TournamentType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TournamentTypeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TournamentTypeGroupByArgs['orderBy'] }
        : { orderBy?: TournamentTypeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TournamentTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTournamentTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TournamentType model
   */
  readonly fields: TournamentTypeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TournamentType.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TournamentTypeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tournaments<T extends TournamentType$tournamentsArgs<ExtArgs> = {}>(args?: Subset<T, TournamentType$tournamentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TournamentType model
   */
  interface TournamentTypeFieldRefs {
    readonly id: FieldRef<"TournamentType", 'Int'>
    readonly type: FieldRef<"TournamentType", 'String'>
  }
    

  // Custom InputTypes
  /**
   * TournamentType findUnique
   */
  export type TournamentTypeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentType
     */
    select?: TournamentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentType
     */
    omit?: TournamentTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentTypeInclude<ExtArgs> | null
    /**
     * Filter, which TournamentType to fetch.
     */
    where: TournamentTypeWhereUniqueInput
  }

  /**
   * TournamentType findUniqueOrThrow
   */
  export type TournamentTypeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentType
     */
    select?: TournamentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentType
     */
    omit?: TournamentTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentTypeInclude<ExtArgs> | null
    /**
     * Filter, which TournamentType to fetch.
     */
    where: TournamentTypeWhereUniqueInput
  }

  /**
   * TournamentType findFirst
   */
  export type TournamentTypeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentType
     */
    select?: TournamentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentType
     */
    omit?: TournamentTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentTypeInclude<ExtArgs> | null
    /**
     * Filter, which TournamentType to fetch.
     */
    where?: TournamentTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentTypes to fetch.
     */
    orderBy?: TournamentTypeOrderByWithRelationInput | TournamentTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TournamentTypes.
     */
    cursor?: TournamentTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TournamentTypes.
     */
    distinct?: TournamentTypeScalarFieldEnum | TournamentTypeScalarFieldEnum[]
  }

  /**
   * TournamentType findFirstOrThrow
   */
  export type TournamentTypeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentType
     */
    select?: TournamentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentType
     */
    omit?: TournamentTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentTypeInclude<ExtArgs> | null
    /**
     * Filter, which TournamentType to fetch.
     */
    where?: TournamentTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentTypes to fetch.
     */
    orderBy?: TournamentTypeOrderByWithRelationInput | TournamentTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TournamentTypes.
     */
    cursor?: TournamentTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentTypes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TournamentTypes.
     */
    distinct?: TournamentTypeScalarFieldEnum | TournamentTypeScalarFieldEnum[]
  }

  /**
   * TournamentType findMany
   */
  export type TournamentTypeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentType
     */
    select?: TournamentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentType
     */
    omit?: TournamentTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentTypeInclude<ExtArgs> | null
    /**
     * Filter, which TournamentTypes to fetch.
     */
    where?: TournamentTypeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentTypes to fetch.
     */
    orderBy?: TournamentTypeOrderByWithRelationInput | TournamentTypeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TournamentTypes.
     */
    cursor?: TournamentTypeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentTypes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentTypes.
     */
    skip?: number
    distinct?: TournamentTypeScalarFieldEnum | TournamentTypeScalarFieldEnum[]
  }

  /**
   * TournamentType create
   */
  export type TournamentTypeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentType
     */
    select?: TournamentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentType
     */
    omit?: TournamentTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentTypeInclude<ExtArgs> | null
    /**
     * The data needed to create a TournamentType.
     */
    data: XOR<TournamentTypeCreateInput, TournamentTypeUncheckedCreateInput>
  }

  /**
   * TournamentType createMany
   */
  export type TournamentTypeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TournamentTypes.
     */
    data: TournamentTypeCreateManyInput | TournamentTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TournamentType createManyAndReturn
   */
  export type TournamentTypeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentType
     */
    select?: TournamentTypeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentType
     */
    omit?: TournamentTypeOmit<ExtArgs> | null
    /**
     * The data used to create many TournamentTypes.
     */
    data: TournamentTypeCreateManyInput | TournamentTypeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TournamentType update
   */
  export type TournamentTypeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentType
     */
    select?: TournamentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentType
     */
    omit?: TournamentTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentTypeInclude<ExtArgs> | null
    /**
     * The data needed to update a TournamentType.
     */
    data: XOR<TournamentTypeUpdateInput, TournamentTypeUncheckedUpdateInput>
    /**
     * Choose, which TournamentType to update.
     */
    where: TournamentTypeWhereUniqueInput
  }

  /**
   * TournamentType updateMany
   */
  export type TournamentTypeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TournamentTypes.
     */
    data: XOR<TournamentTypeUpdateManyMutationInput, TournamentTypeUncheckedUpdateManyInput>
    /**
     * Filter which TournamentTypes to update
     */
    where?: TournamentTypeWhereInput
    /**
     * Limit how many TournamentTypes to update.
     */
    limit?: number
  }

  /**
   * TournamentType updateManyAndReturn
   */
  export type TournamentTypeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentType
     */
    select?: TournamentTypeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentType
     */
    omit?: TournamentTypeOmit<ExtArgs> | null
    /**
     * The data used to update TournamentTypes.
     */
    data: XOR<TournamentTypeUpdateManyMutationInput, TournamentTypeUncheckedUpdateManyInput>
    /**
     * Filter which TournamentTypes to update
     */
    where?: TournamentTypeWhereInput
    /**
     * Limit how many TournamentTypes to update.
     */
    limit?: number
  }

  /**
   * TournamentType upsert
   */
  export type TournamentTypeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentType
     */
    select?: TournamentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentType
     */
    omit?: TournamentTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentTypeInclude<ExtArgs> | null
    /**
     * The filter to search for the TournamentType to update in case it exists.
     */
    where: TournamentTypeWhereUniqueInput
    /**
     * In case the TournamentType found by the `where` argument doesn't exist, create a new TournamentType with this data.
     */
    create: XOR<TournamentTypeCreateInput, TournamentTypeUncheckedCreateInput>
    /**
     * In case the TournamentType was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TournamentTypeUpdateInput, TournamentTypeUncheckedUpdateInput>
  }

  /**
   * TournamentType delete
   */
  export type TournamentTypeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentType
     */
    select?: TournamentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentType
     */
    omit?: TournamentTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentTypeInclude<ExtArgs> | null
    /**
     * Filter which TournamentType to delete.
     */
    where: TournamentTypeWhereUniqueInput
  }

  /**
   * TournamentType deleteMany
   */
  export type TournamentTypeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TournamentTypes to delete
     */
    where?: TournamentTypeWhereInput
    /**
     * Limit how many TournamentTypes to delete.
     */
    limit?: number
  }

  /**
   * TournamentType.tournaments
   */
  export type TournamentType$tournamentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Tournament
     */
    select?: TournamentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Tournament
     */
    omit?: TournamentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentInclude<ExtArgs> | null
    where?: TournamentWhereInput
    orderBy?: TournamentOrderByWithRelationInput | TournamentOrderByWithRelationInput[]
    cursor?: TournamentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TournamentScalarFieldEnum | TournamentScalarFieldEnum[]
  }

  /**
   * TournamentType without action
   */
  export type TournamentTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentType
     */
    select?: TournamentTypeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentType
     */
    omit?: TournamentTypeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentTypeInclude<ExtArgs> | null
  }


  /**
   * Model TournamentStatus
   */

  export type AggregateTournamentStatus = {
    _count: TournamentStatusCountAggregateOutputType | null
    _avg: TournamentStatusAvgAggregateOutputType | null
    _sum: TournamentStatusSumAggregateOutputType | null
    _min: TournamentStatusMinAggregateOutputType | null
    _max: TournamentStatusMaxAggregateOutputType | null
  }

  export type TournamentStatusAvgAggregateOutputType = {
    id: number | null
    tournamentId: number | null
  }

  export type TournamentStatusSumAggregateOutputType = {
    id: number | null
    tournamentId: number | null
  }

  export type TournamentStatusMinAggregateOutputType = {
    id: number | null
    tournamentId: number | null
    status: string | null
    updatedAt: Date | null
  }

  export type TournamentStatusMaxAggregateOutputType = {
    id: number | null
    tournamentId: number | null
    status: string | null
    updatedAt: Date | null
  }

  export type TournamentStatusCountAggregateOutputType = {
    id: number
    tournamentId: number
    status: number
    updatedAt: number
    _all: number
  }


  export type TournamentStatusAvgAggregateInputType = {
    id?: true
    tournamentId?: true
  }

  export type TournamentStatusSumAggregateInputType = {
    id?: true
    tournamentId?: true
  }

  export type TournamentStatusMinAggregateInputType = {
    id?: true
    tournamentId?: true
    status?: true
    updatedAt?: true
  }

  export type TournamentStatusMaxAggregateInputType = {
    id?: true
    tournamentId?: true
    status?: true
    updatedAt?: true
  }

  export type TournamentStatusCountAggregateInputType = {
    id?: true
    tournamentId?: true
    status?: true
    updatedAt?: true
    _all?: true
  }

  export type TournamentStatusAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TournamentStatus to aggregate.
     */
    where?: TournamentStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentStatuses to fetch.
     */
    orderBy?: TournamentStatusOrderByWithRelationInput | TournamentStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TournamentStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TournamentStatuses
    **/
    _count?: true | TournamentStatusCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TournamentStatusAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TournamentStatusSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TournamentStatusMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TournamentStatusMaxAggregateInputType
  }

  export type GetTournamentStatusAggregateType<T extends TournamentStatusAggregateArgs> = {
        [P in keyof T & keyof AggregateTournamentStatus]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTournamentStatus[P]>
      : GetScalarType<T[P], AggregateTournamentStatus[P]>
  }




  export type TournamentStatusGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TournamentStatusWhereInput
    orderBy?: TournamentStatusOrderByWithAggregationInput | TournamentStatusOrderByWithAggregationInput[]
    by: TournamentStatusScalarFieldEnum[] | TournamentStatusScalarFieldEnum
    having?: TournamentStatusScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TournamentStatusCountAggregateInputType | true
    _avg?: TournamentStatusAvgAggregateInputType
    _sum?: TournamentStatusSumAggregateInputType
    _min?: TournamentStatusMinAggregateInputType
    _max?: TournamentStatusMaxAggregateInputType
  }

  export type TournamentStatusGroupByOutputType = {
    id: number
    tournamentId: number
    status: string
    updatedAt: Date
    _count: TournamentStatusCountAggregateOutputType | null
    _avg: TournamentStatusAvgAggregateOutputType | null
    _sum: TournamentStatusSumAggregateOutputType | null
    _min: TournamentStatusMinAggregateOutputType | null
    _max: TournamentStatusMaxAggregateOutputType | null
  }

  type GetTournamentStatusGroupByPayload<T extends TournamentStatusGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TournamentStatusGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TournamentStatusGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TournamentStatusGroupByOutputType[P]>
            : GetScalarType<T[P], TournamentStatusGroupByOutputType[P]>
        }
      >
    >


  export type TournamentStatusSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentId?: boolean
    status?: boolean
    updatedAt?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournamentStatus"]>

  export type TournamentStatusSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentId?: boolean
    status?: boolean
    updatedAt?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournamentStatus"]>

  export type TournamentStatusSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentId?: boolean
    status?: boolean
    updatedAt?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tournamentStatus"]>

  export type TournamentStatusSelectScalar = {
    id?: boolean
    tournamentId?: boolean
    status?: boolean
    updatedAt?: boolean
  }

  export type TournamentStatusOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tournamentId" | "status" | "updatedAt", ExtArgs["result"]["tournamentStatus"]>
  export type TournamentStatusInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }
  export type TournamentStatusIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }
  export type TournamentStatusIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }

  export type $TournamentStatusPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TournamentStatus"
    objects: {
      tournament: Prisma.$TournamentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tournamentId: number
      status: string
      updatedAt: Date
    }, ExtArgs["result"]["tournamentStatus"]>
    composites: {}
  }

  type TournamentStatusGetPayload<S extends boolean | null | undefined | TournamentStatusDefaultArgs> = $Result.GetResult<Prisma.$TournamentStatusPayload, S>

  type TournamentStatusCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TournamentStatusFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TournamentStatusCountAggregateInputType | true
    }

  export interface TournamentStatusDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TournamentStatus'], meta: { name: 'TournamentStatus' } }
    /**
     * Find zero or one TournamentStatus that matches the filter.
     * @param {TournamentStatusFindUniqueArgs} args - Arguments to find a TournamentStatus
     * @example
     * // Get one TournamentStatus
     * const tournamentStatus = await prisma.tournamentStatus.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TournamentStatusFindUniqueArgs>(args: SelectSubset<T, TournamentStatusFindUniqueArgs<ExtArgs>>): Prisma__TournamentStatusClient<$Result.GetResult<Prisma.$TournamentStatusPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TournamentStatus that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TournamentStatusFindUniqueOrThrowArgs} args - Arguments to find a TournamentStatus
     * @example
     * // Get one TournamentStatus
     * const tournamentStatus = await prisma.tournamentStatus.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TournamentStatusFindUniqueOrThrowArgs>(args: SelectSubset<T, TournamentStatusFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TournamentStatusClient<$Result.GetResult<Prisma.$TournamentStatusPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TournamentStatus that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentStatusFindFirstArgs} args - Arguments to find a TournamentStatus
     * @example
     * // Get one TournamentStatus
     * const tournamentStatus = await prisma.tournamentStatus.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TournamentStatusFindFirstArgs>(args?: SelectSubset<T, TournamentStatusFindFirstArgs<ExtArgs>>): Prisma__TournamentStatusClient<$Result.GetResult<Prisma.$TournamentStatusPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TournamentStatus that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentStatusFindFirstOrThrowArgs} args - Arguments to find a TournamentStatus
     * @example
     * // Get one TournamentStatus
     * const tournamentStatus = await prisma.tournamentStatus.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TournamentStatusFindFirstOrThrowArgs>(args?: SelectSubset<T, TournamentStatusFindFirstOrThrowArgs<ExtArgs>>): Prisma__TournamentStatusClient<$Result.GetResult<Prisma.$TournamentStatusPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TournamentStatuses that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentStatusFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TournamentStatuses
     * const tournamentStatuses = await prisma.tournamentStatus.findMany()
     * 
     * // Get first 10 TournamentStatuses
     * const tournamentStatuses = await prisma.tournamentStatus.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tournamentStatusWithIdOnly = await prisma.tournamentStatus.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TournamentStatusFindManyArgs>(args?: SelectSubset<T, TournamentStatusFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentStatusPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TournamentStatus.
     * @param {TournamentStatusCreateArgs} args - Arguments to create a TournamentStatus.
     * @example
     * // Create one TournamentStatus
     * const TournamentStatus = await prisma.tournamentStatus.create({
     *   data: {
     *     // ... data to create a TournamentStatus
     *   }
     * })
     * 
     */
    create<T extends TournamentStatusCreateArgs>(args: SelectSubset<T, TournamentStatusCreateArgs<ExtArgs>>): Prisma__TournamentStatusClient<$Result.GetResult<Prisma.$TournamentStatusPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TournamentStatuses.
     * @param {TournamentStatusCreateManyArgs} args - Arguments to create many TournamentStatuses.
     * @example
     * // Create many TournamentStatuses
     * const tournamentStatus = await prisma.tournamentStatus.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TournamentStatusCreateManyArgs>(args?: SelectSubset<T, TournamentStatusCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TournamentStatuses and returns the data saved in the database.
     * @param {TournamentStatusCreateManyAndReturnArgs} args - Arguments to create many TournamentStatuses.
     * @example
     * // Create many TournamentStatuses
     * const tournamentStatus = await prisma.tournamentStatus.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TournamentStatuses and only return the `id`
     * const tournamentStatusWithIdOnly = await prisma.tournamentStatus.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TournamentStatusCreateManyAndReturnArgs>(args?: SelectSubset<T, TournamentStatusCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentStatusPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TournamentStatus.
     * @param {TournamentStatusDeleteArgs} args - Arguments to delete one TournamentStatus.
     * @example
     * // Delete one TournamentStatus
     * const TournamentStatus = await prisma.tournamentStatus.delete({
     *   where: {
     *     // ... filter to delete one TournamentStatus
     *   }
     * })
     * 
     */
    delete<T extends TournamentStatusDeleteArgs>(args: SelectSubset<T, TournamentStatusDeleteArgs<ExtArgs>>): Prisma__TournamentStatusClient<$Result.GetResult<Prisma.$TournamentStatusPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TournamentStatus.
     * @param {TournamentStatusUpdateArgs} args - Arguments to update one TournamentStatus.
     * @example
     * // Update one TournamentStatus
     * const tournamentStatus = await prisma.tournamentStatus.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TournamentStatusUpdateArgs>(args: SelectSubset<T, TournamentStatusUpdateArgs<ExtArgs>>): Prisma__TournamentStatusClient<$Result.GetResult<Prisma.$TournamentStatusPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TournamentStatuses.
     * @param {TournamentStatusDeleteManyArgs} args - Arguments to filter TournamentStatuses to delete.
     * @example
     * // Delete a few TournamentStatuses
     * const { count } = await prisma.tournamentStatus.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TournamentStatusDeleteManyArgs>(args?: SelectSubset<T, TournamentStatusDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TournamentStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentStatusUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TournamentStatuses
     * const tournamentStatus = await prisma.tournamentStatus.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TournamentStatusUpdateManyArgs>(args: SelectSubset<T, TournamentStatusUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TournamentStatuses and returns the data updated in the database.
     * @param {TournamentStatusUpdateManyAndReturnArgs} args - Arguments to update many TournamentStatuses.
     * @example
     * // Update many TournamentStatuses
     * const tournamentStatus = await prisma.tournamentStatus.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TournamentStatuses and only return the `id`
     * const tournamentStatusWithIdOnly = await prisma.tournamentStatus.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TournamentStatusUpdateManyAndReturnArgs>(args: SelectSubset<T, TournamentStatusUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TournamentStatusPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TournamentStatus.
     * @param {TournamentStatusUpsertArgs} args - Arguments to update or create a TournamentStatus.
     * @example
     * // Update or create a TournamentStatus
     * const tournamentStatus = await prisma.tournamentStatus.upsert({
     *   create: {
     *     // ... data to create a TournamentStatus
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TournamentStatus we want to update
     *   }
     * })
     */
    upsert<T extends TournamentStatusUpsertArgs>(args: SelectSubset<T, TournamentStatusUpsertArgs<ExtArgs>>): Prisma__TournamentStatusClient<$Result.GetResult<Prisma.$TournamentStatusPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TournamentStatuses.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentStatusCountArgs} args - Arguments to filter TournamentStatuses to count.
     * @example
     * // Count the number of TournamentStatuses
     * const count = await prisma.tournamentStatus.count({
     *   where: {
     *     // ... the filter for the TournamentStatuses we want to count
     *   }
     * })
    **/
    count<T extends TournamentStatusCountArgs>(
      args?: Subset<T, TournamentStatusCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TournamentStatusCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TournamentStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentStatusAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TournamentStatusAggregateArgs>(args: Subset<T, TournamentStatusAggregateArgs>): Prisma.PrismaPromise<GetTournamentStatusAggregateType<T>>

    /**
     * Group by TournamentStatus.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TournamentStatusGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TournamentStatusGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TournamentStatusGroupByArgs['orderBy'] }
        : { orderBy?: TournamentStatusGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TournamentStatusGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTournamentStatusGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TournamentStatus model
   */
  readonly fields: TournamentStatusFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TournamentStatus.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TournamentStatusClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tournament<T extends TournamentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TournamentDefaultArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TournamentStatus model
   */
  interface TournamentStatusFieldRefs {
    readonly id: FieldRef<"TournamentStatus", 'Int'>
    readonly tournamentId: FieldRef<"TournamentStatus", 'Int'>
    readonly status: FieldRef<"TournamentStatus", 'String'>
    readonly updatedAt: FieldRef<"TournamentStatus", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TournamentStatus findUnique
   */
  export type TournamentStatusFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentStatus
     */
    select?: TournamentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentStatus
     */
    omit?: TournamentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentStatusInclude<ExtArgs> | null
    /**
     * Filter, which TournamentStatus to fetch.
     */
    where: TournamentStatusWhereUniqueInput
  }

  /**
   * TournamentStatus findUniqueOrThrow
   */
  export type TournamentStatusFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentStatus
     */
    select?: TournamentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentStatus
     */
    omit?: TournamentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentStatusInclude<ExtArgs> | null
    /**
     * Filter, which TournamentStatus to fetch.
     */
    where: TournamentStatusWhereUniqueInput
  }

  /**
   * TournamentStatus findFirst
   */
  export type TournamentStatusFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentStatus
     */
    select?: TournamentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentStatus
     */
    omit?: TournamentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentStatusInclude<ExtArgs> | null
    /**
     * Filter, which TournamentStatus to fetch.
     */
    where?: TournamentStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentStatuses to fetch.
     */
    orderBy?: TournamentStatusOrderByWithRelationInput | TournamentStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TournamentStatuses.
     */
    cursor?: TournamentStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TournamentStatuses.
     */
    distinct?: TournamentStatusScalarFieldEnum | TournamentStatusScalarFieldEnum[]
  }

  /**
   * TournamentStatus findFirstOrThrow
   */
  export type TournamentStatusFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentStatus
     */
    select?: TournamentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentStatus
     */
    omit?: TournamentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentStatusInclude<ExtArgs> | null
    /**
     * Filter, which TournamentStatus to fetch.
     */
    where?: TournamentStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentStatuses to fetch.
     */
    orderBy?: TournamentStatusOrderByWithRelationInput | TournamentStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TournamentStatuses.
     */
    cursor?: TournamentStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentStatuses.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TournamentStatuses.
     */
    distinct?: TournamentStatusScalarFieldEnum | TournamentStatusScalarFieldEnum[]
  }

  /**
   * TournamentStatus findMany
   */
  export type TournamentStatusFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentStatus
     */
    select?: TournamentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentStatus
     */
    omit?: TournamentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentStatusInclude<ExtArgs> | null
    /**
     * Filter, which TournamentStatuses to fetch.
     */
    where?: TournamentStatusWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TournamentStatuses to fetch.
     */
    orderBy?: TournamentStatusOrderByWithRelationInput | TournamentStatusOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TournamentStatuses.
     */
    cursor?: TournamentStatusWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TournamentStatuses from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TournamentStatuses.
     */
    skip?: number
    distinct?: TournamentStatusScalarFieldEnum | TournamentStatusScalarFieldEnum[]
  }

  /**
   * TournamentStatus create
   */
  export type TournamentStatusCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentStatus
     */
    select?: TournamentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentStatus
     */
    omit?: TournamentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentStatusInclude<ExtArgs> | null
    /**
     * The data needed to create a TournamentStatus.
     */
    data: XOR<TournamentStatusCreateInput, TournamentStatusUncheckedCreateInput>
  }

  /**
   * TournamentStatus createMany
   */
  export type TournamentStatusCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TournamentStatuses.
     */
    data: TournamentStatusCreateManyInput | TournamentStatusCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TournamentStatus createManyAndReturn
   */
  export type TournamentStatusCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentStatus
     */
    select?: TournamentStatusSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentStatus
     */
    omit?: TournamentStatusOmit<ExtArgs> | null
    /**
     * The data used to create many TournamentStatuses.
     */
    data: TournamentStatusCreateManyInput | TournamentStatusCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentStatusIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TournamentStatus update
   */
  export type TournamentStatusUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentStatus
     */
    select?: TournamentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentStatus
     */
    omit?: TournamentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentStatusInclude<ExtArgs> | null
    /**
     * The data needed to update a TournamentStatus.
     */
    data: XOR<TournamentStatusUpdateInput, TournamentStatusUncheckedUpdateInput>
    /**
     * Choose, which TournamentStatus to update.
     */
    where: TournamentStatusWhereUniqueInput
  }

  /**
   * TournamentStatus updateMany
   */
  export type TournamentStatusUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TournamentStatuses.
     */
    data: XOR<TournamentStatusUpdateManyMutationInput, TournamentStatusUncheckedUpdateManyInput>
    /**
     * Filter which TournamentStatuses to update
     */
    where?: TournamentStatusWhereInput
    /**
     * Limit how many TournamentStatuses to update.
     */
    limit?: number
  }

  /**
   * TournamentStatus updateManyAndReturn
   */
  export type TournamentStatusUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentStatus
     */
    select?: TournamentStatusSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentStatus
     */
    omit?: TournamentStatusOmit<ExtArgs> | null
    /**
     * The data used to update TournamentStatuses.
     */
    data: XOR<TournamentStatusUpdateManyMutationInput, TournamentStatusUncheckedUpdateManyInput>
    /**
     * Filter which TournamentStatuses to update
     */
    where?: TournamentStatusWhereInput
    /**
     * Limit how many TournamentStatuses to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentStatusIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TournamentStatus upsert
   */
  export type TournamentStatusUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentStatus
     */
    select?: TournamentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentStatus
     */
    omit?: TournamentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentStatusInclude<ExtArgs> | null
    /**
     * The filter to search for the TournamentStatus to update in case it exists.
     */
    where: TournamentStatusWhereUniqueInput
    /**
     * In case the TournamentStatus found by the `where` argument doesn't exist, create a new TournamentStatus with this data.
     */
    create: XOR<TournamentStatusCreateInput, TournamentStatusUncheckedCreateInput>
    /**
     * In case the TournamentStatus was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TournamentStatusUpdateInput, TournamentStatusUncheckedUpdateInput>
  }

  /**
   * TournamentStatus delete
   */
  export type TournamentStatusDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentStatus
     */
    select?: TournamentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentStatus
     */
    omit?: TournamentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentStatusInclude<ExtArgs> | null
    /**
     * Filter which TournamentStatus to delete.
     */
    where: TournamentStatusWhereUniqueInput
  }

  /**
   * TournamentStatus deleteMany
   */
  export type TournamentStatusDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TournamentStatuses to delete
     */
    where?: TournamentStatusWhereInput
    /**
     * Limit how many TournamentStatuses to delete.
     */
    limit?: number
  }

  /**
   * TournamentStatus without action
   */
  export type TournamentStatusDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TournamentStatus
     */
    select?: TournamentStatusSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TournamentStatus
     */
    omit?: TournamentStatusOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TournamentStatusInclude<ExtArgs> | null
  }


  /**
   * Model Team
   */

  export type AggregateTeam = {
    _count: TeamCountAggregateOutputType | null
    _avg: TeamAvgAggregateOutputType | null
    _sum: TeamSumAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  export type TeamAvgAggregateOutputType = {
    id: number | null
    tournamentId: number | null
  }

  export type TeamSumAggregateOutputType = {
    id: number | null
    tournamentId: number | null
  }

  export type TeamMinAggregateOutputType = {
    id: number | null
    teamName: string | null
    tournamentId: number | null
    createdAt: Date | null
  }

  export type TeamMaxAggregateOutputType = {
    id: number | null
    teamName: string | null
    tournamentId: number | null
    createdAt: Date | null
  }

  export type TeamCountAggregateOutputType = {
    id: number
    teamName: number
    tournamentId: number
    createdAt: number
    _all: number
  }


  export type TeamAvgAggregateInputType = {
    id?: true
    tournamentId?: true
  }

  export type TeamSumAggregateInputType = {
    id?: true
    tournamentId?: true
  }

  export type TeamMinAggregateInputType = {
    id?: true
    teamName?: true
    tournamentId?: true
    createdAt?: true
  }

  export type TeamMaxAggregateInputType = {
    id?: true
    teamName?: true
    tournamentId?: true
    createdAt?: true
  }

  export type TeamCountAggregateInputType = {
    id?: true
    teamName?: true
    tournamentId?: true
    createdAt?: true
    _all?: true
  }

  export type TeamAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Team to aggregate.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Teams
    **/
    _count?: true | TeamCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeamAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeamSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMaxAggregateInputType
  }

  export type GetTeamAggregateType<T extends TeamAggregateArgs> = {
        [P in keyof T & keyof AggregateTeam]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeam[P]>
      : GetScalarType<T[P], AggregateTeam[P]>
  }




  export type TeamGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamWhereInput
    orderBy?: TeamOrderByWithAggregationInput | TeamOrderByWithAggregationInput[]
    by: TeamScalarFieldEnum[] | TeamScalarFieldEnum
    having?: TeamScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamCountAggregateInputType | true
    _avg?: TeamAvgAggregateInputType
    _sum?: TeamSumAggregateInputType
    _min?: TeamMinAggregateInputType
    _max?: TeamMaxAggregateInputType
  }

  export type TeamGroupByOutputType = {
    id: number
    teamName: string
    tournamentId: number
    createdAt: Date
    _count: TeamCountAggregateOutputType | null
    _avg: TeamAvgAggregateOutputType | null
    _sum: TeamSumAggregateOutputType | null
    _min: TeamMinAggregateOutputType | null
    _max: TeamMaxAggregateOutputType | null
  }

  type GetTeamGroupByPayload<T extends TeamGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamGroupByOutputType[P]>
            : GetScalarType<T[P], TeamGroupByOutputType[P]>
        }
      >
    >


  export type TeamSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamName?: boolean
    tournamentId?: boolean
    createdAt?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    members?: boolean | Team$membersArgs<ExtArgs>
    matchesAsTeam1?: boolean | Team$matchesAsTeam1Args<ExtArgs>
    matchesAsTeam2?: boolean | Team$matchesAsTeam2Args<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamName?: boolean
    tournamentId?: boolean
    createdAt?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    teamName?: boolean
    tournamentId?: boolean
    createdAt?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["team"]>

  export type TeamSelectScalar = {
    id?: boolean
    teamName?: boolean
    tournamentId?: boolean
    createdAt?: boolean
  }

  export type TeamOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "teamName" | "tournamentId" | "createdAt", ExtArgs["result"]["team"]>
  export type TeamInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    members?: boolean | Team$membersArgs<ExtArgs>
    matchesAsTeam1?: boolean | Team$matchesAsTeam1Args<ExtArgs>
    matchesAsTeam2?: boolean | Team$matchesAsTeam2Args<ExtArgs>
    _count?: boolean | TeamCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type TeamIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }
  export type TeamIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
  }

  export type $TeamPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Team"
    objects: {
      tournament: Prisma.$TournamentPayload<ExtArgs>
      members: Prisma.$TeamMemberPayload<ExtArgs>[]
      matchesAsTeam1: Prisma.$MatchPayload<ExtArgs>[]
      matchesAsTeam2: Prisma.$MatchPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      teamName: string
      tournamentId: number
      createdAt: Date
    }, ExtArgs["result"]["team"]>
    composites: {}
  }

  type TeamGetPayload<S extends boolean | null | undefined | TeamDefaultArgs> = $Result.GetResult<Prisma.$TeamPayload, S>

  type TeamCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamCountAggregateInputType | true
    }

  export interface TeamDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Team'], meta: { name: 'Team' } }
    /**
     * Find zero or one Team that matches the filter.
     * @param {TeamFindUniqueArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamFindUniqueArgs>(args: SelectSubset<T, TeamFindUniqueArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Team that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamFindUniqueOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamFindFirstArgs>(args?: SelectSubset<T, TeamFindFirstArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Team that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindFirstOrThrowArgs} args - Arguments to find a Team
     * @example
     * // Get one Team
     * const team = await prisma.team.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Teams that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Teams
     * const teams = await prisma.team.findMany()
     * 
     * // Get first 10 Teams
     * const teams = await prisma.team.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamWithIdOnly = await prisma.team.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamFindManyArgs>(args?: SelectSubset<T, TeamFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Team.
     * @param {TeamCreateArgs} args - Arguments to create a Team.
     * @example
     * // Create one Team
     * const Team = await prisma.team.create({
     *   data: {
     *     // ... data to create a Team
     *   }
     * })
     * 
     */
    create<T extends TeamCreateArgs>(args: SelectSubset<T, TeamCreateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Teams.
     * @param {TeamCreateManyArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamCreateManyArgs>(args?: SelectSubset<T, TeamCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Teams and returns the data saved in the database.
     * @param {TeamCreateManyAndReturnArgs} args - Arguments to create many Teams.
     * @example
     * // Create many Teams
     * const team = await prisma.team.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Team.
     * @param {TeamDeleteArgs} args - Arguments to delete one Team.
     * @example
     * // Delete one Team
     * const Team = await prisma.team.delete({
     *   where: {
     *     // ... filter to delete one Team
     *   }
     * })
     * 
     */
    delete<T extends TeamDeleteArgs>(args: SelectSubset<T, TeamDeleteArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Team.
     * @param {TeamUpdateArgs} args - Arguments to update one Team.
     * @example
     * // Update one Team
     * const team = await prisma.team.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamUpdateArgs>(args: SelectSubset<T, TeamUpdateArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Teams.
     * @param {TeamDeleteManyArgs} args - Arguments to filter Teams to delete.
     * @example
     * // Delete a few Teams
     * const { count } = await prisma.team.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamDeleteManyArgs>(args?: SelectSubset<T, TeamDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamUpdateManyArgs>(args: SelectSubset<T, TeamUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Teams and returns the data updated in the database.
     * @param {TeamUpdateManyAndReturnArgs} args - Arguments to update many Teams.
     * @example
     * // Update many Teams
     * const team = await prisma.team.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Teams and only return the `id`
     * const teamWithIdOnly = await prisma.team.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeamUpdateManyAndReturnArgs>(args: SelectSubset<T, TeamUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Team.
     * @param {TeamUpsertArgs} args - Arguments to update or create a Team.
     * @example
     * // Update or create a Team
     * const team = await prisma.team.upsert({
     *   create: {
     *     // ... data to create a Team
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Team we want to update
     *   }
     * })
     */
    upsert<T extends TeamUpsertArgs>(args: SelectSubset<T, TeamUpsertArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Teams.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamCountArgs} args - Arguments to filter Teams to count.
     * @example
     * // Count the number of Teams
     * const count = await prisma.team.count({
     *   where: {
     *     // ... the filter for the Teams we want to count
     *   }
     * })
    **/
    count<T extends TeamCountArgs>(
      args?: Subset<T, TeamCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamAggregateArgs>(args: Subset<T, TeamAggregateArgs>): Prisma.PrismaPromise<GetTeamAggregateType<T>>

    /**
     * Group by Team.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamGroupByArgs['orderBy'] }
        : { orderBy?: TeamGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Team model
   */
  readonly fields: TeamFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Team.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tournament<T extends TournamentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TournamentDefaultArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    members<T extends Team$membersArgs<ExtArgs> = {}>(args?: Subset<T, Team$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    matchesAsTeam1<T extends Team$matchesAsTeam1Args<ExtArgs> = {}>(args?: Subset<T, Team$matchesAsTeam1Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    matchesAsTeam2<T extends Team$matchesAsTeam2Args<ExtArgs> = {}>(args?: Subset<T, Team$matchesAsTeam2Args<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Team model
   */
  interface TeamFieldRefs {
    readonly id: FieldRef<"Team", 'Int'>
    readonly teamName: FieldRef<"Team", 'String'>
    readonly tournamentId: FieldRef<"Team", 'Int'>
    readonly createdAt: FieldRef<"Team", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Team findUnique
   */
  export type TeamFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findUniqueOrThrow
   */
  export type TeamFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team findFirst
   */
  export type TeamFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findFirstOrThrow
   */
  export type TeamFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Team to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Teams.
     */
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team findMany
   */
  export type TeamFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter, which Teams to fetch.
     */
    where?: TeamWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Teams to fetch.
     */
    orderBy?: TeamOrderByWithRelationInput | TeamOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Teams.
     */
    cursor?: TeamWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Teams from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Teams.
     */
    skip?: number
    distinct?: TeamScalarFieldEnum | TeamScalarFieldEnum[]
  }

  /**
   * Team create
   */
  export type TeamCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to create a Team.
     */
    data: XOR<TeamCreateInput, TeamUncheckedCreateInput>
  }

  /**
   * Team createMany
   */
  export type TeamCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Team createManyAndReturn
   */
  export type TeamCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to create many Teams.
     */
    data: TeamCreateManyInput | TeamCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Team update
   */
  export type TeamUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The data needed to update a Team.
     */
    data: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
    /**
     * Choose, which Team to update.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team updateMany
   */
  export type TeamUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
  }

  /**
   * Team updateManyAndReturn
   */
  export type TeamUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * The data used to update Teams.
     */
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyInput>
    /**
     * Filter which Teams to update
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Team upsert
   */
  export type TeamUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * The filter to search for the Team to update in case it exists.
     */
    where: TeamWhereUniqueInput
    /**
     * In case the Team found by the `where` argument doesn't exist, create a new Team with this data.
     */
    create: XOR<TeamCreateInput, TeamUncheckedCreateInput>
    /**
     * In case the Team was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamUpdateInput, TeamUncheckedUpdateInput>
  }

  /**
   * Team delete
   */
  export type TeamDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
    /**
     * Filter which Team to delete.
     */
    where: TeamWhereUniqueInput
  }

  /**
   * Team deleteMany
   */
  export type TeamDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Teams to delete
     */
    where?: TeamWhereInput
    /**
     * Limit how many Teams to delete.
     */
    limit?: number
  }

  /**
   * Team.members
   */
  export type Team$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    where?: TeamMemberWhereInput
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    cursor?: TeamMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * Team.matchesAsTeam1
   */
  export type Team$matchesAsTeam1Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    cursor?: MatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Team.matchesAsTeam2
   */
  export type Team$matchesAsTeam2Args<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    cursor?: MatchWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Team without action
   */
  export type TeamDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Team
     */
    select?: TeamSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Team
     */
    omit?: TeamOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamInclude<ExtArgs> | null
  }


  /**
   * Model TeamMember
   */

  export type AggregateTeamMember = {
    _count: TeamMemberCountAggregateOutputType | null
    _avg: TeamMemberAvgAggregateOutputType | null
    _sum: TeamMemberSumAggregateOutputType | null
    _min: TeamMemberMinAggregateOutputType | null
    _max: TeamMemberMaxAggregateOutputType | null
  }

  export type TeamMemberAvgAggregateOutputType = {
    id: number | null
    userId: number | null
    teamId: number | null
  }

  export type TeamMemberSumAggregateOutputType = {
    id: number | null
    userId: number | null
    teamId: number | null
  }

  export type TeamMemberMinAggregateOutputType = {
    id: number | null
    userId: number | null
    teamId: number | null
    role: string | null
    joined_at: Date | null
  }

  export type TeamMemberMaxAggregateOutputType = {
    id: number | null
    userId: number | null
    teamId: number | null
    role: string | null
    joined_at: Date | null
  }

  export type TeamMemberCountAggregateOutputType = {
    id: number
    userId: number
    teamId: number
    role: number
    joined_at: number
    _all: number
  }


  export type TeamMemberAvgAggregateInputType = {
    id?: true
    userId?: true
    teamId?: true
  }

  export type TeamMemberSumAggregateInputType = {
    id?: true
    userId?: true
    teamId?: true
  }

  export type TeamMemberMinAggregateInputType = {
    id?: true
    userId?: true
    teamId?: true
    role?: true
    joined_at?: true
  }

  export type TeamMemberMaxAggregateInputType = {
    id?: true
    userId?: true
    teamId?: true
    role?: true
    joined_at?: true
  }

  export type TeamMemberCountAggregateInputType = {
    id?: true
    userId?: true
    teamId?: true
    role?: true
    joined_at?: true
    _all?: true
  }

  export type TeamMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMember to aggregate.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TeamMembers
    **/
    _count?: true | TeamMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TeamMemberAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TeamMemberSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TeamMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TeamMemberMaxAggregateInputType
  }

  export type GetTeamMemberAggregateType<T extends TeamMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateTeamMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTeamMember[P]>
      : GetScalarType<T[P], AggregateTeamMember[P]>
  }




  export type TeamMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TeamMemberWhereInput
    orderBy?: TeamMemberOrderByWithAggregationInput | TeamMemberOrderByWithAggregationInput[]
    by: TeamMemberScalarFieldEnum[] | TeamMemberScalarFieldEnum
    having?: TeamMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TeamMemberCountAggregateInputType | true
    _avg?: TeamMemberAvgAggregateInputType
    _sum?: TeamMemberSumAggregateInputType
    _min?: TeamMemberMinAggregateInputType
    _max?: TeamMemberMaxAggregateInputType
  }

  export type TeamMemberGroupByOutputType = {
    id: number
    userId: number
    teamId: number
    role: string
    joined_at: Date
    _count: TeamMemberCountAggregateOutputType | null
    _avg: TeamMemberAvgAggregateOutputType | null
    _sum: TeamMemberSumAggregateOutputType | null
    _min: TeamMemberMinAggregateOutputType | null
    _max: TeamMemberMaxAggregateOutputType | null
  }

  type GetTeamMemberGroupByPayload<T extends TeamMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TeamMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TeamMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TeamMemberGroupByOutputType[P]>
            : GetScalarType<T[P], TeamMemberGroupByOutputType[P]>
        }
      >
    >


  export type TeamMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    teamId?: boolean
    role?: boolean
    joined_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamMember"]>

  export type TeamMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    teamId?: boolean
    role?: boolean
    joined_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamMember"]>

  export type TeamMemberSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    teamId?: boolean
    role?: boolean
    joined_at?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["teamMember"]>

  export type TeamMemberSelectScalar = {
    id?: boolean
    userId?: boolean
    teamId?: boolean
    role?: boolean
    joined_at?: boolean
  }

  export type TeamMemberOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "teamId" | "role" | "joined_at", ExtArgs["result"]["teamMember"]>
  export type TeamMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }
  export type TeamMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }
  export type TeamMemberIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    team?: boolean | TeamDefaultArgs<ExtArgs>
  }

  export type $TeamMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TeamMember"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      team: Prisma.$TeamPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: number
      teamId: number
      role: string
      joined_at: Date
    }, ExtArgs["result"]["teamMember"]>
    composites: {}
  }

  type TeamMemberGetPayload<S extends boolean | null | undefined | TeamMemberDefaultArgs> = $Result.GetResult<Prisma.$TeamMemberPayload, S>

  type TeamMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TeamMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TeamMemberCountAggregateInputType | true
    }

  export interface TeamMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TeamMember'], meta: { name: 'TeamMember' } }
    /**
     * Find zero or one TeamMember that matches the filter.
     * @param {TeamMemberFindUniqueArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TeamMemberFindUniqueArgs>(args: SelectSubset<T, TeamMemberFindUniqueArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TeamMember that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TeamMemberFindUniqueOrThrowArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TeamMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, TeamMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindFirstArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TeamMemberFindFirstArgs>(args?: SelectSubset<T, TeamMemberFindFirstArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TeamMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindFirstOrThrowArgs} args - Arguments to find a TeamMember
     * @example
     * // Get one TeamMember
     * const teamMember = await prisma.teamMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TeamMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, TeamMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TeamMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TeamMembers
     * const teamMembers = await prisma.teamMember.findMany()
     * 
     * // Get first 10 TeamMembers
     * const teamMembers = await prisma.teamMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const teamMemberWithIdOnly = await prisma.teamMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TeamMemberFindManyArgs>(args?: SelectSubset<T, TeamMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TeamMember.
     * @param {TeamMemberCreateArgs} args - Arguments to create a TeamMember.
     * @example
     * // Create one TeamMember
     * const TeamMember = await prisma.teamMember.create({
     *   data: {
     *     // ... data to create a TeamMember
     *   }
     * })
     * 
     */
    create<T extends TeamMemberCreateArgs>(args: SelectSubset<T, TeamMemberCreateArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TeamMembers.
     * @param {TeamMemberCreateManyArgs} args - Arguments to create many TeamMembers.
     * @example
     * // Create many TeamMembers
     * const teamMember = await prisma.teamMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TeamMemberCreateManyArgs>(args?: SelectSubset<T, TeamMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TeamMembers and returns the data saved in the database.
     * @param {TeamMemberCreateManyAndReturnArgs} args - Arguments to create many TeamMembers.
     * @example
     * // Create many TeamMembers
     * const teamMember = await prisma.teamMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TeamMembers and only return the `id`
     * const teamMemberWithIdOnly = await prisma.teamMember.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TeamMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, TeamMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TeamMember.
     * @param {TeamMemberDeleteArgs} args - Arguments to delete one TeamMember.
     * @example
     * // Delete one TeamMember
     * const TeamMember = await prisma.teamMember.delete({
     *   where: {
     *     // ... filter to delete one TeamMember
     *   }
     * })
     * 
     */
    delete<T extends TeamMemberDeleteArgs>(args: SelectSubset<T, TeamMemberDeleteArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TeamMember.
     * @param {TeamMemberUpdateArgs} args - Arguments to update one TeamMember.
     * @example
     * // Update one TeamMember
     * const teamMember = await prisma.teamMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TeamMemberUpdateArgs>(args: SelectSubset<T, TeamMemberUpdateArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TeamMembers.
     * @param {TeamMemberDeleteManyArgs} args - Arguments to filter TeamMembers to delete.
     * @example
     * // Delete a few TeamMembers
     * const { count } = await prisma.teamMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TeamMemberDeleteManyArgs>(args?: SelectSubset<T, TeamMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TeamMembers
     * const teamMember = await prisma.teamMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TeamMemberUpdateManyArgs>(args: SelectSubset<T, TeamMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TeamMembers and returns the data updated in the database.
     * @param {TeamMemberUpdateManyAndReturnArgs} args - Arguments to update many TeamMembers.
     * @example
     * // Update many TeamMembers
     * const teamMember = await prisma.teamMember.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TeamMembers and only return the `id`
     * const teamMemberWithIdOnly = await prisma.teamMember.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TeamMemberUpdateManyAndReturnArgs>(args: SelectSubset<T, TeamMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TeamMember.
     * @param {TeamMemberUpsertArgs} args - Arguments to update or create a TeamMember.
     * @example
     * // Update or create a TeamMember
     * const teamMember = await prisma.teamMember.upsert({
     *   create: {
     *     // ... data to create a TeamMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TeamMember we want to update
     *   }
     * })
     */
    upsert<T extends TeamMemberUpsertArgs>(args: SelectSubset<T, TeamMemberUpsertArgs<ExtArgs>>): Prisma__TeamMemberClient<$Result.GetResult<Prisma.$TeamMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TeamMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberCountArgs} args - Arguments to filter TeamMembers to count.
     * @example
     * // Count the number of TeamMembers
     * const count = await prisma.teamMember.count({
     *   where: {
     *     // ... the filter for the TeamMembers we want to count
     *   }
     * })
    **/
    count<T extends TeamMemberCountArgs>(
      args?: Subset<T, TeamMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TeamMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TeamMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TeamMemberAggregateArgs>(args: Subset<T, TeamMemberAggregateArgs>): Prisma.PrismaPromise<GetTeamMemberAggregateType<T>>

    /**
     * Group by TeamMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TeamMemberGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TeamMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TeamMemberGroupByArgs['orderBy'] }
        : { orderBy?: TeamMemberGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TeamMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTeamMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TeamMember model
   */
  readonly fields: TeamMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TeamMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TeamMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    team<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TeamMember model
   */
  interface TeamMemberFieldRefs {
    readonly id: FieldRef<"TeamMember", 'Int'>
    readonly userId: FieldRef<"TeamMember", 'Int'>
    readonly teamId: FieldRef<"TeamMember", 'Int'>
    readonly role: FieldRef<"TeamMember", 'String'>
    readonly joined_at: FieldRef<"TeamMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * TeamMember findUnique
   */
  export type TeamMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember findUniqueOrThrow
   */
  export type TeamMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember findFirst
   */
  export type TeamMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMembers.
     */
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember findFirstOrThrow
   */
  export type TeamMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMember to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TeamMembers.
     */
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember findMany
   */
  export type TeamMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter, which TeamMembers to fetch.
     */
    where?: TeamMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TeamMembers to fetch.
     */
    orderBy?: TeamMemberOrderByWithRelationInput | TeamMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TeamMembers.
     */
    cursor?: TeamMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TeamMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TeamMembers.
     */
    skip?: number
    distinct?: TeamMemberScalarFieldEnum | TeamMemberScalarFieldEnum[]
  }

  /**
   * TeamMember create
   */
  export type TeamMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a TeamMember.
     */
    data: XOR<TeamMemberCreateInput, TeamMemberUncheckedCreateInput>
  }

  /**
   * TeamMember createMany
   */
  export type TeamMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TeamMembers.
     */
    data: TeamMemberCreateManyInput | TeamMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TeamMember createManyAndReturn
   */
  export type TeamMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * The data used to create many TeamMembers.
     */
    data: TeamMemberCreateManyInput | TeamMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * TeamMember update
   */
  export type TeamMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a TeamMember.
     */
    data: XOR<TeamMemberUpdateInput, TeamMemberUncheckedUpdateInput>
    /**
     * Choose, which TeamMember to update.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember updateMany
   */
  export type TeamMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TeamMembers.
     */
    data: XOR<TeamMemberUpdateManyMutationInput, TeamMemberUncheckedUpdateManyInput>
    /**
     * Filter which TeamMembers to update
     */
    where?: TeamMemberWhereInput
    /**
     * Limit how many TeamMembers to update.
     */
    limit?: number
  }

  /**
   * TeamMember updateManyAndReturn
   */
  export type TeamMemberUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * The data used to update TeamMembers.
     */
    data: XOR<TeamMemberUpdateManyMutationInput, TeamMemberUncheckedUpdateManyInput>
    /**
     * Filter which TeamMembers to update
     */
    where?: TeamMemberWhereInput
    /**
     * Limit how many TeamMembers to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * TeamMember upsert
   */
  export type TeamMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the TeamMember to update in case it exists.
     */
    where: TeamMemberWhereUniqueInput
    /**
     * In case the TeamMember found by the `where` argument doesn't exist, create a new TeamMember with this data.
     */
    create: XOR<TeamMemberCreateInput, TeamMemberUncheckedCreateInput>
    /**
     * In case the TeamMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TeamMemberUpdateInput, TeamMemberUncheckedUpdateInput>
  }

  /**
   * TeamMember delete
   */
  export type TeamMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
    /**
     * Filter which TeamMember to delete.
     */
    where: TeamMemberWhereUniqueInput
  }

  /**
   * TeamMember deleteMany
   */
  export type TeamMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TeamMembers to delete
     */
    where?: TeamMemberWhereInput
    /**
     * Limit how many TeamMembers to delete.
     */
    limit?: number
  }

  /**
   * TeamMember without action
   */
  export type TeamMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TeamMember
     */
    select?: TeamMemberSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TeamMember
     */
    omit?: TeamMemberOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TeamMemberInclude<ExtArgs> | null
  }


  /**
   * Model Match
   */

  export type AggregateMatch = {
    _count: MatchCountAggregateOutputType | null
    _avg: MatchAvgAggregateOutputType | null
    _sum: MatchSumAggregateOutputType | null
    _min: MatchMinAggregateOutputType | null
    _max: MatchMaxAggregateOutputType | null
  }

  export type MatchAvgAggregateOutputType = {
    id: number | null
    tournamentId: number | null
    team1Id: number | null
    team2Id: number | null
    team1Score: number | null
    team2Score: number | null
    winnerId: number | null
  }

  export type MatchSumAggregateOutputType = {
    id: number | null
    tournamentId: number | null
    team1Id: number | null
    team2Id: number | null
    team1Score: number | null
    team2Score: number | null
    winnerId: number | null
  }

  export type MatchMinAggregateOutputType = {
    id: number | null
    tournamentId: number | null
    team1Id: number | null
    team2Id: number | null
    team1Score: number | null
    team2Score: number | null
    winnerId: number | null
    matchDate: Date | null
    status: string | null
    createdAt: Date | null
  }

  export type MatchMaxAggregateOutputType = {
    id: number | null
    tournamentId: number | null
    team1Id: number | null
    team2Id: number | null
    team1Score: number | null
    team2Score: number | null
    winnerId: number | null
    matchDate: Date | null
    status: string | null
    createdAt: Date | null
  }

  export type MatchCountAggregateOutputType = {
    id: number
    tournamentId: number
    team1Id: number
    team2Id: number
    team1Score: number
    team2Score: number
    winnerId: number
    matchDate: number
    status: number
    createdAt: number
    _all: number
  }


  export type MatchAvgAggregateInputType = {
    id?: true
    tournamentId?: true
    team1Id?: true
    team2Id?: true
    team1Score?: true
    team2Score?: true
    winnerId?: true
  }

  export type MatchSumAggregateInputType = {
    id?: true
    tournamentId?: true
    team1Id?: true
    team2Id?: true
    team1Score?: true
    team2Score?: true
    winnerId?: true
  }

  export type MatchMinAggregateInputType = {
    id?: true
    tournamentId?: true
    team1Id?: true
    team2Id?: true
    team1Score?: true
    team2Score?: true
    winnerId?: true
    matchDate?: true
    status?: true
    createdAt?: true
  }

  export type MatchMaxAggregateInputType = {
    id?: true
    tournamentId?: true
    team1Id?: true
    team2Id?: true
    team1Score?: true
    team2Score?: true
    winnerId?: true
    matchDate?: true
    status?: true
    createdAt?: true
  }

  export type MatchCountAggregateInputType = {
    id?: true
    tournamentId?: true
    team1Id?: true
    team2Id?: true
    team1Score?: true
    team2Score?: true
    winnerId?: true
    matchDate?: true
    status?: true
    createdAt?: true
    _all?: true
  }

  export type MatchAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Match to aggregate.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Matches
    **/
    _count?: true | MatchCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MatchAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MatchSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MatchMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MatchMaxAggregateInputType
  }

  export type GetMatchAggregateType<T extends MatchAggregateArgs> = {
        [P in keyof T & keyof AggregateMatch]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMatch[P]>
      : GetScalarType<T[P], AggregateMatch[P]>
  }




  export type MatchGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MatchWhereInput
    orderBy?: MatchOrderByWithAggregationInput | MatchOrderByWithAggregationInput[]
    by: MatchScalarFieldEnum[] | MatchScalarFieldEnum
    having?: MatchScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MatchCountAggregateInputType | true
    _avg?: MatchAvgAggregateInputType
    _sum?: MatchSumAggregateInputType
    _min?: MatchMinAggregateInputType
    _max?: MatchMaxAggregateInputType
  }

  export type MatchGroupByOutputType = {
    id: number
    tournamentId: number
    team1Id: number
    team2Id: number
    team1Score: number | null
    team2Score: number | null
    winnerId: number | null
    matchDate: Date
    status: string
    createdAt: Date
    _count: MatchCountAggregateOutputType | null
    _avg: MatchAvgAggregateOutputType | null
    _sum: MatchSumAggregateOutputType | null
    _min: MatchMinAggregateOutputType | null
    _max: MatchMaxAggregateOutputType | null
  }

  type GetMatchGroupByPayload<T extends MatchGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MatchGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MatchGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MatchGroupByOutputType[P]>
            : GetScalarType<T[P], MatchGroupByOutputType[P]>
        }
      >
    >


  export type MatchSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentId?: boolean
    team1Id?: boolean
    team2Id?: boolean
    team1Score?: boolean
    team2Score?: boolean
    winnerId?: boolean
    matchDate?: boolean
    status?: boolean
    createdAt?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    team1?: boolean | TeamDefaultArgs<ExtArgs>
    team2?: boolean | TeamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["match"]>

  export type MatchSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentId?: boolean
    team1Id?: boolean
    team2Id?: boolean
    team1Score?: boolean
    team2Score?: boolean
    winnerId?: boolean
    matchDate?: boolean
    status?: boolean
    createdAt?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    team1?: boolean | TeamDefaultArgs<ExtArgs>
    team2?: boolean | TeamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["match"]>

  export type MatchSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    tournamentId?: boolean
    team1Id?: boolean
    team2Id?: boolean
    team1Score?: boolean
    team2Score?: boolean
    winnerId?: boolean
    matchDate?: boolean
    status?: boolean
    createdAt?: boolean
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    team1?: boolean | TeamDefaultArgs<ExtArgs>
    team2?: boolean | TeamDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["match"]>

  export type MatchSelectScalar = {
    id?: boolean
    tournamentId?: boolean
    team1Id?: boolean
    team2Id?: boolean
    team1Score?: boolean
    team2Score?: boolean
    winnerId?: boolean
    matchDate?: boolean
    status?: boolean
    createdAt?: boolean
  }

  export type MatchOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "tournamentId" | "team1Id" | "team2Id" | "team1Score" | "team2Score" | "winnerId" | "matchDate" | "status" | "createdAt", ExtArgs["result"]["match"]>
  export type MatchInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    team1?: boolean | TeamDefaultArgs<ExtArgs>
    team2?: boolean | TeamDefaultArgs<ExtArgs>
  }
  export type MatchIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    team1?: boolean | TeamDefaultArgs<ExtArgs>
    team2?: boolean | TeamDefaultArgs<ExtArgs>
  }
  export type MatchIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    tournament?: boolean | TournamentDefaultArgs<ExtArgs>
    team1?: boolean | TeamDefaultArgs<ExtArgs>
    team2?: boolean | TeamDefaultArgs<ExtArgs>
  }

  export type $MatchPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Match"
    objects: {
      tournament: Prisma.$TournamentPayload<ExtArgs>
      team1: Prisma.$TeamPayload<ExtArgs>
      team2: Prisma.$TeamPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      tournamentId: number
      team1Id: number
      team2Id: number
      team1Score: number | null
      team2Score: number | null
      winnerId: number | null
      matchDate: Date
      status: string
      createdAt: Date
    }, ExtArgs["result"]["match"]>
    composites: {}
  }

  type MatchGetPayload<S extends boolean | null | undefined | MatchDefaultArgs> = $Result.GetResult<Prisma.$MatchPayload, S>

  type MatchCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MatchFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MatchCountAggregateInputType | true
    }

  export interface MatchDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Match'], meta: { name: 'Match' } }
    /**
     * Find zero or one Match that matches the filter.
     * @param {MatchFindUniqueArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MatchFindUniqueArgs>(args: SelectSubset<T, MatchFindUniqueArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Match that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MatchFindUniqueOrThrowArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MatchFindUniqueOrThrowArgs>(args: SelectSubset<T, MatchFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Match that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindFirstArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MatchFindFirstArgs>(args?: SelectSubset<T, MatchFindFirstArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Match that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindFirstOrThrowArgs} args - Arguments to find a Match
     * @example
     * // Get one Match
     * const match = await prisma.match.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MatchFindFirstOrThrowArgs>(args?: SelectSubset<T, MatchFindFirstOrThrowArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Matches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Matches
     * const matches = await prisma.match.findMany()
     * 
     * // Get first 10 Matches
     * const matches = await prisma.match.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const matchWithIdOnly = await prisma.match.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MatchFindManyArgs>(args?: SelectSubset<T, MatchFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Match.
     * @param {MatchCreateArgs} args - Arguments to create a Match.
     * @example
     * // Create one Match
     * const Match = await prisma.match.create({
     *   data: {
     *     // ... data to create a Match
     *   }
     * })
     * 
     */
    create<T extends MatchCreateArgs>(args: SelectSubset<T, MatchCreateArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Matches.
     * @param {MatchCreateManyArgs} args - Arguments to create many Matches.
     * @example
     * // Create many Matches
     * const match = await prisma.match.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MatchCreateManyArgs>(args?: SelectSubset<T, MatchCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Matches and returns the data saved in the database.
     * @param {MatchCreateManyAndReturnArgs} args - Arguments to create many Matches.
     * @example
     * // Create many Matches
     * const match = await prisma.match.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Matches and only return the `id`
     * const matchWithIdOnly = await prisma.match.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MatchCreateManyAndReturnArgs>(args?: SelectSubset<T, MatchCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Match.
     * @param {MatchDeleteArgs} args - Arguments to delete one Match.
     * @example
     * // Delete one Match
     * const Match = await prisma.match.delete({
     *   where: {
     *     // ... filter to delete one Match
     *   }
     * })
     * 
     */
    delete<T extends MatchDeleteArgs>(args: SelectSubset<T, MatchDeleteArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Match.
     * @param {MatchUpdateArgs} args - Arguments to update one Match.
     * @example
     * // Update one Match
     * const match = await prisma.match.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MatchUpdateArgs>(args: SelectSubset<T, MatchUpdateArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Matches.
     * @param {MatchDeleteManyArgs} args - Arguments to filter Matches to delete.
     * @example
     * // Delete a few Matches
     * const { count } = await prisma.match.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MatchDeleteManyArgs>(args?: SelectSubset<T, MatchDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Matches
     * const match = await prisma.match.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MatchUpdateManyArgs>(args: SelectSubset<T, MatchUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Matches and returns the data updated in the database.
     * @param {MatchUpdateManyAndReturnArgs} args - Arguments to update many Matches.
     * @example
     * // Update many Matches
     * const match = await prisma.match.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Matches and only return the `id`
     * const matchWithIdOnly = await prisma.match.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MatchUpdateManyAndReturnArgs>(args: SelectSubset<T, MatchUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Match.
     * @param {MatchUpsertArgs} args - Arguments to update or create a Match.
     * @example
     * // Update or create a Match
     * const match = await prisma.match.upsert({
     *   create: {
     *     // ... data to create a Match
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Match we want to update
     *   }
     * })
     */
    upsert<T extends MatchUpsertArgs>(args: SelectSubset<T, MatchUpsertArgs<ExtArgs>>): Prisma__MatchClient<$Result.GetResult<Prisma.$MatchPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Matches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchCountArgs} args - Arguments to filter Matches to count.
     * @example
     * // Count the number of Matches
     * const count = await prisma.match.count({
     *   where: {
     *     // ... the filter for the Matches we want to count
     *   }
     * })
    **/
    count<T extends MatchCountArgs>(
      args?: Subset<T, MatchCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MatchCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Match.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MatchAggregateArgs>(args: Subset<T, MatchAggregateArgs>): Prisma.PrismaPromise<GetMatchAggregateType<T>>

    /**
     * Group by Match.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MatchGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MatchGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MatchGroupByArgs['orderBy'] }
        : { orderBy?: MatchGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MatchGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMatchGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Match model
   */
  readonly fields: MatchFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Match.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MatchClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    tournament<T extends TournamentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TournamentDefaultArgs<ExtArgs>>): Prisma__TournamentClient<$Result.GetResult<Prisma.$TournamentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    team1<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    team2<T extends TeamDefaultArgs<ExtArgs> = {}>(args?: Subset<T, TeamDefaultArgs<ExtArgs>>): Prisma__TeamClient<$Result.GetResult<Prisma.$TeamPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Match model
   */
  interface MatchFieldRefs {
    readonly id: FieldRef<"Match", 'Int'>
    readonly tournamentId: FieldRef<"Match", 'Int'>
    readonly team1Id: FieldRef<"Match", 'Int'>
    readonly team2Id: FieldRef<"Match", 'Int'>
    readonly team1Score: FieldRef<"Match", 'Int'>
    readonly team2Score: FieldRef<"Match", 'Int'>
    readonly winnerId: FieldRef<"Match", 'Int'>
    readonly matchDate: FieldRef<"Match", 'DateTime'>
    readonly status: FieldRef<"Match", 'String'>
    readonly createdAt: FieldRef<"Match", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Match findUnique
   */
  export type MatchFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match findUniqueOrThrow
   */
  export type MatchFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match findFirst
   */
  export type MatchFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match findFirstOrThrow
   */
  export type MatchFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Match to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Matches.
     */
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match findMany
   */
  export type MatchFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter, which Matches to fetch.
     */
    where?: MatchWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Matches to fetch.
     */
    orderBy?: MatchOrderByWithRelationInput | MatchOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Matches.
     */
    cursor?: MatchWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Matches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Matches.
     */
    skip?: number
    distinct?: MatchScalarFieldEnum | MatchScalarFieldEnum[]
  }

  /**
   * Match create
   */
  export type MatchCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The data needed to create a Match.
     */
    data: XOR<MatchCreateInput, MatchUncheckedCreateInput>
  }

  /**
   * Match createMany
   */
  export type MatchCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Matches.
     */
    data: MatchCreateManyInput | MatchCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Match createManyAndReturn
   */
  export type MatchCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * The data used to create many Matches.
     */
    data: MatchCreateManyInput | MatchCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Match update
   */
  export type MatchUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The data needed to update a Match.
     */
    data: XOR<MatchUpdateInput, MatchUncheckedUpdateInput>
    /**
     * Choose, which Match to update.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match updateMany
   */
  export type MatchUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Matches.
     */
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyInput>
    /**
     * Filter which Matches to update
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to update.
     */
    limit?: number
  }

  /**
   * Match updateManyAndReturn
   */
  export type MatchUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * The data used to update Matches.
     */
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyInput>
    /**
     * Filter which Matches to update
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Match upsert
   */
  export type MatchUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * The filter to search for the Match to update in case it exists.
     */
    where: MatchWhereUniqueInput
    /**
     * In case the Match found by the `where` argument doesn't exist, create a new Match with this data.
     */
    create: XOR<MatchCreateInput, MatchUncheckedCreateInput>
    /**
     * In case the Match was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MatchUpdateInput, MatchUncheckedUpdateInput>
  }

  /**
   * Match delete
   */
  export type MatchDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
    /**
     * Filter which Match to delete.
     */
    where: MatchWhereUniqueInput
  }

  /**
   * Match deleteMany
   */
  export type MatchDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Matches to delete
     */
    where?: MatchWhereInput
    /**
     * Limit how many Matches to delete.
     */
    limit?: number
  }

  /**
   * Match without action
   */
  export type MatchDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Match
     */
    select?: MatchSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Match
     */
    omit?: MatchOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MatchInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    pseudo: 'pseudo',
    name: 'name',
    last_name: 'last_name',
    email: 'email',
    password: 'password',
    sexe: 'sexe',
    birthday: 'birthday',
    created_at: 'created_at',
    last_auth: 'last_auth',
    role: 'role'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const GameScalarFieldEnum: {
    id: 'id',
    name: 'name'
  };

  export type GameScalarFieldEnum = (typeof GameScalarFieldEnum)[keyof typeof GameScalarFieldEnum]


  export const TournamentScalarFieldEnum: {
    id: 'id',
    tournamentName: 'tournamentName',
    startDate: 'startDate',
    startTime: 'startTime',
    format: 'format',
    rules: 'rules',
    maxParticipants: 'maxParticipants',
    rewards: 'rewards',
    minTeams: 'minTeams',
    playersPerTeam: 'playersPerTeam',
    totalPlayers: 'totalPlayers',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    gameId: 'gameId',
    tournament_typeId: 'tournament_typeId'
  };

  export type TournamentScalarFieldEnum = (typeof TournamentScalarFieldEnum)[keyof typeof TournamentScalarFieldEnum]


  export const TournamentTypeScalarFieldEnum: {
    id: 'id',
    type: 'type'
  };

  export type TournamentTypeScalarFieldEnum = (typeof TournamentTypeScalarFieldEnum)[keyof typeof TournamentTypeScalarFieldEnum]


  export const TournamentStatusScalarFieldEnum: {
    id: 'id',
    tournamentId: 'tournamentId',
    status: 'status',
    updatedAt: 'updatedAt'
  };

  export type TournamentStatusScalarFieldEnum = (typeof TournamentStatusScalarFieldEnum)[keyof typeof TournamentStatusScalarFieldEnum]


  export const TeamScalarFieldEnum: {
    id: 'id',
    teamName: 'teamName',
    tournamentId: 'tournamentId',
    createdAt: 'createdAt'
  };

  export type TeamScalarFieldEnum = (typeof TeamScalarFieldEnum)[keyof typeof TeamScalarFieldEnum]


  export const TeamMemberScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    teamId: 'teamId',
    role: 'role',
    joined_at: 'joined_at'
  };

  export type TeamMemberScalarFieldEnum = (typeof TeamMemberScalarFieldEnum)[keyof typeof TeamMemberScalarFieldEnum]


  export const MatchScalarFieldEnum: {
    id: 'id',
    tournamentId: 'tournamentId',
    team1Id: 'team1Id',
    team2Id: 'team2Id',
    team1Score: 'team1Score',
    team2Score: 'team2Score',
    winnerId: 'winnerId',
    matchDate: 'matchDate',
    status: 'status',
    createdAt: 'createdAt'
  };

  export type MatchScalarFieldEnum = (typeof MatchScalarFieldEnum)[keyof typeof MatchScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    pseudo?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    last_name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    sexe?: StringFilter<"User"> | string
    birthday?: DateTimeFilter<"User"> | Date | string
    created_at?: DateTimeFilter<"User"> | Date | string
    last_auth?: DateTimeFilter<"User"> | Date | string
    role?: StringFilter<"User"> | string
    teamMembers?: TeamMemberListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    pseudo?: SortOrder
    name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    sexe?: SortOrder
    birthday?: SortOrder
    created_at?: SortOrder
    last_auth?: SortOrder
    role?: SortOrder
    teamMembers?: TeamMemberOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    pseudo?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    last_name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    sexe?: StringFilter<"User"> | string
    birthday?: DateTimeFilter<"User"> | Date | string
    created_at?: DateTimeFilter<"User"> | Date | string
    last_auth?: DateTimeFilter<"User"> | Date | string
    role?: StringFilter<"User"> | string
    teamMembers?: TeamMemberListRelationFilter
  }, "id" | "pseudo" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    pseudo?: SortOrder
    name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    sexe?: SortOrder
    birthday?: SortOrder
    created_at?: SortOrder
    last_auth?: SortOrder
    role?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    pseudo?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    last_name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    sexe?: StringWithAggregatesFilter<"User"> | string
    birthday?: DateTimeWithAggregatesFilter<"User"> | Date | string
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    last_auth?: DateTimeWithAggregatesFilter<"User"> | Date | string
    role?: StringWithAggregatesFilter<"User"> | string
  }

  export type GameWhereInput = {
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    id?: IntFilter<"Game"> | number
    name?: StringFilter<"Game"> | string
    tournaments?: TournamentListRelationFilter
  }

  export type GameOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    tournaments?: TournamentOrderByRelationAggregateInput
  }

  export type GameWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    name?: string
    AND?: GameWhereInput | GameWhereInput[]
    OR?: GameWhereInput[]
    NOT?: GameWhereInput | GameWhereInput[]
    tournaments?: TournamentListRelationFilter
  }, "id" | "name">

  export type GameOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    _count?: GameCountOrderByAggregateInput
    _avg?: GameAvgOrderByAggregateInput
    _max?: GameMaxOrderByAggregateInput
    _min?: GameMinOrderByAggregateInput
    _sum?: GameSumOrderByAggregateInput
  }

  export type GameScalarWhereWithAggregatesInput = {
    AND?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    OR?: GameScalarWhereWithAggregatesInput[]
    NOT?: GameScalarWhereWithAggregatesInput | GameScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Game"> | number
    name?: StringWithAggregatesFilter<"Game"> | string
  }

  export type TournamentWhereInput = {
    AND?: TournamentWhereInput | TournamentWhereInput[]
    OR?: TournamentWhereInput[]
    NOT?: TournamentWhereInput | TournamentWhereInput[]
    id?: IntFilter<"Tournament"> | number
    tournamentName?: StringFilter<"Tournament"> | string
    startDate?: DateTimeFilter<"Tournament"> | Date | string
    startTime?: StringFilter<"Tournament"> | string
    format?: StringFilter<"Tournament"> | string
    rules?: StringFilter<"Tournament"> | string
    maxParticipants?: IntFilter<"Tournament"> | number
    rewards?: StringNullableFilter<"Tournament"> | string | null
    minTeams?: IntFilter<"Tournament"> | number
    playersPerTeam?: IntFilter<"Tournament"> | number
    totalPlayers?: IntFilter<"Tournament"> | number
    createdAt?: DateTimeFilter<"Tournament"> | Date | string
    updatedAt?: DateTimeFilter<"Tournament"> | Date | string
    gameId?: IntFilter<"Tournament"> | number
    tournament_typeId?: IntFilter<"Tournament"> | number
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    tournamentType?: XOR<TournamentTypeScalarRelationFilter, TournamentTypeWhereInput>
    status?: TournamentStatusListRelationFilter
    teams?: TeamListRelationFilter
    matches?: MatchListRelationFilter
  }

  export type TournamentOrderByWithRelationInput = {
    id?: SortOrder
    tournamentName?: SortOrder
    startDate?: SortOrder
    startTime?: SortOrder
    format?: SortOrder
    rules?: SortOrder
    maxParticipants?: SortOrder
    rewards?: SortOrderInput | SortOrder
    minTeams?: SortOrder
    playersPerTeam?: SortOrder
    totalPlayers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    gameId?: SortOrder
    tournament_typeId?: SortOrder
    game?: GameOrderByWithRelationInput
    tournamentType?: TournamentTypeOrderByWithRelationInput
    status?: TournamentStatusOrderByRelationAggregateInput
    teams?: TeamOrderByRelationAggregateInput
    matches?: MatchOrderByRelationAggregateInput
  }

  export type TournamentWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TournamentWhereInput | TournamentWhereInput[]
    OR?: TournamentWhereInput[]
    NOT?: TournamentWhereInput | TournamentWhereInput[]
    tournamentName?: StringFilter<"Tournament"> | string
    startDate?: DateTimeFilter<"Tournament"> | Date | string
    startTime?: StringFilter<"Tournament"> | string
    format?: StringFilter<"Tournament"> | string
    rules?: StringFilter<"Tournament"> | string
    maxParticipants?: IntFilter<"Tournament"> | number
    rewards?: StringNullableFilter<"Tournament"> | string | null
    minTeams?: IntFilter<"Tournament"> | number
    playersPerTeam?: IntFilter<"Tournament"> | number
    totalPlayers?: IntFilter<"Tournament"> | number
    createdAt?: DateTimeFilter<"Tournament"> | Date | string
    updatedAt?: DateTimeFilter<"Tournament"> | Date | string
    gameId?: IntFilter<"Tournament"> | number
    tournament_typeId?: IntFilter<"Tournament"> | number
    game?: XOR<GameScalarRelationFilter, GameWhereInput>
    tournamentType?: XOR<TournamentTypeScalarRelationFilter, TournamentTypeWhereInput>
    status?: TournamentStatusListRelationFilter
    teams?: TeamListRelationFilter
    matches?: MatchListRelationFilter
  }, "id">

  export type TournamentOrderByWithAggregationInput = {
    id?: SortOrder
    tournamentName?: SortOrder
    startDate?: SortOrder
    startTime?: SortOrder
    format?: SortOrder
    rules?: SortOrder
    maxParticipants?: SortOrder
    rewards?: SortOrderInput | SortOrder
    minTeams?: SortOrder
    playersPerTeam?: SortOrder
    totalPlayers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    gameId?: SortOrder
    tournament_typeId?: SortOrder
    _count?: TournamentCountOrderByAggregateInput
    _avg?: TournamentAvgOrderByAggregateInput
    _max?: TournamentMaxOrderByAggregateInput
    _min?: TournamentMinOrderByAggregateInput
    _sum?: TournamentSumOrderByAggregateInput
  }

  export type TournamentScalarWhereWithAggregatesInput = {
    AND?: TournamentScalarWhereWithAggregatesInput | TournamentScalarWhereWithAggregatesInput[]
    OR?: TournamentScalarWhereWithAggregatesInput[]
    NOT?: TournamentScalarWhereWithAggregatesInput | TournamentScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Tournament"> | number
    tournamentName?: StringWithAggregatesFilter<"Tournament"> | string
    startDate?: DateTimeWithAggregatesFilter<"Tournament"> | Date | string
    startTime?: StringWithAggregatesFilter<"Tournament"> | string
    format?: StringWithAggregatesFilter<"Tournament"> | string
    rules?: StringWithAggregatesFilter<"Tournament"> | string
    maxParticipants?: IntWithAggregatesFilter<"Tournament"> | number
    rewards?: StringNullableWithAggregatesFilter<"Tournament"> | string | null
    minTeams?: IntWithAggregatesFilter<"Tournament"> | number
    playersPerTeam?: IntWithAggregatesFilter<"Tournament"> | number
    totalPlayers?: IntWithAggregatesFilter<"Tournament"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Tournament"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Tournament"> | Date | string
    gameId?: IntWithAggregatesFilter<"Tournament"> | number
    tournament_typeId?: IntWithAggregatesFilter<"Tournament"> | number
  }

  export type TournamentTypeWhereInput = {
    AND?: TournamentTypeWhereInput | TournamentTypeWhereInput[]
    OR?: TournamentTypeWhereInput[]
    NOT?: TournamentTypeWhereInput | TournamentTypeWhereInput[]
    id?: IntFilter<"TournamentType"> | number
    type?: StringFilter<"TournamentType"> | string
    tournaments?: TournamentListRelationFilter
  }

  export type TournamentTypeOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    tournaments?: TournamentOrderByRelationAggregateInput
  }

  export type TournamentTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    type?: string
    AND?: TournamentTypeWhereInput | TournamentTypeWhereInput[]
    OR?: TournamentTypeWhereInput[]
    NOT?: TournamentTypeWhereInput | TournamentTypeWhereInput[]
    tournaments?: TournamentListRelationFilter
  }, "id" | "type">

  export type TournamentTypeOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    _count?: TournamentTypeCountOrderByAggregateInput
    _avg?: TournamentTypeAvgOrderByAggregateInput
    _max?: TournamentTypeMaxOrderByAggregateInput
    _min?: TournamentTypeMinOrderByAggregateInput
    _sum?: TournamentTypeSumOrderByAggregateInput
  }

  export type TournamentTypeScalarWhereWithAggregatesInput = {
    AND?: TournamentTypeScalarWhereWithAggregatesInput | TournamentTypeScalarWhereWithAggregatesInput[]
    OR?: TournamentTypeScalarWhereWithAggregatesInput[]
    NOT?: TournamentTypeScalarWhereWithAggregatesInput | TournamentTypeScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TournamentType"> | number
    type?: StringWithAggregatesFilter<"TournamentType"> | string
  }

  export type TournamentStatusWhereInput = {
    AND?: TournamentStatusWhereInput | TournamentStatusWhereInput[]
    OR?: TournamentStatusWhereInput[]
    NOT?: TournamentStatusWhereInput | TournamentStatusWhereInput[]
    id?: IntFilter<"TournamentStatus"> | number
    tournamentId?: IntFilter<"TournamentStatus"> | number
    status?: StringFilter<"TournamentStatus"> | string
    updatedAt?: DateTimeFilter<"TournamentStatus"> | Date | string
    tournament?: XOR<TournamentScalarRelationFilter, TournamentWhereInput>
  }

  export type TournamentStatusOrderByWithRelationInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
    tournament?: TournamentOrderByWithRelationInput
  }

  export type TournamentStatusWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TournamentStatusWhereInput | TournamentStatusWhereInput[]
    OR?: TournamentStatusWhereInput[]
    NOT?: TournamentStatusWhereInput | TournamentStatusWhereInput[]
    tournamentId?: IntFilter<"TournamentStatus"> | number
    status?: StringFilter<"TournamentStatus"> | string
    updatedAt?: DateTimeFilter<"TournamentStatus"> | Date | string
    tournament?: XOR<TournamentScalarRelationFilter, TournamentWhereInput>
  }, "id">

  export type TournamentStatusOrderByWithAggregationInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
    _count?: TournamentStatusCountOrderByAggregateInput
    _avg?: TournamentStatusAvgOrderByAggregateInput
    _max?: TournamentStatusMaxOrderByAggregateInput
    _min?: TournamentStatusMinOrderByAggregateInput
    _sum?: TournamentStatusSumOrderByAggregateInput
  }

  export type TournamentStatusScalarWhereWithAggregatesInput = {
    AND?: TournamentStatusScalarWhereWithAggregatesInput | TournamentStatusScalarWhereWithAggregatesInput[]
    OR?: TournamentStatusScalarWhereWithAggregatesInput[]
    NOT?: TournamentStatusScalarWhereWithAggregatesInput | TournamentStatusScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TournamentStatus"> | number
    tournamentId?: IntWithAggregatesFilter<"TournamentStatus"> | number
    status?: StringWithAggregatesFilter<"TournamentStatus"> | string
    updatedAt?: DateTimeWithAggregatesFilter<"TournamentStatus"> | Date | string
  }

  export type TeamWhereInput = {
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    id?: IntFilter<"Team"> | number
    teamName?: StringFilter<"Team"> | string
    tournamentId?: IntFilter<"Team"> | number
    createdAt?: DateTimeFilter<"Team"> | Date | string
    tournament?: XOR<TournamentScalarRelationFilter, TournamentWhereInput>
    members?: TeamMemberListRelationFilter
    matchesAsTeam1?: MatchListRelationFilter
    matchesAsTeam2?: MatchListRelationFilter
  }

  export type TeamOrderByWithRelationInput = {
    id?: SortOrder
    teamName?: SortOrder
    tournamentId?: SortOrder
    createdAt?: SortOrder
    tournament?: TournamentOrderByWithRelationInput
    members?: TeamMemberOrderByRelationAggregateInput
    matchesAsTeam1?: MatchOrderByRelationAggregateInput
    matchesAsTeam2?: MatchOrderByRelationAggregateInput
  }

  export type TeamWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TeamWhereInput | TeamWhereInput[]
    OR?: TeamWhereInput[]
    NOT?: TeamWhereInput | TeamWhereInput[]
    teamName?: StringFilter<"Team"> | string
    tournamentId?: IntFilter<"Team"> | number
    createdAt?: DateTimeFilter<"Team"> | Date | string
    tournament?: XOR<TournamentScalarRelationFilter, TournamentWhereInput>
    members?: TeamMemberListRelationFilter
    matchesAsTeam1?: MatchListRelationFilter
    matchesAsTeam2?: MatchListRelationFilter
  }, "id">

  export type TeamOrderByWithAggregationInput = {
    id?: SortOrder
    teamName?: SortOrder
    tournamentId?: SortOrder
    createdAt?: SortOrder
    _count?: TeamCountOrderByAggregateInput
    _avg?: TeamAvgOrderByAggregateInput
    _max?: TeamMaxOrderByAggregateInput
    _min?: TeamMinOrderByAggregateInput
    _sum?: TeamSumOrderByAggregateInput
  }

  export type TeamScalarWhereWithAggregatesInput = {
    AND?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    OR?: TeamScalarWhereWithAggregatesInput[]
    NOT?: TeamScalarWhereWithAggregatesInput | TeamScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Team"> | number
    teamName?: StringWithAggregatesFilter<"Team"> | string
    tournamentId?: IntWithAggregatesFilter<"Team"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Team"> | Date | string
  }

  export type TeamMemberWhereInput = {
    AND?: TeamMemberWhereInput | TeamMemberWhereInput[]
    OR?: TeamMemberWhereInput[]
    NOT?: TeamMemberWhereInput | TeamMemberWhereInput[]
    id?: IntFilter<"TeamMember"> | number
    userId?: IntFilter<"TeamMember"> | number
    teamId?: IntFilter<"TeamMember"> | number
    role?: StringFilter<"TeamMember"> | string
    joined_at?: DateTimeFilter<"TeamMember"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
  }

  export type TeamMemberOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    role?: SortOrder
    joined_at?: SortOrder
    user?: UserOrderByWithRelationInput
    team?: TeamOrderByWithRelationInput
  }

  export type TeamMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    userId_teamId?: TeamMemberUserIdTeamIdCompoundUniqueInput
    AND?: TeamMemberWhereInput | TeamMemberWhereInput[]
    OR?: TeamMemberWhereInput[]
    NOT?: TeamMemberWhereInput | TeamMemberWhereInput[]
    userId?: IntFilter<"TeamMember"> | number
    teamId?: IntFilter<"TeamMember"> | number
    role?: StringFilter<"TeamMember"> | string
    joined_at?: DateTimeFilter<"TeamMember"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    team?: XOR<TeamScalarRelationFilter, TeamWhereInput>
  }, "id" | "userId_teamId">

  export type TeamMemberOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    role?: SortOrder
    joined_at?: SortOrder
    _count?: TeamMemberCountOrderByAggregateInput
    _avg?: TeamMemberAvgOrderByAggregateInput
    _max?: TeamMemberMaxOrderByAggregateInput
    _min?: TeamMemberMinOrderByAggregateInput
    _sum?: TeamMemberSumOrderByAggregateInput
  }

  export type TeamMemberScalarWhereWithAggregatesInput = {
    AND?: TeamMemberScalarWhereWithAggregatesInput | TeamMemberScalarWhereWithAggregatesInput[]
    OR?: TeamMemberScalarWhereWithAggregatesInput[]
    NOT?: TeamMemberScalarWhereWithAggregatesInput | TeamMemberScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TeamMember"> | number
    userId?: IntWithAggregatesFilter<"TeamMember"> | number
    teamId?: IntWithAggregatesFilter<"TeamMember"> | number
    role?: StringWithAggregatesFilter<"TeamMember"> | string
    joined_at?: DateTimeWithAggregatesFilter<"TeamMember"> | Date | string
  }

  export type MatchWhereInput = {
    AND?: MatchWhereInput | MatchWhereInput[]
    OR?: MatchWhereInput[]
    NOT?: MatchWhereInput | MatchWhereInput[]
    id?: IntFilter<"Match"> | number
    tournamentId?: IntFilter<"Match"> | number
    team1Id?: IntFilter<"Match"> | number
    team2Id?: IntFilter<"Match"> | number
    team1Score?: IntNullableFilter<"Match"> | number | null
    team2Score?: IntNullableFilter<"Match"> | number | null
    winnerId?: IntNullableFilter<"Match"> | number | null
    matchDate?: DateTimeFilter<"Match"> | Date | string
    status?: StringFilter<"Match"> | string
    createdAt?: DateTimeFilter<"Match"> | Date | string
    tournament?: XOR<TournamentScalarRelationFilter, TournamentWhereInput>
    team1?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    team2?: XOR<TeamScalarRelationFilter, TeamWhereInput>
  }

  export type MatchOrderByWithRelationInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    team1Id?: SortOrder
    team2Id?: SortOrder
    team1Score?: SortOrderInput | SortOrder
    team2Score?: SortOrderInput | SortOrder
    winnerId?: SortOrderInput | SortOrder
    matchDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    tournament?: TournamentOrderByWithRelationInput
    team1?: TeamOrderByWithRelationInput
    team2?: TeamOrderByWithRelationInput
  }

  export type MatchWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MatchWhereInput | MatchWhereInput[]
    OR?: MatchWhereInput[]
    NOT?: MatchWhereInput | MatchWhereInput[]
    tournamentId?: IntFilter<"Match"> | number
    team1Id?: IntFilter<"Match"> | number
    team2Id?: IntFilter<"Match"> | number
    team1Score?: IntNullableFilter<"Match"> | number | null
    team2Score?: IntNullableFilter<"Match"> | number | null
    winnerId?: IntNullableFilter<"Match"> | number | null
    matchDate?: DateTimeFilter<"Match"> | Date | string
    status?: StringFilter<"Match"> | string
    createdAt?: DateTimeFilter<"Match"> | Date | string
    tournament?: XOR<TournamentScalarRelationFilter, TournamentWhereInput>
    team1?: XOR<TeamScalarRelationFilter, TeamWhereInput>
    team2?: XOR<TeamScalarRelationFilter, TeamWhereInput>
  }, "id">

  export type MatchOrderByWithAggregationInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    team1Id?: SortOrder
    team2Id?: SortOrder
    team1Score?: SortOrderInput | SortOrder
    team2Score?: SortOrderInput | SortOrder
    winnerId?: SortOrderInput | SortOrder
    matchDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    _count?: MatchCountOrderByAggregateInput
    _avg?: MatchAvgOrderByAggregateInput
    _max?: MatchMaxOrderByAggregateInput
    _min?: MatchMinOrderByAggregateInput
    _sum?: MatchSumOrderByAggregateInput
  }

  export type MatchScalarWhereWithAggregatesInput = {
    AND?: MatchScalarWhereWithAggregatesInput | MatchScalarWhereWithAggregatesInput[]
    OR?: MatchScalarWhereWithAggregatesInput[]
    NOT?: MatchScalarWhereWithAggregatesInput | MatchScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Match"> | number
    tournamentId?: IntWithAggregatesFilter<"Match"> | number
    team1Id?: IntWithAggregatesFilter<"Match"> | number
    team2Id?: IntWithAggregatesFilter<"Match"> | number
    team1Score?: IntNullableWithAggregatesFilter<"Match"> | number | null
    team2Score?: IntNullableWithAggregatesFilter<"Match"> | number | null
    winnerId?: IntNullableWithAggregatesFilter<"Match"> | number | null
    matchDate?: DateTimeWithAggregatesFilter<"Match"> | Date | string
    status?: StringWithAggregatesFilter<"Match"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Match"> | Date | string
  }

  export type UserCreateInput = {
    pseudo: string
    name: string
    last_name: string
    email: string
    password: string
    sexe: string
    birthday: Date | string
    created_at?: Date | string
    last_auth: Date | string
    role?: string
    teamMembers?: TeamMemberCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    pseudo: string
    name: string
    last_name: string
    email: string
    password: string
    sexe: string
    birthday: Date | string
    created_at?: Date | string
    last_auth: Date | string
    role?: string
    teamMembers?: TeamMemberUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    pseudo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    sexe?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_auth?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
    teamMembers?: TeamMemberUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    pseudo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    sexe?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_auth?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
    teamMembers?: TeamMemberUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    pseudo: string
    name: string
    last_name: string
    email: string
    password: string
    sexe: string
    birthday: Date | string
    created_at?: Date | string
    last_auth: Date | string
    role?: string
  }

  export type UserUpdateManyMutationInput = {
    pseudo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    sexe?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_auth?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    pseudo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    sexe?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_auth?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type GameCreateInput = {
    name: string
    tournaments?: TournamentCreateNestedManyWithoutGameInput
  }

  export type GameUncheckedCreateInput = {
    id?: number
    name: string
    tournaments?: TournamentUncheckedCreateNestedManyWithoutGameInput
  }

  export type GameUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
    tournaments?: TournamentUpdateManyWithoutGameNestedInput
  }

  export type GameUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
    tournaments?: TournamentUncheckedUpdateManyWithoutGameNestedInput
  }

  export type GameCreateManyInput = {
    id?: number
    name: string
  }

  export type GameUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type GameUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TournamentCreateInput = {
    tournamentName: string
    startDate: Date | string
    startTime: string
    format: string
    rules: string
    maxParticipants: number
    rewards?: string | null
    minTeams: number
    playersPerTeam: number
    totalPlayers: number
    createdAt?: Date | string
    updatedAt: Date | string
    game: GameCreateNestedOneWithoutTournamentsInput
    tournamentType: TournamentTypeCreateNestedOneWithoutTournamentsInput
    status?: TournamentStatusCreateNestedManyWithoutTournamentInput
    teams?: TeamCreateNestedManyWithoutTournamentInput
    matches?: MatchCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateInput = {
    id?: number
    tournamentName: string
    startDate: Date | string
    startTime: string
    format: string
    rules: string
    maxParticipants: number
    rewards?: string | null
    minTeams: number
    playersPerTeam: number
    totalPlayers: number
    createdAt?: Date | string
    updatedAt: Date | string
    gameId: number
    tournament_typeId: number
    status?: TournamentStatusUncheckedCreateNestedManyWithoutTournamentInput
    teams?: TeamUncheckedCreateNestedManyWithoutTournamentInput
    matches?: MatchUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUpdateInput = {
    tournamentName?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    rules?: StringFieldUpdateOperationsInput | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    rewards?: NullableStringFieldUpdateOperationsInput | string | null
    minTeams?: IntFieldUpdateOperationsInput | number
    playersPerTeam?: IntFieldUpdateOperationsInput | number
    totalPlayers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutTournamentsNestedInput
    tournamentType?: TournamentTypeUpdateOneRequiredWithoutTournamentsNestedInput
    status?: TournamentStatusUpdateManyWithoutTournamentNestedInput
    teams?: TeamUpdateManyWithoutTournamentNestedInput
    matches?: MatchUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentName?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    rules?: StringFieldUpdateOperationsInput | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    rewards?: NullableStringFieldUpdateOperationsInput | string | null
    minTeams?: IntFieldUpdateOperationsInput | number
    playersPerTeam?: IntFieldUpdateOperationsInput | number
    totalPlayers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameId?: IntFieldUpdateOperationsInput | number
    tournament_typeId?: IntFieldUpdateOperationsInput | number
    status?: TournamentStatusUncheckedUpdateManyWithoutTournamentNestedInput
    teams?: TeamUncheckedUpdateManyWithoutTournamentNestedInput
    matches?: MatchUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentCreateManyInput = {
    id?: number
    tournamentName: string
    startDate: Date | string
    startTime: string
    format: string
    rules: string
    maxParticipants: number
    rewards?: string | null
    minTeams: number
    playersPerTeam: number
    totalPlayers: number
    createdAt?: Date | string
    updatedAt: Date | string
    gameId: number
    tournament_typeId: number
  }

  export type TournamentUpdateManyMutationInput = {
    tournamentName?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    rules?: StringFieldUpdateOperationsInput | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    rewards?: NullableStringFieldUpdateOperationsInput | string | null
    minTeams?: IntFieldUpdateOperationsInput | number
    playersPerTeam?: IntFieldUpdateOperationsInput | number
    totalPlayers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentName?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    rules?: StringFieldUpdateOperationsInput | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    rewards?: NullableStringFieldUpdateOperationsInput | string | null
    minTeams?: IntFieldUpdateOperationsInput | number
    playersPerTeam?: IntFieldUpdateOperationsInput | number
    totalPlayers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameId?: IntFieldUpdateOperationsInput | number
    tournament_typeId?: IntFieldUpdateOperationsInput | number
  }

  export type TournamentTypeCreateInput = {
    type: string
    tournaments?: TournamentCreateNestedManyWithoutTournamentTypeInput
  }

  export type TournamentTypeUncheckedCreateInput = {
    id?: number
    type: string
    tournaments?: TournamentUncheckedCreateNestedManyWithoutTournamentTypeInput
  }

  export type TournamentTypeUpdateInput = {
    type?: StringFieldUpdateOperationsInput | string
    tournaments?: TournamentUpdateManyWithoutTournamentTypeNestedInput
  }

  export type TournamentTypeUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
    tournaments?: TournamentUncheckedUpdateManyWithoutTournamentTypeNestedInput
  }

  export type TournamentTypeCreateManyInput = {
    id?: number
    type: string
  }

  export type TournamentTypeUpdateManyMutationInput = {
    type?: StringFieldUpdateOperationsInput | string
  }

  export type TournamentTypeUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
  }

  export type TournamentStatusCreateInput = {
    status: string
    updatedAt: Date | string
    tournament: TournamentCreateNestedOneWithoutStatusInput
  }

  export type TournamentStatusUncheckedCreateInput = {
    id?: number
    tournamentId: number
    status: string
    updatedAt: Date | string
  }

  export type TournamentStatusUpdateInput = {
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament?: TournamentUpdateOneRequiredWithoutStatusNestedInput
  }

  export type TournamentStatusUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentStatusCreateManyInput = {
    id?: number
    tournamentId: number
    status: string
    updatedAt: Date | string
  }

  export type TournamentStatusUpdateManyMutationInput = {
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentStatusUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentId?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamCreateInput = {
    teamName: string
    createdAt?: Date | string
    tournament: TournamentCreateNestedOneWithoutTeamsInput
    members?: TeamMemberCreateNestedManyWithoutTeamInput
    matchesAsTeam1?: MatchCreateNestedManyWithoutTeam1Input
    matchesAsTeam2?: MatchCreateNestedManyWithoutTeam2Input
  }

  export type TeamUncheckedCreateInput = {
    id?: number
    teamName: string
    tournamentId: number
    createdAt?: Date | string
    members?: TeamMemberUncheckedCreateNestedManyWithoutTeamInput
    matchesAsTeam1?: MatchUncheckedCreateNestedManyWithoutTeam1Input
    matchesAsTeam2?: MatchUncheckedCreateNestedManyWithoutTeam2Input
  }

  export type TeamUpdateInput = {
    teamName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament?: TournamentUpdateOneRequiredWithoutTeamsNestedInput
    members?: TeamMemberUpdateManyWithoutTeamNestedInput
    matchesAsTeam1?: MatchUpdateManyWithoutTeam1NestedInput
    matchesAsTeam2?: MatchUpdateManyWithoutTeam2NestedInput
  }

  export type TeamUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    teamName?: StringFieldUpdateOperationsInput | string
    tournamentId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: TeamMemberUncheckedUpdateManyWithoutTeamNestedInput
    matchesAsTeam1?: MatchUncheckedUpdateManyWithoutTeam1NestedInput
    matchesAsTeam2?: MatchUncheckedUpdateManyWithoutTeam2NestedInput
  }

  export type TeamCreateManyInput = {
    id?: number
    teamName: string
    tournamentId: number
    createdAt?: Date | string
  }

  export type TeamUpdateManyMutationInput = {
    teamName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    teamName?: StringFieldUpdateOperationsInput | string
    tournamentId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberCreateInput = {
    role: string
    joined_at?: Date | string
    user: UserCreateNestedOneWithoutTeamMembersInput
    team: TeamCreateNestedOneWithoutMembersInput
  }

  export type TeamMemberUncheckedCreateInput = {
    id?: number
    userId: number
    teamId: number
    role: string
    joined_at?: Date | string
  }

  export type TeamMemberUpdateInput = {
    role?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTeamMembersNestedInput
    team?: TeamUpdateOneRequiredWithoutMembersNestedInput
  }

  export type TeamMemberUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    teamId?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberCreateManyInput = {
    id?: number
    userId: number
    teamId: number
    role: string
    joined_at?: Date | string
  }

  export type TeamMemberUpdateManyMutationInput = {
    role?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    teamId?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchCreateInput = {
    team1Score?: number | null
    team2Score?: number | null
    winnerId?: number | null
    matchDate: Date | string
    status: string
    createdAt?: Date | string
    tournament: TournamentCreateNestedOneWithoutMatchesInput
    team1: TeamCreateNestedOneWithoutMatchesAsTeam1Input
    team2: TeamCreateNestedOneWithoutMatchesAsTeam2Input
  }

  export type MatchUncheckedCreateInput = {
    id?: number
    tournamentId: number
    team1Id: number
    team2Id: number
    team1Score?: number | null
    team2Score?: number | null
    winnerId?: number | null
    matchDate: Date | string
    status: string
    createdAt?: Date | string
  }

  export type MatchUpdateInput = {
    team1Score?: NullableIntFieldUpdateOperationsInput | number | null
    team2Score?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableIntFieldUpdateOperationsInput | number | null
    matchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament?: TournamentUpdateOneRequiredWithoutMatchesNestedInput
    team1?: TeamUpdateOneRequiredWithoutMatchesAsTeam1NestedInput
    team2?: TeamUpdateOneRequiredWithoutMatchesAsTeam2NestedInput
  }

  export type MatchUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentId?: IntFieldUpdateOperationsInput | number
    team1Id?: IntFieldUpdateOperationsInput | number
    team2Id?: IntFieldUpdateOperationsInput | number
    team1Score?: NullableIntFieldUpdateOperationsInput | number | null
    team2Score?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableIntFieldUpdateOperationsInput | number | null
    matchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchCreateManyInput = {
    id?: number
    tournamentId: number
    team1Id: number
    team2Id: number
    team1Score?: number | null
    team2Score?: number | null
    winnerId?: number | null
    matchDate: Date | string
    status: string
    createdAt?: Date | string
  }

  export type MatchUpdateManyMutationInput = {
    team1Score?: NullableIntFieldUpdateOperationsInput | number | null
    team2Score?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableIntFieldUpdateOperationsInput | number | null
    matchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentId?: IntFieldUpdateOperationsInput | number
    team1Id?: IntFieldUpdateOperationsInput | number
    team2Id?: IntFieldUpdateOperationsInput | number
    team1Score?: NullableIntFieldUpdateOperationsInput | number | null
    team2Score?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableIntFieldUpdateOperationsInput | number | null
    matchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TeamMemberListRelationFilter = {
    every?: TeamMemberWhereInput
    some?: TeamMemberWhereInput
    none?: TeamMemberWhereInput
  }

  export type TeamMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    pseudo?: SortOrder
    name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    sexe?: SortOrder
    birthday?: SortOrder
    created_at?: SortOrder
    last_auth?: SortOrder
    role?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    pseudo?: SortOrder
    name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    sexe?: SortOrder
    birthday?: SortOrder
    created_at?: SortOrder
    last_auth?: SortOrder
    role?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    pseudo?: SortOrder
    name?: SortOrder
    last_name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    sexe?: SortOrder
    birthday?: SortOrder
    created_at?: SortOrder
    last_auth?: SortOrder
    role?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type TournamentListRelationFilter = {
    every?: TournamentWhereInput
    some?: TournamentWhereInput
    none?: TournamentWhereInput
  }

  export type TournamentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type GameCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type GameAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type GameMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type GameMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
  }

  export type GameSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type GameScalarRelationFilter = {
    is?: GameWhereInput
    isNot?: GameWhereInput
  }

  export type TournamentTypeScalarRelationFilter = {
    is?: TournamentTypeWhereInput
    isNot?: TournamentTypeWhereInput
  }

  export type TournamentStatusListRelationFilter = {
    every?: TournamentStatusWhereInput
    some?: TournamentStatusWhereInput
    none?: TournamentStatusWhereInput
  }

  export type TeamListRelationFilter = {
    every?: TeamWhereInput
    some?: TeamWhereInput
    none?: TeamWhereInput
  }

  export type MatchListRelationFilter = {
    every?: MatchWhereInput
    some?: MatchWhereInput
    none?: MatchWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TournamentStatusOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TeamOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MatchOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TournamentCountOrderByAggregateInput = {
    id?: SortOrder
    tournamentName?: SortOrder
    startDate?: SortOrder
    startTime?: SortOrder
    format?: SortOrder
    rules?: SortOrder
    maxParticipants?: SortOrder
    rewards?: SortOrder
    minTeams?: SortOrder
    playersPerTeam?: SortOrder
    totalPlayers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    gameId?: SortOrder
    tournament_typeId?: SortOrder
  }

  export type TournamentAvgOrderByAggregateInput = {
    id?: SortOrder
    maxParticipants?: SortOrder
    minTeams?: SortOrder
    playersPerTeam?: SortOrder
    totalPlayers?: SortOrder
    gameId?: SortOrder
    tournament_typeId?: SortOrder
  }

  export type TournamentMaxOrderByAggregateInput = {
    id?: SortOrder
    tournamentName?: SortOrder
    startDate?: SortOrder
    startTime?: SortOrder
    format?: SortOrder
    rules?: SortOrder
    maxParticipants?: SortOrder
    rewards?: SortOrder
    minTeams?: SortOrder
    playersPerTeam?: SortOrder
    totalPlayers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    gameId?: SortOrder
    tournament_typeId?: SortOrder
  }

  export type TournamentMinOrderByAggregateInput = {
    id?: SortOrder
    tournamentName?: SortOrder
    startDate?: SortOrder
    startTime?: SortOrder
    format?: SortOrder
    rules?: SortOrder
    maxParticipants?: SortOrder
    rewards?: SortOrder
    minTeams?: SortOrder
    playersPerTeam?: SortOrder
    totalPlayers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    gameId?: SortOrder
    tournament_typeId?: SortOrder
  }

  export type TournamentSumOrderByAggregateInput = {
    id?: SortOrder
    maxParticipants?: SortOrder
    minTeams?: SortOrder
    playersPerTeam?: SortOrder
    totalPlayers?: SortOrder
    gameId?: SortOrder
    tournament_typeId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type TournamentTypeCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
  }

  export type TournamentTypeAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TournamentTypeMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
  }

  export type TournamentTypeMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
  }

  export type TournamentTypeSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type TournamentScalarRelationFilter = {
    is?: TournamentWhereInput
    isNot?: TournamentWhereInput
  }

  export type TournamentStatusCountOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
  }

  export type TournamentStatusAvgOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
  }

  export type TournamentStatusMaxOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
  }

  export type TournamentStatusMinOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    status?: SortOrder
    updatedAt?: SortOrder
  }

  export type TournamentStatusSumOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
  }

  export type TeamCountOrderByAggregateInput = {
    id?: SortOrder
    teamName?: SortOrder
    tournamentId?: SortOrder
    createdAt?: SortOrder
  }

  export type TeamAvgOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
  }

  export type TeamMaxOrderByAggregateInput = {
    id?: SortOrder
    teamName?: SortOrder
    tournamentId?: SortOrder
    createdAt?: SortOrder
  }

  export type TeamMinOrderByAggregateInput = {
    id?: SortOrder
    teamName?: SortOrder
    tournamentId?: SortOrder
    createdAt?: SortOrder
  }

  export type TeamSumOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type TeamScalarRelationFilter = {
    is?: TeamWhereInput
    isNot?: TeamWhereInput
  }

  export type TeamMemberUserIdTeamIdCompoundUniqueInput = {
    userId: number
    teamId: number
  }

  export type TeamMemberCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    role?: SortOrder
    joined_at?: SortOrder
  }

  export type TeamMemberAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
  }

  export type TeamMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    role?: SortOrder
    joined_at?: SortOrder
  }

  export type TeamMemberMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
    role?: SortOrder
    joined_at?: SortOrder
  }

  export type TeamMemberSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    teamId?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type MatchCountOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    team1Id?: SortOrder
    team2Id?: SortOrder
    team1Score?: SortOrder
    team2Score?: SortOrder
    winnerId?: SortOrder
    matchDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchAvgOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    team1Id?: SortOrder
    team2Id?: SortOrder
    team1Score?: SortOrder
    team2Score?: SortOrder
    winnerId?: SortOrder
  }

  export type MatchMaxOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    team1Id?: SortOrder
    team2Id?: SortOrder
    team1Score?: SortOrder
    team2Score?: SortOrder
    winnerId?: SortOrder
    matchDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchMinOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    team1Id?: SortOrder
    team2Id?: SortOrder
    team1Score?: SortOrder
    team2Score?: SortOrder
    winnerId?: SortOrder
    matchDate?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
  }

  export type MatchSumOrderByAggregateInput = {
    id?: SortOrder
    tournamentId?: SortOrder
    team1Id?: SortOrder
    team2Id?: SortOrder
    team1Score?: SortOrder
    team2Score?: SortOrder
    winnerId?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type TeamMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput> | TeamMemberCreateWithoutUserInput[] | TeamMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutUserInput | TeamMemberCreateOrConnectWithoutUserInput[]
    createMany?: TeamMemberCreateManyUserInputEnvelope
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
  }

  export type TeamMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput> | TeamMemberCreateWithoutUserInput[] | TeamMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutUserInput | TeamMemberCreateOrConnectWithoutUserInput[]
    createMany?: TeamMemberCreateManyUserInputEnvelope
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type TeamMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput> | TeamMemberCreateWithoutUserInput[] | TeamMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutUserInput | TeamMemberCreateOrConnectWithoutUserInput[]
    upsert?: TeamMemberUpsertWithWhereUniqueWithoutUserInput | TeamMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TeamMemberCreateManyUserInputEnvelope
    set?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    disconnect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    delete?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    update?: TeamMemberUpdateWithWhereUniqueWithoutUserInput | TeamMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TeamMemberUpdateManyWithWhereWithoutUserInput | TeamMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TeamMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput> | TeamMemberCreateWithoutUserInput[] | TeamMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutUserInput | TeamMemberCreateOrConnectWithoutUserInput[]
    upsert?: TeamMemberUpsertWithWhereUniqueWithoutUserInput | TeamMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TeamMemberCreateManyUserInputEnvelope
    set?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    disconnect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    delete?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    update?: TeamMemberUpdateWithWhereUniqueWithoutUserInput | TeamMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TeamMemberUpdateManyWithWhereWithoutUserInput | TeamMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
  }

  export type TournamentCreateNestedManyWithoutGameInput = {
    create?: XOR<TournamentCreateWithoutGameInput, TournamentUncheckedCreateWithoutGameInput> | TournamentCreateWithoutGameInput[] | TournamentUncheckedCreateWithoutGameInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutGameInput | TournamentCreateOrConnectWithoutGameInput[]
    createMany?: TournamentCreateManyGameInputEnvelope
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
  }

  export type TournamentUncheckedCreateNestedManyWithoutGameInput = {
    create?: XOR<TournamentCreateWithoutGameInput, TournamentUncheckedCreateWithoutGameInput> | TournamentCreateWithoutGameInput[] | TournamentUncheckedCreateWithoutGameInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutGameInput | TournamentCreateOrConnectWithoutGameInput[]
    createMany?: TournamentCreateManyGameInputEnvelope
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
  }

  export type TournamentUpdateManyWithoutGameNestedInput = {
    create?: XOR<TournamentCreateWithoutGameInput, TournamentUncheckedCreateWithoutGameInput> | TournamentCreateWithoutGameInput[] | TournamentUncheckedCreateWithoutGameInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutGameInput | TournamentCreateOrConnectWithoutGameInput[]
    upsert?: TournamentUpsertWithWhereUniqueWithoutGameInput | TournamentUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: TournamentCreateManyGameInputEnvelope
    set?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    disconnect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    delete?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    update?: TournamentUpdateWithWhereUniqueWithoutGameInput | TournamentUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: TournamentUpdateManyWithWhereWithoutGameInput | TournamentUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: TournamentScalarWhereInput | TournamentScalarWhereInput[]
  }

  export type TournamentUncheckedUpdateManyWithoutGameNestedInput = {
    create?: XOR<TournamentCreateWithoutGameInput, TournamentUncheckedCreateWithoutGameInput> | TournamentCreateWithoutGameInput[] | TournamentUncheckedCreateWithoutGameInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutGameInput | TournamentCreateOrConnectWithoutGameInput[]
    upsert?: TournamentUpsertWithWhereUniqueWithoutGameInput | TournamentUpsertWithWhereUniqueWithoutGameInput[]
    createMany?: TournamentCreateManyGameInputEnvelope
    set?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    disconnect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    delete?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    update?: TournamentUpdateWithWhereUniqueWithoutGameInput | TournamentUpdateWithWhereUniqueWithoutGameInput[]
    updateMany?: TournamentUpdateManyWithWhereWithoutGameInput | TournamentUpdateManyWithWhereWithoutGameInput[]
    deleteMany?: TournamentScalarWhereInput | TournamentScalarWhereInput[]
  }

  export type GameCreateNestedOneWithoutTournamentsInput = {
    create?: XOR<GameCreateWithoutTournamentsInput, GameUncheckedCreateWithoutTournamentsInput>
    connectOrCreate?: GameCreateOrConnectWithoutTournamentsInput
    connect?: GameWhereUniqueInput
  }

  export type TournamentTypeCreateNestedOneWithoutTournamentsInput = {
    create?: XOR<TournamentTypeCreateWithoutTournamentsInput, TournamentTypeUncheckedCreateWithoutTournamentsInput>
    connectOrCreate?: TournamentTypeCreateOrConnectWithoutTournamentsInput
    connect?: TournamentTypeWhereUniqueInput
  }

  export type TournamentStatusCreateNestedManyWithoutTournamentInput = {
    create?: XOR<TournamentStatusCreateWithoutTournamentInput, TournamentStatusUncheckedCreateWithoutTournamentInput> | TournamentStatusCreateWithoutTournamentInput[] | TournamentStatusUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentStatusCreateOrConnectWithoutTournamentInput | TournamentStatusCreateOrConnectWithoutTournamentInput[]
    createMany?: TournamentStatusCreateManyTournamentInputEnvelope
    connect?: TournamentStatusWhereUniqueInput | TournamentStatusWhereUniqueInput[]
  }

  export type TeamCreateNestedManyWithoutTournamentInput = {
    create?: XOR<TeamCreateWithoutTournamentInput, TeamUncheckedCreateWithoutTournamentInput> | TeamCreateWithoutTournamentInput[] | TeamUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutTournamentInput | TeamCreateOrConnectWithoutTournamentInput[]
    createMany?: TeamCreateManyTournamentInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type MatchCreateNestedManyWithoutTournamentInput = {
    create?: XOR<MatchCreateWithoutTournamentInput, MatchUncheckedCreateWithoutTournamentInput> | MatchCreateWithoutTournamentInput[] | MatchUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutTournamentInput | MatchCreateOrConnectWithoutTournamentInput[]
    createMany?: MatchCreateManyTournamentInputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type TournamentStatusUncheckedCreateNestedManyWithoutTournamentInput = {
    create?: XOR<TournamentStatusCreateWithoutTournamentInput, TournamentStatusUncheckedCreateWithoutTournamentInput> | TournamentStatusCreateWithoutTournamentInput[] | TournamentStatusUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentStatusCreateOrConnectWithoutTournamentInput | TournamentStatusCreateOrConnectWithoutTournamentInput[]
    createMany?: TournamentStatusCreateManyTournamentInputEnvelope
    connect?: TournamentStatusWhereUniqueInput | TournamentStatusWhereUniqueInput[]
  }

  export type TeamUncheckedCreateNestedManyWithoutTournamentInput = {
    create?: XOR<TeamCreateWithoutTournamentInput, TeamUncheckedCreateWithoutTournamentInput> | TeamCreateWithoutTournamentInput[] | TeamUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutTournamentInput | TeamCreateOrConnectWithoutTournamentInput[]
    createMany?: TeamCreateManyTournamentInputEnvelope
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
  }

  export type MatchUncheckedCreateNestedManyWithoutTournamentInput = {
    create?: XOR<MatchCreateWithoutTournamentInput, MatchUncheckedCreateWithoutTournamentInput> | MatchCreateWithoutTournamentInput[] | MatchUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutTournamentInput | MatchCreateOrConnectWithoutTournamentInput[]
    createMany?: MatchCreateManyTournamentInputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type GameUpdateOneRequiredWithoutTournamentsNestedInput = {
    create?: XOR<GameCreateWithoutTournamentsInput, GameUncheckedCreateWithoutTournamentsInput>
    connectOrCreate?: GameCreateOrConnectWithoutTournamentsInput
    upsert?: GameUpsertWithoutTournamentsInput
    connect?: GameWhereUniqueInput
    update?: XOR<XOR<GameUpdateToOneWithWhereWithoutTournamentsInput, GameUpdateWithoutTournamentsInput>, GameUncheckedUpdateWithoutTournamentsInput>
  }

  export type TournamentTypeUpdateOneRequiredWithoutTournamentsNestedInput = {
    create?: XOR<TournamentTypeCreateWithoutTournamentsInput, TournamentTypeUncheckedCreateWithoutTournamentsInput>
    connectOrCreate?: TournamentTypeCreateOrConnectWithoutTournamentsInput
    upsert?: TournamentTypeUpsertWithoutTournamentsInput
    connect?: TournamentTypeWhereUniqueInput
    update?: XOR<XOR<TournamentTypeUpdateToOneWithWhereWithoutTournamentsInput, TournamentTypeUpdateWithoutTournamentsInput>, TournamentTypeUncheckedUpdateWithoutTournamentsInput>
  }

  export type TournamentStatusUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<TournamentStatusCreateWithoutTournamentInput, TournamentStatusUncheckedCreateWithoutTournamentInput> | TournamentStatusCreateWithoutTournamentInput[] | TournamentStatusUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentStatusCreateOrConnectWithoutTournamentInput | TournamentStatusCreateOrConnectWithoutTournamentInput[]
    upsert?: TournamentStatusUpsertWithWhereUniqueWithoutTournamentInput | TournamentStatusUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: TournamentStatusCreateManyTournamentInputEnvelope
    set?: TournamentStatusWhereUniqueInput | TournamentStatusWhereUniqueInput[]
    disconnect?: TournamentStatusWhereUniqueInput | TournamentStatusWhereUniqueInput[]
    delete?: TournamentStatusWhereUniqueInput | TournamentStatusWhereUniqueInput[]
    connect?: TournamentStatusWhereUniqueInput | TournamentStatusWhereUniqueInput[]
    update?: TournamentStatusUpdateWithWhereUniqueWithoutTournamentInput | TournamentStatusUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: TournamentStatusUpdateManyWithWhereWithoutTournamentInput | TournamentStatusUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: TournamentStatusScalarWhereInput | TournamentStatusScalarWhereInput[]
  }

  export type TeamUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<TeamCreateWithoutTournamentInput, TeamUncheckedCreateWithoutTournamentInput> | TeamCreateWithoutTournamentInput[] | TeamUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutTournamentInput | TeamCreateOrConnectWithoutTournamentInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutTournamentInput | TeamUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: TeamCreateManyTournamentInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutTournamentInput | TeamUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutTournamentInput | TeamUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type MatchUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<MatchCreateWithoutTournamentInput, MatchUncheckedCreateWithoutTournamentInput> | MatchCreateWithoutTournamentInput[] | MatchUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutTournamentInput | MatchCreateOrConnectWithoutTournamentInput[]
    upsert?: MatchUpsertWithWhereUniqueWithoutTournamentInput | MatchUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: MatchCreateManyTournamentInputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutTournamentInput | MatchUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: MatchUpdateManyWithWhereWithoutTournamentInput | MatchUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type TournamentStatusUncheckedUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<TournamentStatusCreateWithoutTournamentInput, TournamentStatusUncheckedCreateWithoutTournamentInput> | TournamentStatusCreateWithoutTournamentInput[] | TournamentStatusUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TournamentStatusCreateOrConnectWithoutTournamentInput | TournamentStatusCreateOrConnectWithoutTournamentInput[]
    upsert?: TournamentStatusUpsertWithWhereUniqueWithoutTournamentInput | TournamentStatusUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: TournamentStatusCreateManyTournamentInputEnvelope
    set?: TournamentStatusWhereUniqueInput | TournamentStatusWhereUniqueInput[]
    disconnect?: TournamentStatusWhereUniqueInput | TournamentStatusWhereUniqueInput[]
    delete?: TournamentStatusWhereUniqueInput | TournamentStatusWhereUniqueInput[]
    connect?: TournamentStatusWhereUniqueInput | TournamentStatusWhereUniqueInput[]
    update?: TournamentStatusUpdateWithWhereUniqueWithoutTournamentInput | TournamentStatusUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: TournamentStatusUpdateManyWithWhereWithoutTournamentInput | TournamentStatusUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: TournamentStatusScalarWhereInput | TournamentStatusScalarWhereInput[]
  }

  export type TeamUncheckedUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<TeamCreateWithoutTournamentInput, TeamUncheckedCreateWithoutTournamentInput> | TeamCreateWithoutTournamentInput[] | TeamUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: TeamCreateOrConnectWithoutTournamentInput | TeamCreateOrConnectWithoutTournamentInput[]
    upsert?: TeamUpsertWithWhereUniqueWithoutTournamentInput | TeamUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: TeamCreateManyTournamentInputEnvelope
    set?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    disconnect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    delete?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    connect?: TeamWhereUniqueInput | TeamWhereUniqueInput[]
    update?: TeamUpdateWithWhereUniqueWithoutTournamentInput | TeamUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: TeamUpdateManyWithWhereWithoutTournamentInput | TeamUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: TeamScalarWhereInput | TeamScalarWhereInput[]
  }

  export type MatchUncheckedUpdateManyWithoutTournamentNestedInput = {
    create?: XOR<MatchCreateWithoutTournamentInput, MatchUncheckedCreateWithoutTournamentInput> | MatchCreateWithoutTournamentInput[] | MatchUncheckedCreateWithoutTournamentInput[]
    connectOrCreate?: MatchCreateOrConnectWithoutTournamentInput | MatchCreateOrConnectWithoutTournamentInput[]
    upsert?: MatchUpsertWithWhereUniqueWithoutTournamentInput | MatchUpsertWithWhereUniqueWithoutTournamentInput[]
    createMany?: MatchCreateManyTournamentInputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutTournamentInput | MatchUpdateWithWhereUniqueWithoutTournamentInput[]
    updateMany?: MatchUpdateManyWithWhereWithoutTournamentInput | MatchUpdateManyWithWhereWithoutTournamentInput[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type TournamentCreateNestedManyWithoutTournamentTypeInput = {
    create?: XOR<TournamentCreateWithoutTournamentTypeInput, TournamentUncheckedCreateWithoutTournamentTypeInput> | TournamentCreateWithoutTournamentTypeInput[] | TournamentUncheckedCreateWithoutTournamentTypeInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutTournamentTypeInput | TournamentCreateOrConnectWithoutTournamentTypeInput[]
    createMany?: TournamentCreateManyTournamentTypeInputEnvelope
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
  }

  export type TournamentUncheckedCreateNestedManyWithoutTournamentTypeInput = {
    create?: XOR<TournamentCreateWithoutTournamentTypeInput, TournamentUncheckedCreateWithoutTournamentTypeInput> | TournamentCreateWithoutTournamentTypeInput[] | TournamentUncheckedCreateWithoutTournamentTypeInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutTournamentTypeInput | TournamentCreateOrConnectWithoutTournamentTypeInput[]
    createMany?: TournamentCreateManyTournamentTypeInputEnvelope
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
  }

  export type TournamentUpdateManyWithoutTournamentTypeNestedInput = {
    create?: XOR<TournamentCreateWithoutTournamentTypeInput, TournamentUncheckedCreateWithoutTournamentTypeInput> | TournamentCreateWithoutTournamentTypeInput[] | TournamentUncheckedCreateWithoutTournamentTypeInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutTournamentTypeInput | TournamentCreateOrConnectWithoutTournamentTypeInput[]
    upsert?: TournamentUpsertWithWhereUniqueWithoutTournamentTypeInput | TournamentUpsertWithWhereUniqueWithoutTournamentTypeInput[]
    createMany?: TournamentCreateManyTournamentTypeInputEnvelope
    set?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    disconnect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    delete?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    update?: TournamentUpdateWithWhereUniqueWithoutTournamentTypeInput | TournamentUpdateWithWhereUniqueWithoutTournamentTypeInput[]
    updateMany?: TournamentUpdateManyWithWhereWithoutTournamentTypeInput | TournamentUpdateManyWithWhereWithoutTournamentTypeInput[]
    deleteMany?: TournamentScalarWhereInput | TournamentScalarWhereInput[]
  }

  export type TournamentUncheckedUpdateManyWithoutTournamentTypeNestedInput = {
    create?: XOR<TournamentCreateWithoutTournamentTypeInput, TournamentUncheckedCreateWithoutTournamentTypeInput> | TournamentCreateWithoutTournamentTypeInput[] | TournamentUncheckedCreateWithoutTournamentTypeInput[]
    connectOrCreate?: TournamentCreateOrConnectWithoutTournamentTypeInput | TournamentCreateOrConnectWithoutTournamentTypeInput[]
    upsert?: TournamentUpsertWithWhereUniqueWithoutTournamentTypeInput | TournamentUpsertWithWhereUniqueWithoutTournamentTypeInput[]
    createMany?: TournamentCreateManyTournamentTypeInputEnvelope
    set?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    disconnect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    delete?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    connect?: TournamentWhereUniqueInput | TournamentWhereUniqueInput[]
    update?: TournamentUpdateWithWhereUniqueWithoutTournamentTypeInput | TournamentUpdateWithWhereUniqueWithoutTournamentTypeInput[]
    updateMany?: TournamentUpdateManyWithWhereWithoutTournamentTypeInput | TournamentUpdateManyWithWhereWithoutTournamentTypeInput[]
    deleteMany?: TournamentScalarWhereInput | TournamentScalarWhereInput[]
  }

  export type TournamentCreateNestedOneWithoutStatusInput = {
    create?: XOR<TournamentCreateWithoutStatusInput, TournamentUncheckedCreateWithoutStatusInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutStatusInput
    connect?: TournamentWhereUniqueInput
  }

  export type TournamentUpdateOneRequiredWithoutStatusNestedInput = {
    create?: XOR<TournamentCreateWithoutStatusInput, TournamentUncheckedCreateWithoutStatusInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutStatusInput
    upsert?: TournamentUpsertWithoutStatusInput
    connect?: TournamentWhereUniqueInput
    update?: XOR<XOR<TournamentUpdateToOneWithWhereWithoutStatusInput, TournamentUpdateWithoutStatusInput>, TournamentUncheckedUpdateWithoutStatusInput>
  }

  export type TournamentCreateNestedOneWithoutTeamsInput = {
    create?: XOR<TournamentCreateWithoutTeamsInput, TournamentUncheckedCreateWithoutTeamsInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutTeamsInput
    connect?: TournamentWhereUniqueInput
  }

  export type TeamMemberCreateNestedManyWithoutTeamInput = {
    create?: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput> | TeamMemberCreateWithoutTeamInput[] | TeamMemberUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutTeamInput | TeamMemberCreateOrConnectWithoutTeamInput[]
    createMany?: TeamMemberCreateManyTeamInputEnvelope
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
  }

  export type MatchCreateNestedManyWithoutTeam1Input = {
    create?: XOR<MatchCreateWithoutTeam1Input, MatchUncheckedCreateWithoutTeam1Input> | MatchCreateWithoutTeam1Input[] | MatchUncheckedCreateWithoutTeam1Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutTeam1Input | MatchCreateOrConnectWithoutTeam1Input[]
    createMany?: MatchCreateManyTeam1InputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type MatchCreateNestedManyWithoutTeam2Input = {
    create?: XOR<MatchCreateWithoutTeam2Input, MatchUncheckedCreateWithoutTeam2Input> | MatchCreateWithoutTeam2Input[] | MatchUncheckedCreateWithoutTeam2Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutTeam2Input | MatchCreateOrConnectWithoutTeam2Input[]
    createMany?: MatchCreateManyTeam2InputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type TeamMemberUncheckedCreateNestedManyWithoutTeamInput = {
    create?: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput> | TeamMemberCreateWithoutTeamInput[] | TeamMemberUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutTeamInput | TeamMemberCreateOrConnectWithoutTeamInput[]
    createMany?: TeamMemberCreateManyTeamInputEnvelope
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
  }

  export type MatchUncheckedCreateNestedManyWithoutTeam1Input = {
    create?: XOR<MatchCreateWithoutTeam1Input, MatchUncheckedCreateWithoutTeam1Input> | MatchCreateWithoutTeam1Input[] | MatchUncheckedCreateWithoutTeam1Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutTeam1Input | MatchCreateOrConnectWithoutTeam1Input[]
    createMany?: MatchCreateManyTeam1InputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type MatchUncheckedCreateNestedManyWithoutTeam2Input = {
    create?: XOR<MatchCreateWithoutTeam2Input, MatchUncheckedCreateWithoutTeam2Input> | MatchCreateWithoutTeam2Input[] | MatchUncheckedCreateWithoutTeam2Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutTeam2Input | MatchCreateOrConnectWithoutTeam2Input[]
    createMany?: MatchCreateManyTeam2InputEnvelope
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
  }

  export type TournamentUpdateOneRequiredWithoutTeamsNestedInput = {
    create?: XOR<TournamentCreateWithoutTeamsInput, TournamentUncheckedCreateWithoutTeamsInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutTeamsInput
    upsert?: TournamentUpsertWithoutTeamsInput
    connect?: TournamentWhereUniqueInput
    update?: XOR<XOR<TournamentUpdateToOneWithWhereWithoutTeamsInput, TournamentUpdateWithoutTeamsInput>, TournamentUncheckedUpdateWithoutTeamsInput>
  }

  export type TeamMemberUpdateManyWithoutTeamNestedInput = {
    create?: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput> | TeamMemberCreateWithoutTeamInput[] | TeamMemberUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutTeamInput | TeamMemberCreateOrConnectWithoutTeamInput[]
    upsert?: TeamMemberUpsertWithWhereUniqueWithoutTeamInput | TeamMemberUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: TeamMemberCreateManyTeamInputEnvelope
    set?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    disconnect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    delete?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    update?: TeamMemberUpdateWithWhereUniqueWithoutTeamInput | TeamMemberUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: TeamMemberUpdateManyWithWhereWithoutTeamInput | TeamMemberUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
  }

  export type MatchUpdateManyWithoutTeam1NestedInput = {
    create?: XOR<MatchCreateWithoutTeam1Input, MatchUncheckedCreateWithoutTeam1Input> | MatchCreateWithoutTeam1Input[] | MatchUncheckedCreateWithoutTeam1Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutTeam1Input | MatchCreateOrConnectWithoutTeam1Input[]
    upsert?: MatchUpsertWithWhereUniqueWithoutTeam1Input | MatchUpsertWithWhereUniqueWithoutTeam1Input[]
    createMany?: MatchCreateManyTeam1InputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutTeam1Input | MatchUpdateWithWhereUniqueWithoutTeam1Input[]
    updateMany?: MatchUpdateManyWithWhereWithoutTeam1Input | MatchUpdateManyWithWhereWithoutTeam1Input[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type MatchUpdateManyWithoutTeam2NestedInput = {
    create?: XOR<MatchCreateWithoutTeam2Input, MatchUncheckedCreateWithoutTeam2Input> | MatchCreateWithoutTeam2Input[] | MatchUncheckedCreateWithoutTeam2Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutTeam2Input | MatchCreateOrConnectWithoutTeam2Input[]
    upsert?: MatchUpsertWithWhereUniqueWithoutTeam2Input | MatchUpsertWithWhereUniqueWithoutTeam2Input[]
    createMany?: MatchCreateManyTeam2InputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutTeam2Input | MatchUpdateWithWhereUniqueWithoutTeam2Input[]
    updateMany?: MatchUpdateManyWithWhereWithoutTeam2Input | MatchUpdateManyWithWhereWithoutTeam2Input[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type TeamMemberUncheckedUpdateManyWithoutTeamNestedInput = {
    create?: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput> | TeamMemberCreateWithoutTeamInput[] | TeamMemberUncheckedCreateWithoutTeamInput[]
    connectOrCreate?: TeamMemberCreateOrConnectWithoutTeamInput | TeamMemberCreateOrConnectWithoutTeamInput[]
    upsert?: TeamMemberUpsertWithWhereUniqueWithoutTeamInput | TeamMemberUpsertWithWhereUniqueWithoutTeamInput[]
    createMany?: TeamMemberCreateManyTeamInputEnvelope
    set?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    disconnect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    delete?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    connect?: TeamMemberWhereUniqueInput | TeamMemberWhereUniqueInput[]
    update?: TeamMemberUpdateWithWhereUniqueWithoutTeamInput | TeamMemberUpdateWithWhereUniqueWithoutTeamInput[]
    updateMany?: TeamMemberUpdateManyWithWhereWithoutTeamInput | TeamMemberUpdateManyWithWhereWithoutTeamInput[]
    deleteMany?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
  }

  export type MatchUncheckedUpdateManyWithoutTeam1NestedInput = {
    create?: XOR<MatchCreateWithoutTeam1Input, MatchUncheckedCreateWithoutTeam1Input> | MatchCreateWithoutTeam1Input[] | MatchUncheckedCreateWithoutTeam1Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutTeam1Input | MatchCreateOrConnectWithoutTeam1Input[]
    upsert?: MatchUpsertWithWhereUniqueWithoutTeam1Input | MatchUpsertWithWhereUniqueWithoutTeam1Input[]
    createMany?: MatchCreateManyTeam1InputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutTeam1Input | MatchUpdateWithWhereUniqueWithoutTeam1Input[]
    updateMany?: MatchUpdateManyWithWhereWithoutTeam1Input | MatchUpdateManyWithWhereWithoutTeam1Input[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type MatchUncheckedUpdateManyWithoutTeam2NestedInput = {
    create?: XOR<MatchCreateWithoutTeam2Input, MatchUncheckedCreateWithoutTeam2Input> | MatchCreateWithoutTeam2Input[] | MatchUncheckedCreateWithoutTeam2Input[]
    connectOrCreate?: MatchCreateOrConnectWithoutTeam2Input | MatchCreateOrConnectWithoutTeam2Input[]
    upsert?: MatchUpsertWithWhereUniqueWithoutTeam2Input | MatchUpsertWithWhereUniqueWithoutTeam2Input[]
    createMany?: MatchCreateManyTeam2InputEnvelope
    set?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    disconnect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    delete?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    connect?: MatchWhereUniqueInput | MatchWhereUniqueInput[]
    update?: MatchUpdateWithWhereUniqueWithoutTeam2Input | MatchUpdateWithWhereUniqueWithoutTeam2Input[]
    updateMany?: MatchUpdateManyWithWhereWithoutTeam2Input | MatchUpdateManyWithWhereWithoutTeam2Input[]
    deleteMany?: MatchScalarWhereInput | MatchScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTeamMembersInput = {
    create?: XOR<UserCreateWithoutTeamMembersInput, UserUncheckedCreateWithoutTeamMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeamMembersInput
    connect?: UserWhereUniqueInput
  }

  export type TeamCreateNestedOneWithoutMembersInput = {
    create?: XOR<TeamCreateWithoutMembersInput, TeamUncheckedCreateWithoutMembersInput>
    connectOrCreate?: TeamCreateOrConnectWithoutMembersInput
    connect?: TeamWhereUniqueInput
  }

  export type UserUpdateOneRequiredWithoutTeamMembersNestedInput = {
    create?: XOR<UserCreateWithoutTeamMembersInput, UserUncheckedCreateWithoutTeamMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutTeamMembersInput
    upsert?: UserUpsertWithoutTeamMembersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTeamMembersInput, UserUpdateWithoutTeamMembersInput>, UserUncheckedUpdateWithoutTeamMembersInput>
  }

  export type TeamUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<TeamCreateWithoutMembersInput, TeamUncheckedCreateWithoutMembersInput>
    connectOrCreate?: TeamCreateOrConnectWithoutMembersInput
    upsert?: TeamUpsertWithoutMembersInput
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutMembersInput, TeamUpdateWithoutMembersInput>, TeamUncheckedUpdateWithoutMembersInput>
  }

  export type TournamentCreateNestedOneWithoutMatchesInput = {
    create?: XOR<TournamentCreateWithoutMatchesInput, TournamentUncheckedCreateWithoutMatchesInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutMatchesInput
    connect?: TournamentWhereUniqueInput
  }

  export type TeamCreateNestedOneWithoutMatchesAsTeam1Input = {
    create?: XOR<TeamCreateWithoutMatchesAsTeam1Input, TeamUncheckedCreateWithoutMatchesAsTeam1Input>
    connectOrCreate?: TeamCreateOrConnectWithoutMatchesAsTeam1Input
    connect?: TeamWhereUniqueInput
  }

  export type TeamCreateNestedOneWithoutMatchesAsTeam2Input = {
    create?: XOR<TeamCreateWithoutMatchesAsTeam2Input, TeamUncheckedCreateWithoutMatchesAsTeam2Input>
    connectOrCreate?: TeamCreateOrConnectWithoutMatchesAsTeam2Input
    connect?: TeamWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type TournamentUpdateOneRequiredWithoutMatchesNestedInput = {
    create?: XOR<TournamentCreateWithoutMatchesInput, TournamentUncheckedCreateWithoutMatchesInput>
    connectOrCreate?: TournamentCreateOrConnectWithoutMatchesInput
    upsert?: TournamentUpsertWithoutMatchesInput
    connect?: TournamentWhereUniqueInput
    update?: XOR<XOR<TournamentUpdateToOneWithWhereWithoutMatchesInput, TournamentUpdateWithoutMatchesInput>, TournamentUncheckedUpdateWithoutMatchesInput>
  }

  export type TeamUpdateOneRequiredWithoutMatchesAsTeam1NestedInput = {
    create?: XOR<TeamCreateWithoutMatchesAsTeam1Input, TeamUncheckedCreateWithoutMatchesAsTeam1Input>
    connectOrCreate?: TeamCreateOrConnectWithoutMatchesAsTeam1Input
    upsert?: TeamUpsertWithoutMatchesAsTeam1Input
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutMatchesAsTeam1Input, TeamUpdateWithoutMatchesAsTeam1Input>, TeamUncheckedUpdateWithoutMatchesAsTeam1Input>
  }

  export type TeamUpdateOneRequiredWithoutMatchesAsTeam2NestedInput = {
    create?: XOR<TeamCreateWithoutMatchesAsTeam2Input, TeamUncheckedCreateWithoutMatchesAsTeam2Input>
    connectOrCreate?: TeamCreateOrConnectWithoutMatchesAsTeam2Input
    upsert?: TeamUpsertWithoutMatchesAsTeam2Input
    connect?: TeamWhereUniqueInput
    update?: XOR<XOR<TeamUpdateToOneWithWhereWithoutMatchesAsTeam2Input, TeamUpdateWithoutMatchesAsTeam2Input>, TeamUncheckedUpdateWithoutMatchesAsTeam2Input>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type TeamMemberCreateWithoutUserInput = {
    role: string
    joined_at?: Date | string
    team: TeamCreateNestedOneWithoutMembersInput
  }

  export type TeamMemberUncheckedCreateWithoutUserInput = {
    id?: number
    teamId: number
    role: string
    joined_at?: Date | string
  }

  export type TeamMemberCreateOrConnectWithoutUserInput = {
    where: TeamMemberWhereUniqueInput
    create: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput>
  }

  export type TeamMemberCreateManyUserInputEnvelope = {
    data: TeamMemberCreateManyUserInput | TeamMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TeamMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: TeamMemberWhereUniqueInput
    update: XOR<TeamMemberUpdateWithoutUserInput, TeamMemberUncheckedUpdateWithoutUserInput>
    create: XOR<TeamMemberCreateWithoutUserInput, TeamMemberUncheckedCreateWithoutUserInput>
  }

  export type TeamMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: TeamMemberWhereUniqueInput
    data: XOR<TeamMemberUpdateWithoutUserInput, TeamMemberUncheckedUpdateWithoutUserInput>
  }

  export type TeamMemberUpdateManyWithWhereWithoutUserInput = {
    where: TeamMemberScalarWhereInput
    data: XOR<TeamMemberUpdateManyMutationInput, TeamMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type TeamMemberScalarWhereInput = {
    AND?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
    OR?: TeamMemberScalarWhereInput[]
    NOT?: TeamMemberScalarWhereInput | TeamMemberScalarWhereInput[]
    id?: IntFilter<"TeamMember"> | number
    userId?: IntFilter<"TeamMember"> | number
    teamId?: IntFilter<"TeamMember"> | number
    role?: StringFilter<"TeamMember"> | string
    joined_at?: DateTimeFilter<"TeamMember"> | Date | string
  }

  export type TournamentCreateWithoutGameInput = {
    tournamentName: string
    startDate: Date | string
    startTime: string
    format: string
    rules: string
    maxParticipants: number
    rewards?: string | null
    minTeams: number
    playersPerTeam: number
    totalPlayers: number
    createdAt?: Date | string
    updatedAt: Date | string
    tournamentType: TournamentTypeCreateNestedOneWithoutTournamentsInput
    status?: TournamentStatusCreateNestedManyWithoutTournamentInput
    teams?: TeamCreateNestedManyWithoutTournamentInput
    matches?: MatchCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateWithoutGameInput = {
    id?: number
    tournamentName: string
    startDate: Date | string
    startTime: string
    format: string
    rules: string
    maxParticipants: number
    rewards?: string | null
    minTeams: number
    playersPerTeam: number
    totalPlayers: number
    createdAt?: Date | string
    updatedAt: Date | string
    tournament_typeId: number
    status?: TournamentStatusUncheckedCreateNestedManyWithoutTournamentInput
    teams?: TeamUncheckedCreateNestedManyWithoutTournamentInput
    matches?: MatchUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentCreateOrConnectWithoutGameInput = {
    where: TournamentWhereUniqueInput
    create: XOR<TournamentCreateWithoutGameInput, TournamentUncheckedCreateWithoutGameInput>
  }

  export type TournamentCreateManyGameInputEnvelope = {
    data: TournamentCreateManyGameInput | TournamentCreateManyGameInput[]
    skipDuplicates?: boolean
  }

  export type TournamentUpsertWithWhereUniqueWithoutGameInput = {
    where: TournamentWhereUniqueInput
    update: XOR<TournamentUpdateWithoutGameInput, TournamentUncheckedUpdateWithoutGameInput>
    create: XOR<TournamentCreateWithoutGameInput, TournamentUncheckedCreateWithoutGameInput>
  }

  export type TournamentUpdateWithWhereUniqueWithoutGameInput = {
    where: TournamentWhereUniqueInput
    data: XOR<TournamentUpdateWithoutGameInput, TournamentUncheckedUpdateWithoutGameInput>
  }

  export type TournamentUpdateManyWithWhereWithoutGameInput = {
    where: TournamentScalarWhereInput
    data: XOR<TournamentUpdateManyMutationInput, TournamentUncheckedUpdateManyWithoutGameInput>
  }

  export type TournamentScalarWhereInput = {
    AND?: TournamentScalarWhereInput | TournamentScalarWhereInput[]
    OR?: TournamentScalarWhereInput[]
    NOT?: TournamentScalarWhereInput | TournamentScalarWhereInput[]
    id?: IntFilter<"Tournament"> | number
    tournamentName?: StringFilter<"Tournament"> | string
    startDate?: DateTimeFilter<"Tournament"> | Date | string
    startTime?: StringFilter<"Tournament"> | string
    format?: StringFilter<"Tournament"> | string
    rules?: StringFilter<"Tournament"> | string
    maxParticipants?: IntFilter<"Tournament"> | number
    rewards?: StringNullableFilter<"Tournament"> | string | null
    minTeams?: IntFilter<"Tournament"> | number
    playersPerTeam?: IntFilter<"Tournament"> | number
    totalPlayers?: IntFilter<"Tournament"> | number
    createdAt?: DateTimeFilter<"Tournament"> | Date | string
    updatedAt?: DateTimeFilter<"Tournament"> | Date | string
    gameId?: IntFilter<"Tournament"> | number
    tournament_typeId?: IntFilter<"Tournament"> | number
  }

  export type GameCreateWithoutTournamentsInput = {
    name: string
  }

  export type GameUncheckedCreateWithoutTournamentsInput = {
    id?: number
    name: string
  }

  export type GameCreateOrConnectWithoutTournamentsInput = {
    where: GameWhereUniqueInput
    create: XOR<GameCreateWithoutTournamentsInput, GameUncheckedCreateWithoutTournamentsInput>
  }

  export type TournamentTypeCreateWithoutTournamentsInput = {
    type: string
  }

  export type TournamentTypeUncheckedCreateWithoutTournamentsInput = {
    id?: number
    type: string
  }

  export type TournamentTypeCreateOrConnectWithoutTournamentsInput = {
    where: TournamentTypeWhereUniqueInput
    create: XOR<TournamentTypeCreateWithoutTournamentsInput, TournamentTypeUncheckedCreateWithoutTournamentsInput>
  }

  export type TournamentStatusCreateWithoutTournamentInput = {
    status: string
    updatedAt: Date | string
  }

  export type TournamentStatusUncheckedCreateWithoutTournamentInput = {
    id?: number
    status: string
    updatedAt: Date | string
  }

  export type TournamentStatusCreateOrConnectWithoutTournamentInput = {
    where: TournamentStatusWhereUniqueInput
    create: XOR<TournamentStatusCreateWithoutTournamentInput, TournamentStatusUncheckedCreateWithoutTournamentInput>
  }

  export type TournamentStatusCreateManyTournamentInputEnvelope = {
    data: TournamentStatusCreateManyTournamentInput | TournamentStatusCreateManyTournamentInput[]
    skipDuplicates?: boolean
  }

  export type TeamCreateWithoutTournamentInput = {
    teamName: string
    createdAt?: Date | string
    members?: TeamMemberCreateNestedManyWithoutTeamInput
    matchesAsTeam1?: MatchCreateNestedManyWithoutTeam1Input
    matchesAsTeam2?: MatchCreateNestedManyWithoutTeam2Input
  }

  export type TeamUncheckedCreateWithoutTournamentInput = {
    id?: number
    teamName: string
    createdAt?: Date | string
    members?: TeamMemberUncheckedCreateNestedManyWithoutTeamInput
    matchesAsTeam1?: MatchUncheckedCreateNestedManyWithoutTeam1Input
    matchesAsTeam2?: MatchUncheckedCreateNestedManyWithoutTeam2Input
  }

  export type TeamCreateOrConnectWithoutTournamentInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutTournamentInput, TeamUncheckedCreateWithoutTournamentInput>
  }

  export type TeamCreateManyTournamentInputEnvelope = {
    data: TeamCreateManyTournamentInput | TeamCreateManyTournamentInput[]
    skipDuplicates?: boolean
  }

  export type MatchCreateWithoutTournamentInput = {
    team1Score?: number | null
    team2Score?: number | null
    winnerId?: number | null
    matchDate: Date | string
    status: string
    createdAt?: Date | string
    team1: TeamCreateNestedOneWithoutMatchesAsTeam1Input
    team2: TeamCreateNestedOneWithoutMatchesAsTeam2Input
  }

  export type MatchUncheckedCreateWithoutTournamentInput = {
    id?: number
    team1Id: number
    team2Id: number
    team1Score?: number | null
    team2Score?: number | null
    winnerId?: number | null
    matchDate: Date | string
    status: string
    createdAt?: Date | string
  }

  export type MatchCreateOrConnectWithoutTournamentInput = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutTournamentInput, MatchUncheckedCreateWithoutTournamentInput>
  }

  export type MatchCreateManyTournamentInputEnvelope = {
    data: MatchCreateManyTournamentInput | MatchCreateManyTournamentInput[]
    skipDuplicates?: boolean
  }

  export type GameUpsertWithoutTournamentsInput = {
    update: XOR<GameUpdateWithoutTournamentsInput, GameUncheckedUpdateWithoutTournamentsInput>
    create: XOR<GameCreateWithoutTournamentsInput, GameUncheckedCreateWithoutTournamentsInput>
    where?: GameWhereInput
  }

  export type GameUpdateToOneWithWhereWithoutTournamentsInput = {
    where?: GameWhereInput
    data: XOR<GameUpdateWithoutTournamentsInput, GameUncheckedUpdateWithoutTournamentsInput>
  }

  export type GameUpdateWithoutTournamentsInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type GameUncheckedUpdateWithoutTournamentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TournamentTypeUpsertWithoutTournamentsInput = {
    update: XOR<TournamentTypeUpdateWithoutTournamentsInput, TournamentTypeUncheckedUpdateWithoutTournamentsInput>
    create: XOR<TournamentTypeCreateWithoutTournamentsInput, TournamentTypeUncheckedCreateWithoutTournamentsInput>
    where?: TournamentTypeWhereInput
  }

  export type TournamentTypeUpdateToOneWithWhereWithoutTournamentsInput = {
    where?: TournamentTypeWhereInput
    data: XOR<TournamentTypeUpdateWithoutTournamentsInput, TournamentTypeUncheckedUpdateWithoutTournamentsInput>
  }

  export type TournamentTypeUpdateWithoutTournamentsInput = {
    type?: StringFieldUpdateOperationsInput | string
  }

  export type TournamentTypeUncheckedUpdateWithoutTournamentsInput = {
    id?: IntFieldUpdateOperationsInput | number
    type?: StringFieldUpdateOperationsInput | string
  }

  export type TournamentStatusUpsertWithWhereUniqueWithoutTournamentInput = {
    where: TournamentStatusWhereUniqueInput
    update: XOR<TournamentStatusUpdateWithoutTournamentInput, TournamentStatusUncheckedUpdateWithoutTournamentInput>
    create: XOR<TournamentStatusCreateWithoutTournamentInput, TournamentStatusUncheckedCreateWithoutTournamentInput>
  }

  export type TournamentStatusUpdateWithWhereUniqueWithoutTournamentInput = {
    where: TournamentStatusWhereUniqueInput
    data: XOR<TournamentStatusUpdateWithoutTournamentInput, TournamentStatusUncheckedUpdateWithoutTournamentInput>
  }

  export type TournamentStatusUpdateManyWithWhereWithoutTournamentInput = {
    where: TournamentStatusScalarWhereInput
    data: XOR<TournamentStatusUpdateManyMutationInput, TournamentStatusUncheckedUpdateManyWithoutTournamentInput>
  }

  export type TournamentStatusScalarWhereInput = {
    AND?: TournamentStatusScalarWhereInput | TournamentStatusScalarWhereInput[]
    OR?: TournamentStatusScalarWhereInput[]
    NOT?: TournamentStatusScalarWhereInput | TournamentStatusScalarWhereInput[]
    id?: IntFilter<"TournamentStatus"> | number
    tournamentId?: IntFilter<"TournamentStatus"> | number
    status?: StringFilter<"TournamentStatus"> | string
    updatedAt?: DateTimeFilter<"TournamentStatus"> | Date | string
  }

  export type TeamUpsertWithWhereUniqueWithoutTournamentInput = {
    where: TeamWhereUniqueInput
    update: XOR<TeamUpdateWithoutTournamentInput, TeamUncheckedUpdateWithoutTournamentInput>
    create: XOR<TeamCreateWithoutTournamentInput, TeamUncheckedCreateWithoutTournamentInput>
  }

  export type TeamUpdateWithWhereUniqueWithoutTournamentInput = {
    where: TeamWhereUniqueInput
    data: XOR<TeamUpdateWithoutTournamentInput, TeamUncheckedUpdateWithoutTournamentInput>
  }

  export type TeamUpdateManyWithWhereWithoutTournamentInput = {
    where: TeamScalarWhereInput
    data: XOR<TeamUpdateManyMutationInput, TeamUncheckedUpdateManyWithoutTournamentInput>
  }

  export type TeamScalarWhereInput = {
    AND?: TeamScalarWhereInput | TeamScalarWhereInput[]
    OR?: TeamScalarWhereInput[]
    NOT?: TeamScalarWhereInput | TeamScalarWhereInput[]
    id?: IntFilter<"Team"> | number
    teamName?: StringFilter<"Team"> | string
    tournamentId?: IntFilter<"Team"> | number
    createdAt?: DateTimeFilter<"Team"> | Date | string
  }

  export type MatchUpsertWithWhereUniqueWithoutTournamentInput = {
    where: MatchWhereUniqueInput
    update: XOR<MatchUpdateWithoutTournamentInput, MatchUncheckedUpdateWithoutTournamentInput>
    create: XOR<MatchCreateWithoutTournamentInput, MatchUncheckedCreateWithoutTournamentInput>
  }

  export type MatchUpdateWithWhereUniqueWithoutTournamentInput = {
    where: MatchWhereUniqueInput
    data: XOR<MatchUpdateWithoutTournamentInput, MatchUncheckedUpdateWithoutTournamentInput>
  }

  export type MatchUpdateManyWithWhereWithoutTournamentInput = {
    where: MatchScalarWhereInput
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyWithoutTournamentInput>
  }

  export type MatchScalarWhereInput = {
    AND?: MatchScalarWhereInput | MatchScalarWhereInput[]
    OR?: MatchScalarWhereInput[]
    NOT?: MatchScalarWhereInput | MatchScalarWhereInput[]
    id?: IntFilter<"Match"> | number
    tournamentId?: IntFilter<"Match"> | number
    team1Id?: IntFilter<"Match"> | number
    team2Id?: IntFilter<"Match"> | number
    team1Score?: IntNullableFilter<"Match"> | number | null
    team2Score?: IntNullableFilter<"Match"> | number | null
    winnerId?: IntNullableFilter<"Match"> | number | null
    matchDate?: DateTimeFilter<"Match"> | Date | string
    status?: StringFilter<"Match"> | string
    createdAt?: DateTimeFilter<"Match"> | Date | string
  }

  export type TournamentCreateWithoutTournamentTypeInput = {
    tournamentName: string
    startDate: Date | string
    startTime: string
    format: string
    rules: string
    maxParticipants: number
    rewards?: string | null
    minTeams: number
    playersPerTeam: number
    totalPlayers: number
    createdAt?: Date | string
    updatedAt: Date | string
    game: GameCreateNestedOneWithoutTournamentsInput
    status?: TournamentStatusCreateNestedManyWithoutTournamentInput
    teams?: TeamCreateNestedManyWithoutTournamentInput
    matches?: MatchCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateWithoutTournamentTypeInput = {
    id?: number
    tournamentName: string
    startDate: Date | string
    startTime: string
    format: string
    rules: string
    maxParticipants: number
    rewards?: string | null
    minTeams: number
    playersPerTeam: number
    totalPlayers: number
    createdAt?: Date | string
    updatedAt: Date | string
    gameId: number
    status?: TournamentStatusUncheckedCreateNestedManyWithoutTournamentInput
    teams?: TeamUncheckedCreateNestedManyWithoutTournamentInput
    matches?: MatchUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentCreateOrConnectWithoutTournamentTypeInput = {
    where: TournamentWhereUniqueInput
    create: XOR<TournamentCreateWithoutTournamentTypeInput, TournamentUncheckedCreateWithoutTournamentTypeInput>
  }

  export type TournamentCreateManyTournamentTypeInputEnvelope = {
    data: TournamentCreateManyTournamentTypeInput | TournamentCreateManyTournamentTypeInput[]
    skipDuplicates?: boolean
  }

  export type TournamentUpsertWithWhereUniqueWithoutTournamentTypeInput = {
    where: TournamentWhereUniqueInput
    update: XOR<TournamentUpdateWithoutTournamentTypeInput, TournamentUncheckedUpdateWithoutTournamentTypeInput>
    create: XOR<TournamentCreateWithoutTournamentTypeInput, TournamentUncheckedCreateWithoutTournamentTypeInput>
  }

  export type TournamentUpdateWithWhereUniqueWithoutTournamentTypeInput = {
    where: TournamentWhereUniqueInput
    data: XOR<TournamentUpdateWithoutTournamentTypeInput, TournamentUncheckedUpdateWithoutTournamentTypeInput>
  }

  export type TournamentUpdateManyWithWhereWithoutTournamentTypeInput = {
    where: TournamentScalarWhereInput
    data: XOR<TournamentUpdateManyMutationInput, TournamentUncheckedUpdateManyWithoutTournamentTypeInput>
  }

  export type TournamentCreateWithoutStatusInput = {
    tournamentName: string
    startDate: Date | string
    startTime: string
    format: string
    rules: string
    maxParticipants: number
    rewards?: string | null
    minTeams: number
    playersPerTeam: number
    totalPlayers: number
    createdAt?: Date | string
    updatedAt: Date | string
    game: GameCreateNestedOneWithoutTournamentsInput
    tournamentType: TournamentTypeCreateNestedOneWithoutTournamentsInput
    teams?: TeamCreateNestedManyWithoutTournamentInput
    matches?: MatchCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateWithoutStatusInput = {
    id?: number
    tournamentName: string
    startDate: Date | string
    startTime: string
    format: string
    rules: string
    maxParticipants: number
    rewards?: string | null
    minTeams: number
    playersPerTeam: number
    totalPlayers: number
    createdAt?: Date | string
    updatedAt: Date | string
    gameId: number
    tournament_typeId: number
    teams?: TeamUncheckedCreateNestedManyWithoutTournamentInput
    matches?: MatchUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentCreateOrConnectWithoutStatusInput = {
    where: TournamentWhereUniqueInput
    create: XOR<TournamentCreateWithoutStatusInput, TournamentUncheckedCreateWithoutStatusInput>
  }

  export type TournamentUpsertWithoutStatusInput = {
    update: XOR<TournamentUpdateWithoutStatusInput, TournamentUncheckedUpdateWithoutStatusInput>
    create: XOR<TournamentCreateWithoutStatusInput, TournamentUncheckedCreateWithoutStatusInput>
    where?: TournamentWhereInput
  }

  export type TournamentUpdateToOneWithWhereWithoutStatusInput = {
    where?: TournamentWhereInput
    data: XOR<TournamentUpdateWithoutStatusInput, TournamentUncheckedUpdateWithoutStatusInput>
  }

  export type TournamentUpdateWithoutStatusInput = {
    tournamentName?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    rules?: StringFieldUpdateOperationsInput | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    rewards?: NullableStringFieldUpdateOperationsInput | string | null
    minTeams?: IntFieldUpdateOperationsInput | number
    playersPerTeam?: IntFieldUpdateOperationsInput | number
    totalPlayers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutTournamentsNestedInput
    tournamentType?: TournamentTypeUpdateOneRequiredWithoutTournamentsNestedInput
    teams?: TeamUpdateManyWithoutTournamentNestedInput
    matches?: MatchUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateWithoutStatusInput = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentName?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    rules?: StringFieldUpdateOperationsInput | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    rewards?: NullableStringFieldUpdateOperationsInput | string | null
    minTeams?: IntFieldUpdateOperationsInput | number
    playersPerTeam?: IntFieldUpdateOperationsInput | number
    totalPlayers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameId?: IntFieldUpdateOperationsInput | number
    tournament_typeId?: IntFieldUpdateOperationsInput | number
    teams?: TeamUncheckedUpdateManyWithoutTournamentNestedInput
    matches?: MatchUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentCreateWithoutTeamsInput = {
    tournamentName: string
    startDate: Date | string
    startTime: string
    format: string
    rules: string
    maxParticipants: number
    rewards?: string | null
    minTeams: number
    playersPerTeam: number
    totalPlayers: number
    createdAt?: Date | string
    updatedAt: Date | string
    game: GameCreateNestedOneWithoutTournamentsInput
    tournamentType: TournamentTypeCreateNestedOneWithoutTournamentsInput
    status?: TournamentStatusCreateNestedManyWithoutTournamentInput
    matches?: MatchCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateWithoutTeamsInput = {
    id?: number
    tournamentName: string
    startDate: Date | string
    startTime: string
    format: string
    rules: string
    maxParticipants: number
    rewards?: string | null
    minTeams: number
    playersPerTeam: number
    totalPlayers: number
    createdAt?: Date | string
    updatedAt: Date | string
    gameId: number
    tournament_typeId: number
    status?: TournamentStatusUncheckedCreateNestedManyWithoutTournamentInput
    matches?: MatchUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentCreateOrConnectWithoutTeamsInput = {
    where: TournamentWhereUniqueInput
    create: XOR<TournamentCreateWithoutTeamsInput, TournamentUncheckedCreateWithoutTeamsInput>
  }

  export type TeamMemberCreateWithoutTeamInput = {
    role: string
    joined_at?: Date | string
    user: UserCreateNestedOneWithoutTeamMembersInput
  }

  export type TeamMemberUncheckedCreateWithoutTeamInput = {
    id?: number
    userId: number
    role: string
    joined_at?: Date | string
  }

  export type TeamMemberCreateOrConnectWithoutTeamInput = {
    where: TeamMemberWhereUniqueInput
    create: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput>
  }

  export type TeamMemberCreateManyTeamInputEnvelope = {
    data: TeamMemberCreateManyTeamInput | TeamMemberCreateManyTeamInput[]
    skipDuplicates?: boolean
  }

  export type MatchCreateWithoutTeam1Input = {
    team1Score?: number | null
    team2Score?: number | null
    winnerId?: number | null
    matchDate: Date | string
    status: string
    createdAt?: Date | string
    tournament: TournamentCreateNestedOneWithoutMatchesInput
    team2: TeamCreateNestedOneWithoutMatchesAsTeam2Input
  }

  export type MatchUncheckedCreateWithoutTeam1Input = {
    id?: number
    tournamentId: number
    team2Id: number
    team1Score?: number | null
    team2Score?: number | null
    winnerId?: number | null
    matchDate: Date | string
    status: string
    createdAt?: Date | string
  }

  export type MatchCreateOrConnectWithoutTeam1Input = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutTeam1Input, MatchUncheckedCreateWithoutTeam1Input>
  }

  export type MatchCreateManyTeam1InputEnvelope = {
    data: MatchCreateManyTeam1Input | MatchCreateManyTeam1Input[]
    skipDuplicates?: boolean
  }

  export type MatchCreateWithoutTeam2Input = {
    team1Score?: number | null
    team2Score?: number | null
    winnerId?: number | null
    matchDate: Date | string
    status: string
    createdAt?: Date | string
    tournament: TournamentCreateNestedOneWithoutMatchesInput
    team1: TeamCreateNestedOneWithoutMatchesAsTeam1Input
  }

  export type MatchUncheckedCreateWithoutTeam2Input = {
    id?: number
    tournamentId: number
    team1Id: number
    team1Score?: number | null
    team2Score?: number | null
    winnerId?: number | null
    matchDate: Date | string
    status: string
    createdAt?: Date | string
  }

  export type MatchCreateOrConnectWithoutTeam2Input = {
    where: MatchWhereUniqueInput
    create: XOR<MatchCreateWithoutTeam2Input, MatchUncheckedCreateWithoutTeam2Input>
  }

  export type MatchCreateManyTeam2InputEnvelope = {
    data: MatchCreateManyTeam2Input | MatchCreateManyTeam2Input[]
    skipDuplicates?: boolean
  }

  export type TournamentUpsertWithoutTeamsInput = {
    update: XOR<TournamentUpdateWithoutTeamsInput, TournamentUncheckedUpdateWithoutTeamsInput>
    create: XOR<TournamentCreateWithoutTeamsInput, TournamentUncheckedCreateWithoutTeamsInput>
    where?: TournamentWhereInput
  }

  export type TournamentUpdateToOneWithWhereWithoutTeamsInput = {
    where?: TournamentWhereInput
    data: XOR<TournamentUpdateWithoutTeamsInput, TournamentUncheckedUpdateWithoutTeamsInput>
  }

  export type TournamentUpdateWithoutTeamsInput = {
    tournamentName?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    rules?: StringFieldUpdateOperationsInput | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    rewards?: NullableStringFieldUpdateOperationsInput | string | null
    minTeams?: IntFieldUpdateOperationsInput | number
    playersPerTeam?: IntFieldUpdateOperationsInput | number
    totalPlayers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutTournamentsNestedInput
    tournamentType?: TournamentTypeUpdateOneRequiredWithoutTournamentsNestedInput
    status?: TournamentStatusUpdateManyWithoutTournamentNestedInput
    matches?: MatchUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateWithoutTeamsInput = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentName?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    rules?: StringFieldUpdateOperationsInput | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    rewards?: NullableStringFieldUpdateOperationsInput | string | null
    minTeams?: IntFieldUpdateOperationsInput | number
    playersPerTeam?: IntFieldUpdateOperationsInput | number
    totalPlayers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameId?: IntFieldUpdateOperationsInput | number
    tournament_typeId?: IntFieldUpdateOperationsInput | number
    status?: TournamentStatusUncheckedUpdateManyWithoutTournamentNestedInput
    matches?: MatchUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type TeamMemberUpsertWithWhereUniqueWithoutTeamInput = {
    where: TeamMemberWhereUniqueInput
    update: XOR<TeamMemberUpdateWithoutTeamInput, TeamMemberUncheckedUpdateWithoutTeamInput>
    create: XOR<TeamMemberCreateWithoutTeamInput, TeamMemberUncheckedCreateWithoutTeamInput>
  }

  export type TeamMemberUpdateWithWhereUniqueWithoutTeamInput = {
    where: TeamMemberWhereUniqueInput
    data: XOR<TeamMemberUpdateWithoutTeamInput, TeamMemberUncheckedUpdateWithoutTeamInput>
  }

  export type TeamMemberUpdateManyWithWhereWithoutTeamInput = {
    where: TeamMemberScalarWhereInput
    data: XOR<TeamMemberUpdateManyMutationInput, TeamMemberUncheckedUpdateManyWithoutTeamInput>
  }

  export type MatchUpsertWithWhereUniqueWithoutTeam1Input = {
    where: MatchWhereUniqueInput
    update: XOR<MatchUpdateWithoutTeam1Input, MatchUncheckedUpdateWithoutTeam1Input>
    create: XOR<MatchCreateWithoutTeam1Input, MatchUncheckedCreateWithoutTeam1Input>
  }

  export type MatchUpdateWithWhereUniqueWithoutTeam1Input = {
    where: MatchWhereUniqueInput
    data: XOR<MatchUpdateWithoutTeam1Input, MatchUncheckedUpdateWithoutTeam1Input>
  }

  export type MatchUpdateManyWithWhereWithoutTeam1Input = {
    where: MatchScalarWhereInput
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyWithoutTeam1Input>
  }

  export type MatchUpsertWithWhereUniqueWithoutTeam2Input = {
    where: MatchWhereUniqueInput
    update: XOR<MatchUpdateWithoutTeam2Input, MatchUncheckedUpdateWithoutTeam2Input>
    create: XOR<MatchCreateWithoutTeam2Input, MatchUncheckedCreateWithoutTeam2Input>
  }

  export type MatchUpdateWithWhereUniqueWithoutTeam2Input = {
    where: MatchWhereUniqueInput
    data: XOR<MatchUpdateWithoutTeam2Input, MatchUncheckedUpdateWithoutTeam2Input>
  }

  export type MatchUpdateManyWithWhereWithoutTeam2Input = {
    where: MatchScalarWhereInput
    data: XOR<MatchUpdateManyMutationInput, MatchUncheckedUpdateManyWithoutTeam2Input>
  }

  export type UserCreateWithoutTeamMembersInput = {
    pseudo: string
    name: string
    last_name: string
    email: string
    password: string
    sexe: string
    birthday: Date | string
    created_at?: Date | string
    last_auth: Date | string
    role?: string
  }

  export type UserUncheckedCreateWithoutTeamMembersInput = {
    id?: number
    pseudo: string
    name: string
    last_name: string
    email: string
    password: string
    sexe: string
    birthday: Date | string
    created_at?: Date | string
    last_auth: Date | string
    role?: string
  }

  export type UserCreateOrConnectWithoutTeamMembersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTeamMembersInput, UserUncheckedCreateWithoutTeamMembersInput>
  }

  export type TeamCreateWithoutMembersInput = {
    teamName: string
    createdAt?: Date | string
    tournament: TournamentCreateNestedOneWithoutTeamsInput
    matchesAsTeam1?: MatchCreateNestedManyWithoutTeam1Input
    matchesAsTeam2?: MatchCreateNestedManyWithoutTeam2Input
  }

  export type TeamUncheckedCreateWithoutMembersInput = {
    id?: number
    teamName: string
    tournamentId: number
    createdAt?: Date | string
    matchesAsTeam1?: MatchUncheckedCreateNestedManyWithoutTeam1Input
    matchesAsTeam2?: MatchUncheckedCreateNestedManyWithoutTeam2Input
  }

  export type TeamCreateOrConnectWithoutMembersInput = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutMembersInput, TeamUncheckedCreateWithoutMembersInput>
  }

  export type UserUpsertWithoutTeamMembersInput = {
    update: XOR<UserUpdateWithoutTeamMembersInput, UserUncheckedUpdateWithoutTeamMembersInput>
    create: XOR<UserCreateWithoutTeamMembersInput, UserUncheckedCreateWithoutTeamMembersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTeamMembersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTeamMembersInput, UserUncheckedUpdateWithoutTeamMembersInput>
  }

  export type UserUpdateWithoutTeamMembersInput = {
    pseudo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    sexe?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_auth?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateWithoutTeamMembersInput = {
    id?: IntFieldUpdateOperationsInput | number
    pseudo?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    last_name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    sexe?: StringFieldUpdateOperationsInput | string
    birthday?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_auth?: DateTimeFieldUpdateOperationsInput | Date | string
    role?: StringFieldUpdateOperationsInput | string
  }

  export type TeamUpsertWithoutMembersInput = {
    update: XOR<TeamUpdateWithoutMembersInput, TeamUncheckedUpdateWithoutMembersInput>
    create: XOR<TeamCreateWithoutMembersInput, TeamUncheckedCreateWithoutMembersInput>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutMembersInput = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutMembersInput, TeamUncheckedUpdateWithoutMembersInput>
  }

  export type TeamUpdateWithoutMembersInput = {
    teamName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament?: TournamentUpdateOneRequiredWithoutTeamsNestedInput
    matchesAsTeam1?: MatchUpdateManyWithoutTeam1NestedInput
    matchesAsTeam2?: MatchUpdateManyWithoutTeam2NestedInput
  }

  export type TeamUncheckedUpdateWithoutMembersInput = {
    id?: IntFieldUpdateOperationsInput | number
    teamName?: StringFieldUpdateOperationsInput | string
    tournamentId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    matchesAsTeam1?: MatchUncheckedUpdateManyWithoutTeam1NestedInput
    matchesAsTeam2?: MatchUncheckedUpdateManyWithoutTeam2NestedInput
  }

  export type TournamentCreateWithoutMatchesInput = {
    tournamentName: string
    startDate: Date | string
    startTime: string
    format: string
    rules: string
    maxParticipants: number
    rewards?: string | null
    minTeams: number
    playersPerTeam: number
    totalPlayers: number
    createdAt?: Date | string
    updatedAt: Date | string
    game: GameCreateNestedOneWithoutTournamentsInput
    tournamentType: TournamentTypeCreateNestedOneWithoutTournamentsInput
    status?: TournamentStatusCreateNestedManyWithoutTournamentInput
    teams?: TeamCreateNestedManyWithoutTournamentInput
  }

  export type TournamentUncheckedCreateWithoutMatchesInput = {
    id?: number
    tournamentName: string
    startDate: Date | string
    startTime: string
    format: string
    rules: string
    maxParticipants: number
    rewards?: string | null
    minTeams: number
    playersPerTeam: number
    totalPlayers: number
    createdAt?: Date | string
    updatedAt: Date | string
    gameId: number
    tournament_typeId: number
    status?: TournamentStatusUncheckedCreateNestedManyWithoutTournamentInput
    teams?: TeamUncheckedCreateNestedManyWithoutTournamentInput
  }

  export type TournamentCreateOrConnectWithoutMatchesInput = {
    where: TournamentWhereUniqueInput
    create: XOR<TournamentCreateWithoutMatchesInput, TournamentUncheckedCreateWithoutMatchesInput>
  }

  export type TeamCreateWithoutMatchesAsTeam1Input = {
    teamName: string
    createdAt?: Date | string
    tournament: TournamentCreateNestedOneWithoutTeamsInput
    members?: TeamMemberCreateNestedManyWithoutTeamInput
    matchesAsTeam2?: MatchCreateNestedManyWithoutTeam2Input
  }

  export type TeamUncheckedCreateWithoutMatchesAsTeam1Input = {
    id?: number
    teamName: string
    tournamentId: number
    createdAt?: Date | string
    members?: TeamMemberUncheckedCreateNestedManyWithoutTeamInput
    matchesAsTeam2?: MatchUncheckedCreateNestedManyWithoutTeam2Input
  }

  export type TeamCreateOrConnectWithoutMatchesAsTeam1Input = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutMatchesAsTeam1Input, TeamUncheckedCreateWithoutMatchesAsTeam1Input>
  }

  export type TeamCreateWithoutMatchesAsTeam2Input = {
    teamName: string
    createdAt?: Date | string
    tournament: TournamentCreateNestedOneWithoutTeamsInput
    members?: TeamMemberCreateNestedManyWithoutTeamInput
    matchesAsTeam1?: MatchCreateNestedManyWithoutTeam1Input
  }

  export type TeamUncheckedCreateWithoutMatchesAsTeam2Input = {
    id?: number
    teamName: string
    tournamentId: number
    createdAt?: Date | string
    members?: TeamMemberUncheckedCreateNestedManyWithoutTeamInput
    matchesAsTeam1?: MatchUncheckedCreateNestedManyWithoutTeam1Input
  }

  export type TeamCreateOrConnectWithoutMatchesAsTeam2Input = {
    where: TeamWhereUniqueInput
    create: XOR<TeamCreateWithoutMatchesAsTeam2Input, TeamUncheckedCreateWithoutMatchesAsTeam2Input>
  }

  export type TournamentUpsertWithoutMatchesInput = {
    update: XOR<TournamentUpdateWithoutMatchesInput, TournamentUncheckedUpdateWithoutMatchesInput>
    create: XOR<TournamentCreateWithoutMatchesInput, TournamentUncheckedCreateWithoutMatchesInput>
    where?: TournamentWhereInput
  }

  export type TournamentUpdateToOneWithWhereWithoutMatchesInput = {
    where?: TournamentWhereInput
    data: XOR<TournamentUpdateWithoutMatchesInput, TournamentUncheckedUpdateWithoutMatchesInput>
  }

  export type TournamentUpdateWithoutMatchesInput = {
    tournamentName?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    rules?: StringFieldUpdateOperationsInput | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    rewards?: NullableStringFieldUpdateOperationsInput | string | null
    minTeams?: IntFieldUpdateOperationsInput | number
    playersPerTeam?: IntFieldUpdateOperationsInput | number
    totalPlayers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutTournamentsNestedInput
    tournamentType?: TournamentTypeUpdateOneRequiredWithoutTournamentsNestedInput
    status?: TournamentStatusUpdateManyWithoutTournamentNestedInput
    teams?: TeamUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateWithoutMatchesInput = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentName?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    rules?: StringFieldUpdateOperationsInput | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    rewards?: NullableStringFieldUpdateOperationsInput | string | null
    minTeams?: IntFieldUpdateOperationsInput | number
    playersPerTeam?: IntFieldUpdateOperationsInput | number
    totalPlayers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameId?: IntFieldUpdateOperationsInput | number
    tournament_typeId?: IntFieldUpdateOperationsInput | number
    status?: TournamentStatusUncheckedUpdateManyWithoutTournamentNestedInput
    teams?: TeamUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type TeamUpsertWithoutMatchesAsTeam1Input = {
    update: XOR<TeamUpdateWithoutMatchesAsTeam1Input, TeamUncheckedUpdateWithoutMatchesAsTeam1Input>
    create: XOR<TeamCreateWithoutMatchesAsTeam1Input, TeamUncheckedCreateWithoutMatchesAsTeam1Input>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutMatchesAsTeam1Input = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutMatchesAsTeam1Input, TeamUncheckedUpdateWithoutMatchesAsTeam1Input>
  }

  export type TeamUpdateWithoutMatchesAsTeam1Input = {
    teamName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament?: TournamentUpdateOneRequiredWithoutTeamsNestedInput
    members?: TeamMemberUpdateManyWithoutTeamNestedInput
    matchesAsTeam2?: MatchUpdateManyWithoutTeam2NestedInput
  }

  export type TeamUncheckedUpdateWithoutMatchesAsTeam1Input = {
    id?: IntFieldUpdateOperationsInput | number
    teamName?: StringFieldUpdateOperationsInput | string
    tournamentId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: TeamMemberUncheckedUpdateManyWithoutTeamNestedInput
    matchesAsTeam2?: MatchUncheckedUpdateManyWithoutTeam2NestedInput
  }

  export type TeamUpsertWithoutMatchesAsTeam2Input = {
    update: XOR<TeamUpdateWithoutMatchesAsTeam2Input, TeamUncheckedUpdateWithoutMatchesAsTeam2Input>
    create: XOR<TeamCreateWithoutMatchesAsTeam2Input, TeamUncheckedCreateWithoutMatchesAsTeam2Input>
    where?: TeamWhereInput
  }

  export type TeamUpdateToOneWithWhereWithoutMatchesAsTeam2Input = {
    where?: TeamWhereInput
    data: XOR<TeamUpdateWithoutMatchesAsTeam2Input, TeamUncheckedUpdateWithoutMatchesAsTeam2Input>
  }

  export type TeamUpdateWithoutMatchesAsTeam2Input = {
    teamName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament?: TournamentUpdateOneRequiredWithoutTeamsNestedInput
    members?: TeamMemberUpdateManyWithoutTeamNestedInput
    matchesAsTeam1?: MatchUpdateManyWithoutTeam1NestedInput
  }

  export type TeamUncheckedUpdateWithoutMatchesAsTeam2Input = {
    id?: IntFieldUpdateOperationsInput | number
    teamName?: StringFieldUpdateOperationsInput | string
    tournamentId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: TeamMemberUncheckedUpdateManyWithoutTeamNestedInput
    matchesAsTeam1?: MatchUncheckedUpdateManyWithoutTeam1NestedInput
  }

  export type TeamMemberCreateManyUserInput = {
    id?: number
    teamId: number
    role: string
    joined_at?: Date | string
  }

  export type TeamMemberUpdateWithoutUserInput = {
    role?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    team?: TeamUpdateOneRequiredWithoutMembersNestedInput
  }

  export type TeamMemberUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    teamId?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    teamId?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentCreateManyGameInput = {
    id?: number
    tournamentName: string
    startDate: Date | string
    startTime: string
    format: string
    rules: string
    maxParticipants: number
    rewards?: string | null
    minTeams: number
    playersPerTeam: number
    totalPlayers: number
    createdAt?: Date | string
    updatedAt: Date | string
    tournament_typeId: number
  }

  export type TournamentUpdateWithoutGameInput = {
    tournamentName?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    rules?: StringFieldUpdateOperationsInput | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    rewards?: NullableStringFieldUpdateOperationsInput | string | null
    minTeams?: IntFieldUpdateOperationsInput | number
    playersPerTeam?: IntFieldUpdateOperationsInput | number
    totalPlayers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournamentType?: TournamentTypeUpdateOneRequiredWithoutTournamentsNestedInput
    status?: TournamentStatusUpdateManyWithoutTournamentNestedInput
    teams?: TeamUpdateManyWithoutTournamentNestedInput
    matches?: MatchUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentName?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    rules?: StringFieldUpdateOperationsInput | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    rewards?: NullableStringFieldUpdateOperationsInput | string | null
    minTeams?: IntFieldUpdateOperationsInput | number
    playersPerTeam?: IntFieldUpdateOperationsInput | number
    totalPlayers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament_typeId?: IntFieldUpdateOperationsInput | number
    status?: TournamentStatusUncheckedUpdateManyWithoutTournamentNestedInput
    teams?: TeamUncheckedUpdateManyWithoutTournamentNestedInput
    matches?: MatchUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateManyWithoutGameInput = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentName?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    rules?: StringFieldUpdateOperationsInput | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    rewards?: NullableStringFieldUpdateOperationsInput | string | null
    minTeams?: IntFieldUpdateOperationsInput | number
    playersPerTeam?: IntFieldUpdateOperationsInput | number
    totalPlayers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament_typeId?: IntFieldUpdateOperationsInput | number
  }

  export type TournamentStatusCreateManyTournamentInput = {
    id?: number
    status: string
    updatedAt: Date | string
  }

  export type TeamCreateManyTournamentInput = {
    id?: number
    teamName: string
    createdAt?: Date | string
  }

  export type MatchCreateManyTournamentInput = {
    id?: number
    team1Id: number
    team2Id: number
    team1Score?: number | null
    team2Score?: number | null
    winnerId?: number | null
    matchDate: Date | string
    status: string
    createdAt?: Date | string
  }

  export type TournamentStatusUpdateWithoutTournamentInput = {
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentStatusUncheckedUpdateWithoutTournamentInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentStatusUncheckedUpdateManyWithoutTournamentInput = {
    id?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamUpdateWithoutTournamentInput = {
    teamName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: TeamMemberUpdateManyWithoutTeamNestedInput
    matchesAsTeam1?: MatchUpdateManyWithoutTeam1NestedInput
    matchesAsTeam2?: MatchUpdateManyWithoutTeam2NestedInput
  }

  export type TeamUncheckedUpdateWithoutTournamentInput = {
    id?: IntFieldUpdateOperationsInput | number
    teamName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: TeamMemberUncheckedUpdateManyWithoutTeamNestedInput
    matchesAsTeam1?: MatchUncheckedUpdateManyWithoutTeam1NestedInput
    matchesAsTeam2?: MatchUncheckedUpdateManyWithoutTeam2NestedInput
  }

  export type TeamUncheckedUpdateManyWithoutTournamentInput = {
    id?: IntFieldUpdateOperationsInput | number
    teamName?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchUpdateWithoutTournamentInput = {
    team1Score?: NullableIntFieldUpdateOperationsInput | number | null
    team2Score?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableIntFieldUpdateOperationsInput | number | null
    matchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    team1?: TeamUpdateOneRequiredWithoutMatchesAsTeam1NestedInput
    team2?: TeamUpdateOneRequiredWithoutMatchesAsTeam2NestedInput
  }

  export type MatchUncheckedUpdateWithoutTournamentInput = {
    id?: IntFieldUpdateOperationsInput | number
    team1Id?: IntFieldUpdateOperationsInput | number
    team2Id?: IntFieldUpdateOperationsInput | number
    team1Score?: NullableIntFieldUpdateOperationsInput | number | null
    team2Score?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableIntFieldUpdateOperationsInput | number | null
    matchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchUncheckedUpdateManyWithoutTournamentInput = {
    id?: IntFieldUpdateOperationsInput | number
    team1Id?: IntFieldUpdateOperationsInput | number
    team2Id?: IntFieldUpdateOperationsInput | number
    team1Score?: NullableIntFieldUpdateOperationsInput | number | null
    team2Score?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableIntFieldUpdateOperationsInput | number | null
    matchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TournamentCreateManyTournamentTypeInput = {
    id?: number
    tournamentName: string
    startDate: Date | string
    startTime: string
    format: string
    rules: string
    maxParticipants: number
    rewards?: string | null
    minTeams: number
    playersPerTeam: number
    totalPlayers: number
    createdAt?: Date | string
    updatedAt: Date | string
    gameId: number
  }

  export type TournamentUpdateWithoutTournamentTypeInput = {
    tournamentName?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    rules?: StringFieldUpdateOperationsInput | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    rewards?: NullableStringFieldUpdateOperationsInput | string | null
    minTeams?: IntFieldUpdateOperationsInput | number
    playersPerTeam?: IntFieldUpdateOperationsInput | number
    totalPlayers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    game?: GameUpdateOneRequiredWithoutTournamentsNestedInput
    status?: TournamentStatusUpdateManyWithoutTournamentNestedInput
    teams?: TeamUpdateManyWithoutTournamentNestedInput
    matches?: MatchUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateWithoutTournamentTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentName?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    rules?: StringFieldUpdateOperationsInput | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    rewards?: NullableStringFieldUpdateOperationsInput | string | null
    minTeams?: IntFieldUpdateOperationsInput | number
    playersPerTeam?: IntFieldUpdateOperationsInput | number
    totalPlayers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameId?: IntFieldUpdateOperationsInput | number
    status?: TournamentStatusUncheckedUpdateManyWithoutTournamentNestedInput
    teams?: TeamUncheckedUpdateManyWithoutTournamentNestedInput
    matches?: MatchUncheckedUpdateManyWithoutTournamentNestedInput
  }

  export type TournamentUncheckedUpdateManyWithoutTournamentTypeInput = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentName?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    startTime?: StringFieldUpdateOperationsInput | string
    format?: StringFieldUpdateOperationsInput | string
    rules?: StringFieldUpdateOperationsInput | string
    maxParticipants?: IntFieldUpdateOperationsInput | number
    rewards?: NullableStringFieldUpdateOperationsInput | string | null
    minTeams?: IntFieldUpdateOperationsInput | number
    playersPerTeam?: IntFieldUpdateOperationsInput | number
    totalPlayers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    gameId?: IntFieldUpdateOperationsInput | number
  }

  export type TeamMemberCreateManyTeamInput = {
    id?: number
    userId: number
    role: string
    joined_at?: Date | string
  }

  export type MatchCreateManyTeam1Input = {
    id?: number
    tournamentId: number
    team2Id: number
    team1Score?: number | null
    team2Score?: number | null
    winnerId?: number | null
    matchDate: Date | string
    status: string
    createdAt?: Date | string
  }

  export type MatchCreateManyTeam2Input = {
    id?: number
    tournamentId: number
    team1Id: number
    team1Score?: number | null
    team2Score?: number | null
    winnerId?: number | null
    matchDate: Date | string
    status: string
    createdAt?: Date | string
  }

  export type TeamMemberUpdateWithoutTeamInput = {
    role?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTeamMembersNestedInput
  }

  export type TeamMemberUncheckedUpdateWithoutTeamInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TeamMemberUncheckedUpdateManyWithoutTeamInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    role?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchUpdateWithoutTeam1Input = {
    team1Score?: NullableIntFieldUpdateOperationsInput | number | null
    team2Score?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableIntFieldUpdateOperationsInput | number | null
    matchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament?: TournamentUpdateOneRequiredWithoutMatchesNestedInput
    team2?: TeamUpdateOneRequiredWithoutMatchesAsTeam2NestedInput
  }

  export type MatchUncheckedUpdateWithoutTeam1Input = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentId?: IntFieldUpdateOperationsInput | number
    team2Id?: IntFieldUpdateOperationsInput | number
    team1Score?: NullableIntFieldUpdateOperationsInput | number | null
    team2Score?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableIntFieldUpdateOperationsInput | number | null
    matchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchUncheckedUpdateManyWithoutTeam1Input = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentId?: IntFieldUpdateOperationsInput | number
    team2Id?: IntFieldUpdateOperationsInput | number
    team1Score?: NullableIntFieldUpdateOperationsInput | number | null
    team2Score?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableIntFieldUpdateOperationsInput | number | null
    matchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchUpdateWithoutTeam2Input = {
    team1Score?: NullableIntFieldUpdateOperationsInput | number | null
    team2Score?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableIntFieldUpdateOperationsInput | number | null
    matchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    tournament?: TournamentUpdateOneRequiredWithoutMatchesNestedInput
    team1?: TeamUpdateOneRequiredWithoutMatchesAsTeam1NestedInput
  }

  export type MatchUncheckedUpdateWithoutTeam2Input = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentId?: IntFieldUpdateOperationsInput | number
    team1Id?: IntFieldUpdateOperationsInput | number
    team1Score?: NullableIntFieldUpdateOperationsInput | number | null
    team2Score?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableIntFieldUpdateOperationsInput | number | null
    matchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MatchUncheckedUpdateManyWithoutTeam2Input = {
    id?: IntFieldUpdateOperationsInput | number
    tournamentId?: IntFieldUpdateOperationsInput | number
    team1Id?: IntFieldUpdateOperationsInput | number
    team1Score?: NullableIntFieldUpdateOperationsInput | number | null
    team2Score?: NullableIntFieldUpdateOperationsInput | number | null
    winnerId?: NullableIntFieldUpdateOperationsInput | number | null
    matchDate?: DateTimeFieldUpdateOperationsInput | Date | string
    status?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}