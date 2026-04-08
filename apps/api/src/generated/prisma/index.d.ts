
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
    PermintaanSewa: 'PermintaanSewa'
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
      modelProps: "mesin" | "permintaanSewa"
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
   * Models
   */

  /**
   * Model Mesin
   */

  export type AggregateMesin = {
    _count: MesinCountAggregateOutputType | null
    _avg: MesinAvgAggregateOutputType | null
    _sum: MesinSumAggregateOutputType | null
    _min: MesinMinAggregateOutputType | null
    _max: MesinMaxAggregateOutputType | null
  }

  export type MesinAvgAggregateOutputType = {
    idMesin: number | null
  }

  export type MesinSumAggregateOutputType = {
    idMesin: number | null
  }

  export type MesinMinAggregateOutputType = {
    idMesin: number | null
    namaMesin: string | null
    status: string | null
  }

  export type MesinMaxAggregateOutputType = {
    idMesin: number | null
    namaMesin: string | null
    status: string | null
  }

  export type MesinCountAggregateOutputType = {
    idMesin: number
    namaMesin: number
    status: number
    _all: number
  }


  export type MesinAvgAggregateInputType = {
    idMesin?: true
  }

  export type MesinSumAggregateInputType = {
    idMesin?: true
  }

  export type MesinMinAggregateInputType = {
    idMesin?: true
    namaMesin?: true
    status?: true
  }

  export type MesinMaxAggregateInputType = {
    idMesin?: true
    namaMesin?: true
    status?: true
  }

  export type MesinCountAggregateInputType = {
    idMesin?: true
    namaMesin?: true
    status?: true
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
     * Select which fields to average
    **/
    _avg?: MesinAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MesinSumAggregateInputType
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
    _avg?: MesinAvgAggregateInputType
    _sum?: MesinSumAggregateInputType
    _min?: MesinMinAggregateInputType
    _max?: MesinMaxAggregateInputType
  }

  export type MesinGroupByOutputType = {
    idMesin: number
    namaMesin: string
    status: string
    _count: MesinCountAggregateOutputType | null
    _avg: MesinAvgAggregateOutputType | null
    _sum: MesinSumAggregateOutputType | null
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
    status?: boolean
  }, ExtArgs["result"]["mesin"]>

  export type MesinSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idMesin?: boolean
    namaMesin?: boolean
    status?: boolean
  }, ExtArgs["result"]["mesin"]>

  export type MesinSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idMesin?: boolean
    namaMesin?: boolean
    status?: boolean
  }, ExtArgs["result"]["mesin"]>

  export type MesinSelectScalar = {
    idMesin?: boolean
    namaMesin?: boolean
    status?: boolean
  }

  export type MesinOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idMesin" | "namaMesin" | "status", ExtArgs["result"]["mesin"]>

  export type $MesinPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mesin"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      idMesin: number
      namaMesin: string
      status: string
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
    readonly idMesin: FieldRef<"Mesin", 'Int'>
    readonly namaMesin: FieldRef<"Mesin", 'String'>
    readonly status: FieldRef<"Mesin", 'String'>
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
    idMesin: number | null
    durasi: number | null
  }

  export type PermintaanSewaSumAggregateOutputType = {
    idMesin: number | null
    durasi: number | null
  }

  export type PermintaanSewaMinAggregateOutputType = {
    idPermintaan: string | null
    idMesin: number | null
    durasi: number | null
    lokasi: string | null
    status: string | null
  }

  export type PermintaanSewaMaxAggregateOutputType = {
    idPermintaan: string | null
    idMesin: number | null
    durasi: number | null
    lokasi: string | null
    status: string | null
  }

  export type PermintaanSewaCountAggregateOutputType = {
    idPermintaan: number
    idMesin: number
    durasi: number
    lokasi: number
    status: number
    _all: number
  }


  export type PermintaanSewaAvgAggregateInputType = {
    idMesin?: true
    durasi?: true
  }

  export type PermintaanSewaSumAggregateInputType = {
    idMesin?: true
    durasi?: true
  }

  export type PermintaanSewaMinAggregateInputType = {
    idPermintaan?: true
    idMesin?: true
    durasi?: true
    lokasi?: true
    status?: true
  }

  export type PermintaanSewaMaxAggregateInputType = {
    idPermintaan?: true
    idMesin?: true
    durasi?: true
    lokasi?: true
    status?: true
  }

  export type PermintaanSewaCountAggregateInputType = {
    idPermintaan?: true
    idMesin?: true
    durasi?: true
    lokasi?: true
    status?: true
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
    idMesin: number
    durasi: number
    lokasi: string
    status: string
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
    idMesin?: boolean
    durasi?: boolean
    lokasi?: boolean
    status?: boolean
  }, ExtArgs["result"]["permintaanSewa"]>

  export type PermintaanSewaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idPermintaan?: boolean
    idMesin?: boolean
    durasi?: boolean
    lokasi?: boolean
    status?: boolean
  }, ExtArgs["result"]["permintaanSewa"]>

  export type PermintaanSewaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    idPermintaan?: boolean
    idMesin?: boolean
    durasi?: boolean
    lokasi?: boolean
    status?: boolean
  }, ExtArgs["result"]["permintaanSewa"]>

  export type PermintaanSewaSelectScalar = {
    idPermintaan?: boolean
    idMesin?: boolean
    durasi?: boolean
    lokasi?: boolean
    status?: boolean
  }

  export type PermintaanSewaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"idPermintaan" | "idMesin" | "durasi" | "lokasi" | "status", ExtArgs["result"]["permintaanSewa"]>

  export type $PermintaanSewaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PermintaanSewa"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      idPermintaan: string
      idMesin: number
      durasi: number
      lokasi: string
      status: string
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
    readonly idMesin: FieldRef<"PermintaanSewa", 'Int'>
    readonly durasi: FieldRef<"PermintaanSewa", 'Int'>
    readonly lokasi: FieldRef<"PermintaanSewa", 'String'>
    readonly status: FieldRef<"PermintaanSewa", 'String'>
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
    status: 'status'
  };

  export type MesinScalarFieldEnum = (typeof MesinScalarFieldEnum)[keyof typeof MesinScalarFieldEnum]


  export const PermintaanSewaScalarFieldEnum: {
    idPermintaan: 'idPermintaan',
    idMesin: 'idMesin',
    durasi: 'durasi',
    lokasi: 'lokasi',
    status: 'status'
  };

  export type PermintaanSewaScalarFieldEnum = (typeof PermintaanSewaScalarFieldEnum)[keyof typeof PermintaanSewaScalarFieldEnum]


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
    idMesin?: IntFilter<"Mesin"> | number
    namaMesin?: StringFilter<"Mesin"> | string
    status?: StringFilter<"Mesin"> | string
  }

  export type MesinOrderByWithRelationInput = {
    idMesin?: SortOrder
    namaMesin?: SortOrder
    status?: SortOrder
  }

  export type MesinWhereUniqueInput = Prisma.AtLeast<{
    idMesin?: number
    AND?: MesinWhereInput | MesinWhereInput[]
    OR?: MesinWhereInput[]
    NOT?: MesinWhereInput | MesinWhereInput[]
    namaMesin?: StringFilter<"Mesin"> | string
    status?: StringFilter<"Mesin"> | string
  }, "idMesin">

  export type MesinOrderByWithAggregationInput = {
    idMesin?: SortOrder
    namaMesin?: SortOrder
    status?: SortOrder
    _count?: MesinCountOrderByAggregateInput
    _avg?: MesinAvgOrderByAggregateInput
    _max?: MesinMaxOrderByAggregateInput
    _min?: MesinMinOrderByAggregateInput
    _sum?: MesinSumOrderByAggregateInput
  }

  export type MesinScalarWhereWithAggregatesInput = {
    AND?: MesinScalarWhereWithAggregatesInput | MesinScalarWhereWithAggregatesInput[]
    OR?: MesinScalarWhereWithAggregatesInput[]
    NOT?: MesinScalarWhereWithAggregatesInput | MesinScalarWhereWithAggregatesInput[]
    idMesin?: IntWithAggregatesFilter<"Mesin"> | number
    namaMesin?: StringWithAggregatesFilter<"Mesin"> | string
    status?: StringWithAggregatesFilter<"Mesin"> | string
  }

  export type PermintaanSewaWhereInput = {
    AND?: PermintaanSewaWhereInput | PermintaanSewaWhereInput[]
    OR?: PermintaanSewaWhereInput[]
    NOT?: PermintaanSewaWhereInput | PermintaanSewaWhereInput[]
    idPermintaan?: StringFilter<"PermintaanSewa"> | string
    idMesin?: IntFilter<"PermintaanSewa"> | number
    durasi?: IntFilter<"PermintaanSewa"> | number
    lokasi?: StringFilter<"PermintaanSewa"> | string
    status?: StringFilter<"PermintaanSewa"> | string
  }

  export type PermintaanSewaOrderByWithRelationInput = {
    idPermintaan?: SortOrder
    idMesin?: SortOrder
    durasi?: SortOrder
    lokasi?: SortOrder
    status?: SortOrder
  }

  export type PermintaanSewaWhereUniqueInput = Prisma.AtLeast<{
    idPermintaan?: string
    AND?: PermintaanSewaWhereInput | PermintaanSewaWhereInput[]
    OR?: PermintaanSewaWhereInput[]
    NOT?: PermintaanSewaWhereInput | PermintaanSewaWhereInput[]
    idMesin?: IntFilter<"PermintaanSewa"> | number
    durasi?: IntFilter<"PermintaanSewa"> | number
    lokasi?: StringFilter<"PermintaanSewa"> | string
    status?: StringFilter<"PermintaanSewa"> | string
  }, "idPermintaan">

  export type PermintaanSewaOrderByWithAggregationInput = {
    idPermintaan?: SortOrder
    idMesin?: SortOrder
    durasi?: SortOrder
    lokasi?: SortOrder
    status?: SortOrder
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
    idMesin?: IntWithAggregatesFilter<"PermintaanSewa"> | number
    durasi?: IntWithAggregatesFilter<"PermintaanSewa"> | number
    lokasi?: StringWithAggregatesFilter<"PermintaanSewa"> | string
    status?: StringWithAggregatesFilter<"PermintaanSewa"> | string
  }

  export type MesinCreateInput = {
    namaMesin: string
    status: string
  }

  export type MesinUncheckedCreateInput = {
    idMesin?: number
    namaMesin: string
    status: string
  }

  export type MesinUpdateInput = {
    namaMesin?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type MesinUncheckedUpdateInput = {
    idMesin?: IntFieldUpdateOperationsInput | number
    namaMesin?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type MesinCreateManyInput = {
    idMesin?: number
    namaMesin: string
    status: string
  }

  export type MesinUpdateManyMutationInput = {
    namaMesin?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type MesinUncheckedUpdateManyInput = {
    idMesin?: IntFieldUpdateOperationsInput | number
    namaMesin?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type PermintaanSewaCreateInput = {
    idPermintaan?: string
    idMesin: number
    durasi: number
    lokasi: string
    status: string
  }

  export type PermintaanSewaUncheckedCreateInput = {
    idPermintaan?: string
    idMesin: number
    durasi: number
    lokasi: string
    status: string
  }

  export type PermintaanSewaUpdateInput = {
    idPermintaan?: StringFieldUpdateOperationsInput | string
    idMesin?: IntFieldUpdateOperationsInput | number
    durasi?: IntFieldUpdateOperationsInput | number
    lokasi?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type PermintaanSewaUncheckedUpdateInput = {
    idPermintaan?: StringFieldUpdateOperationsInput | string
    idMesin?: IntFieldUpdateOperationsInput | number
    durasi?: IntFieldUpdateOperationsInput | number
    lokasi?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type PermintaanSewaCreateManyInput = {
    idPermintaan?: string
    idMesin: number
    durasi: number
    lokasi: string
    status: string
  }

  export type PermintaanSewaUpdateManyMutationInput = {
    idPermintaan?: StringFieldUpdateOperationsInput | string
    idMesin?: IntFieldUpdateOperationsInput | number
    durasi?: IntFieldUpdateOperationsInput | number
    lokasi?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type PermintaanSewaUncheckedUpdateManyInput = {
    idPermintaan?: StringFieldUpdateOperationsInput | string
    idMesin?: IntFieldUpdateOperationsInput | number
    durasi?: IntFieldUpdateOperationsInput | number
    lokasi?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
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

  export type MesinCountOrderByAggregateInput = {
    idMesin?: SortOrder
    namaMesin?: SortOrder
    status?: SortOrder
  }

  export type MesinAvgOrderByAggregateInput = {
    idMesin?: SortOrder
  }

  export type MesinMaxOrderByAggregateInput = {
    idMesin?: SortOrder
    namaMesin?: SortOrder
    status?: SortOrder
  }

  export type MesinMinOrderByAggregateInput = {
    idMesin?: SortOrder
    namaMesin?: SortOrder
    status?: SortOrder
  }

  export type MesinSumOrderByAggregateInput = {
    idMesin?: SortOrder
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

  export type PermintaanSewaCountOrderByAggregateInput = {
    idPermintaan?: SortOrder
    idMesin?: SortOrder
    durasi?: SortOrder
    lokasi?: SortOrder
    status?: SortOrder
  }

  export type PermintaanSewaAvgOrderByAggregateInput = {
    idMesin?: SortOrder
    durasi?: SortOrder
  }

  export type PermintaanSewaMaxOrderByAggregateInput = {
    idPermintaan?: SortOrder
    idMesin?: SortOrder
    durasi?: SortOrder
    lokasi?: SortOrder
    status?: SortOrder
  }

  export type PermintaanSewaMinOrderByAggregateInput = {
    idPermintaan?: SortOrder
    idMesin?: SortOrder
    durasi?: SortOrder
    lokasi?: SortOrder
    status?: SortOrder
  }

  export type PermintaanSewaSumOrderByAggregateInput = {
    idMesin?: SortOrder
    durasi?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
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