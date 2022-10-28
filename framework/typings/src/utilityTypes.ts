/**
 * Returns the union of provided objects values
 */
export type ValuesOf<T> = T[keyof T]


/**
 * Splits a string into array
 * @param S is the string to split
 * @param D is the separator string
 */
export type Split<S extends string, D extends string> =
    string extends S ? string[] :
        S extends '' ? [] :
            S extends `${infer T}${D}${infer U}` ? [T, ...Split<U, D>] : [S];


/**
 * Returns the intersection of provided objects union
 */
export type UnionToIntersection<U> =
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never


/**
 * Returns string paths of a deeply nested object
 * @param T is the nested object
 * @param N is the key of the nested object
 * @param PS is the path separator string
 */
export type ExtractPaths<T extends Record<string, any>, N extends string, PS extends string = '/'> = ValuesOf<{
    [K in keyof T & string]:
    T[K][N] extends (null | undefined)
        ? ''
        : (K | `${K}${PS}${ExtractPaths<Extract<T[K][N], Record<string, any>>, N, PS>}`)
}>

/**
 * Cast the first type to second type
 */
export type Cast<A1, A2> = A1 extends A2 ? A1 : A2

/**
 * Accepts empty primitive values ('' | 0 | false)
 */
export type EmptyPrimitive = '' | 0 | false

type UpperCaseCharacter =
    'A'
    | 'B'
    | 'C'
    | 'D'
    | 'E'
    | 'F'
    | 'G'
    | 'H'
    | 'I'
    | 'J'
    | 'K'
    | 'L'
    | 'M'
    | 'N'
    | 'O'
    | 'P'
    | 'Q'
    | 'R'
    | 'S'
    | 'T'
    | 'U'
    | 'V'
    | 'W'
    | 'X'
    | 'Y'
    | 'Z';
type NumberCharacter = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'
type Symbols =
    '`'
    | '"'
    | "'"
    | '@'
    | '#'
    | '$'
    | '%'
    | '^'
    | '&'
    | '_'
    | '~'
    | '.'
    | '|'
    | ':'
    | ';'
    | ','
    | '?'
    | '<'
    | '>'
    | '*'
    | '+'
    | '-'
    | '('
    | ')'
    | '}'
    | '{'
    | ']'
    | '['
    | '!'
    | '\\'
    | '/'
type Character = UpperCaseCharacter | Lowercase<UpperCaseCharacter> | NumberCharacter | Symbols;

/**
 * Accepts any string other than empty
 */
export type NonEmptyString = `${Character}${string}`;

/**
 * This is the route param value
 */
export type ValidParamValue = NonEmptyString | number | boolean

/**
 * This is the route params
 */
export type ValidParams = Record<string, ValidParamValue>

/**
 * This is the schema for the variable name
 */
export type ValidVariable = `${UpperCaseCharacter | Lowercase<UpperCaseCharacter>}${string}`

/**
 * Compares two given types
 * @returns {boolean} true if both types are same else returns false
 */
export type Equals<A1 extends any, A2 extends any> =
    (<A>() => A extends A2 ? true : false) extends (<A>() => A extends A1 ? true : false)
        ? true
        : false

type ValidateValidParams<T> = Equals<T, {}> extends true ? undefined | null : T

/**
 * Converts the given object type to a route param object
 * @returns {ValidParams}
 */
export type ModifyToValidParams<T> = ValidateValidParams<{
    [K in T & string]: ValidParamValue
}>

/**
 * Filters the given object by its key names
 * @param OBJ is the object to filter
 * @param keyNames is the key names to filter
 * @returns the filtered object
 */
export type FilterObjectByKeys<OBJ, keyNames extends string[]> = {
    // @ts-ignore
    [K in keyof keyNames]: OBJ[keyNames[K]]
}