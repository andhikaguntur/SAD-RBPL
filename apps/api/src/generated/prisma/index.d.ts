
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Mesin
 * 
 */
export type Mesin = $Result.DefaultSelection<Prisma.$MesinPayload>
/**
 * Model PermintaanSewa
 * 
 */
export type PermintaanSewa = $Result.DefaultSelection<Prisma.$PermintaanSewaPayload>
/**
 * Model PermintaanMesin
 * 
 */
export type PermintaanMesin = $Result.DefaultSelection<Prisma.$PermintaanMesinPayload>
/**
 * Model Pembayaran
 * 
 */
export type Pembayaran = $Result.DefaultSelection<Prisma.$PembayaranPayload>
/**
 * Model Pengiriman
 * 
 */
export type Pengiriman = $Result.DefaultSelection<Prisma.$PengirimanPayload>
/**
 * Model AuditLog
 * 
 */
export type AuditLog = $Result.DefaultSelection<Prisma.$AuditLogPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Mesins
 * const mesins = await prisma.mesin.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Mesins
   * const mesins = await prisma.mesin.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
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
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://pris.ly/d/raw-queries).
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
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.mesin`: Exposes CRUD operations for the **Mesin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mesins
    * const mesins = await prisma.mesin.findMany()
    * ```
    */
  get mesin(): Prisma.MesinDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.permintaanSewa`: Exposes CRUD operations for the **PermintaanSewa** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PermintaanSewas
    * const permintaanSewas = await prisma.permintaanSewa.findMany()
    * ```
    */
  get permintaanSewa(): Prisma.PermintaanSewaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.permintaanMesin`: Exposes CRUD operations for the **PermintaanMesin** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PermintaanMesins
    * const permintaanMesins = await prisma.permintaanMesin.findMany()
    * ```
    */
  get permintaanMesin(): Prisma.PermintaanMesinDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pembayaran`: Exposes CRUD operations for the **Pembayaran** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pembayarans
    * const pembayarans = await prisma.pembayaran.findMany()
    * ```
    */
  get pembayaran(): Prisma.PembayaranDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pengiriman`: Exposes CRUD operations for the **Pengiriman** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pengirimen
    * const pengirimen = await prisma.pengiriman.findMany()
    * ```
    */
  get pengiriman(): Prisma.PengirimanDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auditLog`: Exposes CRUD operations for the **AuditLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuditLogs
    * const auditLogs = await prisma.auditLog.findMany()
    * ```
    */
  get auditLog(): Prisma.AuditLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
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
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.6.0
   * Query Engine version: 75cbdc1eb7150937890ad5465d861175c6624711
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
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
    Mesin: 'Mesin',
    PermintaanSewa: 'PermintaanSewa',
    PermintaanMesin: 'PermintaanMesin',
    Pembayaran: 'Pembayaran',
    Pengiriman: 'Pengiriman',
    AuditLog: 'AuditLog',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "mesin" | "permintaanSewa" | "permintaanMesin" | "pembayaran" | "pengiriman" | "auditLog" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Mesin: {
        payload: Prisma.$MesinPayload<ExtArgs>
        fields: Prisma.MesinFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MesinFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesinPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MesinFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesinPayload>
          }
          findFirst: {
            args: Prisma.MesinFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesinPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MesinFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesinPayload>
          }
          findMany: {
            args: Prisma.MesinFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesinPayload>[]
          }
          create: {
            args: Prisma.MesinCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesinPayload>
          }
          createMany: {
            args: Prisma.MesinCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MesinCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesinPayload>[]
          }
          delete: {
            args: Prisma.MesinDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesinPayload>
          }
          update: {
            args: Prisma.MesinUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesinPayload>
          }
          deleteMany: {
            args: Prisma.MesinDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MesinUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MesinUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesinPayload>[]
          }
          upsert: {
            args: Prisma.MesinUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MesinPayload>
          }
          aggregate: {
            args: Prisma.MesinAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMesin>
          }
          groupBy: {
            args: Prisma.MesinGroupByArgs<ExtArgs>
            result: $Utils.Optional<MesinGroupByOutputType>[]
          }
          count: {
            args: Prisma.MesinCountArgs<ExtArgs>
            result: $Utils.Optional<MesinCountAggregateOutputType> | number
          }
        }
      }
      PermintaanSewa: {
        payload: Prisma.$PermintaanSewaPayload<ExtArgs>
        fields: Prisma.PermintaanSewaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PermintaanSewaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanSewaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PermintaanSewaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanSewaPayload>
          }
          findFirst: {
            args: Prisma.PermintaanSewaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanSewaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PermintaanSewaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanSewaPayload>
          }
          findMany: {
            args: Prisma.PermintaanSewaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanSewaPayload>[]
          }
          create: {
            args: Prisma.PermintaanSewaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanSewaPayload>
          }
          createMany: {
            args: Prisma.PermintaanSewaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PermintaanSewaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanSewaPayload>[]
          }
          delete: {
            args: Prisma.PermintaanSewaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanSewaPayload>
          }
          update: {
            args: Prisma.PermintaanSewaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanSewaPayload>
          }
          deleteMany: {
            args: Prisma.PermintaanSewaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PermintaanSewaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PermintaanSewaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanSewaPayload>[]
          }
          upsert: {
            args: Prisma.PermintaanSewaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanSewaPayload>
          }
          aggregate: {
            args: Prisma.PermintaanSewaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePermintaanSewa>
          }
          groupBy: {
            args: Prisma.PermintaanSewaGroupByArgs<ExtArgs>
            result: $Utils.Optional<PermintaanSewaGroupByOutputType>[]
          }
          count: {
            args: Prisma.PermintaanSewaCountArgs<ExtArgs>
            result: $Utils.Optional<PermintaanSewaCountAggregateOutputType> | number
          }
        }
      }
      PermintaanMesin: {
        payload: Prisma.$PermintaanMesinPayload<ExtArgs>
        fields: Prisma.PermintaanMesinFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PermintaanMesinFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanMesinPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PermintaanMesinFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanMesinPayload>
          }
          findFirst: {
            args: Prisma.PermintaanMesinFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanMesinPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PermintaanMesinFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanMesinPayload>
          }
          findMany: {
            args: Prisma.PermintaanMesinFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanMesinPayload>[]
          }
          create: {
            args: Prisma.PermintaanMesinCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanMesinPayload>
          }
          createMany: {
            args: Prisma.PermintaanMesinCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PermintaanMesinCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanMesinPayload>[]
          }
          delete: {
            args: Prisma.PermintaanMesinDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanMesinPayload>
          }
          update: {
            args: Prisma.PermintaanMesinUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanMesinPayload>
          }
          deleteMany: {
            args: Prisma.PermintaanMesinDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PermintaanMesinUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PermintaanMesinUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanMesinPayload>[]
          }
          upsert: {
            args: Prisma.PermintaanMesinUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PermintaanMesinPayload>
          }
          aggregate: {
            args: Prisma.PermintaanMesinAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePermintaanMesin>
          }
          groupBy: {
            args: Prisma.PermintaanMesinGroupByArgs<ExtArgs>
            result: $Utils.Optional<PermintaanMesinGroupByOutputType>[]
          }
          count: {
            args: Prisma.PermintaanMesinCountArgs<ExtArgs>
            result: $Utils.Optional<PermintaanMesinCountAggregateOutputType> | number
          }
        }
      }
      Pembayaran: {
        payload: Prisma.$PembayaranPayload<ExtArgs>
        fields: Prisma.PembayaranFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PembayaranFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PembayaranFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>
          }
          findFirst: {
            args: Prisma.PembayaranFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PembayaranFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>
          }
          findMany: {
            args: Prisma.PembayaranFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>[]
          }
          create: {
            args: Prisma.PembayaranCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>
          }
          createMany: {
            args: Prisma.PembayaranCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PembayaranCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>[]
          }
          delete: {
            args: Prisma.PembayaranDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>
          }
          update: {
            args: Prisma.PembayaranUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>
          }
          deleteMany: {
            args: Prisma.PembayaranDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PembayaranUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PembayaranUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>[]
          }
          upsert: {
            args: Prisma.PembayaranUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PembayaranPayload>
          }
          aggregate: {
            args: Prisma.PembayaranAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePembayaran>
          }
          groupBy: {
            args: Prisma.PembayaranGroupByArgs<ExtArgs>
            result: $Utils.Optional<PembayaranGroupByOutputType>[]
          }
          count: {
            args: Prisma.PembayaranCountArgs<ExtArgs>
            result: $Utils.Optional<PembayaranCountAggregateOutputType> | number
          }
        }
      }
      Pengiriman: {
        payload: Prisma.$PengirimanPayload<ExtArgs>
        fields: Prisma.PengirimanFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PengirimanFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengirimanPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PengirimanFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengirimanPayload>
          }
          findFirst: {
            args: Prisma.PengirimanFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengirimanPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PengirimanFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengirimanPayload>
          }
          findMany: {
            args: Prisma.PengirimanFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengirimanPayload>[]
          }
          create: {
            args: Prisma.PengirimanCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengirimanPayload>
          }
          createMany: {
            args: Prisma.PengirimanCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PengirimanCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengirimanPayload>[]
          }
          delete: {
            args: Prisma.PengirimanDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengirimanPayload>
          }
          update: {
            args: Prisma.PengirimanUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengirimanPayload>
          }
          deleteMany: {
            args: Prisma.PengirimanDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PengirimanUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PengirimanUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengirimanPayload>[]
          }
          upsert: {
            args: Prisma.PengirimanUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PengirimanPayload>
          }
          aggregate: {
            args: Prisma.PengirimanAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePengiriman>
          }
          groupBy: {
            args: Prisma.PengirimanGroupByArgs<ExtArgs>
            result: $Utils.Optional<PengirimanGroupByOutputType>[]
          }
          count: {
            args: Prisma.PengirimanCountArgs<ExtArgs>
            result: $Utils.Optional<PengirimanCountAggregateOutputType> | number
          }
        }
      }
      AuditLog: {
        payload: Prisma.$AuditLogPayload<ExtArgs>
        fields: Prisma.AuditLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AuditLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AuditLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findFirst: {
            args: Prisma.AuditLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AuditLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          findMany: {
            args: Prisma.AuditLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          create: {
            args: Prisma.AuditLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          createMany: {
            args: Prisma.AuditLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AuditLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          delete: {
            args: Prisma.AuditLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          update: {
            args: Prisma.AuditLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          deleteMany: {
            args: Prisma.AuditLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AuditLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AuditLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>[]
          }
          upsert: {
            args: Prisma.AuditLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AuditLogPayload>
          }
          aggregate: {
            args: Prisma.AuditLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuditLog>
          }
          groupBy: {
            args: Prisma.AuditLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<AuditLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.AuditLogCountArgs<ExtArgs>
            result: $Utils.Optional<AuditLogCountAggregateOutputType> | number
          }
        }
      }
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
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
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
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
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
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    mesin?: MesinOmit
    permintaanSewa?: PermintaanSewaOmit
    permintaanMesin?: PermintaanMesinOmit
    pembayaran?: PembayaranOmit
    pengiriman?: PengirimanOmit
    auditLog?: AuditLogOmit
    user?: UserOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

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
   * Count Type MesinCountOutputType
   */

  export type MesinCountOutputType = {
    permintaan: number
  }

  export type MesinCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permintaan?: boolean | MesinCountOutputTypeCountPermintaanArgs
  }

  // Custom InputTypes
  /**
   * MesinCountOutputType without action
   */
  export type MesinCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MesinCountOutputType
     */
    select?: MesinCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * MesinCountOutputType without action
   */
  export type MesinCountOutputTypeCountPermintaanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermintaanMesinWhereInput
  }


  /**
   * Count Type PermintaanSewaCountOutputType
   */

  export type PermintaanSewaCountOutputType = {
    mesin: number
    pembayaran: number
    pengiriman: number
  }

  export type PermintaanSewaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mesin?: boolean | PermintaanSewaCountOutputTypeCountMesinArgs
    pembayaran?: boolean | PermintaanSewaCountOutputTypeCountPembayaranArgs
    pengiriman?: boolean | PermintaanSewaCountOutputTypeCountPengirimanArgs
  }

  // Custom InputTypes
  /**
   * PermintaanSewaCountOutputType without action
   */
  export type PermintaanSewaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanSewaCountOutputType
     */
    select?: PermintaanSewaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PermintaanSewaCountOutputType without action
   */
  export type PermintaanSewaCountOutputTypeCountMesinArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermintaanMesinWhereInput
  }

  /**
   * PermintaanSewaCountOutputType without action
   */
  export type PermintaanSewaCountOutputTypeCountPembayaranArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PembayaranWhereInput
  }

  /**
   * PermintaanSewaCountOutputType without action
   */
  export type PermintaanSewaCountOutputTypeCountPengirimanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PengirimanWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Mesin
   */

  export type AggregateMesin = {
    _count: MesinCountAggregateOutputType | null
    _min: MesinMinAggregateOutputType | null
    _max: MesinMaxAggregateOutputType | null
  }

  export type MesinMinAggregateOutputType = {
    idMesin: string | null
    namaMesin: string | null
    kapasitas: string | null
    status: string | null
    lokasi: string | null
    lastService: Date | null
    pelanggan: string | null
  }

  export type MesinMaxAggregateOutputType = {
    idMesin: string | null
    namaMesin: string | null
    kapasitas: string | null
    status: string | null
    lokasi: string | null
    lastService: Date | null
    pelanggan: string | null
  }

  export type MesinCountAggregateOutputType = {
    idMesin: number
    namaMesin: number
    kapasitas: number
    status: number
    lokasi: number
    lastService: number
    pelanggan: number
    _all: number
  }


  export type MesinMinAggregateInputType = {
    idMesin?: true
    namaMesin?: true
    kapasitas?: true
    status?: true
    lokasi?: true
    lastService?: true
    pelanggan?: true
  }

  export type MesinMaxAggregateInputType = {
    idMesin?: true
    namaMesin?: true
    kapasitas?: true
    status?: true
    lokasi?: true
    lastService?: true
    pelanggan?: true
  }

  export type MesinCountAggregateInputType = {
    idMesin?: true
    namaMesin?: true
    kapasitas?: true
    status?: true
    lokasi?: true
    lastService?: true
    pelanggan?: true
    _all?: true
  }

  export type MesinAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mesin to aggregate.
     */
    where?: MesinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mesins to fetch.
     */
    orderBy?: MesinOrderByWithRelationInput | MesinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MesinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mesins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mesins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Mesins
    **/
    _count?: true | MesinCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MesinMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MesinMaxAggregateInputType
  }

  export type GetMesinAggregateType<T extends MesinAggregateArgs> = {
        [P in keyof T & keyof AggregateMesin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMesin[P]>
      : GetScalarType<T[P], AggregateMesin[P]>
  }




  export type MesinGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MesinWhereInput
    orderBy?: MesinOrderByWithAggregationInput | MesinOrderByWithAggregationInput[]
    by: MesinScalarFieldEnum[] | MesinScalarFieldEnum
    having?: MesinScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MesinCountAggregateInputType | true
    _min?: MesinMinAggregateInputType
    _max?: MesinMaxAggregateInputType
  }

  export type MesinGroupByOutputType = {
    idMesin: string
    namaMesin: string
    kapasitas: string
    status: string
    lokasi: string
    lastService: Date | null
    pelanggan: string | null
    _count: MesinCountAggregateOutputType | null
    _min: MesinMinAggregateOutputType | null
    _max: MesinMaxAggregateOutputType | null
  }

  type GetMesinGroupByPayload<T extends MesinGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MesinGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MesinGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MesinGroupByOutputType[P]>
            : GetScalarType<T[P], MesinGroupByOutputType[P]>
        }
      >
    >


  export type MesinSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idMesin?: boolean
    namaMesin?: boolean
    kapasitas?: boolean
    status?: boolean
    lokasi?: boolean
    lastService?: boolean
    pelanggan?: boolean
    permintaan?: boolean | Mesin$permintaanArgs<ExtArgs>
    _count?: boolean | MesinCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mesin"]>

  export type MesinSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idMesin?: boolean
    namaMesin?: boolean
    kapasitas?: boolean
    status?: boolean
    lokasi?: boolean
    lastService?: boolean
    pelanggan?: boolean
  }, ExtArgs["result"]["mesin"]>

  export type MesinSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idMesin?: boolean
    namaMesin?: boolean
    kapasitas?: boolean
    status?: boolean
    lokasi?: boolean
    lastService?: boolean
    pelanggan?: boolean
  }, ExtArgs["result"]["mesin"]>

  export type MesinSelectScalar = {
    idMesin?: boolean
    namaMesin?: boolean
    kapasitas?: boolean
    status?: boolean
    lokasi?: boolean
    lastService?: boolean
    pelanggan?: boolean
  }

  export type MesinOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idMesin" | "namaMesin" | "kapasitas" | "status" | "lokasi" | "lastService" | "pelanggan", ExtArgs["result"]["mesin"]>
  export type MesinInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permintaan?: boolean | Mesin$permintaanArgs<ExtArgs>
    _count?: boolean | MesinCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type MesinIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type MesinIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $MesinPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mesin"
    objects: {
      permintaan: Prisma.$PermintaanMesinPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      idMesin: string
      namaMesin: string
      kapasitas: string
      status: string
      lokasi: string
      lastService: Date | null
      pelanggan: string | null
    }, ExtArgs["result"]["mesin"]>
    composites: {}
  }

  type MesinGetPayload<S extends boolean | null | undefined | MesinDefaultArgs> = $Result.GetResult<Prisma.$MesinPayload, S>

  type MesinCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MesinFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MesinCountAggregateInputType | true
    }

  export interface MesinDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mesin'], meta: { name: 'Mesin' } }
    /**
     * Find zero or one Mesin that matches the filter.
     * @param {MesinFindUniqueArgs} args - Arguments to find a Mesin
     * @example
     * // Get one Mesin
     * const mesin = await prisma.mesin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MesinFindUniqueArgs>(args: SelectSubset<T, MesinFindUniqueArgs<ExtArgs>>): Prisma__MesinClient<$Result.GetResult<Prisma.$MesinPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mesin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MesinFindUniqueOrThrowArgs} args - Arguments to find a Mesin
     * @example
     * // Get one Mesin
     * const mesin = await prisma.mesin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MesinFindUniqueOrThrowArgs>(args: SelectSubset<T, MesinFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MesinClient<$Result.GetResult<Prisma.$MesinPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mesin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesinFindFirstArgs} args - Arguments to find a Mesin
     * @example
     * // Get one Mesin
     * const mesin = await prisma.mesin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MesinFindFirstArgs>(args?: SelectSubset<T, MesinFindFirstArgs<ExtArgs>>): Prisma__MesinClient<$Result.GetResult<Prisma.$MesinPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mesin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesinFindFirstOrThrowArgs} args - Arguments to find a Mesin
     * @example
     * // Get one Mesin
     * const mesin = await prisma.mesin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MesinFindFirstOrThrowArgs>(args?: SelectSubset<T, MesinFindFirstOrThrowArgs<ExtArgs>>): Prisma__MesinClient<$Result.GetResult<Prisma.$MesinPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mesins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesinFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mesins
     * const mesins = await prisma.mesin.findMany()
     * 
     * // Get first 10 Mesins
     * const mesins = await prisma.mesin.findMany({ take: 10 })
     * 
     * // Only select the `idMesin`
     * const mesinWithIdMesinOnly = await prisma.mesin.findMany({ select: { idMesin: true } })
     * 
     */
    findMany<T extends MesinFindManyArgs>(args?: SelectSubset<T, MesinFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MesinPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mesin.
     * @param {MesinCreateArgs} args - Arguments to create a Mesin.
     * @example
     * // Create one Mesin
     * const Mesin = await prisma.mesin.create({
     *   data: {
     *     // ... data to create a Mesin
     *   }
     * })
     * 
     */
    create<T extends MesinCreateArgs>(args: SelectSubset<T, MesinCreateArgs<ExtArgs>>): Prisma__MesinClient<$Result.GetResult<Prisma.$MesinPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mesins.
     * @param {MesinCreateManyArgs} args - Arguments to create many Mesins.
     * @example
     * // Create many Mesins
     * const mesin = await prisma.mesin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MesinCreateManyArgs>(args?: SelectSubset<T, MesinCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Mesins and returns the data saved in the database.
     * @param {MesinCreateManyAndReturnArgs} args - Arguments to create many Mesins.
     * @example
     * // Create many Mesins
     * const mesin = await prisma.mesin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Mesins and only return the `idMesin`
     * const mesinWithIdMesinOnly = await prisma.mesin.createManyAndReturn({
     *   select: { idMesin: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MesinCreateManyAndReturnArgs>(args?: SelectSubset<T, MesinCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MesinPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mesin.
     * @param {MesinDeleteArgs} args - Arguments to delete one Mesin.
     * @example
     * // Delete one Mesin
     * const Mesin = await prisma.mesin.delete({
     *   where: {
     *     // ... filter to delete one Mesin
     *   }
     * })
     * 
     */
    delete<T extends MesinDeleteArgs>(args: SelectSubset<T, MesinDeleteArgs<ExtArgs>>): Prisma__MesinClient<$Result.GetResult<Prisma.$MesinPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mesin.
     * @param {MesinUpdateArgs} args - Arguments to update one Mesin.
     * @example
     * // Update one Mesin
     * const mesin = await prisma.mesin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MesinUpdateArgs>(args: SelectSubset<T, MesinUpdateArgs<ExtArgs>>): Prisma__MesinClient<$Result.GetResult<Prisma.$MesinPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mesins.
     * @param {MesinDeleteManyArgs} args - Arguments to filter Mesins to delete.
     * @example
     * // Delete a few Mesins
     * const { count } = await prisma.mesin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MesinDeleteManyArgs>(args?: SelectSubset<T, MesinDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mesins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesinUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mesins
     * const mesin = await prisma.mesin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MesinUpdateManyArgs>(args: SelectSubset<T, MesinUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mesins and returns the data updated in the database.
     * @param {MesinUpdateManyAndReturnArgs} args - Arguments to update many Mesins.
     * @example
     * // Update many Mesins
     * const mesin = await prisma.mesin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Mesins and only return the `idMesin`
     * const mesinWithIdMesinOnly = await prisma.mesin.updateManyAndReturn({
     *   select: { idMesin: true },
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
    updateManyAndReturn<T extends MesinUpdateManyAndReturnArgs>(args: SelectSubset<T, MesinUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MesinPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mesin.
     * @param {MesinUpsertArgs} args - Arguments to update or create a Mesin.
     * @example
     * // Update or create a Mesin
     * const mesin = await prisma.mesin.upsert({
     *   create: {
     *     // ... data to create a Mesin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mesin we want to update
     *   }
     * })
     */
    upsert<T extends MesinUpsertArgs>(args: SelectSubset<T, MesinUpsertArgs<ExtArgs>>): Prisma__MesinClient<$Result.GetResult<Prisma.$MesinPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mesins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesinCountArgs} args - Arguments to filter Mesins to count.
     * @example
     * // Count the number of Mesins
     * const count = await prisma.mesin.count({
     *   where: {
     *     // ... the filter for the Mesins we want to count
     *   }
     * })
    **/
    count<T extends MesinCountArgs>(
      args?: Subset<T, MesinCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MesinCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mesin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesinAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MesinAggregateArgs>(args: Subset<T, MesinAggregateArgs>): Prisma.PrismaPromise<GetMesinAggregateType<T>>

    /**
     * Group by Mesin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MesinGroupByArgs} args - Group by arguments.
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
      T extends MesinGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MesinGroupByArgs['orderBy'] }
        : { orderBy?: MesinGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, MesinGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMesinGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mesin model
   */
  readonly fields: MesinFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mesin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MesinClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    permintaan<T extends Mesin$permintaanArgs<ExtArgs> = {}>(args?: Subset<T, Mesin$permintaanArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermintaanMesinPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the Mesin model
   */
  interface MesinFieldRefs {
    readonly idMesin: FieldRef<"Mesin", 'String'>
    readonly namaMesin: FieldRef<"Mesin", 'String'>
    readonly kapasitas: FieldRef<"Mesin", 'String'>
    readonly status: FieldRef<"Mesin", 'String'>
    readonly lokasi: FieldRef<"Mesin", 'String'>
    readonly lastService: FieldRef<"Mesin", 'DateTime'>
    readonly pelanggan: FieldRef<"Mesin", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Mesin findUnique
   */
  export type MesinFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesin
     */
    select?: MesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesin
     */
    omit?: MesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesinInclude<ExtArgs> | null
    /**
     * Filter, which Mesin to fetch.
     */
    where: MesinWhereUniqueInput
  }

  /**
   * Mesin findUniqueOrThrow
   */
  export type MesinFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesin
     */
    select?: MesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesin
     */
    omit?: MesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesinInclude<ExtArgs> | null
    /**
     * Filter, which Mesin to fetch.
     */
    where: MesinWhereUniqueInput
  }

  /**
   * Mesin findFirst
   */
  export type MesinFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesin
     */
    select?: MesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesin
     */
    omit?: MesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesinInclude<ExtArgs> | null
    /**
     * Filter, which Mesin to fetch.
     */
    where?: MesinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mesins to fetch.
     */
    orderBy?: MesinOrderByWithRelationInput | MesinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mesins.
     */
    cursor?: MesinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mesins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mesins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mesins.
     */
    distinct?: MesinScalarFieldEnum | MesinScalarFieldEnum[]
  }

  /**
   * Mesin findFirstOrThrow
   */
  export type MesinFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesin
     */
    select?: MesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesin
     */
    omit?: MesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesinInclude<ExtArgs> | null
    /**
     * Filter, which Mesin to fetch.
     */
    where?: MesinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mesins to fetch.
     */
    orderBy?: MesinOrderByWithRelationInput | MesinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mesins.
     */
    cursor?: MesinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mesins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mesins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mesins.
     */
    distinct?: MesinScalarFieldEnum | MesinScalarFieldEnum[]
  }

  /**
   * Mesin findMany
   */
  export type MesinFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesin
     */
    select?: MesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesin
     */
    omit?: MesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesinInclude<ExtArgs> | null
    /**
     * Filter, which Mesins to fetch.
     */
    where?: MesinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mesins to fetch.
     */
    orderBy?: MesinOrderByWithRelationInput | MesinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Mesins.
     */
    cursor?: MesinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mesins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mesins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mesins.
     */
    distinct?: MesinScalarFieldEnum | MesinScalarFieldEnum[]
  }

  /**
   * Mesin create
   */
  export type MesinCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesin
     */
    select?: MesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesin
     */
    omit?: MesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesinInclude<ExtArgs> | null
    /**
     * The data needed to create a Mesin.
     */
    data: XOR<MesinCreateInput, MesinUncheckedCreateInput>
  }

  /**
   * Mesin createMany
   */
  export type MesinCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Mesins.
     */
    data: MesinCreateManyInput | MesinCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mesin createManyAndReturn
   */
  export type MesinCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesin
     */
    select?: MesinSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mesin
     */
    omit?: MesinOmit<ExtArgs> | null
    /**
     * The data used to create many Mesins.
     */
    data: MesinCreateManyInput | MesinCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mesin update
   */
  export type MesinUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesin
     */
    select?: MesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesin
     */
    omit?: MesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesinInclude<ExtArgs> | null
    /**
     * The data needed to update a Mesin.
     */
    data: XOR<MesinUpdateInput, MesinUncheckedUpdateInput>
    /**
     * Choose, which Mesin to update.
     */
    where: MesinWhereUniqueInput
  }

  /**
   * Mesin updateMany
   */
  export type MesinUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Mesins.
     */
    data: XOR<MesinUpdateManyMutationInput, MesinUncheckedUpdateManyInput>
    /**
     * Filter which Mesins to update
     */
    where?: MesinWhereInput
    /**
     * Limit how many Mesins to update.
     */
    limit?: number
  }

  /**
   * Mesin updateManyAndReturn
   */
  export type MesinUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesin
     */
    select?: MesinSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mesin
     */
    omit?: MesinOmit<ExtArgs> | null
    /**
     * The data used to update Mesins.
     */
    data: XOR<MesinUpdateManyMutationInput, MesinUncheckedUpdateManyInput>
    /**
     * Filter which Mesins to update
     */
    where?: MesinWhereInput
    /**
     * Limit how many Mesins to update.
     */
    limit?: number
  }

  /**
   * Mesin upsert
   */
  export type MesinUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesin
     */
    select?: MesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesin
     */
    omit?: MesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesinInclude<ExtArgs> | null
    /**
     * The filter to search for the Mesin to update in case it exists.
     */
    where: MesinWhereUniqueInput
    /**
     * In case the Mesin found by the `where` argument doesn't exist, create a new Mesin with this data.
     */
    create: XOR<MesinCreateInput, MesinUncheckedCreateInput>
    /**
     * In case the Mesin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MesinUpdateInput, MesinUncheckedUpdateInput>
  }

  /**
   * Mesin delete
   */
  export type MesinDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesin
     */
    select?: MesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesin
     */
    omit?: MesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesinInclude<ExtArgs> | null
    /**
     * Filter which Mesin to delete.
     */
    where: MesinWhereUniqueInput
  }

  /**
   * Mesin deleteMany
   */
  export type MesinDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mesins to delete
     */
    where?: MesinWhereInput
    /**
     * Limit how many Mesins to delete.
     */
    limit?: number
  }

  /**
   * Mesin.permintaan
   */
  export type Mesin$permintaanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanMesin
     */
    select?: PermintaanMesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanMesin
     */
    omit?: PermintaanMesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanMesinInclude<ExtArgs> | null
    where?: PermintaanMesinWhereInput
    orderBy?: PermintaanMesinOrderByWithRelationInput | PermintaanMesinOrderByWithRelationInput[]
    cursor?: PermintaanMesinWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PermintaanMesinScalarFieldEnum | PermintaanMesinScalarFieldEnum[]
  }

  /**
   * Mesin without action
   */
  export type MesinDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mesin
     */
    select?: MesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mesin
     */
    omit?: MesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MesinInclude<ExtArgs> | null
  }


  /**
   * Model PermintaanSewa
   */

  export type AggregatePermintaanSewa = {
    _count: PermintaanSewaCountAggregateOutputType | null
    _avg: PermintaanSewaAvgAggregateOutputType | null
    _sum: PermintaanSewaSumAggregateOutputType | null
    _min: PermintaanSewaMinAggregateOutputType | null
    _max: PermintaanSewaMaxAggregateOutputType | null
  }

  export type PermintaanSewaAvgAggregateOutputType = {
    durasi: number | null
  }

  export type PermintaanSewaSumAggregateOutputType = {
    durasi: number | null
  }

  export type PermintaanSewaMinAggregateOutputType = {
    idPermintaan: string | null
    pelanggan: string | null
    lokasi: string | null
    durasi: number | null
    status: string | null
    tanggalFormat: string | null
  }

  export type PermintaanSewaMaxAggregateOutputType = {
    idPermintaan: string | null
    pelanggan: string | null
    lokasi: string | null
    durasi: number | null
    status: string | null
    tanggalFormat: string | null
  }

  export type PermintaanSewaCountAggregateOutputType = {
    idPermintaan: number
    pelanggan: number
    lokasi: number
    durasi: number
    status: number
    tanggalFormat: number
    _all: number
  }


  export type PermintaanSewaAvgAggregateInputType = {
    durasi?: true
  }

  export type PermintaanSewaSumAggregateInputType = {
    durasi?: true
  }

  export type PermintaanSewaMinAggregateInputType = {
    idPermintaan?: true
    pelanggan?: true
    lokasi?: true
    durasi?: true
    status?: true
    tanggalFormat?: true
  }

  export type PermintaanSewaMaxAggregateInputType = {
    idPermintaan?: true
    pelanggan?: true
    lokasi?: true
    durasi?: true
    status?: true
    tanggalFormat?: true
  }

  export type PermintaanSewaCountAggregateInputType = {
    idPermintaan?: true
    pelanggan?: true
    lokasi?: true
    durasi?: true
    status?: true
    tanggalFormat?: true
    _all?: true
  }

  export type PermintaanSewaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PermintaanSewa to aggregate.
     */
    where?: PermintaanSewaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermintaanSewas to fetch.
     */
    orderBy?: PermintaanSewaOrderByWithRelationInput | PermintaanSewaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PermintaanSewaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermintaanSewas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermintaanSewas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PermintaanSewas
    **/
    _count?: true | PermintaanSewaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PermintaanSewaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PermintaanSewaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PermintaanSewaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PermintaanSewaMaxAggregateInputType
  }

  export type GetPermintaanSewaAggregateType<T extends PermintaanSewaAggregateArgs> = {
        [P in keyof T & keyof AggregatePermintaanSewa]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePermintaanSewa[P]>
      : GetScalarType<T[P], AggregatePermintaanSewa[P]>
  }




  export type PermintaanSewaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermintaanSewaWhereInput
    orderBy?: PermintaanSewaOrderByWithAggregationInput | PermintaanSewaOrderByWithAggregationInput[]
    by: PermintaanSewaScalarFieldEnum[] | PermintaanSewaScalarFieldEnum
    having?: PermintaanSewaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PermintaanSewaCountAggregateInputType | true
    _avg?: PermintaanSewaAvgAggregateInputType
    _sum?: PermintaanSewaSumAggregateInputType
    _min?: PermintaanSewaMinAggregateInputType
    _max?: PermintaanSewaMaxAggregateInputType
  }

  export type PermintaanSewaGroupByOutputType = {
    idPermintaan: string
    pelanggan: string
    lokasi: string
    durasi: number
    status: string
    tanggalFormat: string
    _count: PermintaanSewaCountAggregateOutputType | null
    _avg: PermintaanSewaAvgAggregateOutputType | null
    _sum: PermintaanSewaSumAggregateOutputType | null
    _min: PermintaanSewaMinAggregateOutputType | null
    _max: PermintaanSewaMaxAggregateOutputType | null
  }

  type GetPermintaanSewaGroupByPayload<T extends PermintaanSewaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PermintaanSewaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PermintaanSewaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PermintaanSewaGroupByOutputType[P]>
            : GetScalarType<T[P], PermintaanSewaGroupByOutputType[P]>
        }
      >
    >


  export type PermintaanSewaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idPermintaan?: boolean
    pelanggan?: boolean
    lokasi?: boolean
    durasi?: boolean
    status?: boolean
    tanggalFormat?: boolean
    mesin?: boolean | PermintaanSewa$mesinArgs<ExtArgs>
    pembayaran?: boolean | PermintaanSewa$pembayaranArgs<ExtArgs>
    pengiriman?: boolean | PermintaanSewa$pengirimanArgs<ExtArgs>
    _count?: boolean | PermintaanSewaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permintaanSewa"]>

  export type PermintaanSewaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idPermintaan?: boolean
    pelanggan?: boolean
    lokasi?: boolean
    durasi?: boolean
    status?: boolean
    tanggalFormat?: boolean
  }, ExtArgs["result"]["permintaanSewa"]>

  export type PermintaanSewaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idPermintaan?: boolean
    pelanggan?: boolean
    lokasi?: boolean
    durasi?: boolean
    status?: boolean
    tanggalFormat?: boolean
  }, ExtArgs["result"]["permintaanSewa"]>

  export type PermintaanSewaSelectScalar = {
    idPermintaan?: boolean
    pelanggan?: boolean
    lokasi?: boolean
    durasi?: boolean
    status?: boolean
    tanggalFormat?: boolean
  }

  export type PermintaanSewaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idPermintaan" | "pelanggan" | "lokasi" | "durasi" | "status" | "tanggalFormat", ExtArgs["result"]["permintaanSewa"]>
  export type PermintaanSewaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mesin?: boolean | PermintaanSewa$mesinArgs<ExtArgs>
    pembayaran?: boolean | PermintaanSewa$pembayaranArgs<ExtArgs>
    pengiriman?: boolean | PermintaanSewa$pengirimanArgs<ExtArgs>
    _count?: boolean | PermintaanSewaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PermintaanSewaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type PermintaanSewaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $PermintaanSewaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PermintaanSewa"
    objects: {
      mesin: Prisma.$PermintaanMesinPayload<ExtArgs>[]
      pembayaran: Prisma.$PembayaranPayload<ExtArgs>[]
      pengiriman: Prisma.$PengirimanPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      idPermintaan: string
      pelanggan: string
      lokasi: string
      durasi: number
      status: string
      tanggalFormat: string
    }, ExtArgs["result"]["permintaanSewa"]>
    composites: {}
  }

  type PermintaanSewaGetPayload<S extends boolean | null | undefined | PermintaanSewaDefaultArgs> = $Result.GetResult<Prisma.$PermintaanSewaPayload, S>

  type PermintaanSewaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PermintaanSewaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PermintaanSewaCountAggregateInputType | true
    }

  export interface PermintaanSewaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PermintaanSewa'], meta: { name: 'PermintaanSewa' } }
    /**
     * Find zero or one PermintaanSewa that matches the filter.
     * @param {PermintaanSewaFindUniqueArgs} args - Arguments to find a PermintaanSewa
     * @example
     * // Get one PermintaanSewa
     * const permintaanSewa = await prisma.permintaanSewa.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PermintaanSewaFindUniqueArgs>(args: SelectSubset<T, PermintaanSewaFindUniqueArgs<ExtArgs>>): Prisma__PermintaanSewaClient<$Result.GetResult<Prisma.$PermintaanSewaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PermintaanSewa that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PermintaanSewaFindUniqueOrThrowArgs} args - Arguments to find a PermintaanSewa
     * @example
     * // Get one PermintaanSewa
     * const permintaanSewa = await prisma.permintaanSewa.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PermintaanSewaFindUniqueOrThrowArgs>(args: SelectSubset<T, PermintaanSewaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PermintaanSewaClient<$Result.GetResult<Prisma.$PermintaanSewaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PermintaanSewa that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermintaanSewaFindFirstArgs} args - Arguments to find a PermintaanSewa
     * @example
     * // Get one PermintaanSewa
     * const permintaanSewa = await prisma.permintaanSewa.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PermintaanSewaFindFirstArgs>(args?: SelectSubset<T, PermintaanSewaFindFirstArgs<ExtArgs>>): Prisma__PermintaanSewaClient<$Result.GetResult<Prisma.$PermintaanSewaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PermintaanSewa that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermintaanSewaFindFirstOrThrowArgs} args - Arguments to find a PermintaanSewa
     * @example
     * // Get one PermintaanSewa
     * const permintaanSewa = await prisma.permintaanSewa.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PermintaanSewaFindFirstOrThrowArgs>(args?: SelectSubset<T, PermintaanSewaFindFirstOrThrowArgs<ExtArgs>>): Prisma__PermintaanSewaClient<$Result.GetResult<Prisma.$PermintaanSewaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PermintaanSewas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermintaanSewaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PermintaanSewas
     * const permintaanSewas = await prisma.permintaanSewa.findMany()
     * 
     * // Get first 10 PermintaanSewas
     * const permintaanSewas = await prisma.permintaanSewa.findMany({ take: 10 })
     * 
     * // Only select the `idPermintaan`
     * const permintaanSewaWithIdPermintaanOnly = await prisma.permintaanSewa.findMany({ select: { idPermintaan: true } })
     * 
     */
    findMany<T extends PermintaanSewaFindManyArgs>(args?: SelectSubset<T, PermintaanSewaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermintaanSewaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PermintaanSewa.
     * @param {PermintaanSewaCreateArgs} args - Arguments to create a PermintaanSewa.
     * @example
     * // Create one PermintaanSewa
     * const PermintaanSewa = await prisma.permintaanSewa.create({
     *   data: {
     *     // ... data to create a PermintaanSewa
     *   }
     * })
     * 
     */
    create<T extends PermintaanSewaCreateArgs>(args: SelectSubset<T, PermintaanSewaCreateArgs<ExtArgs>>): Prisma__PermintaanSewaClient<$Result.GetResult<Prisma.$PermintaanSewaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PermintaanSewas.
     * @param {PermintaanSewaCreateManyArgs} args - Arguments to create many PermintaanSewas.
     * @example
     * // Create many PermintaanSewas
     * const permintaanSewa = await prisma.permintaanSewa.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PermintaanSewaCreateManyArgs>(args?: SelectSubset<T, PermintaanSewaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PermintaanSewas and returns the data saved in the database.
     * @param {PermintaanSewaCreateManyAndReturnArgs} args - Arguments to create many PermintaanSewas.
     * @example
     * // Create many PermintaanSewas
     * const permintaanSewa = await prisma.permintaanSewa.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PermintaanSewas and only return the `idPermintaan`
     * const permintaanSewaWithIdPermintaanOnly = await prisma.permintaanSewa.createManyAndReturn({
     *   select: { idPermintaan: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PermintaanSewaCreateManyAndReturnArgs>(args?: SelectSubset<T, PermintaanSewaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermintaanSewaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PermintaanSewa.
     * @param {PermintaanSewaDeleteArgs} args - Arguments to delete one PermintaanSewa.
     * @example
     * // Delete one PermintaanSewa
     * const PermintaanSewa = await prisma.permintaanSewa.delete({
     *   where: {
     *     // ... filter to delete one PermintaanSewa
     *   }
     * })
     * 
     */
    delete<T extends PermintaanSewaDeleteArgs>(args: SelectSubset<T, PermintaanSewaDeleteArgs<ExtArgs>>): Prisma__PermintaanSewaClient<$Result.GetResult<Prisma.$PermintaanSewaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PermintaanSewa.
     * @param {PermintaanSewaUpdateArgs} args - Arguments to update one PermintaanSewa.
     * @example
     * // Update one PermintaanSewa
     * const permintaanSewa = await prisma.permintaanSewa.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PermintaanSewaUpdateArgs>(args: SelectSubset<T, PermintaanSewaUpdateArgs<ExtArgs>>): Prisma__PermintaanSewaClient<$Result.GetResult<Prisma.$PermintaanSewaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PermintaanSewas.
     * @param {PermintaanSewaDeleteManyArgs} args - Arguments to filter PermintaanSewas to delete.
     * @example
     * // Delete a few PermintaanSewas
     * const { count } = await prisma.permintaanSewa.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PermintaanSewaDeleteManyArgs>(args?: SelectSubset<T, PermintaanSewaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PermintaanSewas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermintaanSewaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PermintaanSewas
     * const permintaanSewa = await prisma.permintaanSewa.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PermintaanSewaUpdateManyArgs>(args: SelectSubset<T, PermintaanSewaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PermintaanSewas and returns the data updated in the database.
     * @param {PermintaanSewaUpdateManyAndReturnArgs} args - Arguments to update many PermintaanSewas.
     * @example
     * // Update many PermintaanSewas
     * const permintaanSewa = await prisma.permintaanSewa.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PermintaanSewas and only return the `idPermintaan`
     * const permintaanSewaWithIdPermintaanOnly = await prisma.permintaanSewa.updateManyAndReturn({
     *   select: { idPermintaan: true },
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
    updateManyAndReturn<T extends PermintaanSewaUpdateManyAndReturnArgs>(args: SelectSubset<T, PermintaanSewaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermintaanSewaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PermintaanSewa.
     * @param {PermintaanSewaUpsertArgs} args - Arguments to update or create a PermintaanSewa.
     * @example
     * // Update or create a PermintaanSewa
     * const permintaanSewa = await prisma.permintaanSewa.upsert({
     *   create: {
     *     // ... data to create a PermintaanSewa
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PermintaanSewa we want to update
     *   }
     * })
     */
    upsert<T extends PermintaanSewaUpsertArgs>(args: SelectSubset<T, PermintaanSewaUpsertArgs<ExtArgs>>): Prisma__PermintaanSewaClient<$Result.GetResult<Prisma.$PermintaanSewaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PermintaanSewas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermintaanSewaCountArgs} args - Arguments to filter PermintaanSewas to count.
     * @example
     * // Count the number of PermintaanSewas
     * const count = await prisma.permintaanSewa.count({
     *   where: {
     *     // ... the filter for the PermintaanSewas we want to count
     *   }
     * })
    **/
    count<T extends PermintaanSewaCountArgs>(
      args?: Subset<T, PermintaanSewaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PermintaanSewaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PermintaanSewa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermintaanSewaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PermintaanSewaAggregateArgs>(args: Subset<T, PermintaanSewaAggregateArgs>): Prisma.PrismaPromise<GetPermintaanSewaAggregateType<T>>

    /**
     * Group by PermintaanSewa.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermintaanSewaGroupByArgs} args - Group by arguments.
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
      T extends PermintaanSewaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PermintaanSewaGroupByArgs['orderBy'] }
        : { orderBy?: PermintaanSewaGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PermintaanSewaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermintaanSewaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PermintaanSewa model
   */
  readonly fields: PermintaanSewaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PermintaanSewa.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PermintaanSewaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mesin<T extends PermintaanSewa$mesinArgs<ExtArgs> = {}>(args?: Subset<T, PermintaanSewa$mesinArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermintaanMesinPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pembayaran<T extends PermintaanSewa$pembayaranArgs<ExtArgs> = {}>(args?: Subset<T, PermintaanSewa$pembayaranArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    pengiriman<T extends PermintaanSewa$pengirimanArgs<ExtArgs> = {}>(args?: Subset<T, PermintaanSewa$pengirimanArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PengirimanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the PermintaanSewa model
   */
  interface PermintaanSewaFieldRefs {
    readonly idPermintaan: FieldRef<"PermintaanSewa", 'String'>
    readonly pelanggan: FieldRef<"PermintaanSewa", 'String'>
    readonly lokasi: FieldRef<"PermintaanSewa", 'String'>
    readonly durasi: FieldRef<"PermintaanSewa", 'Int'>
    readonly status: FieldRef<"PermintaanSewa", 'String'>
    readonly tanggalFormat: FieldRef<"PermintaanSewa", 'String'>
  }
    

  // Custom InputTypes
  /**
   * PermintaanSewa findUnique
   */
  export type PermintaanSewaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanSewa
     */
    select?: PermintaanSewaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanSewa
     */
    omit?: PermintaanSewaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanSewaInclude<ExtArgs> | null
    /**
     * Filter, which PermintaanSewa to fetch.
     */
    where: PermintaanSewaWhereUniqueInput
  }

  /**
   * PermintaanSewa findUniqueOrThrow
   */
  export type PermintaanSewaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanSewa
     */
    select?: PermintaanSewaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanSewa
     */
    omit?: PermintaanSewaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanSewaInclude<ExtArgs> | null
    /**
     * Filter, which PermintaanSewa to fetch.
     */
    where: PermintaanSewaWhereUniqueInput
  }

  /**
   * PermintaanSewa findFirst
   */
  export type PermintaanSewaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanSewa
     */
    select?: PermintaanSewaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanSewa
     */
    omit?: PermintaanSewaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanSewaInclude<ExtArgs> | null
    /**
     * Filter, which PermintaanSewa to fetch.
     */
    where?: PermintaanSewaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermintaanSewas to fetch.
     */
    orderBy?: PermintaanSewaOrderByWithRelationInput | PermintaanSewaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PermintaanSewas.
     */
    cursor?: PermintaanSewaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermintaanSewas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermintaanSewas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PermintaanSewas.
     */
    distinct?: PermintaanSewaScalarFieldEnum | PermintaanSewaScalarFieldEnum[]
  }

  /**
   * PermintaanSewa findFirstOrThrow
   */
  export type PermintaanSewaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanSewa
     */
    select?: PermintaanSewaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanSewa
     */
    omit?: PermintaanSewaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanSewaInclude<ExtArgs> | null
    /**
     * Filter, which PermintaanSewa to fetch.
     */
    where?: PermintaanSewaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermintaanSewas to fetch.
     */
    orderBy?: PermintaanSewaOrderByWithRelationInput | PermintaanSewaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PermintaanSewas.
     */
    cursor?: PermintaanSewaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermintaanSewas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermintaanSewas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PermintaanSewas.
     */
    distinct?: PermintaanSewaScalarFieldEnum | PermintaanSewaScalarFieldEnum[]
  }

  /**
   * PermintaanSewa findMany
   */
  export type PermintaanSewaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanSewa
     */
    select?: PermintaanSewaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanSewa
     */
    omit?: PermintaanSewaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanSewaInclude<ExtArgs> | null
    /**
     * Filter, which PermintaanSewas to fetch.
     */
    where?: PermintaanSewaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermintaanSewas to fetch.
     */
    orderBy?: PermintaanSewaOrderByWithRelationInput | PermintaanSewaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PermintaanSewas.
     */
    cursor?: PermintaanSewaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermintaanSewas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermintaanSewas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PermintaanSewas.
     */
    distinct?: PermintaanSewaScalarFieldEnum | PermintaanSewaScalarFieldEnum[]
  }

  /**
   * PermintaanSewa create
   */
  export type PermintaanSewaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanSewa
     */
    select?: PermintaanSewaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanSewa
     */
    omit?: PermintaanSewaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanSewaInclude<ExtArgs> | null
    /**
     * The data needed to create a PermintaanSewa.
     */
    data: XOR<PermintaanSewaCreateInput, PermintaanSewaUncheckedCreateInput>
  }

  /**
   * PermintaanSewa createMany
   */
  export type PermintaanSewaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PermintaanSewas.
     */
    data: PermintaanSewaCreateManyInput | PermintaanSewaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PermintaanSewa createManyAndReturn
   */
  export type PermintaanSewaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanSewa
     */
    select?: PermintaanSewaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanSewa
     */
    omit?: PermintaanSewaOmit<ExtArgs> | null
    /**
     * The data used to create many PermintaanSewas.
     */
    data: PermintaanSewaCreateManyInput | PermintaanSewaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PermintaanSewa update
   */
  export type PermintaanSewaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanSewa
     */
    select?: PermintaanSewaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanSewa
     */
    omit?: PermintaanSewaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanSewaInclude<ExtArgs> | null
    /**
     * The data needed to update a PermintaanSewa.
     */
    data: XOR<PermintaanSewaUpdateInput, PermintaanSewaUncheckedUpdateInput>
    /**
     * Choose, which PermintaanSewa to update.
     */
    where: PermintaanSewaWhereUniqueInput
  }

  /**
   * PermintaanSewa updateMany
   */
  export type PermintaanSewaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PermintaanSewas.
     */
    data: XOR<PermintaanSewaUpdateManyMutationInput, PermintaanSewaUncheckedUpdateManyInput>
    /**
     * Filter which PermintaanSewas to update
     */
    where?: PermintaanSewaWhereInput
    /**
     * Limit how many PermintaanSewas to update.
     */
    limit?: number
  }

  /**
   * PermintaanSewa updateManyAndReturn
   */
  export type PermintaanSewaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanSewa
     */
    select?: PermintaanSewaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanSewa
     */
    omit?: PermintaanSewaOmit<ExtArgs> | null
    /**
     * The data used to update PermintaanSewas.
     */
    data: XOR<PermintaanSewaUpdateManyMutationInput, PermintaanSewaUncheckedUpdateManyInput>
    /**
     * Filter which PermintaanSewas to update
     */
    where?: PermintaanSewaWhereInput
    /**
     * Limit how many PermintaanSewas to update.
     */
    limit?: number
  }

  /**
   * PermintaanSewa upsert
   */
  export type PermintaanSewaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanSewa
     */
    select?: PermintaanSewaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanSewa
     */
    omit?: PermintaanSewaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanSewaInclude<ExtArgs> | null
    /**
     * The filter to search for the PermintaanSewa to update in case it exists.
     */
    where: PermintaanSewaWhereUniqueInput
    /**
     * In case the PermintaanSewa found by the `where` argument doesn't exist, create a new PermintaanSewa with this data.
     */
    create: XOR<PermintaanSewaCreateInput, PermintaanSewaUncheckedCreateInput>
    /**
     * In case the PermintaanSewa was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PermintaanSewaUpdateInput, PermintaanSewaUncheckedUpdateInput>
  }

  /**
   * PermintaanSewa delete
   */
  export type PermintaanSewaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanSewa
     */
    select?: PermintaanSewaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanSewa
     */
    omit?: PermintaanSewaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanSewaInclude<ExtArgs> | null
    /**
     * Filter which PermintaanSewa to delete.
     */
    where: PermintaanSewaWhereUniqueInput
  }

  /**
   * PermintaanSewa deleteMany
   */
  export type PermintaanSewaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PermintaanSewas to delete
     */
    where?: PermintaanSewaWhereInput
    /**
     * Limit how many PermintaanSewas to delete.
     */
    limit?: number
  }

  /**
   * PermintaanSewa.mesin
   */
  export type PermintaanSewa$mesinArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanMesin
     */
    select?: PermintaanMesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanMesin
     */
    omit?: PermintaanMesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanMesinInclude<ExtArgs> | null
    where?: PermintaanMesinWhereInput
    orderBy?: PermintaanMesinOrderByWithRelationInput | PermintaanMesinOrderByWithRelationInput[]
    cursor?: PermintaanMesinWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PermintaanMesinScalarFieldEnum | PermintaanMesinScalarFieldEnum[]
  }

  /**
   * PermintaanSewa.pembayaran
   */
  export type PermintaanSewa$pembayaranArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    where?: PembayaranWhereInput
    orderBy?: PembayaranOrderByWithRelationInput | PembayaranOrderByWithRelationInput[]
    cursor?: PembayaranWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PembayaranScalarFieldEnum | PembayaranScalarFieldEnum[]
  }

  /**
   * PermintaanSewa.pengiriman
   */
  export type PermintaanSewa$pengirimanArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengiriman
     */
    select?: PengirimanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengiriman
     */
    omit?: PengirimanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengirimanInclude<ExtArgs> | null
    where?: PengirimanWhereInput
    orderBy?: PengirimanOrderByWithRelationInput | PengirimanOrderByWithRelationInput[]
    cursor?: PengirimanWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PengirimanScalarFieldEnum | PengirimanScalarFieldEnum[]
  }

  /**
   * PermintaanSewa without action
   */
  export type PermintaanSewaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanSewa
     */
    select?: PermintaanSewaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanSewa
     */
    omit?: PermintaanSewaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanSewaInclude<ExtArgs> | null
  }


  /**
   * Model PermintaanMesin
   */

  export type AggregatePermintaanMesin = {
    _count: PermintaanMesinCountAggregateOutputType | null
    _avg: PermintaanMesinAvgAggregateOutputType | null
    _sum: PermintaanMesinSumAggregateOutputType | null
    _min: PermintaanMesinMinAggregateOutputType | null
    _max: PermintaanMesinMaxAggregateOutputType | null
  }

  export type PermintaanMesinAvgAggregateOutputType = {
    qty: number | null
    harga: number | null
    diskon: number | null
  }

  export type PermintaanMesinSumAggregateOutputType = {
    qty: number | null
    harga: number | null
    diskon: number | null
  }

  export type PermintaanMesinMinAggregateOutputType = {
    idPermintaan: string | null
    idMesin: string | null
    qty: number | null
    harga: number | null
    diskon: number | null
  }

  export type PermintaanMesinMaxAggregateOutputType = {
    idPermintaan: string | null
    idMesin: string | null
    qty: number | null
    harga: number | null
    diskon: number | null
  }

  export type PermintaanMesinCountAggregateOutputType = {
    idPermintaan: number
    idMesin: number
    qty: number
    harga: number
    diskon: number
    _all: number
  }


  export type PermintaanMesinAvgAggregateInputType = {
    qty?: true
    harga?: true
    diskon?: true
  }

  export type PermintaanMesinSumAggregateInputType = {
    qty?: true
    harga?: true
    diskon?: true
  }

  export type PermintaanMesinMinAggregateInputType = {
    idPermintaan?: true
    idMesin?: true
    qty?: true
    harga?: true
    diskon?: true
  }

  export type PermintaanMesinMaxAggregateInputType = {
    idPermintaan?: true
    idMesin?: true
    qty?: true
    harga?: true
    diskon?: true
  }

  export type PermintaanMesinCountAggregateInputType = {
    idPermintaan?: true
    idMesin?: true
    qty?: true
    harga?: true
    diskon?: true
    _all?: true
  }

  export type PermintaanMesinAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PermintaanMesin to aggregate.
     */
    where?: PermintaanMesinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermintaanMesins to fetch.
     */
    orderBy?: PermintaanMesinOrderByWithRelationInput | PermintaanMesinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PermintaanMesinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermintaanMesins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermintaanMesins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PermintaanMesins
    **/
    _count?: true | PermintaanMesinCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PermintaanMesinAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PermintaanMesinSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PermintaanMesinMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PermintaanMesinMaxAggregateInputType
  }

  export type GetPermintaanMesinAggregateType<T extends PermintaanMesinAggregateArgs> = {
        [P in keyof T & keyof AggregatePermintaanMesin]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePermintaanMesin[P]>
      : GetScalarType<T[P], AggregatePermintaanMesin[P]>
  }




  export type PermintaanMesinGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PermintaanMesinWhereInput
    orderBy?: PermintaanMesinOrderByWithAggregationInput | PermintaanMesinOrderByWithAggregationInput[]
    by: PermintaanMesinScalarFieldEnum[] | PermintaanMesinScalarFieldEnum
    having?: PermintaanMesinScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PermintaanMesinCountAggregateInputType | true
    _avg?: PermintaanMesinAvgAggregateInputType
    _sum?: PermintaanMesinSumAggregateInputType
    _min?: PermintaanMesinMinAggregateInputType
    _max?: PermintaanMesinMaxAggregateInputType
  }

  export type PermintaanMesinGroupByOutputType = {
    idPermintaan: string
    idMesin: string
    qty: number
    harga: number
    diskon: number
    _count: PermintaanMesinCountAggregateOutputType | null
    _avg: PermintaanMesinAvgAggregateOutputType | null
    _sum: PermintaanMesinSumAggregateOutputType | null
    _min: PermintaanMesinMinAggregateOutputType | null
    _max: PermintaanMesinMaxAggregateOutputType | null
  }

  type GetPermintaanMesinGroupByPayload<T extends PermintaanMesinGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PermintaanMesinGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PermintaanMesinGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PermintaanMesinGroupByOutputType[P]>
            : GetScalarType<T[P], PermintaanMesinGroupByOutputType[P]>
        }
      >
    >


  export type PermintaanMesinSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idPermintaan?: boolean
    idMesin?: boolean
    qty?: boolean
    harga?: boolean
    diskon?: boolean
    permintaan?: boolean | PermintaanSewaDefaultArgs<ExtArgs>
    mesin?: boolean | MesinDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permintaanMesin"]>

  export type PermintaanMesinSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idPermintaan?: boolean
    idMesin?: boolean
    qty?: boolean
    harga?: boolean
    diskon?: boolean
    permintaan?: boolean | PermintaanSewaDefaultArgs<ExtArgs>
    mesin?: boolean | MesinDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permintaanMesin"]>

  export type PermintaanMesinSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idPermintaan?: boolean
    idMesin?: boolean
    qty?: boolean
    harga?: boolean
    diskon?: boolean
    permintaan?: boolean | PermintaanSewaDefaultArgs<ExtArgs>
    mesin?: boolean | MesinDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["permintaanMesin"]>

  export type PermintaanMesinSelectScalar = {
    idPermintaan?: boolean
    idMesin?: boolean
    qty?: boolean
    harga?: boolean
    diskon?: boolean
  }

  export type PermintaanMesinOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idPermintaan" | "idMesin" | "qty" | "harga" | "diskon", ExtArgs["result"]["permintaanMesin"]>
  export type PermintaanMesinInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permintaan?: boolean | PermintaanSewaDefaultArgs<ExtArgs>
    mesin?: boolean | MesinDefaultArgs<ExtArgs>
  }
  export type PermintaanMesinIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permintaan?: boolean | PermintaanSewaDefaultArgs<ExtArgs>
    mesin?: boolean | MesinDefaultArgs<ExtArgs>
  }
  export type PermintaanMesinIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permintaan?: boolean | PermintaanSewaDefaultArgs<ExtArgs>
    mesin?: boolean | MesinDefaultArgs<ExtArgs>
  }

  export type $PermintaanMesinPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PermintaanMesin"
    objects: {
      permintaan: Prisma.$PermintaanSewaPayload<ExtArgs>
      mesin: Prisma.$MesinPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      idPermintaan: string
      idMesin: string
      qty: number
      harga: number
      diskon: number
    }, ExtArgs["result"]["permintaanMesin"]>
    composites: {}
  }

  type PermintaanMesinGetPayload<S extends boolean | null | undefined | PermintaanMesinDefaultArgs> = $Result.GetResult<Prisma.$PermintaanMesinPayload, S>

  type PermintaanMesinCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PermintaanMesinFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PermintaanMesinCountAggregateInputType | true
    }

  export interface PermintaanMesinDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PermintaanMesin'], meta: { name: 'PermintaanMesin' } }
    /**
     * Find zero or one PermintaanMesin that matches the filter.
     * @param {PermintaanMesinFindUniqueArgs} args - Arguments to find a PermintaanMesin
     * @example
     * // Get one PermintaanMesin
     * const permintaanMesin = await prisma.permintaanMesin.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PermintaanMesinFindUniqueArgs>(args: SelectSubset<T, PermintaanMesinFindUniqueArgs<ExtArgs>>): Prisma__PermintaanMesinClient<$Result.GetResult<Prisma.$PermintaanMesinPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PermintaanMesin that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PermintaanMesinFindUniqueOrThrowArgs} args - Arguments to find a PermintaanMesin
     * @example
     * // Get one PermintaanMesin
     * const permintaanMesin = await prisma.permintaanMesin.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PermintaanMesinFindUniqueOrThrowArgs>(args: SelectSubset<T, PermintaanMesinFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PermintaanMesinClient<$Result.GetResult<Prisma.$PermintaanMesinPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PermintaanMesin that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermintaanMesinFindFirstArgs} args - Arguments to find a PermintaanMesin
     * @example
     * // Get one PermintaanMesin
     * const permintaanMesin = await prisma.permintaanMesin.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PermintaanMesinFindFirstArgs>(args?: SelectSubset<T, PermintaanMesinFindFirstArgs<ExtArgs>>): Prisma__PermintaanMesinClient<$Result.GetResult<Prisma.$PermintaanMesinPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PermintaanMesin that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermintaanMesinFindFirstOrThrowArgs} args - Arguments to find a PermintaanMesin
     * @example
     * // Get one PermintaanMesin
     * const permintaanMesin = await prisma.permintaanMesin.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PermintaanMesinFindFirstOrThrowArgs>(args?: SelectSubset<T, PermintaanMesinFindFirstOrThrowArgs<ExtArgs>>): Prisma__PermintaanMesinClient<$Result.GetResult<Prisma.$PermintaanMesinPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PermintaanMesins that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermintaanMesinFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PermintaanMesins
     * const permintaanMesins = await prisma.permintaanMesin.findMany()
     * 
     * // Get first 10 PermintaanMesins
     * const permintaanMesins = await prisma.permintaanMesin.findMany({ take: 10 })
     * 
     * // Only select the `idPermintaan`
     * const permintaanMesinWithIdPermintaanOnly = await prisma.permintaanMesin.findMany({ select: { idPermintaan: true } })
     * 
     */
    findMany<T extends PermintaanMesinFindManyArgs>(args?: SelectSubset<T, PermintaanMesinFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermintaanMesinPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PermintaanMesin.
     * @param {PermintaanMesinCreateArgs} args - Arguments to create a PermintaanMesin.
     * @example
     * // Create one PermintaanMesin
     * const PermintaanMesin = await prisma.permintaanMesin.create({
     *   data: {
     *     // ... data to create a PermintaanMesin
     *   }
     * })
     * 
     */
    create<T extends PermintaanMesinCreateArgs>(args: SelectSubset<T, PermintaanMesinCreateArgs<ExtArgs>>): Prisma__PermintaanMesinClient<$Result.GetResult<Prisma.$PermintaanMesinPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PermintaanMesins.
     * @param {PermintaanMesinCreateManyArgs} args - Arguments to create many PermintaanMesins.
     * @example
     * // Create many PermintaanMesins
     * const permintaanMesin = await prisma.permintaanMesin.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PermintaanMesinCreateManyArgs>(args?: SelectSubset<T, PermintaanMesinCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PermintaanMesins and returns the data saved in the database.
     * @param {PermintaanMesinCreateManyAndReturnArgs} args - Arguments to create many PermintaanMesins.
     * @example
     * // Create many PermintaanMesins
     * const permintaanMesin = await prisma.permintaanMesin.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PermintaanMesins and only return the `idPermintaan`
     * const permintaanMesinWithIdPermintaanOnly = await prisma.permintaanMesin.createManyAndReturn({
     *   select: { idPermintaan: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PermintaanMesinCreateManyAndReturnArgs>(args?: SelectSubset<T, PermintaanMesinCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermintaanMesinPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PermintaanMesin.
     * @param {PermintaanMesinDeleteArgs} args - Arguments to delete one PermintaanMesin.
     * @example
     * // Delete one PermintaanMesin
     * const PermintaanMesin = await prisma.permintaanMesin.delete({
     *   where: {
     *     // ... filter to delete one PermintaanMesin
     *   }
     * })
     * 
     */
    delete<T extends PermintaanMesinDeleteArgs>(args: SelectSubset<T, PermintaanMesinDeleteArgs<ExtArgs>>): Prisma__PermintaanMesinClient<$Result.GetResult<Prisma.$PermintaanMesinPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PermintaanMesin.
     * @param {PermintaanMesinUpdateArgs} args - Arguments to update one PermintaanMesin.
     * @example
     * // Update one PermintaanMesin
     * const permintaanMesin = await prisma.permintaanMesin.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PermintaanMesinUpdateArgs>(args: SelectSubset<T, PermintaanMesinUpdateArgs<ExtArgs>>): Prisma__PermintaanMesinClient<$Result.GetResult<Prisma.$PermintaanMesinPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PermintaanMesins.
     * @param {PermintaanMesinDeleteManyArgs} args - Arguments to filter PermintaanMesins to delete.
     * @example
     * // Delete a few PermintaanMesins
     * const { count } = await prisma.permintaanMesin.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PermintaanMesinDeleteManyArgs>(args?: SelectSubset<T, PermintaanMesinDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PermintaanMesins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermintaanMesinUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PermintaanMesins
     * const permintaanMesin = await prisma.permintaanMesin.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PermintaanMesinUpdateManyArgs>(args: SelectSubset<T, PermintaanMesinUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PermintaanMesins and returns the data updated in the database.
     * @param {PermintaanMesinUpdateManyAndReturnArgs} args - Arguments to update many PermintaanMesins.
     * @example
     * // Update many PermintaanMesins
     * const permintaanMesin = await prisma.permintaanMesin.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PermintaanMesins and only return the `idPermintaan`
     * const permintaanMesinWithIdPermintaanOnly = await prisma.permintaanMesin.updateManyAndReturn({
     *   select: { idPermintaan: true },
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
    updateManyAndReturn<T extends PermintaanMesinUpdateManyAndReturnArgs>(args: SelectSubset<T, PermintaanMesinUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PermintaanMesinPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PermintaanMesin.
     * @param {PermintaanMesinUpsertArgs} args - Arguments to update or create a PermintaanMesin.
     * @example
     * // Update or create a PermintaanMesin
     * const permintaanMesin = await prisma.permintaanMesin.upsert({
     *   create: {
     *     // ... data to create a PermintaanMesin
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PermintaanMesin we want to update
     *   }
     * })
     */
    upsert<T extends PermintaanMesinUpsertArgs>(args: SelectSubset<T, PermintaanMesinUpsertArgs<ExtArgs>>): Prisma__PermintaanMesinClient<$Result.GetResult<Prisma.$PermintaanMesinPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PermintaanMesins.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermintaanMesinCountArgs} args - Arguments to filter PermintaanMesins to count.
     * @example
     * // Count the number of PermintaanMesins
     * const count = await prisma.permintaanMesin.count({
     *   where: {
     *     // ... the filter for the PermintaanMesins we want to count
     *   }
     * })
    **/
    count<T extends PermintaanMesinCountArgs>(
      args?: Subset<T, PermintaanMesinCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PermintaanMesinCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PermintaanMesin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermintaanMesinAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PermintaanMesinAggregateArgs>(args: Subset<T, PermintaanMesinAggregateArgs>): Prisma.PrismaPromise<GetPermintaanMesinAggregateType<T>>

    /**
     * Group by PermintaanMesin.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PermintaanMesinGroupByArgs} args - Group by arguments.
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
      T extends PermintaanMesinGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PermintaanMesinGroupByArgs['orderBy'] }
        : { orderBy?: PermintaanMesinGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PermintaanMesinGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPermintaanMesinGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PermintaanMesin model
   */
  readonly fields: PermintaanMesinFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PermintaanMesin.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PermintaanMesinClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    permintaan<T extends PermintaanSewaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PermintaanSewaDefaultArgs<ExtArgs>>): Prisma__PermintaanSewaClient<$Result.GetResult<Prisma.$PermintaanSewaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    mesin<T extends MesinDefaultArgs<ExtArgs> = {}>(args?: Subset<T, MesinDefaultArgs<ExtArgs>>): Prisma__MesinClient<$Result.GetResult<Prisma.$MesinPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the PermintaanMesin model
   */
  interface PermintaanMesinFieldRefs {
    readonly idPermintaan: FieldRef<"PermintaanMesin", 'String'>
    readonly idMesin: FieldRef<"PermintaanMesin", 'String'>
    readonly qty: FieldRef<"PermintaanMesin", 'Int'>
    readonly harga: FieldRef<"PermintaanMesin", 'Int'>
    readonly diskon: FieldRef<"PermintaanMesin", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PermintaanMesin findUnique
   */
  export type PermintaanMesinFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanMesin
     */
    select?: PermintaanMesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanMesin
     */
    omit?: PermintaanMesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanMesinInclude<ExtArgs> | null
    /**
     * Filter, which PermintaanMesin to fetch.
     */
    where: PermintaanMesinWhereUniqueInput
  }

  /**
   * PermintaanMesin findUniqueOrThrow
   */
  export type PermintaanMesinFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanMesin
     */
    select?: PermintaanMesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanMesin
     */
    omit?: PermintaanMesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanMesinInclude<ExtArgs> | null
    /**
     * Filter, which PermintaanMesin to fetch.
     */
    where: PermintaanMesinWhereUniqueInput
  }

  /**
   * PermintaanMesin findFirst
   */
  export type PermintaanMesinFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanMesin
     */
    select?: PermintaanMesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanMesin
     */
    omit?: PermintaanMesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanMesinInclude<ExtArgs> | null
    /**
     * Filter, which PermintaanMesin to fetch.
     */
    where?: PermintaanMesinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermintaanMesins to fetch.
     */
    orderBy?: PermintaanMesinOrderByWithRelationInput | PermintaanMesinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PermintaanMesins.
     */
    cursor?: PermintaanMesinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermintaanMesins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermintaanMesins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PermintaanMesins.
     */
    distinct?: PermintaanMesinScalarFieldEnum | PermintaanMesinScalarFieldEnum[]
  }

  /**
   * PermintaanMesin findFirstOrThrow
   */
  export type PermintaanMesinFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanMesin
     */
    select?: PermintaanMesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanMesin
     */
    omit?: PermintaanMesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanMesinInclude<ExtArgs> | null
    /**
     * Filter, which PermintaanMesin to fetch.
     */
    where?: PermintaanMesinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermintaanMesins to fetch.
     */
    orderBy?: PermintaanMesinOrderByWithRelationInput | PermintaanMesinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PermintaanMesins.
     */
    cursor?: PermintaanMesinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermintaanMesins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermintaanMesins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PermintaanMesins.
     */
    distinct?: PermintaanMesinScalarFieldEnum | PermintaanMesinScalarFieldEnum[]
  }

  /**
   * PermintaanMesin findMany
   */
  export type PermintaanMesinFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanMesin
     */
    select?: PermintaanMesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanMesin
     */
    omit?: PermintaanMesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanMesinInclude<ExtArgs> | null
    /**
     * Filter, which PermintaanMesins to fetch.
     */
    where?: PermintaanMesinWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PermintaanMesins to fetch.
     */
    orderBy?: PermintaanMesinOrderByWithRelationInput | PermintaanMesinOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PermintaanMesins.
     */
    cursor?: PermintaanMesinWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PermintaanMesins from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PermintaanMesins.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PermintaanMesins.
     */
    distinct?: PermintaanMesinScalarFieldEnum | PermintaanMesinScalarFieldEnum[]
  }

  /**
   * PermintaanMesin create
   */
  export type PermintaanMesinCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanMesin
     */
    select?: PermintaanMesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanMesin
     */
    omit?: PermintaanMesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanMesinInclude<ExtArgs> | null
    /**
     * The data needed to create a PermintaanMesin.
     */
    data: XOR<PermintaanMesinCreateInput, PermintaanMesinUncheckedCreateInput>
  }

  /**
   * PermintaanMesin createMany
   */
  export type PermintaanMesinCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PermintaanMesins.
     */
    data: PermintaanMesinCreateManyInput | PermintaanMesinCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PermintaanMesin createManyAndReturn
   */
  export type PermintaanMesinCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanMesin
     */
    select?: PermintaanMesinSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanMesin
     */
    omit?: PermintaanMesinOmit<ExtArgs> | null
    /**
     * The data used to create many PermintaanMesins.
     */
    data: PermintaanMesinCreateManyInput | PermintaanMesinCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanMesinIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PermintaanMesin update
   */
  export type PermintaanMesinUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanMesin
     */
    select?: PermintaanMesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanMesin
     */
    omit?: PermintaanMesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanMesinInclude<ExtArgs> | null
    /**
     * The data needed to update a PermintaanMesin.
     */
    data: XOR<PermintaanMesinUpdateInput, PermintaanMesinUncheckedUpdateInput>
    /**
     * Choose, which PermintaanMesin to update.
     */
    where: PermintaanMesinWhereUniqueInput
  }

  /**
   * PermintaanMesin updateMany
   */
  export type PermintaanMesinUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PermintaanMesins.
     */
    data: XOR<PermintaanMesinUpdateManyMutationInput, PermintaanMesinUncheckedUpdateManyInput>
    /**
     * Filter which PermintaanMesins to update
     */
    where?: PermintaanMesinWhereInput
    /**
     * Limit how many PermintaanMesins to update.
     */
    limit?: number
  }

  /**
   * PermintaanMesin updateManyAndReturn
   */
  export type PermintaanMesinUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanMesin
     */
    select?: PermintaanMesinSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanMesin
     */
    omit?: PermintaanMesinOmit<ExtArgs> | null
    /**
     * The data used to update PermintaanMesins.
     */
    data: XOR<PermintaanMesinUpdateManyMutationInput, PermintaanMesinUncheckedUpdateManyInput>
    /**
     * Filter which PermintaanMesins to update
     */
    where?: PermintaanMesinWhereInput
    /**
     * Limit how many PermintaanMesins to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanMesinIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PermintaanMesin upsert
   */
  export type PermintaanMesinUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanMesin
     */
    select?: PermintaanMesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanMesin
     */
    omit?: PermintaanMesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanMesinInclude<ExtArgs> | null
    /**
     * The filter to search for the PermintaanMesin to update in case it exists.
     */
    where: PermintaanMesinWhereUniqueInput
    /**
     * In case the PermintaanMesin found by the `where` argument doesn't exist, create a new PermintaanMesin with this data.
     */
    create: XOR<PermintaanMesinCreateInput, PermintaanMesinUncheckedCreateInput>
    /**
     * In case the PermintaanMesin was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PermintaanMesinUpdateInput, PermintaanMesinUncheckedUpdateInput>
  }

  /**
   * PermintaanMesin delete
   */
  export type PermintaanMesinDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanMesin
     */
    select?: PermintaanMesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanMesin
     */
    omit?: PermintaanMesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanMesinInclude<ExtArgs> | null
    /**
     * Filter which PermintaanMesin to delete.
     */
    where: PermintaanMesinWhereUniqueInput
  }

  /**
   * PermintaanMesin deleteMany
   */
  export type PermintaanMesinDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PermintaanMesins to delete
     */
    where?: PermintaanMesinWhereInput
    /**
     * Limit how many PermintaanMesins to delete.
     */
    limit?: number
  }

  /**
   * PermintaanMesin without action
   */
  export type PermintaanMesinDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PermintaanMesin
     */
    select?: PermintaanMesinSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PermintaanMesin
     */
    omit?: PermintaanMesinOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PermintaanMesinInclude<ExtArgs> | null
  }


  /**
   * Model Pembayaran
   */

  export type AggregatePembayaran = {
    _count: PembayaranCountAggregateOutputType | null
    _avg: PembayaranAvgAggregateOutputType | null
    _sum: PembayaranSumAggregateOutputType | null
    _min: PembayaranMinAggregateOutputType | null
    _max: PembayaranMaxAggregateOutputType | null
  }

  export type PembayaranAvgAggregateOutputType = {
    total: number | null
  }

  export type PembayaranSumAggregateOutputType = {
    total: number | null
  }

  export type PembayaranMinAggregateOutputType = {
    id: string | null
    idPermintaan: string | null
    total: number | null
    tanggal: string | null
    status: string | null
    bukti: string | null
  }

  export type PembayaranMaxAggregateOutputType = {
    id: string | null
    idPermintaan: string | null
    total: number | null
    tanggal: string | null
    status: string | null
    bukti: string | null
  }

  export type PembayaranCountAggregateOutputType = {
    id: number
    idPermintaan: number
    total: number
    tanggal: number
    status: number
    bukti: number
    _all: number
  }


  export type PembayaranAvgAggregateInputType = {
    total?: true
  }

  export type PembayaranSumAggregateInputType = {
    total?: true
  }

  export type PembayaranMinAggregateInputType = {
    id?: true
    idPermintaan?: true
    total?: true
    tanggal?: true
    status?: true
    bukti?: true
  }

  export type PembayaranMaxAggregateInputType = {
    id?: true
    idPermintaan?: true
    total?: true
    tanggal?: true
    status?: true
    bukti?: true
  }

  export type PembayaranCountAggregateInputType = {
    id?: true
    idPermintaan?: true
    total?: true
    tanggal?: true
    status?: true
    bukti?: true
    _all?: true
  }

  export type PembayaranAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pembayaran to aggregate.
     */
    where?: PembayaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pembayarans to fetch.
     */
    orderBy?: PembayaranOrderByWithRelationInput | PembayaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PembayaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pembayarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pembayarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pembayarans
    **/
    _count?: true | PembayaranCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PembayaranAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PembayaranSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PembayaranMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PembayaranMaxAggregateInputType
  }

  export type GetPembayaranAggregateType<T extends PembayaranAggregateArgs> = {
        [P in keyof T & keyof AggregatePembayaran]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePembayaran[P]>
      : GetScalarType<T[P], AggregatePembayaran[P]>
  }




  export type PembayaranGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PembayaranWhereInput
    orderBy?: PembayaranOrderByWithAggregationInput | PembayaranOrderByWithAggregationInput[]
    by: PembayaranScalarFieldEnum[] | PembayaranScalarFieldEnum
    having?: PembayaranScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PembayaranCountAggregateInputType | true
    _avg?: PembayaranAvgAggregateInputType
    _sum?: PembayaranSumAggregateInputType
    _min?: PembayaranMinAggregateInputType
    _max?: PembayaranMaxAggregateInputType
  }

  export type PembayaranGroupByOutputType = {
    id: string
    idPermintaan: string
    total: number
    tanggal: string
    status: string
    bukti: string
    _count: PembayaranCountAggregateOutputType | null
    _avg: PembayaranAvgAggregateOutputType | null
    _sum: PembayaranSumAggregateOutputType | null
    _min: PembayaranMinAggregateOutputType | null
    _max: PembayaranMaxAggregateOutputType | null
  }

  type GetPembayaranGroupByPayload<T extends PembayaranGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PembayaranGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PembayaranGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PembayaranGroupByOutputType[P]>
            : GetScalarType<T[P], PembayaranGroupByOutputType[P]>
        }
      >
    >


  export type PembayaranSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idPermintaan?: boolean
    total?: boolean
    tanggal?: boolean
    status?: boolean
    bukti?: boolean
    permintaan?: boolean | PermintaanSewaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pembayaran"]>

  export type PembayaranSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idPermintaan?: boolean
    total?: boolean
    tanggal?: boolean
    status?: boolean
    bukti?: boolean
    permintaan?: boolean | PermintaanSewaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pembayaran"]>

  export type PembayaranSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idPermintaan?: boolean
    total?: boolean
    tanggal?: boolean
    status?: boolean
    bukti?: boolean
    permintaan?: boolean | PermintaanSewaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pembayaran"]>

  export type PembayaranSelectScalar = {
    id?: boolean
    idPermintaan?: boolean
    total?: boolean
    tanggal?: boolean
    status?: boolean
    bukti?: boolean
  }

  export type PembayaranOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idPermintaan" | "total" | "tanggal" | "status" | "bukti", ExtArgs["result"]["pembayaran"]>
  export type PembayaranInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permintaan?: boolean | PermintaanSewaDefaultArgs<ExtArgs>
  }
  export type PembayaranIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permintaan?: boolean | PermintaanSewaDefaultArgs<ExtArgs>
  }
  export type PembayaranIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permintaan?: boolean | PermintaanSewaDefaultArgs<ExtArgs>
  }

  export type $PembayaranPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pembayaran"
    objects: {
      permintaan: Prisma.$PermintaanSewaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      idPermintaan: string
      total: number
      tanggal: string
      status: string
      bukti: string
    }, ExtArgs["result"]["pembayaran"]>
    composites: {}
  }

  type PembayaranGetPayload<S extends boolean | null | undefined | PembayaranDefaultArgs> = $Result.GetResult<Prisma.$PembayaranPayload, S>

  type PembayaranCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PembayaranFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PembayaranCountAggregateInputType | true
    }

  export interface PembayaranDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pembayaran'], meta: { name: 'Pembayaran' } }
    /**
     * Find zero or one Pembayaran that matches the filter.
     * @param {PembayaranFindUniqueArgs} args - Arguments to find a Pembayaran
     * @example
     * // Get one Pembayaran
     * const pembayaran = await prisma.pembayaran.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PembayaranFindUniqueArgs>(args: SelectSubset<T, PembayaranFindUniqueArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pembayaran that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PembayaranFindUniqueOrThrowArgs} args - Arguments to find a Pembayaran
     * @example
     * // Get one Pembayaran
     * const pembayaran = await prisma.pembayaran.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PembayaranFindUniqueOrThrowArgs>(args: SelectSubset<T, PembayaranFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pembayaran that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranFindFirstArgs} args - Arguments to find a Pembayaran
     * @example
     * // Get one Pembayaran
     * const pembayaran = await prisma.pembayaran.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PembayaranFindFirstArgs>(args?: SelectSubset<T, PembayaranFindFirstArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pembayaran that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranFindFirstOrThrowArgs} args - Arguments to find a Pembayaran
     * @example
     * // Get one Pembayaran
     * const pembayaran = await prisma.pembayaran.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PembayaranFindFirstOrThrowArgs>(args?: SelectSubset<T, PembayaranFindFirstOrThrowArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pembayarans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pembayarans
     * const pembayarans = await prisma.pembayaran.findMany()
     * 
     * // Get first 10 Pembayarans
     * const pembayarans = await prisma.pembayaran.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pembayaranWithIdOnly = await prisma.pembayaran.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PembayaranFindManyArgs>(args?: SelectSubset<T, PembayaranFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pembayaran.
     * @param {PembayaranCreateArgs} args - Arguments to create a Pembayaran.
     * @example
     * // Create one Pembayaran
     * const Pembayaran = await prisma.pembayaran.create({
     *   data: {
     *     // ... data to create a Pembayaran
     *   }
     * })
     * 
     */
    create<T extends PembayaranCreateArgs>(args: SelectSubset<T, PembayaranCreateArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pembayarans.
     * @param {PembayaranCreateManyArgs} args - Arguments to create many Pembayarans.
     * @example
     * // Create many Pembayarans
     * const pembayaran = await prisma.pembayaran.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PembayaranCreateManyArgs>(args?: SelectSubset<T, PembayaranCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pembayarans and returns the data saved in the database.
     * @param {PembayaranCreateManyAndReturnArgs} args - Arguments to create many Pembayarans.
     * @example
     * // Create many Pembayarans
     * const pembayaran = await prisma.pembayaran.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pembayarans and only return the `id`
     * const pembayaranWithIdOnly = await prisma.pembayaran.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PembayaranCreateManyAndReturnArgs>(args?: SelectSubset<T, PembayaranCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pembayaran.
     * @param {PembayaranDeleteArgs} args - Arguments to delete one Pembayaran.
     * @example
     * // Delete one Pembayaran
     * const Pembayaran = await prisma.pembayaran.delete({
     *   where: {
     *     // ... filter to delete one Pembayaran
     *   }
     * })
     * 
     */
    delete<T extends PembayaranDeleteArgs>(args: SelectSubset<T, PembayaranDeleteArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pembayaran.
     * @param {PembayaranUpdateArgs} args - Arguments to update one Pembayaran.
     * @example
     * // Update one Pembayaran
     * const pembayaran = await prisma.pembayaran.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PembayaranUpdateArgs>(args: SelectSubset<T, PembayaranUpdateArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pembayarans.
     * @param {PembayaranDeleteManyArgs} args - Arguments to filter Pembayarans to delete.
     * @example
     * // Delete a few Pembayarans
     * const { count } = await prisma.pembayaran.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PembayaranDeleteManyArgs>(args?: SelectSubset<T, PembayaranDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pembayarans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pembayarans
     * const pembayaran = await prisma.pembayaran.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PembayaranUpdateManyArgs>(args: SelectSubset<T, PembayaranUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pembayarans and returns the data updated in the database.
     * @param {PembayaranUpdateManyAndReturnArgs} args - Arguments to update many Pembayarans.
     * @example
     * // Update many Pembayarans
     * const pembayaran = await prisma.pembayaran.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pembayarans and only return the `id`
     * const pembayaranWithIdOnly = await prisma.pembayaran.updateManyAndReturn({
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
    updateManyAndReturn<T extends PembayaranUpdateManyAndReturnArgs>(args: SelectSubset<T, PembayaranUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pembayaran.
     * @param {PembayaranUpsertArgs} args - Arguments to update or create a Pembayaran.
     * @example
     * // Update or create a Pembayaran
     * const pembayaran = await prisma.pembayaran.upsert({
     *   create: {
     *     // ... data to create a Pembayaran
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pembayaran we want to update
     *   }
     * })
     */
    upsert<T extends PembayaranUpsertArgs>(args: SelectSubset<T, PembayaranUpsertArgs<ExtArgs>>): Prisma__PembayaranClient<$Result.GetResult<Prisma.$PembayaranPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pembayarans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranCountArgs} args - Arguments to filter Pembayarans to count.
     * @example
     * // Count the number of Pembayarans
     * const count = await prisma.pembayaran.count({
     *   where: {
     *     // ... the filter for the Pembayarans we want to count
     *   }
     * })
    **/
    count<T extends PembayaranCountArgs>(
      args?: Subset<T, PembayaranCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PembayaranCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pembayaran.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PembayaranAggregateArgs>(args: Subset<T, PembayaranAggregateArgs>): Prisma.PrismaPromise<GetPembayaranAggregateType<T>>

    /**
     * Group by Pembayaran.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PembayaranGroupByArgs} args - Group by arguments.
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
      T extends PembayaranGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PembayaranGroupByArgs['orderBy'] }
        : { orderBy?: PembayaranGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PembayaranGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPembayaranGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pembayaran model
   */
  readonly fields: PembayaranFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pembayaran.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PembayaranClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    permintaan<T extends PermintaanSewaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PermintaanSewaDefaultArgs<ExtArgs>>): Prisma__PermintaanSewaClient<$Result.GetResult<Prisma.$PermintaanSewaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Pembayaran model
   */
  interface PembayaranFieldRefs {
    readonly id: FieldRef<"Pembayaran", 'String'>
    readonly idPermintaan: FieldRef<"Pembayaran", 'String'>
    readonly total: FieldRef<"Pembayaran", 'Int'>
    readonly tanggal: FieldRef<"Pembayaran", 'String'>
    readonly status: FieldRef<"Pembayaran", 'String'>
    readonly bukti: FieldRef<"Pembayaran", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Pembayaran findUnique
   */
  export type PembayaranFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * Filter, which Pembayaran to fetch.
     */
    where: PembayaranWhereUniqueInput
  }

  /**
   * Pembayaran findUniqueOrThrow
   */
  export type PembayaranFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * Filter, which Pembayaran to fetch.
     */
    where: PembayaranWhereUniqueInput
  }

  /**
   * Pembayaran findFirst
   */
  export type PembayaranFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * Filter, which Pembayaran to fetch.
     */
    where?: PembayaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pembayarans to fetch.
     */
    orderBy?: PembayaranOrderByWithRelationInput | PembayaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pembayarans.
     */
    cursor?: PembayaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pembayarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pembayarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pembayarans.
     */
    distinct?: PembayaranScalarFieldEnum | PembayaranScalarFieldEnum[]
  }

  /**
   * Pembayaran findFirstOrThrow
   */
  export type PembayaranFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * Filter, which Pembayaran to fetch.
     */
    where?: PembayaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pembayarans to fetch.
     */
    orderBy?: PembayaranOrderByWithRelationInput | PembayaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pembayarans.
     */
    cursor?: PembayaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pembayarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pembayarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pembayarans.
     */
    distinct?: PembayaranScalarFieldEnum | PembayaranScalarFieldEnum[]
  }

  /**
   * Pembayaran findMany
   */
  export type PembayaranFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * Filter, which Pembayarans to fetch.
     */
    where?: PembayaranWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pembayarans to fetch.
     */
    orderBy?: PembayaranOrderByWithRelationInput | PembayaranOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pembayarans.
     */
    cursor?: PembayaranWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pembayarans from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pembayarans.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pembayarans.
     */
    distinct?: PembayaranScalarFieldEnum | PembayaranScalarFieldEnum[]
  }

  /**
   * Pembayaran create
   */
  export type PembayaranCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * The data needed to create a Pembayaran.
     */
    data: XOR<PembayaranCreateInput, PembayaranUncheckedCreateInput>
  }

  /**
   * Pembayaran createMany
   */
  export type PembayaranCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pembayarans.
     */
    data: PembayaranCreateManyInput | PembayaranCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pembayaran createManyAndReturn
   */
  export type PembayaranCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * The data used to create many Pembayarans.
     */
    data: PembayaranCreateManyInput | PembayaranCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pembayaran update
   */
  export type PembayaranUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * The data needed to update a Pembayaran.
     */
    data: XOR<PembayaranUpdateInput, PembayaranUncheckedUpdateInput>
    /**
     * Choose, which Pembayaran to update.
     */
    where: PembayaranWhereUniqueInput
  }

  /**
   * Pembayaran updateMany
   */
  export type PembayaranUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pembayarans.
     */
    data: XOR<PembayaranUpdateManyMutationInput, PembayaranUncheckedUpdateManyInput>
    /**
     * Filter which Pembayarans to update
     */
    where?: PembayaranWhereInput
    /**
     * Limit how many Pembayarans to update.
     */
    limit?: number
  }

  /**
   * Pembayaran updateManyAndReturn
   */
  export type PembayaranUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * The data used to update Pembayarans.
     */
    data: XOR<PembayaranUpdateManyMutationInput, PembayaranUncheckedUpdateManyInput>
    /**
     * Filter which Pembayarans to update
     */
    where?: PembayaranWhereInput
    /**
     * Limit how many Pembayarans to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pembayaran upsert
   */
  export type PembayaranUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * The filter to search for the Pembayaran to update in case it exists.
     */
    where: PembayaranWhereUniqueInput
    /**
     * In case the Pembayaran found by the `where` argument doesn't exist, create a new Pembayaran with this data.
     */
    create: XOR<PembayaranCreateInput, PembayaranUncheckedCreateInput>
    /**
     * In case the Pembayaran was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PembayaranUpdateInput, PembayaranUncheckedUpdateInput>
  }

  /**
   * Pembayaran delete
   */
  export type PembayaranDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
    /**
     * Filter which Pembayaran to delete.
     */
    where: PembayaranWhereUniqueInput
  }

  /**
   * Pembayaran deleteMany
   */
  export type PembayaranDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pembayarans to delete
     */
    where?: PembayaranWhereInput
    /**
     * Limit how many Pembayarans to delete.
     */
    limit?: number
  }

  /**
   * Pembayaran without action
   */
  export type PembayaranDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pembayaran
     */
    select?: PembayaranSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pembayaran
     */
    omit?: PembayaranOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PembayaranInclude<ExtArgs> | null
  }


  /**
   * Model Pengiriman
   */

  export type AggregatePengiriman = {
    _count: PengirimanCountAggregateOutputType | null
    _min: PengirimanMinAggregateOutputType | null
    _max: PengirimanMaxAggregateOutputType | null
  }

  export type PengirimanMinAggregateOutputType = {
    id: string | null
    idPermintaan: string | null
    tanggalKirim: string | null
    sopir: string | null
    status: string | null
    buktiSuratJalan: string | null
  }

  export type PengirimanMaxAggregateOutputType = {
    id: string | null
    idPermintaan: string | null
    tanggalKirim: string | null
    sopir: string | null
    status: string | null
    buktiSuratJalan: string | null
  }

  export type PengirimanCountAggregateOutputType = {
    id: number
    idPermintaan: number
    tanggalKirim: number
    sopir: number
    status: number
    buktiSuratJalan: number
    _all: number
  }


  export type PengirimanMinAggregateInputType = {
    id?: true
    idPermintaan?: true
    tanggalKirim?: true
    sopir?: true
    status?: true
    buktiSuratJalan?: true
  }

  export type PengirimanMaxAggregateInputType = {
    id?: true
    idPermintaan?: true
    tanggalKirim?: true
    sopir?: true
    status?: true
    buktiSuratJalan?: true
  }

  export type PengirimanCountAggregateInputType = {
    id?: true
    idPermintaan?: true
    tanggalKirim?: true
    sopir?: true
    status?: true
    buktiSuratJalan?: true
    _all?: true
  }

  export type PengirimanAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pengiriman to aggregate.
     */
    where?: PengirimanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pengirimen to fetch.
     */
    orderBy?: PengirimanOrderByWithRelationInput | PengirimanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PengirimanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pengirimen from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pengirimen.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Pengirimen
    **/
    _count?: true | PengirimanCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PengirimanMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PengirimanMaxAggregateInputType
  }

  export type GetPengirimanAggregateType<T extends PengirimanAggregateArgs> = {
        [P in keyof T & keyof AggregatePengiriman]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePengiriman[P]>
      : GetScalarType<T[P], AggregatePengiriman[P]>
  }




  export type PengirimanGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PengirimanWhereInput
    orderBy?: PengirimanOrderByWithAggregationInput | PengirimanOrderByWithAggregationInput[]
    by: PengirimanScalarFieldEnum[] | PengirimanScalarFieldEnum
    having?: PengirimanScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PengirimanCountAggregateInputType | true
    _min?: PengirimanMinAggregateInputType
    _max?: PengirimanMaxAggregateInputType
  }

  export type PengirimanGroupByOutputType = {
    id: string
    idPermintaan: string
    tanggalKirim: string
    sopir: string
    status: string
    buktiSuratJalan: string
    _count: PengirimanCountAggregateOutputType | null
    _min: PengirimanMinAggregateOutputType | null
    _max: PengirimanMaxAggregateOutputType | null
  }

  type GetPengirimanGroupByPayload<T extends PengirimanGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PengirimanGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PengirimanGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PengirimanGroupByOutputType[P]>
            : GetScalarType<T[P], PengirimanGroupByOutputType[P]>
        }
      >
    >


  export type PengirimanSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idPermintaan?: boolean
    tanggalKirim?: boolean
    sopir?: boolean
    status?: boolean
    buktiSuratJalan?: boolean
    permintaan?: boolean | PermintaanSewaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pengiriman"]>

  export type PengirimanSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idPermintaan?: boolean
    tanggalKirim?: boolean
    sopir?: boolean
    status?: boolean
    buktiSuratJalan?: boolean
    permintaan?: boolean | PermintaanSewaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pengiriman"]>

  export type PengirimanSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    idPermintaan?: boolean
    tanggalKirim?: boolean
    sopir?: boolean
    status?: boolean
    buktiSuratJalan?: boolean
    permintaan?: boolean | PermintaanSewaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["pengiriman"]>

  export type PengirimanSelectScalar = {
    id?: boolean
    idPermintaan?: boolean
    tanggalKirim?: boolean
    sopir?: boolean
    status?: boolean
    buktiSuratJalan?: boolean
  }

  export type PengirimanOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "idPermintaan" | "tanggalKirim" | "sopir" | "status" | "buktiSuratJalan", ExtArgs["result"]["pengiriman"]>
  export type PengirimanInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permintaan?: boolean | PermintaanSewaDefaultArgs<ExtArgs>
  }
  export type PengirimanIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permintaan?: boolean | PermintaanSewaDefaultArgs<ExtArgs>
  }
  export type PengirimanIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    permintaan?: boolean | PermintaanSewaDefaultArgs<ExtArgs>
  }

  export type $PengirimanPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Pengiriman"
    objects: {
      permintaan: Prisma.$PermintaanSewaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      idPermintaan: string
      tanggalKirim: string
      sopir: string
      status: string
      buktiSuratJalan: string
    }, ExtArgs["result"]["pengiriman"]>
    composites: {}
  }

  type PengirimanGetPayload<S extends boolean | null | undefined | PengirimanDefaultArgs> = $Result.GetResult<Prisma.$PengirimanPayload, S>

  type PengirimanCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PengirimanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PengirimanCountAggregateInputType | true
    }

  export interface PengirimanDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Pengiriman'], meta: { name: 'Pengiriman' } }
    /**
     * Find zero or one Pengiriman that matches the filter.
     * @param {PengirimanFindUniqueArgs} args - Arguments to find a Pengiriman
     * @example
     * // Get one Pengiriman
     * const pengiriman = await prisma.pengiriman.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PengirimanFindUniqueArgs>(args: SelectSubset<T, PengirimanFindUniqueArgs<ExtArgs>>): Prisma__PengirimanClient<$Result.GetResult<Prisma.$PengirimanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pengiriman that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PengirimanFindUniqueOrThrowArgs} args - Arguments to find a Pengiriman
     * @example
     * // Get one Pengiriman
     * const pengiriman = await prisma.pengiriman.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PengirimanFindUniqueOrThrowArgs>(args: SelectSubset<T, PengirimanFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PengirimanClient<$Result.GetResult<Prisma.$PengirimanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pengiriman that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengirimanFindFirstArgs} args - Arguments to find a Pengiriman
     * @example
     * // Get one Pengiriman
     * const pengiriman = await prisma.pengiriman.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PengirimanFindFirstArgs>(args?: SelectSubset<T, PengirimanFindFirstArgs<ExtArgs>>): Prisma__PengirimanClient<$Result.GetResult<Prisma.$PengirimanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pengiriman that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengirimanFindFirstOrThrowArgs} args - Arguments to find a Pengiriman
     * @example
     * // Get one Pengiriman
     * const pengiriman = await prisma.pengiriman.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PengirimanFindFirstOrThrowArgs>(args?: SelectSubset<T, PengirimanFindFirstOrThrowArgs<ExtArgs>>): Prisma__PengirimanClient<$Result.GetResult<Prisma.$PengirimanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pengirimen that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengirimanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pengirimen
     * const pengirimen = await prisma.pengiriman.findMany()
     * 
     * // Get first 10 Pengirimen
     * const pengirimen = await prisma.pengiriman.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pengirimanWithIdOnly = await prisma.pengiriman.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PengirimanFindManyArgs>(args?: SelectSubset<T, PengirimanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PengirimanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pengiriman.
     * @param {PengirimanCreateArgs} args - Arguments to create a Pengiriman.
     * @example
     * // Create one Pengiriman
     * const Pengiriman = await prisma.pengiriman.create({
     *   data: {
     *     // ... data to create a Pengiriman
     *   }
     * })
     * 
     */
    create<T extends PengirimanCreateArgs>(args: SelectSubset<T, PengirimanCreateArgs<ExtArgs>>): Prisma__PengirimanClient<$Result.GetResult<Prisma.$PengirimanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pengirimen.
     * @param {PengirimanCreateManyArgs} args - Arguments to create many Pengirimen.
     * @example
     * // Create many Pengirimen
     * const pengiriman = await prisma.pengiriman.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PengirimanCreateManyArgs>(args?: SelectSubset<T, PengirimanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Pengirimen and returns the data saved in the database.
     * @param {PengirimanCreateManyAndReturnArgs} args - Arguments to create many Pengirimen.
     * @example
     * // Create many Pengirimen
     * const pengiriman = await prisma.pengiriman.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Pengirimen and only return the `id`
     * const pengirimanWithIdOnly = await prisma.pengiriman.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PengirimanCreateManyAndReturnArgs>(args?: SelectSubset<T, PengirimanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PengirimanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Pengiriman.
     * @param {PengirimanDeleteArgs} args - Arguments to delete one Pengiriman.
     * @example
     * // Delete one Pengiriman
     * const Pengiriman = await prisma.pengiriman.delete({
     *   where: {
     *     // ... filter to delete one Pengiriman
     *   }
     * })
     * 
     */
    delete<T extends PengirimanDeleteArgs>(args: SelectSubset<T, PengirimanDeleteArgs<ExtArgs>>): Prisma__PengirimanClient<$Result.GetResult<Prisma.$PengirimanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pengiriman.
     * @param {PengirimanUpdateArgs} args - Arguments to update one Pengiriman.
     * @example
     * // Update one Pengiriman
     * const pengiriman = await prisma.pengiriman.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PengirimanUpdateArgs>(args: SelectSubset<T, PengirimanUpdateArgs<ExtArgs>>): Prisma__PengirimanClient<$Result.GetResult<Prisma.$PengirimanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pengirimen.
     * @param {PengirimanDeleteManyArgs} args - Arguments to filter Pengirimen to delete.
     * @example
     * // Delete a few Pengirimen
     * const { count } = await prisma.pengiriman.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PengirimanDeleteManyArgs>(args?: SelectSubset<T, PengirimanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pengirimen.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengirimanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pengirimen
     * const pengiriman = await prisma.pengiriman.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PengirimanUpdateManyArgs>(args: SelectSubset<T, PengirimanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pengirimen and returns the data updated in the database.
     * @param {PengirimanUpdateManyAndReturnArgs} args - Arguments to update many Pengirimen.
     * @example
     * // Update many Pengirimen
     * const pengiriman = await prisma.pengiriman.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Pengirimen and only return the `id`
     * const pengirimanWithIdOnly = await prisma.pengiriman.updateManyAndReturn({
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
    updateManyAndReturn<T extends PengirimanUpdateManyAndReturnArgs>(args: SelectSubset<T, PengirimanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PengirimanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Pengiriman.
     * @param {PengirimanUpsertArgs} args - Arguments to update or create a Pengiriman.
     * @example
     * // Update or create a Pengiriman
     * const pengiriman = await prisma.pengiriman.upsert({
     *   create: {
     *     // ... data to create a Pengiriman
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pengiriman we want to update
     *   }
     * })
     */
    upsert<T extends PengirimanUpsertArgs>(args: SelectSubset<T, PengirimanUpsertArgs<ExtArgs>>): Prisma__PengirimanClient<$Result.GetResult<Prisma.$PengirimanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pengirimen.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengirimanCountArgs} args - Arguments to filter Pengirimen to count.
     * @example
     * // Count the number of Pengirimen
     * const count = await prisma.pengiriman.count({
     *   where: {
     *     // ... the filter for the Pengirimen we want to count
     *   }
     * })
    **/
    count<T extends PengirimanCountArgs>(
      args?: Subset<T, PengirimanCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PengirimanCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pengiriman.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengirimanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PengirimanAggregateArgs>(args: Subset<T, PengirimanAggregateArgs>): Prisma.PrismaPromise<GetPengirimanAggregateType<T>>

    /**
     * Group by Pengiriman.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PengirimanGroupByArgs} args - Group by arguments.
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
      T extends PengirimanGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PengirimanGroupByArgs['orderBy'] }
        : { orderBy?: PengirimanGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, PengirimanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPengirimanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Pengiriman model
   */
  readonly fields: PengirimanFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Pengiriman.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PengirimanClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    permintaan<T extends PermintaanSewaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PermintaanSewaDefaultArgs<ExtArgs>>): Prisma__PermintaanSewaClient<$Result.GetResult<Prisma.$PermintaanSewaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the Pengiriman model
   */
  interface PengirimanFieldRefs {
    readonly id: FieldRef<"Pengiriman", 'String'>
    readonly idPermintaan: FieldRef<"Pengiriman", 'String'>
    readonly tanggalKirim: FieldRef<"Pengiriman", 'String'>
    readonly sopir: FieldRef<"Pengiriman", 'String'>
    readonly status: FieldRef<"Pengiriman", 'String'>
    readonly buktiSuratJalan: FieldRef<"Pengiriman", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Pengiriman findUnique
   */
  export type PengirimanFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengiriman
     */
    select?: PengirimanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengiriman
     */
    omit?: PengirimanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengirimanInclude<ExtArgs> | null
    /**
     * Filter, which Pengiriman to fetch.
     */
    where: PengirimanWhereUniqueInput
  }

  /**
   * Pengiriman findUniqueOrThrow
   */
  export type PengirimanFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengiriman
     */
    select?: PengirimanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengiriman
     */
    omit?: PengirimanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengirimanInclude<ExtArgs> | null
    /**
     * Filter, which Pengiriman to fetch.
     */
    where: PengirimanWhereUniqueInput
  }

  /**
   * Pengiriman findFirst
   */
  export type PengirimanFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengiriman
     */
    select?: PengirimanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengiriman
     */
    omit?: PengirimanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengirimanInclude<ExtArgs> | null
    /**
     * Filter, which Pengiriman to fetch.
     */
    where?: PengirimanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pengirimen to fetch.
     */
    orderBy?: PengirimanOrderByWithRelationInput | PengirimanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pengirimen.
     */
    cursor?: PengirimanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pengirimen from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pengirimen.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pengirimen.
     */
    distinct?: PengirimanScalarFieldEnum | PengirimanScalarFieldEnum[]
  }

  /**
   * Pengiriman findFirstOrThrow
   */
  export type PengirimanFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengiriman
     */
    select?: PengirimanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengiriman
     */
    omit?: PengirimanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengirimanInclude<ExtArgs> | null
    /**
     * Filter, which Pengiriman to fetch.
     */
    where?: PengirimanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pengirimen to fetch.
     */
    orderBy?: PengirimanOrderByWithRelationInput | PengirimanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Pengirimen.
     */
    cursor?: PengirimanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pengirimen from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pengirimen.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pengirimen.
     */
    distinct?: PengirimanScalarFieldEnum | PengirimanScalarFieldEnum[]
  }

  /**
   * Pengiriman findMany
   */
  export type PengirimanFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengiriman
     */
    select?: PengirimanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengiriman
     */
    omit?: PengirimanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengirimanInclude<ExtArgs> | null
    /**
     * Filter, which Pengirimen to fetch.
     */
    where?: PengirimanWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Pengirimen to fetch.
     */
    orderBy?: PengirimanOrderByWithRelationInput | PengirimanOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Pengirimen.
     */
    cursor?: PengirimanWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Pengirimen from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Pengirimen.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Pengirimen.
     */
    distinct?: PengirimanScalarFieldEnum | PengirimanScalarFieldEnum[]
  }

  /**
   * Pengiriman create
   */
  export type PengirimanCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengiriman
     */
    select?: PengirimanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengiriman
     */
    omit?: PengirimanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengirimanInclude<ExtArgs> | null
    /**
     * The data needed to create a Pengiriman.
     */
    data: XOR<PengirimanCreateInput, PengirimanUncheckedCreateInput>
  }

  /**
   * Pengiriman createMany
   */
  export type PengirimanCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Pengirimen.
     */
    data: PengirimanCreateManyInput | PengirimanCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Pengiriman createManyAndReturn
   */
  export type PengirimanCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengiriman
     */
    select?: PengirimanSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pengiriman
     */
    omit?: PengirimanOmit<ExtArgs> | null
    /**
     * The data used to create many Pengirimen.
     */
    data: PengirimanCreateManyInput | PengirimanCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengirimanIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pengiriman update
   */
  export type PengirimanUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengiriman
     */
    select?: PengirimanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengiriman
     */
    omit?: PengirimanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengirimanInclude<ExtArgs> | null
    /**
     * The data needed to update a Pengiriman.
     */
    data: XOR<PengirimanUpdateInput, PengirimanUncheckedUpdateInput>
    /**
     * Choose, which Pengiriman to update.
     */
    where: PengirimanWhereUniqueInput
  }

  /**
   * Pengiriman updateMany
   */
  export type PengirimanUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Pengirimen.
     */
    data: XOR<PengirimanUpdateManyMutationInput, PengirimanUncheckedUpdateManyInput>
    /**
     * Filter which Pengirimen to update
     */
    where?: PengirimanWhereInput
    /**
     * Limit how many Pengirimen to update.
     */
    limit?: number
  }

  /**
   * Pengiriman updateManyAndReturn
   */
  export type PengirimanUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengiriman
     */
    select?: PengirimanSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Pengiriman
     */
    omit?: PengirimanOmit<ExtArgs> | null
    /**
     * The data used to update Pengirimen.
     */
    data: XOR<PengirimanUpdateManyMutationInput, PengirimanUncheckedUpdateManyInput>
    /**
     * Filter which Pengirimen to update
     */
    where?: PengirimanWhereInput
    /**
     * Limit how many Pengirimen to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengirimanIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Pengiriman upsert
   */
  export type PengirimanUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengiriman
     */
    select?: PengirimanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengiriman
     */
    omit?: PengirimanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengirimanInclude<ExtArgs> | null
    /**
     * The filter to search for the Pengiriman to update in case it exists.
     */
    where: PengirimanWhereUniqueInput
    /**
     * In case the Pengiriman found by the `where` argument doesn't exist, create a new Pengiriman with this data.
     */
    create: XOR<PengirimanCreateInput, PengirimanUncheckedCreateInput>
    /**
     * In case the Pengiriman was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PengirimanUpdateInput, PengirimanUncheckedUpdateInput>
  }

  /**
   * Pengiriman delete
   */
  export type PengirimanDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengiriman
     */
    select?: PengirimanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengiriman
     */
    omit?: PengirimanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengirimanInclude<ExtArgs> | null
    /**
     * Filter which Pengiriman to delete.
     */
    where: PengirimanWhereUniqueInput
  }

  /**
   * Pengiriman deleteMany
   */
  export type PengirimanDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Pengirimen to delete
     */
    where?: PengirimanWhereInput
    /**
     * Limit how many Pengirimen to delete.
     */
    limit?: number
  }

  /**
   * Pengiriman without action
   */
  export type PengirimanDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Pengiriman
     */
    select?: PengirimanSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Pengiriman
     */
    omit?: PengirimanOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PengirimanInclude<ExtArgs> | null
  }


  /**
   * Model AuditLog
   */

  export type AggregateAuditLog = {
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  export type AuditLogMinAggregateOutputType = {
    idLog: string | null
    entitasTarget: string | null
    idTarget: string | null
    aksi: string | null
    keterangan: string | null
    timestamp: Date | null
  }

  export type AuditLogMaxAggregateOutputType = {
    idLog: string | null
    entitasTarget: string | null
    idTarget: string | null
    aksi: string | null
    keterangan: string | null
    timestamp: Date | null
  }

  export type AuditLogCountAggregateOutputType = {
    idLog: number
    entitasTarget: number
    idTarget: number
    aksi: number
    keterangan: number
    timestamp: number
    _all: number
  }


  export type AuditLogMinAggregateInputType = {
    idLog?: true
    entitasTarget?: true
    idTarget?: true
    aksi?: true
    keterangan?: true
    timestamp?: true
  }

  export type AuditLogMaxAggregateInputType = {
    idLog?: true
    entitasTarget?: true
    idTarget?: true
    aksi?: true
    keterangan?: true
    timestamp?: true
  }

  export type AuditLogCountAggregateInputType = {
    idLog?: true
    entitasTarget?: true
    idTarget?: true
    aksi?: true
    keterangan?: true
    timestamp?: true
    _all?: true
  }

  export type AuditLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLog to aggregate.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuditLogs
    **/
    _count?: true | AuditLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuditLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuditLogMaxAggregateInputType
  }

  export type GetAuditLogAggregateType<T extends AuditLogAggregateArgs> = {
        [P in keyof T & keyof AggregateAuditLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuditLog[P]>
      : GetScalarType<T[P], AggregateAuditLog[P]>
  }




  export type AuditLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AuditLogWhereInput
    orderBy?: AuditLogOrderByWithAggregationInput | AuditLogOrderByWithAggregationInput[]
    by: AuditLogScalarFieldEnum[] | AuditLogScalarFieldEnum
    having?: AuditLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuditLogCountAggregateInputType | true
    _min?: AuditLogMinAggregateInputType
    _max?: AuditLogMaxAggregateInputType
  }

  export type AuditLogGroupByOutputType = {
    idLog: string
    entitasTarget: string
    idTarget: string
    aksi: string
    keterangan: string
    timestamp: Date
    _count: AuditLogCountAggregateOutputType | null
    _min: AuditLogMinAggregateOutputType | null
    _max: AuditLogMaxAggregateOutputType | null
  }

  type GetAuditLogGroupByPayload<T extends AuditLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AuditLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuditLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
            : GetScalarType<T[P], AuditLogGroupByOutputType[P]>
        }
      >
    >


  export type AuditLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idLog?: boolean
    entitasTarget?: boolean
    idTarget?: boolean
    aksi?: boolean
    keterangan?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idLog?: boolean
    entitasTarget?: boolean
    idTarget?: boolean
    aksi?: boolean
    keterangan?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idLog?: boolean
    entitasTarget?: boolean
    idTarget?: boolean
    aksi?: boolean
    keterangan?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["auditLog"]>

  export type AuditLogSelectScalar = {
    idLog?: boolean
    entitasTarget?: boolean
    idTarget?: boolean
    aksi?: boolean
    keterangan?: boolean
    timestamp?: boolean
  }

  export type AuditLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idLog" | "entitasTarget" | "idTarget" | "aksi" | "keterangan" | "timestamp", ExtArgs["result"]["auditLog"]>

  export type $AuditLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AuditLog"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      idLog: string
      entitasTarget: string
      idTarget: string
      aksi: string
      keterangan: string
      timestamp: Date
    }, ExtArgs["result"]["auditLog"]>
    composites: {}
  }

  type AuditLogGetPayload<S extends boolean | null | undefined | AuditLogDefaultArgs> = $Result.GetResult<Prisma.$AuditLogPayload, S>

  type AuditLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AuditLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AuditLogCountAggregateInputType | true
    }

  export interface AuditLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AuditLog'], meta: { name: 'AuditLog' } }
    /**
     * Find zero or one AuditLog that matches the filter.
     * @param {AuditLogFindUniqueArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AuditLogFindUniqueArgs>(args: SelectSubset<T, AuditLogFindUniqueArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AuditLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AuditLogFindUniqueOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AuditLogFindUniqueOrThrowArgs>(args: SelectSubset<T, AuditLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AuditLogFindFirstArgs>(args?: SelectSubset<T, AuditLogFindFirstArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AuditLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindFirstOrThrowArgs} args - Arguments to find a AuditLog
     * @example
     * // Get one AuditLog
     * const auditLog = await prisma.auditLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AuditLogFindFirstOrThrowArgs>(args?: SelectSubset<T, AuditLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AuditLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuditLogs
     * const auditLogs = await prisma.auditLog.findMany()
     * 
     * // Get first 10 AuditLogs
     * const auditLogs = await prisma.auditLog.findMany({ take: 10 })
     * 
     * // Only select the `idLog`
     * const auditLogWithIdLogOnly = await prisma.auditLog.findMany({ select: { idLog: true } })
     * 
     */
    findMany<T extends AuditLogFindManyArgs>(args?: SelectSubset<T, AuditLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AuditLog.
     * @param {AuditLogCreateArgs} args - Arguments to create a AuditLog.
     * @example
     * // Create one AuditLog
     * const AuditLog = await prisma.auditLog.create({
     *   data: {
     *     // ... data to create a AuditLog
     *   }
     * })
     * 
     */
    create<T extends AuditLogCreateArgs>(args: SelectSubset<T, AuditLogCreateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AuditLogs.
     * @param {AuditLogCreateManyArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AuditLogCreateManyArgs>(args?: SelectSubset<T, AuditLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AuditLogs and returns the data saved in the database.
     * @param {AuditLogCreateManyAndReturnArgs} args - Arguments to create many AuditLogs.
     * @example
     * // Create many AuditLogs
     * const auditLog = await prisma.auditLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AuditLogs and only return the `idLog`
     * const auditLogWithIdLogOnly = await prisma.auditLog.createManyAndReturn({
     *   select: { idLog: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AuditLogCreateManyAndReturnArgs>(args?: SelectSubset<T, AuditLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AuditLog.
     * @param {AuditLogDeleteArgs} args - Arguments to delete one AuditLog.
     * @example
     * // Delete one AuditLog
     * const AuditLog = await prisma.auditLog.delete({
     *   where: {
     *     // ... filter to delete one AuditLog
     *   }
     * })
     * 
     */
    delete<T extends AuditLogDeleteArgs>(args: SelectSubset<T, AuditLogDeleteArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AuditLog.
     * @param {AuditLogUpdateArgs} args - Arguments to update one AuditLog.
     * @example
     * // Update one AuditLog
     * const auditLog = await prisma.auditLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AuditLogUpdateArgs>(args: SelectSubset<T, AuditLogUpdateArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AuditLogs.
     * @param {AuditLogDeleteManyArgs} args - Arguments to filter AuditLogs to delete.
     * @example
     * // Delete a few AuditLogs
     * const { count } = await prisma.auditLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AuditLogDeleteManyArgs>(args?: SelectSubset<T, AuditLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AuditLogUpdateManyArgs>(args: SelectSubset<T, AuditLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuditLogs and returns the data updated in the database.
     * @param {AuditLogUpdateManyAndReturnArgs} args - Arguments to update many AuditLogs.
     * @example
     * // Update many AuditLogs
     * const auditLog = await prisma.auditLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AuditLogs and only return the `idLog`
     * const auditLogWithIdLogOnly = await prisma.auditLog.updateManyAndReturn({
     *   select: { idLog: true },
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
    updateManyAndReturn<T extends AuditLogUpdateManyAndReturnArgs>(args: SelectSubset<T, AuditLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AuditLog.
     * @param {AuditLogUpsertArgs} args - Arguments to update or create a AuditLog.
     * @example
     * // Update or create a AuditLog
     * const auditLog = await prisma.auditLog.upsert({
     *   create: {
     *     // ... data to create a AuditLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuditLog we want to update
     *   }
     * })
     */
    upsert<T extends AuditLogUpsertArgs>(args: SelectSubset<T, AuditLogUpsertArgs<ExtArgs>>): Prisma__AuditLogClient<$Result.GetResult<Prisma.$AuditLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AuditLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogCountArgs} args - Arguments to filter AuditLogs to count.
     * @example
     * // Count the number of AuditLogs
     * const count = await prisma.auditLog.count({
     *   where: {
     *     // ... the filter for the AuditLogs we want to count
     *   }
     * })
    **/
    count<T extends AuditLogCountArgs>(
      args?: Subset<T, AuditLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuditLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AuditLogAggregateArgs>(args: Subset<T, AuditLogAggregateArgs>): Prisma.PrismaPromise<GetAuditLogAggregateType<T>>

    /**
     * Group by AuditLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuditLogGroupByArgs} args - Group by arguments.
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
      T extends AuditLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuditLogGroupByArgs['orderBy'] }
        : { orderBy?: AuditLogGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AuditLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuditLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AuditLog model
   */
  readonly fields: AuditLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AuditLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AuditLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
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
   * Fields of the AuditLog model
   */
  interface AuditLogFieldRefs {
    readonly idLog: FieldRef<"AuditLog", 'String'>
    readonly entitasTarget: FieldRef<"AuditLog", 'String'>
    readonly idTarget: FieldRef<"AuditLog", 'String'>
    readonly aksi: FieldRef<"AuditLog", 'String'>
    readonly keterangan: FieldRef<"AuditLog", 'String'>
    readonly timestamp: FieldRef<"AuditLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AuditLog findUnique
   */
  export type AuditLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findUniqueOrThrow
   */
  export type AuditLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog findFirst
   */
  export type AuditLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findFirstOrThrow
   */
  export type AuditLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLog to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog findMany
   */
  export type AuditLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter, which AuditLogs to fetch.
     */
    where?: AuditLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuditLogs to fetch.
     */
    orderBy?: AuditLogOrderByWithRelationInput | AuditLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuditLogs.
     */
    cursor?: AuditLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuditLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuditLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuditLogs.
     */
    distinct?: AuditLogScalarFieldEnum | AuditLogScalarFieldEnum[]
  }

  /**
   * AuditLog create
   */
  export type AuditLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to create a AuditLog.
     */
    data: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
  }

  /**
   * AuditLog createMany
   */
  export type AuditLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog createManyAndReturn
   */
  export type AuditLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to create many AuditLogs.
     */
    data: AuditLogCreateManyInput | AuditLogCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AuditLog update
   */
  export type AuditLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data needed to update a AuditLog.
     */
    data: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
    /**
     * Choose, which AuditLog to update.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog updateMany
   */
  export type AuditLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog updateManyAndReturn
   */
  export type AuditLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The data used to update AuditLogs.
     */
    data: XOR<AuditLogUpdateManyMutationInput, AuditLogUncheckedUpdateManyInput>
    /**
     * Filter which AuditLogs to update
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to update.
     */
    limit?: number
  }

  /**
   * AuditLog upsert
   */
  export type AuditLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * The filter to search for the AuditLog to update in case it exists.
     */
    where: AuditLogWhereUniqueInput
    /**
     * In case the AuditLog found by the `where` argument doesn't exist, create a new AuditLog with this data.
     */
    create: XOR<AuditLogCreateInput, AuditLogUncheckedCreateInput>
    /**
     * In case the AuditLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AuditLogUpdateInput, AuditLogUncheckedUpdateInput>
  }

  /**
   * AuditLog delete
   */
  export type AuditLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
    /**
     * Filter which AuditLog to delete.
     */
    where: AuditLogWhereUniqueInput
  }

  /**
   * AuditLog deleteMany
   */
  export type AuditLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AuditLogs to delete
     */
    where?: AuditLogWhereInput
    /**
     * Limit how many AuditLogs to delete.
     */
    limit?: number
  }

  /**
   * AuditLog without action
   */
  export type AuditLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AuditLog
     */
    select?: AuditLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AuditLog
     */
    omit?: AuditLogOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    phone: string | null
    password: string | null
    role: string | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    phone: number
    password: number
    role: number
    createdAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    role?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    phone?: true
    password?: true
    role?: true
    createdAt?: true
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
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    phone: string
    password: string
    role: string
    createdAt: Date
    _count: UserCountAggregateOutputType | null
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
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    phone?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "phone" | "password" | "role" | "createdAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      phone: string
      password: string
      role: string
      createdAt: Date
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
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
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
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
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


  export const MesinScalarFieldEnum: {
    idMesin: 'idMesin',
    namaMesin: 'namaMesin',
    kapasitas: 'kapasitas',
    status: 'status',
    lokasi: 'lokasi',
    lastService: 'lastService',
    pelanggan: 'pelanggan'
  };

  export type MesinScalarFieldEnum = (typeof MesinScalarFieldEnum)[keyof typeof MesinScalarFieldEnum]


  export const PermintaanSewaScalarFieldEnum: {
    idPermintaan: 'idPermintaan',
    pelanggan: 'pelanggan',
    lokasi: 'lokasi',
    durasi: 'durasi',
    status: 'status',
    tanggalFormat: 'tanggalFormat'
  };

  export type PermintaanSewaScalarFieldEnum = (typeof PermintaanSewaScalarFieldEnum)[keyof typeof PermintaanSewaScalarFieldEnum]


  export const PermintaanMesinScalarFieldEnum: {
    idPermintaan: 'idPermintaan',
    idMesin: 'idMesin',
    qty: 'qty',
    harga: 'harga',
    diskon: 'diskon'
  };

  export type PermintaanMesinScalarFieldEnum = (typeof PermintaanMesinScalarFieldEnum)[keyof typeof PermintaanMesinScalarFieldEnum]


  export const PembayaranScalarFieldEnum: {
    id: 'id',
    idPermintaan: 'idPermintaan',
    total: 'total',
    tanggal: 'tanggal',
    status: 'status',
    bukti: 'bukti'
  };

  export type PembayaranScalarFieldEnum = (typeof PembayaranScalarFieldEnum)[keyof typeof PembayaranScalarFieldEnum]


  export const PengirimanScalarFieldEnum: {
    id: 'id',
    idPermintaan: 'idPermintaan',
    tanggalKirim: 'tanggalKirim',
    sopir: 'sopir',
    status: 'status',
    buktiSuratJalan: 'buktiSuratJalan'
  };

  export type PengirimanScalarFieldEnum = (typeof PengirimanScalarFieldEnum)[keyof typeof PengirimanScalarFieldEnum]


  export const AuditLogScalarFieldEnum: {
    idLog: 'idLog',
    entitasTarget: 'entitasTarget',
    idTarget: 'idTarget',
    aksi: 'aksi',
    keterangan: 'keterangan',
    timestamp: 'timestamp'
  };

  export type AuditLogScalarFieldEnum = (typeof AuditLogScalarFieldEnum)[keyof typeof AuditLogScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    phone: 'phone',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


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
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


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


  export type MesinWhereInput = {
    AND?: MesinWhereInput | MesinWhereInput[]
    OR?: MesinWhereInput[]
    NOT?: MesinWhereInput | MesinWhereInput[]
    idMesin?: StringFilter<"Mesin"> | string
    namaMesin?: StringFilter<"Mesin"> | string
    kapasitas?: StringFilter<"Mesin"> | string
    status?: StringFilter<"Mesin"> | string
    lokasi?: StringFilter<"Mesin"> | string
    lastService?: DateTimeNullableFilter<"Mesin"> | Date | string | null
    pelanggan?: StringNullableFilter<"Mesin"> | string | null
    permintaan?: PermintaanMesinListRelationFilter
  }

  export type MesinOrderByWithRelationInput = {
    idMesin?: SortOrder
    namaMesin?: SortOrder
    kapasitas?: SortOrder
    status?: SortOrder
    lokasi?: SortOrder
    lastService?: SortOrderInput | SortOrder
    pelanggan?: SortOrderInput | SortOrder
    permintaan?: PermintaanMesinOrderByRelationAggregateInput
  }

  export type MesinWhereUniqueInput = Prisma.AtLeast<{
    idMesin?: string
    AND?: MesinWhereInput | MesinWhereInput[]
    OR?: MesinWhereInput[]
    NOT?: MesinWhereInput | MesinWhereInput[]
    namaMesin?: StringFilter<"Mesin"> | string
    kapasitas?: StringFilter<"Mesin"> | string
    status?: StringFilter<"Mesin"> | string
    lokasi?: StringFilter<"Mesin"> | string
    lastService?: DateTimeNullableFilter<"Mesin"> | Date | string | null
    pelanggan?: StringNullableFilter<"Mesin"> | string | null
    permintaan?: PermintaanMesinListRelationFilter
  }, "idMesin">

  export type MesinOrderByWithAggregationInput = {
    idMesin?: SortOrder
    namaMesin?: SortOrder
    kapasitas?: SortOrder
    status?: SortOrder
    lokasi?: SortOrder
    lastService?: SortOrderInput | SortOrder
    pelanggan?: SortOrderInput | SortOrder
    _count?: MesinCountOrderByAggregateInput
    _max?: MesinMaxOrderByAggregateInput
    _min?: MesinMinOrderByAggregateInput
  }

  export type MesinScalarWhereWithAggregatesInput = {
    AND?: MesinScalarWhereWithAggregatesInput | MesinScalarWhereWithAggregatesInput[]
    OR?: MesinScalarWhereWithAggregatesInput[]
    NOT?: MesinScalarWhereWithAggregatesInput | MesinScalarWhereWithAggregatesInput[]
    idMesin?: StringWithAggregatesFilter<"Mesin"> | string
    namaMesin?: StringWithAggregatesFilter<"Mesin"> | string
    kapasitas?: StringWithAggregatesFilter<"Mesin"> | string
    status?: StringWithAggregatesFilter<"Mesin"> | string
    lokasi?: StringWithAggregatesFilter<"Mesin"> | string
    lastService?: DateTimeNullableWithAggregatesFilter<"Mesin"> | Date | string | null
    pelanggan?: StringNullableWithAggregatesFilter<"Mesin"> | string | null
  }

  export type PermintaanSewaWhereInput = {
    AND?: PermintaanSewaWhereInput | PermintaanSewaWhereInput[]
    OR?: PermintaanSewaWhereInput[]
    NOT?: PermintaanSewaWhereInput | PermintaanSewaWhereInput[]
    idPermintaan?: StringFilter<"PermintaanSewa"> | string
    pelanggan?: StringFilter<"PermintaanSewa"> | string
    lokasi?: StringFilter<"PermintaanSewa"> | string
    durasi?: IntFilter<"PermintaanSewa"> | number
    status?: StringFilter<"PermintaanSewa"> | string
    tanggalFormat?: StringFilter<"PermintaanSewa"> | string
    mesin?: PermintaanMesinListRelationFilter
    pembayaran?: PembayaranListRelationFilter
    pengiriman?: PengirimanListRelationFilter
  }

  export type PermintaanSewaOrderByWithRelationInput = {
    idPermintaan?: SortOrder
    pelanggan?: SortOrder
    lokasi?: SortOrder
    durasi?: SortOrder
    status?: SortOrder
    tanggalFormat?: SortOrder
    mesin?: PermintaanMesinOrderByRelationAggregateInput
    pembayaran?: PembayaranOrderByRelationAggregateInput
    pengiriman?: PengirimanOrderByRelationAggregateInput
  }

  export type PermintaanSewaWhereUniqueInput = Prisma.AtLeast<{
    idPermintaan?: string
    AND?: PermintaanSewaWhereInput | PermintaanSewaWhereInput[]
    OR?: PermintaanSewaWhereInput[]
    NOT?: PermintaanSewaWhereInput | PermintaanSewaWhereInput[]
    pelanggan?: StringFilter<"PermintaanSewa"> | string
    lokasi?: StringFilter<"PermintaanSewa"> | string
    durasi?: IntFilter<"PermintaanSewa"> | number
    status?: StringFilter<"PermintaanSewa"> | string
    tanggalFormat?: StringFilter<"PermintaanSewa"> | string
    mesin?: PermintaanMesinListRelationFilter
    pembayaran?: PembayaranListRelationFilter
    pengiriman?: PengirimanListRelationFilter
  }, "idPermintaan">

  export type PermintaanSewaOrderByWithAggregationInput = {
    idPermintaan?: SortOrder
    pelanggan?: SortOrder
    lokasi?: SortOrder
    durasi?: SortOrder
    status?: SortOrder
    tanggalFormat?: SortOrder
    _count?: PermintaanSewaCountOrderByAggregateInput
    _avg?: PermintaanSewaAvgOrderByAggregateInput
    _max?: PermintaanSewaMaxOrderByAggregateInput
    _min?: PermintaanSewaMinOrderByAggregateInput
    _sum?: PermintaanSewaSumOrderByAggregateInput
  }

  export type PermintaanSewaScalarWhereWithAggregatesInput = {
    AND?: PermintaanSewaScalarWhereWithAggregatesInput | PermintaanSewaScalarWhereWithAggregatesInput[]
    OR?: PermintaanSewaScalarWhereWithAggregatesInput[]
    NOT?: PermintaanSewaScalarWhereWithAggregatesInput | PermintaanSewaScalarWhereWithAggregatesInput[]
    idPermintaan?: StringWithAggregatesFilter<"PermintaanSewa"> | string
    pelanggan?: StringWithAggregatesFilter<"PermintaanSewa"> | string
    lokasi?: StringWithAggregatesFilter<"PermintaanSewa"> | string
    durasi?: IntWithAggregatesFilter<"PermintaanSewa"> | number
    status?: StringWithAggregatesFilter<"PermintaanSewa"> | string
    tanggalFormat?: StringWithAggregatesFilter<"PermintaanSewa"> | string
  }

  export type PermintaanMesinWhereInput = {
    AND?: PermintaanMesinWhereInput | PermintaanMesinWhereInput[]
    OR?: PermintaanMesinWhereInput[]
    NOT?: PermintaanMesinWhereInput | PermintaanMesinWhereInput[]
    idPermintaan?: StringFilter<"PermintaanMesin"> | string
    idMesin?: StringFilter<"PermintaanMesin"> | string
    qty?: IntFilter<"PermintaanMesin"> | number
    harga?: IntFilter<"PermintaanMesin"> | number
    diskon?: IntFilter<"PermintaanMesin"> | number
    permintaan?: XOR<PermintaanSewaScalarRelationFilter, PermintaanSewaWhereInput>
    mesin?: XOR<MesinScalarRelationFilter, MesinWhereInput>
  }

  export type PermintaanMesinOrderByWithRelationInput = {
    idPermintaan?: SortOrder
    idMesin?: SortOrder
    qty?: SortOrder
    harga?: SortOrder
    diskon?: SortOrder
    permintaan?: PermintaanSewaOrderByWithRelationInput
    mesin?: MesinOrderByWithRelationInput
  }

  export type PermintaanMesinWhereUniqueInput = Prisma.AtLeast<{
    idPermintaan_idMesin?: PermintaanMesinIdPermintaanIdMesinCompoundUniqueInput
    AND?: PermintaanMesinWhereInput | PermintaanMesinWhereInput[]
    OR?: PermintaanMesinWhereInput[]
    NOT?: PermintaanMesinWhereInput | PermintaanMesinWhereInput[]
    idPermintaan?: StringFilter<"PermintaanMesin"> | string
    idMesin?: StringFilter<"PermintaanMesin"> | string
    qty?: IntFilter<"PermintaanMesin"> | number
    harga?: IntFilter<"PermintaanMesin"> | number
    diskon?: IntFilter<"PermintaanMesin"> | number
    permintaan?: XOR<PermintaanSewaScalarRelationFilter, PermintaanSewaWhereInput>
    mesin?: XOR<MesinScalarRelationFilter, MesinWhereInput>
  }, "idPermintaan_idMesin">

  export type PermintaanMesinOrderByWithAggregationInput = {
    idPermintaan?: SortOrder
    idMesin?: SortOrder
    qty?: SortOrder
    harga?: SortOrder
    diskon?: SortOrder
    _count?: PermintaanMesinCountOrderByAggregateInput
    _avg?: PermintaanMesinAvgOrderByAggregateInput
    _max?: PermintaanMesinMaxOrderByAggregateInput
    _min?: PermintaanMesinMinOrderByAggregateInput
    _sum?: PermintaanMesinSumOrderByAggregateInput
  }

  export type PermintaanMesinScalarWhereWithAggregatesInput = {
    AND?: PermintaanMesinScalarWhereWithAggregatesInput | PermintaanMesinScalarWhereWithAggregatesInput[]
    OR?: PermintaanMesinScalarWhereWithAggregatesInput[]
    NOT?: PermintaanMesinScalarWhereWithAggregatesInput | PermintaanMesinScalarWhereWithAggregatesInput[]
    idPermintaan?: StringWithAggregatesFilter<"PermintaanMesin"> | string
    idMesin?: StringWithAggregatesFilter<"PermintaanMesin"> | string
    qty?: IntWithAggregatesFilter<"PermintaanMesin"> | number
    harga?: IntWithAggregatesFilter<"PermintaanMesin"> | number
    diskon?: IntWithAggregatesFilter<"PermintaanMesin"> | number
  }

  export type PembayaranWhereInput = {
    AND?: PembayaranWhereInput | PembayaranWhereInput[]
    OR?: PembayaranWhereInput[]
    NOT?: PembayaranWhereInput | PembayaranWhereInput[]
    id?: StringFilter<"Pembayaran"> | string
    idPermintaan?: StringFilter<"Pembayaran"> | string
    total?: IntFilter<"Pembayaran"> | number
    tanggal?: StringFilter<"Pembayaran"> | string
    status?: StringFilter<"Pembayaran"> | string
    bukti?: StringFilter<"Pembayaran"> | string
    permintaan?: XOR<PermintaanSewaScalarRelationFilter, PermintaanSewaWhereInput>
  }

  export type PembayaranOrderByWithRelationInput = {
    id?: SortOrder
    idPermintaan?: SortOrder
    total?: SortOrder
    tanggal?: SortOrder
    status?: SortOrder
    bukti?: SortOrder
    permintaan?: PermintaanSewaOrderByWithRelationInput
  }

  export type PembayaranWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PembayaranWhereInput | PembayaranWhereInput[]
    OR?: PembayaranWhereInput[]
    NOT?: PembayaranWhereInput | PembayaranWhereInput[]
    idPermintaan?: StringFilter<"Pembayaran"> | string
    total?: IntFilter<"Pembayaran"> | number
    tanggal?: StringFilter<"Pembayaran"> | string
    status?: StringFilter<"Pembayaran"> | string
    bukti?: StringFilter<"Pembayaran"> | string
    permintaan?: XOR<PermintaanSewaScalarRelationFilter, PermintaanSewaWhereInput>
  }, "id">

  export type PembayaranOrderByWithAggregationInput = {
    id?: SortOrder
    idPermintaan?: SortOrder
    total?: SortOrder
    tanggal?: SortOrder
    status?: SortOrder
    bukti?: SortOrder
    _count?: PembayaranCountOrderByAggregateInput
    _avg?: PembayaranAvgOrderByAggregateInput
    _max?: PembayaranMaxOrderByAggregateInput
    _min?: PembayaranMinOrderByAggregateInput
    _sum?: PembayaranSumOrderByAggregateInput
  }

  export type PembayaranScalarWhereWithAggregatesInput = {
    AND?: PembayaranScalarWhereWithAggregatesInput | PembayaranScalarWhereWithAggregatesInput[]
    OR?: PembayaranScalarWhereWithAggregatesInput[]
    NOT?: PembayaranScalarWhereWithAggregatesInput | PembayaranScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pembayaran"> | string
    idPermintaan?: StringWithAggregatesFilter<"Pembayaran"> | string
    total?: IntWithAggregatesFilter<"Pembayaran"> | number
    tanggal?: StringWithAggregatesFilter<"Pembayaran"> | string
    status?: StringWithAggregatesFilter<"Pembayaran"> | string
    bukti?: StringWithAggregatesFilter<"Pembayaran"> | string
  }

  export type PengirimanWhereInput = {
    AND?: PengirimanWhereInput | PengirimanWhereInput[]
    OR?: PengirimanWhereInput[]
    NOT?: PengirimanWhereInput | PengirimanWhereInput[]
    id?: StringFilter<"Pengiriman"> | string
    idPermintaan?: StringFilter<"Pengiriman"> | string
    tanggalKirim?: StringFilter<"Pengiriman"> | string
    sopir?: StringFilter<"Pengiriman"> | string
    status?: StringFilter<"Pengiriman"> | string
    buktiSuratJalan?: StringFilter<"Pengiriman"> | string
    permintaan?: XOR<PermintaanSewaScalarRelationFilter, PermintaanSewaWhereInput>
  }

  export type PengirimanOrderByWithRelationInput = {
    id?: SortOrder
    idPermintaan?: SortOrder
    tanggalKirim?: SortOrder
    sopir?: SortOrder
    status?: SortOrder
    buktiSuratJalan?: SortOrder
    permintaan?: PermintaanSewaOrderByWithRelationInput
  }

  export type PengirimanWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PengirimanWhereInput | PengirimanWhereInput[]
    OR?: PengirimanWhereInput[]
    NOT?: PengirimanWhereInput | PengirimanWhereInput[]
    idPermintaan?: StringFilter<"Pengiriman"> | string
    tanggalKirim?: StringFilter<"Pengiriman"> | string
    sopir?: StringFilter<"Pengiriman"> | string
    status?: StringFilter<"Pengiriman"> | string
    buktiSuratJalan?: StringFilter<"Pengiriman"> | string
    permintaan?: XOR<PermintaanSewaScalarRelationFilter, PermintaanSewaWhereInput>
  }, "id">

  export type PengirimanOrderByWithAggregationInput = {
    id?: SortOrder
    idPermintaan?: SortOrder
    tanggalKirim?: SortOrder
    sopir?: SortOrder
    status?: SortOrder
    buktiSuratJalan?: SortOrder
    _count?: PengirimanCountOrderByAggregateInput
    _max?: PengirimanMaxOrderByAggregateInput
    _min?: PengirimanMinOrderByAggregateInput
  }

  export type PengirimanScalarWhereWithAggregatesInput = {
    AND?: PengirimanScalarWhereWithAggregatesInput | PengirimanScalarWhereWithAggregatesInput[]
    OR?: PengirimanScalarWhereWithAggregatesInput[]
    NOT?: PengirimanScalarWhereWithAggregatesInput | PengirimanScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Pengiriman"> | string
    idPermintaan?: StringWithAggregatesFilter<"Pengiriman"> | string
    tanggalKirim?: StringWithAggregatesFilter<"Pengiriman"> | string
    sopir?: StringWithAggregatesFilter<"Pengiriman"> | string
    status?: StringWithAggregatesFilter<"Pengiriman"> | string
    buktiSuratJalan?: StringWithAggregatesFilter<"Pengiriman"> | string
  }

  export type AuditLogWhereInput = {
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    idLog?: StringFilter<"AuditLog"> | string
    entitasTarget?: StringFilter<"AuditLog"> | string
    idTarget?: StringFilter<"AuditLog"> | string
    aksi?: StringFilter<"AuditLog"> | string
    keterangan?: StringFilter<"AuditLog"> | string
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
  }

  export type AuditLogOrderByWithRelationInput = {
    idLog?: SortOrder
    entitasTarget?: SortOrder
    idTarget?: SortOrder
    aksi?: SortOrder
    keterangan?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogWhereUniqueInput = Prisma.AtLeast<{
    idLog?: string
    AND?: AuditLogWhereInput | AuditLogWhereInput[]
    OR?: AuditLogWhereInput[]
    NOT?: AuditLogWhereInput | AuditLogWhereInput[]
    entitasTarget?: StringFilter<"AuditLog"> | string
    idTarget?: StringFilter<"AuditLog"> | string
    aksi?: StringFilter<"AuditLog"> | string
    keterangan?: StringFilter<"AuditLog"> | string
    timestamp?: DateTimeFilter<"AuditLog"> | Date | string
  }, "idLog">

  export type AuditLogOrderByWithAggregationInput = {
    idLog?: SortOrder
    entitasTarget?: SortOrder
    idTarget?: SortOrder
    aksi?: SortOrder
    keterangan?: SortOrder
    timestamp?: SortOrder
    _count?: AuditLogCountOrderByAggregateInput
    _max?: AuditLogMaxOrderByAggregateInput
    _min?: AuditLogMinOrderByAggregateInput
  }

  export type AuditLogScalarWhereWithAggregatesInput = {
    AND?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    OR?: AuditLogScalarWhereWithAggregatesInput[]
    NOT?: AuditLogScalarWhereWithAggregatesInput | AuditLogScalarWhereWithAggregatesInput[]
    idLog?: StringWithAggregatesFilter<"AuditLog"> | string
    entitasTarget?: StringWithAggregatesFilter<"AuditLog"> | string
    idTarget?: StringWithAggregatesFilter<"AuditLog"> | string
    aksi?: StringWithAggregatesFilter<"AuditLog"> | string
    keterangan?: StringWithAggregatesFilter<"AuditLog"> | string
    timestamp?: DateTimeWithAggregatesFilter<"AuditLog"> | Date | string
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    phone?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    phone?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type MesinCreateInput = {
    idMesin: string
    namaMesin: string
    kapasitas?: string
    status: string
    lokasi?: string
    lastService?: Date | string | null
    pelanggan?: string | null
    permintaan?: PermintaanMesinCreateNestedManyWithoutMesinInput
  }

  export type MesinUncheckedCreateInput = {
    idMesin: string
    namaMesin: string
    kapasitas?: string
    status: string
    lokasi?: string
    lastService?: Date | string | null
    pelanggan?: string | null
    permintaan?: PermintaanMesinUncheckedCreateNestedManyWithoutMesinInput
  }

  export type MesinUpdateInput = {
    idMesin?: StringFieldUpdateOperationsInput | string
    namaMesin?: StringFieldUpdateOperationsInput | string
    kapasitas?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    lastService?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pelanggan?: NullableStringFieldUpdateOperationsInput | string | null
    permintaan?: PermintaanMesinUpdateManyWithoutMesinNestedInput
  }

  export type MesinUncheckedUpdateInput = {
    idMesin?: StringFieldUpdateOperationsInput | string
    namaMesin?: StringFieldUpdateOperationsInput | string
    kapasitas?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    lastService?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pelanggan?: NullableStringFieldUpdateOperationsInput | string | null
    permintaan?: PermintaanMesinUncheckedUpdateManyWithoutMesinNestedInput
  }

  export type MesinCreateManyInput = {
    idMesin: string
    namaMesin: string
    kapasitas?: string
    status: string
    lokasi?: string
    lastService?: Date | string | null
    pelanggan?: string | null
  }

  export type MesinUpdateManyMutationInput = {
    idMesin?: StringFieldUpdateOperationsInput | string
    namaMesin?: StringFieldUpdateOperationsInput | string
    kapasitas?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    lastService?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pelanggan?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MesinUncheckedUpdateManyInput = {
    idMesin?: StringFieldUpdateOperationsInput | string
    namaMesin?: StringFieldUpdateOperationsInput | string
    kapasitas?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    lastService?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pelanggan?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PermintaanSewaCreateInput = {
    idPermintaan?: string
    pelanggan?: string
    lokasi: string
    durasi?: number
    status: string
    tanggalFormat?: string
    mesin?: PermintaanMesinCreateNestedManyWithoutPermintaanInput
    pembayaran?: PembayaranCreateNestedManyWithoutPermintaanInput
    pengiriman?: PengirimanCreateNestedManyWithoutPermintaanInput
  }

  export type PermintaanSewaUncheckedCreateInput = {
    idPermintaan?: string
    pelanggan?: string
    lokasi: string
    durasi?: number
    status: string
    tanggalFormat?: string
    mesin?: PermintaanMesinUncheckedCreateNestedManyWithoutPermintaanInput
    pembayaran?: PembayaranUncheckedCreateNestedManyWithoutPermintaanInput
    pengiriman?: PengirimanUncheckedCreateNestedManyWithoutPermintaanInput
  }

  export type PermintaanSewaUpdateInput = {
    idPermintaan?: StringFieldUpdateOperationsInput | string
    pelanggan?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    durasi?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tanggalFormat?: StringFieldUpdateOperationsInput | string
    mesin?: PermintaanMesinUpdateManyWithoutPermintaanNestedInput
    pembayaran?: PembayaranUpdateManyWithoutPermintaanNestedInput
    pengiriman?: PengirimanUpdateManyWithoutPermintaanNestedInput
  }

  export type PermintaanSewaUncheckedUpdateInput = {
    idPermintaan?: StringFieldUpdateOperationsInput | string
    pelanggan?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    durasi?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tanggalFormat?: StringFieldUpdateOperationsInput | string
    mesin?: PermintaanMesinUncheckedUpdateManyWithoutPermintaanNestedInput
    pembayaran?: PembayaranUncheckedUpdateManyWithoutPermintaanNestedInput
    pengiriman?: PengirimanUncheckedUpdateManyWithoutPermintaanNestedInput
  }

  export type PermintaanSewaCreateManyInput = {
    idPermintaan?: string
    pelanggan?: string
    lokasi: string
    durasi?: number
    status: string
    tanggalFormat?: string
  }

  export type PermintaanSewaUpdateManyMutationInput = {
    idPermintaan?: StringFieldUpdateOperationsInput | string
    pelanggan?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    durasi?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tanggalFormat?: StringFieldUpdateOperationsInput | string
  }

  export type PermintaanSewaUncheckedUpdateManyInput = {
    idPermintaan?: StringFieldUpdateOperationsInput | string
    pelanggan?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    durasi?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tanggalFormat?: StringFieldUpdateOperationsInput | string
  }

  export type PermintaanMesinCreateInput = {
    qty?: number
    harga?: number
    diskon?: number
    permintaan: PermintaanSewaCreateNestedOneWithoutMesinInput
    mesin: MesinCreateNestedOneWithoutPermintaanInput
  }

  export type PermintaanMesinUncheckedCreateInput = {
    idPermintaan: string
    idMesin: string
    qty?: number
    harga?: number
    diskon?: number
  }

  export type PermintaanMesinUpdateInput = {
    qty?: IntFieldUpdateOperationsInput | number
    harga?: IntFieldUpdateOperationsInput | number
    diskon?: IntFieldUpdateOperationsInput | number
    permintaan?: PermintaanSewaUpdateOneRequiredWithoutMesinNestedInput
    mesin?: MesinUpdateOneRequiredWithoutPermintaanNestedInput
  }

  export type PermintaanMesinUncheckedUpdateInput = {
    idPermintaan?: StringFieldUpdateOperationsInput | string
    idMesin?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    harga?: IntFieldUpdateOperationsInput | number
    diskon?: IntFieldUpdateOperationsInput | number
  }

  export type PermintaanMesinCreateManyInput = {
    idPermintaan: string
    idMesin: string
    qty?: number
    harga?: number
    diskon?: number
  }

  export type PermintaanMesinUpdateManyMutationInput = {
    qty?: IntFieldUpdateOperationsInput | number
    harga?: IntFieldUpdateOperationsInput | number
    diskon?: IntFieldUpdateOperationsInput | number
  }

  export type PermintaanMesinUncheckedUpdateManyInput = {
    idPermintaan?: StringFieldUpdateOperationsInput | string
    idMesin?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    harga?: IntFieldUpdateOperationsInput | number
    diskon?: IntFieldUpdateOperationsInput | number
  }

  export type PembayaranCreateInput = {
    id?: string
    total: number
    tanggal: string
    status: string
    bukti?: string
    permintaan: PermintaanSewaCreateNestedOneWithoutPembayaranInput
  }

  export type PembayaranUncheckedCreateInput = {
    id?: string
    idPermintaan: string
    total: number
    tanggal: string
    status: string
    bukti?: string
  }

  export type PembayaranUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    tanggal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    bukti?: StringFieldUpdateOperationsInput | string
    permintaan?: PermintaanSewaUpdateOneRequiredWithoutPembayaranNestedInput
  }

  export type PembayaranUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idPermintaan?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    tanggal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    bukti?: StringFieldUpdateOperationsInput | string
  }

  export type PembayaranCreateManyInput = {
    id?: string
    idPermintaan: string
    total: number
    tanggal: string
    status: string
    bukti?: string
  }

  export type PembayaranUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    tanggal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    bukti?: StringFieldUpdateOperationsInput | string
  }

  export type PembayaranUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idPermintaan?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    tanggal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    bukti?: StringFieldUpdateOperationsInput | string
  }

  export type PengirimanCreateInput = {
    id?: string
    tanggalKirim: string
    sopir: string
    status: string
    buktiSuratJalan?: string
    permintaan: PermintaanSewaCreateNestedOneWithoutPengirimanInput
  }

  export type PengirimanUncheckedCreateInput = {
    id?: string
    idPermintaan: string
    tanggalKirim: string
    sopir: string
    status: string
    buktiSuratJalan?: string
  }

  export type PengirimanUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggalKirim?: StringFieldUpdateOperationsInput | string
    sopir?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    buktiSuratJalan?: StringFieldUpdateOperationsInput | string
    permintaan?: PermintaanSewaUpdateOneRequiredWithoutPengirimanNestedInput
  }

  export type PengirimanUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    idPermintaan?: StringFieldUpdateOperationsInput | string
    tanggalKirim?: StringFieldUpdateOperationsInput | string
    sopir?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    buktiSuratJalan?: StringFieldUpdateOperationsInput | string
  }

  export type PengirimanCreateManyInput = {
    id?: string
    idPermintaan: string
    tanggalKirim: string
    sopir: string
    status: string
    buktiSuratJalan?: string
  }

  export type PengirimanUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggalKirim?: StringFieldUpdateOperationsInput | string
    sopir?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    buktiSuratJalan?: StringFieldUpdateOperationsInput | string
  }

  export type PengirimanUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    idPermintaan?: StringFieldUpdateOperationsInput | string
    tanggalKirim?: StringFieldUpdateOperationsInput | string
    sopir?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    buktiSuratJalan?: StringFieldUpdateOperationsInput | string
  }

  export type AuditLogCreateInput = {
    idLog?: string
    entitasTarget: string
    idTarget: string
    aksi: string
    keterangan: string
    timestamp?: Date | string
  }

  export type AuditLogUncheckedCreateInput = {
    idLog?: string
    entitasTarget: string
    idTarget: string
    aksi: string
    keterangan: string
    timestamp?: Date | string
  }

  export type AuditLogUpdateInput = {
    idLog?: StringFieldUpdateOperationsInput | string
    entitasTarget?: StringFieldUpdateOperationsInput | string
    idTarget?: StringFieldUpdateOperationsInput | string
    aksi?: StringFieldUpdateOperationsInput | string
    keterangan?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateInput = {
    idLog?: StringFieldUpdateOperationsInput | string
    entitasTarget?: StringFieldUpdateOperationsInput | string
    idTarget?: StringFieldUpdateOperationsInput | string
    aksi?: StringFieldUpdateOperationsInput | string
    keterangan?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogCreateManyInput = {
    idLog?: string
    entitasTarget: string
    idTarget: string
    aksi: string
    keterangan: string
    timestamp?: Date | string
  }

  export type AuditLogUpdateManyMutationInput = {
    idLog?: StringFieldUpdateOperationsInput | string
    entitasTarget?: StringFieldUpdateOperationsInput | string
    idTarget?: StringFieldUpdateOperationsInput | string
    aksi?: StringFieldUpdateOperationsInput | string
    keterangan?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AuditLogUncheckedUpdateManyInput = {
    idLog?: StringFieldUpdateOperationsInput | string
    entitasTarget?: StringFieldUpdateOperationsInput | string
    idTarget?: StringFieldUpdateOperationsInput | string
    aksi?: StringFieldUpdateOperationsInput | string
    keterangan?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    phone: string
    password: string
    role?: string
    createdAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    phone: string
    password: string
    role?: string
    createdAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    phone: string
    password: string
    role?: string
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    phone?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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

  export type PermintaanMesinListRelationFilter = {
    every?: PermintaanMesinWhereInput
    some?: PermintaanMesinWhereInput
    none?: PermintaanMesinWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PermintaanMesinOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type MesinCountOrderByAggregateInput = {
    idMesin?: SortOrder
    namaMesin?: SortOrder
    kapasitas?: SortOrder
    status?: SortOrder
    lokasi?: SortOrder
    lastService?: SortOrder
    pelanggan?: SortOrder
  }

  export type MesinMaxOrderByAggregateInput = {
    idMesin?: SortOrder
    namaMesin?: SortOrder
    kapasitas?: SortOrder
    status?: SortOrder
    lokasi?: SortOrder
    lastService?: SortOrder
    pelanggan?: SortOrder
  }

  export type MesinMinOrderByAggregateInput = {
    idMesin?: SortOrder
    namaMesin?: SortOrder
    kapasitas?: SortOrder
    status?: SortOrder
    lokasi?: SortOrder
    lastService?: SortOrder
    pelanggan?: SortOrder
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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

  export type PembayaranListRelationFilter = {
    every?: PembayaranWhereInput
    some?: PembayaranWhereInput
    none?: PembayaranWhereInput
  }

  export type PengirimanListRelationFilter = {
    every?: PengirimanWhereInput
    some?: PengirimanWhereInput
    none?: PengirimanWhereInput
  }

  export type PembayaranOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PengirimanOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PermintaanSewaCountOrderByAggregateInput = {
    idPermintaan?: SortOrder
    pelanggan?: SortOrder
    lokasi?: SortOrder
    durasi?: SortOrder
    status?: SortOrder
    tanggalFormat?: SortOrder
  }

  export type PermintaanSewaAvgOrderByAggregateInput = {
    durasi?: SortOrder
  }

  export type PermintaanSewaMaxOrderByAggregateInput = {
    idPermintaan?: SortOrder
    pelanggan?: SortOrder
    lokasi?: SortOrder
    durasi?: SortOrder
    status?: SortOrder
    tanggalFormat?: SortOrder
  }

  export type PermintaanSewaMinOrderByAggregateInput = {
    idPermintaan?: SortOrder
    pelanggan?: SortOrder
    lokasi?: SortOrder
    durasi?: SortOrder
    status?: SortOrder
    tanggalFormat?: SortOrder
  }

  export type PermintaanSewaSumOrderByAggregateInput = {
    durasi?: SortOrder
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

  export type PermintaanSewaScalarRelationFilter = {
    is?: PermintaanSewaWhereInput
    isNot?: PermintaanSewaWhereInput
  }

  export type MesinScalarRelationFilter = {
    is?: MesinWhereInput
    isNot?: MesinWhereInput
  }

  export type PermintaanMesinIdPermintaanIdMesinCompoundUniqueInput = {
    idPermintaan: string
    idMesin: string
  }

  export type PermintaanMesinCountOrderByAggregateInput = {
    idPermintaan?: SortOrder
    idMesin?: SortOrder
    qty?: SortOrder
    harga?: SortOrder
    diskon?: SortOrder
  }

  export type PermintaanMesinAvgOrderByAggregateInput = {
    qty?: SortOrder
    harga?: SortOrder
    diskon?: SortOrder
  }

  export type PermintaanMesinMaxOrderByAggregateInput = {
    idPermintaan?: SortOrder
    idMesin?: SortOrder
    qty?: SortOrder
    harga?: SortOrder
    diskon?: SortOrder
  }

  export type PermintaanMesinMinOrderByAggregateInput = {
    idPermintaan?: SortOrder
    idMesin?: SortOrder
    qty?: SortOrder
    harga?: SortOrder
    diskon?: SortOrder
  }

  export type PermintaanMesinSumOrderByAggregateInput = {
    qty?: SortOrder
    harga?: SortOrder
    diskon?: SortOrder
  }

  export type PembayaranCountOrderByAggregateInput = {
    id?: SortOrder
    idPermintaan?: SortOrder
    total?: SortOrder
    tanggal?: SortOrder
    status?: SortOrder
    bukti?: SortOrder
  }

  export type PembayaranAvgOrderByAggregateInput = {
    total?: SortOrder
  }

  export type PembayaranMaxOrderByAggregateInput = {
    id?: SortOrder
    idPermintaan?: SortOrder
    total?: SortOrder
    tanggal?: SortOrder
    status?: SortOrder
    bukti?: SortOrder
  }

  export type PembayaranMinOrderByAggregateInput = {
    id?: SortOrder
    idPermintaan?: SortOrder
    total?: SortOrder
    tanggal?: SortOrder
    status?: SortOrder
    bukti?: SortOrder
  }

  export type PembayaranSumOrderByAggregateInput = {
    total?: SortOrder
  }

  export type PengirimanCountOrderByAggregateInput = {
    id?: SortOrder
    idPermintaan?: SortOrder
    tanggalKirim?: SortOrder
    sopir?: SortOrder
    status?: SortOrder
    buktiSuratJalan?: SortOrder
  }

  export type PengirimanMaxOrderByAggregateInput = {
    id?: SortOrder
    idPermintaan?: SortOrder
    tanggalKirim?: SortOrder
    sopir?: SortOrder
    status?: SortOrder
    buktiSuratJalan?: SortOrder
  }

  export type PengirimanMinOrderByAggregateInput = {
    id?: SortOrder
    idPermintaan?: SortOrder
    tanggalKirim?: SortOrder
    sopir?: SortOrder
    status?: SortOrder
    buktiSuratJalan?: SortOrder
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

  export type AuditLogCountOrderByAggregateInput = {
    idLog?: SortOrder
    entitasTarget?: SortOrder
    idTarget?: SortOrder
    aksi?: SortOrder
    keterangan?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMaxOrderByAggregateInput = {
    idLog?: SortOrder
    entitasTarget?: SortOrder
    idTarget?: SortOrder
    aksi?: SortOrder
    keterangan?: SortOrder
    timestamp?: SortOrder
  }

  export type AuditLogMinOrderByAggregateInput = {
    idLog?: SortOrder
    entitasTarget?: SortOrder
    idTarget?: SortOrder
    aksi?: SortOrder
    keterangan?: SortOrder
    timestamp?: SortOrder
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

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    phone?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
  }

  export type PermintaanMesinCreateNestedManyWithoutMesinInput = {
    create?: XOR<PermintaanMesinCreateWithoutMesinInput, PermintaanMesinUncheckedCreateWithoutMesinInput> | PermintaanMesinCreateWithoutMesinInput[] | PermintaanMesinUncheckedCreateWithoutMesinInput[]
    connectOrCreate?: PermintaanMesinCreateOrConnectWithoutMesinInput | PermintaanMesinCreateOrConnectWithoutMesinInput[]
    createMany?: PermintaanMesinCreateManyMesinInputEnvelope
    connect?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
  }

  export type PermintaanMesinUncheckedCreateNestedManyWithoutMesinInput = {
    create?: XOR<PermintaanMesinCreateWithoutMesinInput, PermintaanMesinUncheckedCreateWithoutMesinInput> | PermintaanMesinCreateWithoutMesinInput[] | PermintaanMesinUncheckedCreateWithoutMesinInput[]
    connectOrCreate?: PermintaanMesinCreateOrConnectWithoutMesinInput | PermintaanMesinCreateOrConnectWithoutMesinInput[]
    createMany?: PermintaanMesinCreateManyMesinInputEnvelope
    connect?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type PermintaanMesinUpdateManyWithoutMesinNestedInput = {
    create?: XOR<PermintaanMesinCreateWithoutMesinInput, PermintaanMesinUncheckedCreateWithoutMesinInput> | PermintaanMesinCreateWithoutMesinInput[] | PermintaanMesinUncheckedCreateWithoutMesinInput[]
    connectOrCreate?: PermintaanMesinCreateOrConnectWithoutMesinInput | PermintaanMesinCreateOrConnectWithoutMesinInput[]
    upsert?: PermintaanMesinUpsertWithWhereUniqueWithoutMesinInput | PermintaanMesinUpsertWithWhereUniqueWithoutMesinInput[]
    createMany?: PermintaanMesinCreateManyMesinInputEnvelope
    set?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
    disconnect?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
    delete?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
    connect?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
    update?: PermintaanMesinUpdateWithWhereUniqueWithoutMesinInput | PermintaanMesinUpdateWithWhereUniqueWithoutMesinInput[]
    updateMany?: PermintaanMesinUpdateManyWithWhereWithoutMesinInput | PermintaanMesinUpdateManyWithWhereWithoutMesinInput[]
    deleteMany?: PermintaanMesinScalarWhereInput | PermintaanMesinScalarWhereInput[]
  }

  export type PermintaanMesinUncheckedUpdateManyWithoutMesinNestedInput = {
    create?: XOR<PermintaanMesinCreateWithoutMesinInput, PermintaanMesinUncheckedCreateWithoutMesinInput> | PermintaanMesinCreateWithoutMesinInput[] | PermintaanMesinUncheckedCreateWithoutMesinInput[]
    connectOrCreate?: PermintaanMesinCreateOrConnectWithoutMesinInput | PermintaanMesinCreateOrConnectWithoutMesinInput[]
    upsert?: PermintaanMesinUpsertWithWhereUniqueWithoutMesinInput | PermintaanMesinUpsertWithWhereUniqueWithoutMesinInput[]
    createMany?: PermintaanMesinCreateManyMesinInputEnvelope
    set?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
    disconnect?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
    delete?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
    connect?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
    update?: PermintaanMesinUpdateWithWhereUniqueWithoutMesinInput | PermintaanMesinUpdateWithWhereUniqueWithoutMesinInput[]
    updateMany?: PermintaanMesinUpdateManyWithWhereWithoutMesinInput | PermintaanMesinUpdateManyWithWhereWithoutMesinInput[]
    deleteMany?: PermintaanMesinScalarWhereInput | PermintaanMesinScalarWhereInput[]
  }

  export type PermintaanMesinCreateNestedManyWithoutPermintaanInput = {
    create?: XOR<PermintaanMesinCreateWithoutPermintaanInput, PermintaanMesinUncheckedCreateWithoutPermintaanInput> | PermintaanMesinCreateWithoutPermintaanInput[] | PermintaanMesinUncheckedCreateWithoutPermintaanInput[]
    connectOrCreate?: PermintaanMesinCreateOrConnectWithoutPermintaanInput | PermintaanMesinCreateOrConnectWithoutPermintaanInput[]
    createMany?: PermintaanMesinCreateManyPermintaanInputEnvelope
    connect?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
  }

  export type PembayaranCreateNestedManyWithoutPermintaanInput = {
    create?: XOR<PembayaranCreateWithoutPermintaanInput, PembayaranUncheckedCreateWithoutPermintaanInput> | PembayaranCreateWithoutPermintaanInput[] | PembayaranUncheckedCreateWithoutPermintaanInput[]
    connectOrCreate?: PembayaranCreateOrConnectWithoutPermintaanInput | PembayaranCreateOrConnectWithoutPermintaanInput[]
    createMany?: PembayaranCreateManyPermintaanInputEnvelope
    connect?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
  }

  export type PengirimanCreateNestedManyWithoutPermintaanInput = {
    create?: XOR<PengirimanCreateWithoutPermintaanInput, PengirimanUncheckedCreateWithoutPermintaanInput> | PengirimanCreateWithoutPermintaanInput[] | PengirimanUncheckedCreateWithoutPermintaanInput[]
    connectOrCreate?: PengirimanCreateOrConnectWithoutPermintaanInput | PengirimanCreateOrConnectWithoutPermintaanInput[]
    createMany?: PengirimanCreateManyPermintaanInputEnvelope
    connect?: PengirimanWhereUniqueInput | PengirimanWhereUniqueInput[]
  }

  export type PermintaanMesinUncheckedCreateNestedManyWithoutPermintaanInput = {
    create?: XOR<PermintaanMesinCreateWithoutPermintaanInput, PermintaanMesinUncheckedCreateWithoutPermintaanInput> | PermintaanMesinCreateWithoutPermintaanInput[] | PermintaanMesinUncheckedCreateWithoutPermintaanInput[]
    connectOrCreate?: PermintaanMesinCreateOrConnectWithoutPermintaanInput | PermintaanMesinCreateOrConnectWithoutPermintaanInput[]
    createMany?: PermintaanMesinCreateManyPermintaanInputEnvelope
    connect?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
  }

  export type PembayaranUncheckedCreateNestedManyWithoutPermintaanInput = {
    create?: XOR<PembayaranCreateWithoutPermintaanInput, PembayaranUncheckedCreateWithoutPermintaanInput> | PembayaranCreateWithoutPermintaanInput[] | PembayaranUncheckedCreateWithoutPermintaanInput[]
    connectOrCreate?: PembayaranCreateOrConnectWithoutPermintaanInput | PembayaranCreateOrConnectWithoutPermintaanInput[]
    createMany?: PembayaranCreateManyPermintaanInputEnvelope
    connect?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
  }

  export type PengirimanUncheckedCreateNestedManyWithoutPermintaanInput = {
    create?: XOR<PengirimanCreateWithoutPermintaanInput, PengirimanUncheckedCreateWithoutPermintaanInput> | PengirimanCreateWithoutPermintaanInput[] | PengirimanUncheckedCreateWithoutPermintaanInput[]
    connectOrCreate?: PengirimanCreateOrConnectWithoutPermintaanInput | PengirimanCreateOrConnectWithoutPermintaanInput[]
    createMany?: PengirimanCreateManyPermintaanInputEnvelope
    connect?: PengirimanWhereUniqueInput | PengirimanWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PermintaanMesinUpdateManyWithoutPermintaanNestedInput = {
    create?: XOR<PermintaanMesinCreateWithoutPermintaanInput, PermintaanMesinUncheckedCreateWithoutPermintaanInput> | PermintaanMesinCreateWithoutPermintaanInput[] | PermintaanMesinUncheckedCreateWithoutPermintaanInput[]
    connectOrCreate?: PermintaanMesinCreateOrConnectWithoutPermintaanInput | PermintaanMesinCreateOrConnectWithoutPermintaanInput[]
    upsert?: PermintaanMesinUpsertWithWhereUniqueWithoutPermintaanInput | PermintaanMesinUpsertWithWhereUniqueWithoutPermintaanInput[]
    createMany?: PermintaanMesinCreateManyPermintaanInputEnvelope
    set?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
    disconnect?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
    delete?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
    connect?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
    update?: PermintaanMesinUpdateWithWhereUniqueWithoutPermintaanInput | PermintaanMesinUpdateWithWhereUniqueWithoutPermintaanInput[]
    updateMany?: PermintaanMesinUpdateManyWithWhereWithoutPermintaanInput | PermintaanMesinUpdateManyWithWhereWithoutPermintaanInput[]
    deleteMany?: PermintaanMesinScalarWhereInput | PermintaanMesinScalarWhereInput[]
  }

  export type PembayaranUpdateManyWithoutPermintaanNestedInput = {
    create?: XOR<PembayaranCreateWithoutPermintaanInput, PembayaranUncheckedCreateWithoutPermintaanInput> | PembayaranCreateWithoutPermintaanInput[] | PembayaranUncheckedCreateWithoutPermintaanInput[]
    connectOrCreate?: PembayaranCreateOrConnectWithoutPermintaanInput | PembayaranCreateOrConnectWithoutPermintaanInput[]
    upsert?: PembayaranUpsertWithWhereUniqueWithoutPermintaanInput | PembayaranUpsertWithWhereUniqueWithoutPermintaanInput[]
    createMany?: PembayaranCreateManyPermintaanInputEnvelope
    set?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
    disconnect?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
    delete?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
    connect?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
    update?: PembayaranUpdateWithWhereUniqueWithoutPermintaanInput | PembayaranUpdateWithWhereUniqueWithoutPermintaanInput[]
    updateMany?: PembayaranUpdateManyWithWhereWithoutPermintaanInput | PembayaranUpdateManyWithWhereWithoutPermintaanInput[]
    deleteMany?: PembayaranScalarWhereInput | PembayaranScalarWhereInput[]
  }

  export type PengirimanUpdateManyWithoutPermintaanNestedInput = {
    create?: XOR<PengirimanCreateWithoutPermintaanInput, PengirimanUncheckedCreateWithoutPermintaanInput> | PengirimanCreateWithoutPermintaanInput[] | PengirimanUncheckedCreateWithoutPermintaanInput[]
    connectOrCreate?: PengirimanCreateOrConnectWithoutPermintaanInput | PengirimanCreateOrConnectWithoutPermintaanInput[]
    upsert?: PengirimanUpsertWithWhereUniqueWithoutPermintaanInput | PengirimanUpsertWithWhereUniqueWithoutPermintaanInput[]
    createMany?: PengirimanCreateManyPermintaanInputEnvelope
    set?: PengirimanWhereUniqueInput | PengirimanWhereUniqueInput[]
    disconnect?: PengirimanWhereUniqueInput | PengirimanWhereUniqueInput[]
    delete?: PengirimanWhereUniqueInput | PengirimanWhereUniqueInput[]
    connect?: PengirimanWhereUniqueInput | PengirimanWhereUniqueInput[]
    update?: PengirimanUpdateWithWhereUniqueWithoutPermintaanInput | PengirimanUpdateWithWhereUniqueWithoutPermintaanInput[]
    updateMany?: PengirimanUpdateManyWithWhereWithoutPermintaanInput | PengirimanUpdateManyWithWhereWithoutPermintaanInput[]
    deleteMany?: PengirimanScalarWhereInput | PengirimanScalarWhereInput[]
  }

  export type PermintaanMesinUncheckedUpdateManyWithoutPermintaanNestedInput = {
    create?: XOR<PermintaanMesinCreateWithoutPermintaanInput, PermintaanMesinUncheckedCreateWithoutPermintaanInput> | PermintaanMesinCreateWithoutPermintaanInput[] | PermintaanMesinUncheckedCreateWithoutPermintaanInput[]
    connectOrCreate?: PermintaanMesinCreateOrConnectWithoutPermintaanInput | PermintaanMesinCreateOrConnectWithoutPermintaanInput[]
    upsert?: PermintaanMesinUpsertWithWhereUniqueWithoutPermintaanInput | PermintaanMesinUpsertWithWhereUniqueWithoutPermintaanInput[]
    createMany?: PermintaanMesinCreateManyPermintaanInputEnvelope
    set?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
    disconnect?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
    delete?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
    connect?: PermintaanMesinWhereUniqueInput | PermintaanMesinWhereUniqueInput[]
    update?: PermintaanMesinUpdateWithWhereUniqueWithoutPermintaanInput | PermintaanMesinUpdateWithWhereUniqueWithoutPermintaanInput[]
    updateMany?: PermintaanMesinUpdateManyWithWhereWithoutPermintaanInput | PermintaanMesinUpdateManyWithWhereWithoutPermintaanInput[]
    deleteMany?: PermintaanMesinScalarWhereInput | PermintaanMesinScalarWhereInput[]
  }

  export type PembayaranUncheckedUpdateManyWithoutPermintaanNestedInput = {
    create?: XOR<PembayaranCreateWithoutPermintaanInput, PembayaranUncheckedCreateWithoutPermintaanInput> | PembayaranCreateWithoutPermintaanInput[] | PembayaranUncheckedCreateWithoutPermintaanInput[]
    connectOrCreate?: PembayaranCreateOrConnectWithoutPermintaanInput | PembayaranCreateOrConnectWithoutPermintaanInput[]
    upsert?: PembayaranUpsertWithWhereUniqueWithoutPermintaanInput | PembayaranUpsertWithWhereUniqueWithoutPermintaanInput[]
    createMany?: PembayaranCreateManyPermintaanInputEnvelope
    set?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
    disconnect?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
    delete?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
    connect?: PembayaranWhereUniqueInput | PembayaranWhereUniqueInput[]
    update?: PembayaranUpdateWithWhereUniqueWithoutPermintaanInput | PembayaranUpdateWithWhereUniqueWithoutPermintaanInput[]
    updateMany?: PembayaranUpdateManyWithWhereWithoutPermintaanInput | PembayaranUpdateManyWithWhereWithoutPermintaanInput[]
    deleteMany?: PembayaranScalarWhereInput | PembayaranScalarWhereInput[]
  }

  export type PengirimanUncheckedUpdateManyWithoutPermintaanNestedInput = {
    create?: XOR<PengirimanCreateWithoutPermintaanInput, PengirimanUncheckedCreateWithoutPermintaanInput> | PengirimanCreateWithoutPermintaanInput[] | PengirimanUncheckedCreateWithoutPermintaanInput[]
    connectOrCreate?: PengirimanCreateOrConnectWithoutPermintaanInput | PengirimanCreateOrConnectWithoutPermintaanInput[]
    upsert?: PengirimanUpsertWithWhereUniqueWithoutPermintaanInput | PengirimanUpsertWithWhereUniqueWithoutPermintaanInput[]
    createMany?: PengirimanCreateManyPermintaanInputEnvelope
    set?: PengirimanWhereUniqueInput | PengirimanWhereUniqueInput[]
    disconnect?: PengirimanWhereUniqueInput | PengirimanWhereUniqueInput[]
    delete?: PengirimanWhereUniqueInput | PengirimanWhereUniqueInput[]
    connect?: PengirimanWhereUniqueInput | PengirimanWhereUniqueInput[]
    update?: PengirimanUpdateWithWhereUniqueWithoutPermintaanInput | PengirimanUpdateWithWhereUniqueWithoutPermintaanInput[]
    updateMany?: PengirimanUpdateManyWithWhereWithoutPermintaanInput | PengirimanUpdateManyWithWhereWithoutPermintaanInput[]
    deleteMany?: PengirimanScalarWhereInput | PengirimanScalarWhereInput[]
  }

  export type PermintaanSewaCreateNestedOneWithoutMesinInput = {
    create?: XOR<PermintaanSewaCreateWithoutMesinInput, PermintaanSewaUncheckedCreateWithoutMesinInput>
    connectOrCreate?: PermintaanSewaCreateOrConnectWithoutMesinInput
    connect?: PermintaanSewaWhereUniqueInput
  }

  export type MesinCreateNestedOneWithoutPermintaanInput = {
    create?: XOR<MesinCreateWithoutPermintaanInput, MesinUncheckedCreateWithoutPermintaanInput>
    connectOrCreate?: MesinCreateOrConnectWithoutPermintaanInput
    connect?: MesinWhereUniqueInput
  }

  export type PermintaanSewaUpdateOneRequiredWithoutMesinNestedInput = {
    create?: XOR<PermintaanSewaCreateWithoutMesinInput, PermintaanSewaUncheckedCreateWithoutMesinInput>
    connectOrCreate?: PermintaanSewaCreateOrConnectWithoutMesinInput
    upsert?: PermintaanSewaUpsertWithoutMesinInput
    connect?: PermintaanSewaWhereUniqueInput
    update?: XOR<XOR<PermintaanSewaUpdateToOneWithWhereWithoutMesinInput, PermintaanSewaUpdateWithoutMesinInput>, PermintaanSewaUncheckedUpdateWithoutMesinInput>
  }

  export type MesinUpdateOneRequiredWithoutPermintaanNestedInput = {
    create?: XOR<MesinCreateWithoutPermintaanInput, MesinUncheckedCreateWithoutPermintaanInput>
    connectOrCreate?: MesinCreateOrConnectWithoutPermintaanInput
    upsert?: MesinUpsertWithoutPermintaanInput
    connect?: MesinWhereUniqueInput
    update?: XOR<XOR<MesinUpdateToOneWithWhereWithoutPermintaanInput, MesinUpdateWithoutPermintaanInput>, MesinUncheckedUpdateWithoutPermintaanInput>
  }

  export type PermintaanSewaCreateNestedOneWithoutPembayaranInput = {
    create?: XOR<PermintaanSewaCreateWithoutPembayaranInput, PermintaanSewaUncheckedCreateWithoutPembayaranInput>
    connectOrCreate?: PermintaanSewaCreateOrConnectWithoutPembayaranInput
    connect?: PermintaanSewaWhereUniqueInput
  }

  export type PermintaanSewaUpdateOneRequiredWithoutPembayaranNestedInput = {
    create?: XOR<PermintaanSewaCreateWithoutPembayaranInput, PermintaanSewaUncheckedCreateWithoutPembayaranInput>
    connectOrCreate?: PermintaanSewaCreateOrConnectWithoutPembayaranInput
    upsert?: PermintaanSewaUpsertWithoutPembayaranInput
    connect?: PermintaanSewaWhereUniqueInput
    update?: XOR<XOR<PermintaanSewaUpdateToOneWithWhereWithoutPembayaranInput, PermintaanSewaUpdateWithoutPembayaranInput>, PermintaanSewaUncheckedUpdateWithoutPembayaranInput>
  }

  export type PermintaanSewaCreateNestedOneWithoutPengirimanInput = {
    create?: XOR<PermintaanSewaCreateWithoutPengirimanInput, PermintaanSewaUncheckedCreateWithoutPengirimanInput>
    connectOrCreate?: PermintaanSewaCreateOrConnectWithoutPengirimanInput
    connect?: PermintaanSewaWhereUniqueInput
  }

  export type PermintaanSewaUpdateOneRequiredWithoutPengirimanNestedInput = {
    create?: XOR<PermintaanSewaCreateWithoutPengirimanInput, PermintaanSewaUncheckedCreateWithoutPengirimanInput>
    connectOrCreate?: PermintaanSewaCreateOrConnectWithoutPengirimanInput
    upsert?: PermintaanSewaUpsertWithoutPengirimanInput
    connect?: PermintaanSewaWhereUniqueInput
    update?: XOR<XOR<PermintaanSewaUpdateToOneWithWhereWithoutPengirimanInput, PermintaanSewaUpdateWithoutPengirimanInput>, PermintaanSewaUncheckedUpdateWithoutPengirimanInput>
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
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

  export type PermintaanMesinCreateWithoutMesinInput = {
    qty?: number
    harga?: number
    diskon?: number
    permintaan: PermintaanSewaCreateNestedOneWithoutMesinInput
  }

  export type PermintaanMesinUncheckedCreateWithoutMesinInput = {
    idPermintaan: string
    qty?: number
    harga?: number
    diskon?: number
  }

  export type PermintaanMesinCreateOrConnectWithoutMesinInput = {
    where: PermintaanMesinWhereUniqueInput
    create: XOR<PermintaanMesinCreateWithoutMesinInput, PermintaanMesinUncheckedCreateWithoutMesinInput>
  }

  export type PermintaanMesinCreateManyMesinInputEnvelope = {
    data: PermintaanMesinCreateManyMesinInput | PermintaanMesinCreateManyMesinInput[]
    skipDuplicates?: boolean
  }

  export type PermintaanMesinUpsertWithWhereUniqueWithoutMesinInput = {
    where: PermintaanMesinWhereUniqueInput
    update: XOR<PermintaanMesinUpdateWithoutMesinInput, PermintaanMesinUncheckedUpdateWithoutMesinInput>
    create: XOR<PermintaanMesinCreateWithoutMesinInput, PermintaanMesinUncheckedCreateWithoutMesinInput>
  }

  export type PermintaanMesinUpdateWithWhereUniqueWithoutMesinInput = {
    where: PermintaanMesinWhereUniqueInput
    data: XOR<PermintaanMesinUpdateWithoutMesinInput, PermintaanMesinUncheckedUpdateWithoutMesinInput>
  }

  export type PermintaanMesinUpdateManyWithWhereWithoutMesinInput = {
    where: PermintaanMesinScalarWhereInput
    data: XOR<PermintaanMesinUpdateManyMutationInput, PermintaanMesinUncheckedUpdateManyWithoutMesinInput>
  }

  export type PermintaanMesinScalarWhereInput = {
    AND?: PermintaanMesinScalarWhereInput | PermintaanMesinScalarWhereInput[]
    OR?: PermintaanMesinScalarWhereInput[]
    NOT?: PermintaanMesinScalarWhereInput | PermintaanMesinScalarWhereInput[]
    idPermintaan?: StringFilter<"PermintaanMesin"> | string
    idMesin?: StringFilter<"PermintaanMesin"> | string
    qty?: IntFilter<"PermintaanMesin"> | number
    harga?: IntFilter<"PermintaanMesin"> | number
    diskon?: IntFilter<"PermintaanMesin"> | number
  }

  export type PermintaanMesinCreateWithoutPermintaanInput = {
    qty?: number
    harga?: number
    diskon?: number
    mesin: MesinCreateNestedOneWithoutPermintaanInput
  }

  export type PermintaanMesinUncheckedCreateWithoutPermintaanInput = {
    idMesin: string
    qty?: number
    harga?: number
    diskon?: number
  }

  export type PermintaanMesinCreateOrConnectWithoutPermintaanInput = {
    where: PermintaanMesinWhereUniqueInput
    create: XOR<PermintaanMesinCreateWithoutPermintaanInput, PermintaanMesinUncheckedCreateWithoutPermintaanInput>
  }

  export type PermintaanMesinCreateManyPermintaanInputEnvelope = {
    data: PermintaanMesinCreateManyPermintaanInput | PermintaanMesinCreateManyPermintaanInput[]
    skipDuplicates?: boolean
  }

  export type PembayaranCreateWithoutPermintaanInput = {
    id?: string
    total: number
    tanggal: string
    status: string
    bukti?: string
  }

  export type PembayaranUncheckedCreateWithoutPermintaanInput = {
    id?: string
    total: number
    tanggal: string
    status: string
    bukti?: string
  }

  export type PembayaranCreateOrConnectWithoutPermintaanInput = {
    where: PembayaranWhereUniqueInput
    create: XOR<PembayaranCreateWithoutPermintaanInput, PembayaranUncheckedCreateWithoutPermintaanInput>
  }

  export type PembayaranCreateManyPermintaanInputEnvelope = {
    data: PembayaranCreateManyPermintaanInput | PembayaranCreateManyPermintaanInput[]
    skipDuplicates?: boolean
  }

  export type PengirimanCreateWithoutPermintaanInput = {
    id?: string
    tanggalKirim: string
    sopir: string
    status: string
    buktiSuratJalan?: string
  }

  export type PengirimanUncheckedCreateWithoutPermintaanInput = {
    id?: string
    tanggalKirim: string
    sopir: string
    status: string
    buktiSuratJalan?: string
  }

  export type PengirimanCreateOrConnectWithoutPermintaanInput = {
    where: PengirimanWhereUniqueInput
    create: XOR<PengirimanCreateWithoutPermintaanInput, PengirimanUncheckedCreateWithoutPermintaanInput>
  }

  export type PengirimanCreateManyPermintaanInputEnvelope = {
    data: PengirimanCreateManyPermintaanInput | PengirimanCreateManyPermintaanInput[]
    skipDuplicates?: boolean
  }

  export type PermintaanMesinUpsertWithWhereUniqueWithoutPermintaanInput = {
    where: PermintaanMesinWhereUniqueInput
    update: XOR<PermintaanMesinUpdateWithoutPermintaanInput, PermintaanMesinUncheckedUpdateWithoutPermintaanInput>
    create: XOR<PermintaanMesinCreateWithoutPermintaanInput, PermintaanMesinUncheckedCreateWithoutPermintaanInput>
  }

  export type PermintaanMesinUpdateWithWhereUniqueWithoutPermintaanInput = {
    where: PermintaanMesinWhereUniqueInput
    data: XOR<PermintaanMesinUpdateWithoutPermintaanInput, PermintaanMesinUncheckedUpdateWithoutPermintaanInput>
  }

  export type PermintaanMesinUpdateManyWithWhereWithoutPermintaanInput = {
    where: PermintaanMesinScalarWhereInput
    data: XOR<PermintaanMesinUpdateManyMutationInput, PermintaanMesinUncheckedUpdateManyWithoutPermintaanInput>
  }

  export type PembayaranUpsertWithWhereUniqueWithoutPermintaanInput = {
    where: PembayaranWhereUniqueInput
    update: XOR<PembayaranUpdateWithoutPermintaanInput, PembayaranUncheckedUpdateWithoutPermintaanInput>
    create: XOR<PembayaranCreateWithoutPermintaanInput, PembayaranUncheckedCreateWithoutPermintaanInput>
  }

  export type PembayaranUpdateWithWhereUniqueWithoutPermintaanInput = {
    where: PembayaranWhereUniqueInput
    data: XOR<PembayaranUpdateWithoutPermintaanInput, PembayaranUncheckedUpdateWithoutPermintaanInput>
  }

  export type PembayaranUpdateManyWithWhereWithoutPermintaanInput = {
    where: PembayaranScalarWhereInput
    data: XOR<PembayaranUpdateManyMutationInput, PembayaranUncheckedUpdateManyWithoutPermintaanInput>
  }

  export type PembayaranScalarWhereInput = {
    AND?: PembayaranScalarWhereInput | PembayaranScalarWhereInput[]
    OR?: PembayaranScalarWhereInput[]
    NOT?: PembayaranScalarWhereInput | PembayaranScalarWhereInput[]
    id?: StringFilter<"Pembayaran"> | string
    idPermintaan?: StringFilter<"Pembayaran"> | string
    total?: IntFilter<"Pembayaran"> | number
    tanggal?: StringFilter<"Pembayaran"> | string
    status?: StringFilter<"Pembayaran"> | string
    bukti?: StringFilter<"Pembayaran"> | string
  }

  export type PengirimanUpsertWithWhereUniqueWithoutPermintaanInput = {
    where: PengirimanWhereUniqueInput
    update: XOR<PengirimanUpdateWithoutPermintaanInput, PengirimanUncheckedUpdateWithoutPermintaanInput>
    create: XOR<PengirimanCreateWithoutPermintaanInput, PengirimanUncheckedCreateWithoutPermintaanInput>
  }

  export type PengirimanUpdateWithWhereUniqueWithoutPermintaanInput = {
    where: PengirimanWhereUniqueInput
    data: XOR<PengirimanUpdateWithoutPermintaanInput, PengirimanUncheckedUpdateWithoutPermintaanInput>
  }

  export type PengirimanUpdateManyWithWhereWithoutPermintaanInput = {
    where: PengirimanScalarWhereInput
    data: XOR<PengirimanUpdateManyMutationInput, PengirimanUncheckedUpdateManyWithoutPermintaanInput>
  }

  export type PengirimanScalarWhereInput = {
    AND?: PengirimanScalarWhereInput | PengirimanScalarWhereInput[]
    OR?: PengirimanScalarWhereInput[]
    NOT?: PengirimanScalarWhereInput | PengirimanScalarWhereInput[]
    id?: StringFilter<"Pengiriman"> | string
    idPermintaan?: StringFilter<"Pengiriman"> | string
    tanggalKirim?: StringFilter<"Pengiriman"> | string
    sopir?: StringFilter<"Pengiriman"> | string
    status?: StringFilter<"Pengiriman"> | string
    buktiSuratJalan?: StringFilter<"Pengiriman"> | string
  }

  export type PermintaanSewaCreateWithoutMesinInput = {
    idPermintaan?: string
    pelanggan?: string
    lokasi: string
    durasi?: number
    status: string
    tanggalFormat?: string
    pembayaran?: PembayaranCreateNestedManyWithoutPermintaanInput
    pengiriman?: PengirimanCreateNestedManyWithoutPermintaanInput
  }

  export type PermintaanSewaUncheckedCreateWithoutMesinInput = {
    idPermintaan?: string
    pelanggan?: string
    lokasi: string
    durasi?: number
    status: string
    tanggalFormat?: string
    pembayaran?: PembayaranUncheckedCreateNestedManyWithoutPermintaanInput
    pengiriman?: PengirimanUncheckedCreateNestedManyWithoutPermintaanInput
  }

  export type PermintaanSewaCreateOrConnectWithoutMesinInput = {
    where: PermintaanSewaWhereUniqueInput
    create: XOR<PermintaanSewaCreateWithoutMesinInput, PermintaanSewaUncheckedCreateWithoutMesinInput>
  }

  export type MesinCreateWithoutPermintaanInput = {
    idMesin: string
    namaMesin: string
    kapasitas?: string
    status: string
    lokasi?: string
    lastService?: Date | string | null
    pelanggan?: string | null
  }

  export type MesinUncheckedCreateWithoutPermintaanInput = {
    idMesin: string
    namaMesin: string
    kapasitas?: string
    status: string
    lokasi?: string
    lastService?: Date | string | null
    pelanggan?: string | null
  }

  export type MesinCreateOrConnectWithoutPermintaanInput = {
    where: MesinWhereUniqueInput
    create: XOR<MesinCreateWithoutPermintaanInput, MesinUncheckedCreateWithoutPermintaanInput>
  }

  export type PermintaanSewaUpsertWithoutMesinInput = {
    update: XOR<PermintaanSewaUpdateWithoutMesinInput, PermintaanSewaUncheckedUpdateWithoutMesinInput>
    create: XOR<PermintaanSewaCreateWithoutMesinInput, PermintaanSewaUncheckedCreateWithoutMesinInput>
    where?: PermintaanSewaWhereInput
  }

  export type PermintaanSewaUpdateToOneWithWhereWithoutMesinInput = {
    where?: PermintaanSewaWhereInput
    data: XOR<PermintaanSewaUpdateWithoutMesinInput, PermintaanSewaUncheckedUpdateWithoutMesinInput>
  }

  export type PermintaanSewaUpdateWithoutMesinInput = {
    idPermintaan?: StringFieldUpdateOperationsInput | string
    pelanggan?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    durasi?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tanggalFormat?: StringFieldUpdateOperationsInput | string
    pembayaran?: PembayaranUpdateManyWithoutPermintaanNestedInput
    pengiriman?: PengirimanUpdateManyWithoutPermintaanNestedInput
  }

  export type PermintaanSewaUncheckedUpdateWithoutMesinInput = {
    idPermintaan?: StringFieldUpdateOperationsInput | string
    pelanggan?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    durasi?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tanggalFormat?: StringFieldUpdateOperationsInput | string
    pembayaran?: PembayaranUncheckedUpdateManyWithoutPermintaanNestedInput
    pengiriman?: PengirimanUncheckedUpdateManyWithoutPermintaanNestedInput
  }

  export type MesinUpsertWithoutPermintaanInput = {
    update: XOR<MesinUpdateWithoutPermintaanInput, MesinUncheckedUpdateWithoutPermintaanInput>
    create: XOR<MesinCreateWithoutPermintaanInput, MesinUncheckedCreateWithoutPermintaanInput>
    where?: MesinWhereInput
  }

  export type MesinUpdateToOneWithWhereWithoutPermintaanInput = {
    where?: MesinWhereInput
    data: XOR<MesinUpdateWithoutPermintaanInput, MesinUncheckedUpdateWithoutPermintaanInput>
  }

  export type MesinUpdateWithoutPermintaanInput = {
    idMesin?: StringFieldUpdateOperationsInput | string
    namaMesin?: StringFieldUpdateOperationsInput | string
    kapasitas?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    lastService?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pelanggan?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MesinUncheckedUpdateWithoutPermintaanInput = {
    idMesin?: StringFieldUpdateOperationsInput | string
    namaMesin?: StringFieldUpdateOperationsInput | string
    kapasitas?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    lastService?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    pelanggan?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type PermintaanSewaCreateWithoutPembayaranInput = {
    idPermintaan?: string
    pelanggan?: string
    lokasi: string
    durasi?: number
    status: string
    tanggalFormat?: string
    mesin?: PermintaanMesinCreateNestedManyWithoutPermintaanInput
    pengiriman?: PengirimanCreateNestedManyWithoutPermintaanInput
  }

  export type PermintaanSewaUncheckedCreateWithoutPembayaranInput = {
    idPermintaan?: string
    pelanggan?: string
    lokasi: string
    durasi?: number
    status: string
    tanggalFormat?: string
    mesin?: PermintaanMesinUncheckedCreateNestedManyWithoutPermintaanInput
    pengiriman?: PengirimanUncheckedCreateNestedManyWithoutPermintaanInput
  }

  export type PermintaanSewaCreateOrConnectWithoutPembayaranInput = {
    where: PermintaanSewaWhereUniqueInput
    create: XOR<PermintaanSewaCreateWithoutPembayaranInput, PermintaanSewaUncheckedCreateWithoutPembayaranInput>
  }

  export type PermintaanSewaUpsertWithoutPembayaranInput = {
    update: XOR<PermintaanSewaUpdateWithoutPembayaranInput, PermintaanSewaUncheckedUpdateWithoutPembayaranInput>
    create: XOR<PermintaanSewaCreateWithoutPembayaranInput, PermintaanSewaUncheckedCreateWithoutPembayaranInput>
    where?: PermintaanSewaWhereInput
  }

  export type PermintaanSewaUpdateToOneWithWhereWithoutPembayaranInput = {
    where?: PermintaanSewaWhereInput
    data: XOR<PermintaanSewaUpdateWithoutPembayaranInput, PermintaanSewaUncheckedUpdateWithoutPembayaranInput>
  }

  export type PermintaanSewaUpdateWithoutPembayaranInput = {
    idPermintaan?: StringFieldUpdateOperationsInput | string
    pelanggan?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    durasi?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tanggalFormat?: StringFieldUpdateOperationsInput | string
    mesin?: PermintaanMesinUpdateManyWithoutPermintaanNestedInput
    pengiriman?: PengirimanUpdateManyWithoutPermintaanNestedInput
  }

  export type PermintaanSewaUncheckedUpdateWithoutPembayaranInput = {
    idPermintaan?: StringFieldUpdateOperationsInput | string
    pelanggan?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    durasi?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tanggalFormat?: StringFieldUpdateOperationsInput | string
    mesin?: PermintaanMesinUncheckedUpdateManyWithoutPermintaanNestedInput
    pengiriman?: PengirimanUncheckedUpdateManyWithoutPermintaanNestedInput
  }

  export type PermintaanSewaCreateWithoutPengirimanInput = {
    idPermintaan?: string
    pelanggan?: string
    lokasi: string
    durasi?: number
    status: string
    tanggalFormat?: string
    mesin?: PermintaanMesinCreateNestedManyWithoutPermintaanInput
    pembayaran?: PembayaranCreateNestedManyWithoutPermintaanInput
  }

  export type PermintaanSewaUncheckedCreateWithoutPengirimanInput = {
    idPermintaan?: string
    pelanggan?: string
    lokasi: string
    durasi?: number
    status: string
    tanggalFormat?: string
    mesin?: PermintaanMesinUncheckedCreateNestedManyWithoutPermintaanInput
    pembayaran?: PembayaranUncheckedCreateNestedManyWithoutPermintaanInput
  }

  export type PermintaanSewaCreateOrConnectWithoutPengirimanInput = {
    where: PermintaanSewaWhereUniqueInput
    create: XOR<PermintaanSewaCreateWithoutPengirimanInput, PermintaanSewaUncheckedCreateWithoutPengirimanInput>
  }

  export type PermintaanSewaUpsertWithoutPengirimanInput = {
    update: XOR<PermintaanSewaUpdateWithoutPengirimanInput, PermintaanSewaUncheckedUpdateWithoutPengirimanInput>
    create: XOR<PermintaanSewaCreateWithoutPengirimanInput, PermintaanSewaUncheckedCreateWithoutPengirimanInput>
    where?: PermintaanSewaWhereInput
  }

  export type PermintaanSewaUpdateToOneWithWhereWithoutPengirimanInput = {
    where?: PermintaanSewaWhereInput
    data: XOR<PermintaanSewaUpdateWithoutPengirimanInput, PermintaanSewaUncheckedUpdateWithoutPengirimanInput>
  }

  export type PermintaanSewaUpdateWithoutPengirimanInput = {
    idPermintaan?: StringFieldUpdateOperationsInput | string
    pelanggan?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    durasi?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tanggalFormat?: StringFieldUpdateOperationsInput | string
    mesin?: PermintaanMesinUpdateManyWithoutPermintaanNestedInput
    pembayaran?: PembayaranUpdateManyWithoutPermintaanNestedInput
  }

  export type PermintaanSewaUncheckedUpdateWithoutPengirimanInput = {
    idPermintaan?: StringFieldUpdateOperationsInput | string
    pelanggan?: StringFieldUpdateOperationsInput | string
    lokasi?: StringFieldUpdateOperationsInput | string
    durasi?: IntFieldUpdateOperationsInput | number
    status?: StringFieldUpdateOperationsInput | string
    tanggalFormat?: StringFieldUpdateOperationsInput | string
    mesin?: PermintaanMesinUncheckedUpdateManyWithoutPermintaanNestedInput
    pembayaran?: PembayaranUncheckedUpdateManyWithoutPermintaanNestedInput
  }

  export type PermintaanMesinCreateManyMesinInput = {
    idPermintaan: string
    qty?: number
    harga?: number
    diskon?: number
  }

  export type PermintaanMesinUpdateWithoutMesinInput = {
    qty?: IntFieldUpdateOperationsInput | number
    harga?: IntFieldUpdateOperationsInput | number
    diskon?: IntFieldUpdateOperationsInput | number
    permintaan?: PermintaanSewaUpdateOneRequiredWithoutMesinNestedInput
  }

  export type PermintaanMesinUncheckedUpdateWithoutMesinInput = {
    idPermintaan?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    harga?: IntFieldUpdateOperationsInput | number
    diskon?: IntFieldUpdateOperationsInput | number
  }

  export type PermintaanMesinUncheckedUpdateManyWithoutMesinInput = {
    idPermintaan?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    harga?: IntFieldUpdateOperationsInput | number
    diskon?: IntFieldUpdateOperationsInput | number
  }

  export type PermintaanMesinCreateManyPermintaanInput = {
    idMesin: string
    qty?: number
    harga?: number
    diskon?: number
  }

  export type PembayaranCreateManyPermintaanInput = {
    id?: string
    total: number
    tanggal: string
    status: string
    bukti?: string
  }

  export type PengirimanCreateManyPermintaanInput = {
    id?: string
    tanggalKirim: string
    sopir: string
    status: string
    buktiSuratJalan?: string
  }

  export type PermintaanMesinUpdateWithoutPermintaanInput = {
    qty?: IntFieldUpdateOperationsInput | number
    harga?: IntFieldUpdateOperationsInput | number
    diskon?: IntFieldUpdateOperationsInput | number
    mesin?: MesinUpdateOneRequiredWithoutPermintaanNestedInput
  }

  export type PermintaanMesinUncheckedUpdateWithoutPermintaanInput = {
    idMesin?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    harga?: IntFieldUpdateOperationsInput | number
    diskon?: IntFieldUpdateOperationsInput | number
  }

  export type PermintaanMesinUncheckedUpdateManyWithoutPermintaanInput = {
    idMesin?: StringFieldUpdateOperationsInput | string
    qty?: IntFieldUpdateOperationsInput | number
    harga?: IntFieldUpdateOperationsInput | number
    diskon?: IntFieldUpdateOperationsInput | number
  }

  export type PembayaranUpdateWithoutPermintaanInput = {
    id?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    tanggal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    bukti?: StringFieldUpdateOperationsInput | string
  }

  export type PembayaranUncheckedUpdateWithoutPermintaanInput = {
    id?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    tanggal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    bukti?: StringFieldUpdateOperationsInput | string
  }

  export type PembayaranUncheckedUpdateManyWithoutPermintaanInput = {
    id?: StringFieldUpdateOperationsInput | string
    total?: IntFieldUpdateOperationsInput | number
    tanggal?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    bukti?: StringFieldUpdateOperationsInput | string
  }

  export type PengirimanUpdateWithoutPermintaanInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggalKirim?: StringFieldUpdateOperationsInput | string
    sopir?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    buktiSuratJalan?: StringFieldUpdateOperationsInput | string
  }

  export type PengirimanUncheckedUpdateWithoutPermintaanInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggalKirim?: StringFieldUpdateOperationsInput | string
    sopir?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    buktiSuratJalan?: StringFieldUpdateOperationsInput | string
  }

  export type PengirimanUncheckedUpdateManyWithoutPermintaanInput = {
    id?: StringFieldUpdateOperationsInput | string
    tanggalKirim?: StringFieldUpdateOperationsInput | string
    sopir?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    buktiSuratJalan?: StringFieldUpdateOperationsInput | string
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