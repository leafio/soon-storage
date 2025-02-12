function parseJson<T>(data: string | null) {
  let parsed = null
  if (data === null) return parsed
  try {
    parsed = JSON.parse(data)
  } catch (error) {
    /* empty */
  }
  return parsed as T
}
const maybeJsonString = (val: string | null) =>
  (val?.startsWith("{") && val.endsWith("}")) ||
  (val?.startsWith("[") && val.endsWith("]"))

const parsers = {
  string: { getter: (val: string | null) => val },
  number: {
    getter: (val: string | null) =>
      val === null ? null : Number.isNaN(Number(val)) ? null : Number(val),
  },
  boolean: {
    getter: (val: string | null) =>
      val === "true" ? true : val === "false" ? false : null,
  },
  json: {
    getter: <T>(val: string | null) =>
      maybeJsonString(val) ? parseJson<T>(val) : null,
    setter: (val: any) => stringifyObj(val),
  },
}

function stringifyObj(data: any) {
  let parsed: any = data
  if (data && typeof data === "object") {
    parsed = JSON.stringify(data)
  }
  return parsed
}

type Type2Str<T> = T extends string
  ? "string"
  : T extends number
  ? "number"
  : T extends boolean
  ? "boolean"
  : T extends object
  ? "json"
  : never

function _removeItem(provider: () => Storage, key: string) {
  const store = provider()
  store.removeItem(key)
}

function _getItem(provider: () => Storage, key: string) {
  const store = provider()
  return store.getItem(key)
}

function _setItem(
  provider: () => Storage,
  key: string,
  data: undefined | null | string | object | number | boolean
) {
  const store = provider()
  if (data !== null && data !== undefined) {
    store.setItem(key, stringifyObj(data))
  } else {
    store.removeItem(key)
  }
}

function getParser(
  types: Record<
    string,
    | string
    | {
      getter?: (val: string | null) => any
      setter?: (val: any) => string
    }
  >,
  key: string
) {
  let getter = (val: string | null) => val as any
  let setter = (val: any | null) => val
  const parseName = types[key as keyof typeof types]
  const trans =
    typeof parseName === "string"
      ? parsers[parseName as keyof typeof parsers]
      : (parseName as any)

  if (trans.getter) getter = trans.getter
  if (trans.setter) setter = trans.setter
  return {
    getter,
    setter,
  }
}

export function createStorage<T>(config: {
  provider: () => Storage
  prefix?: string
  transforms: {
    [key in keyof Required<T>]:
    | Type2Str<T[key]>
    | {
      getter?: (val: string | null) => any
      setter?: (val: T[key]) => string
    }
  }
}) {
  const { prefix = "", provider, transforms: types } = config
  const keys = Object.keys(types)

  const removeAll = () => {
    keys.forEach((key) => {
      const storedKey = prefix + key
      _removeItem(provider, storedKey)
    })
  }
  const setAll = (data: T) => {
    keys.forEach((key) => {
      const { setter } = getParser(types, key)
      const storedKey = prefix + key
      _setItem(
        provider,
        storedKey,
        setter(data[key as keyof typeof data] as any)
      )
    })
  }
  const getAll = (): { [key in keyof Required<T>]: T[key] | null } => {
    const res = {} as any
    keys.forEach((key) => {
      const { getter } = getParser(types, key)
      const storedKey = prefix + key
      res[key] = getter(_getItem(provider, storedKey))
    })
    return res
  }

  const result: any = {}
  keys.forEach((key) => {
    const storedKey = prefix + key
    const fun: any = {}

    const { getter, setter } = getParser(types, key)

    fun.get = () => getter(_getItem(provider, storedKey))
    fun.set = (val: any) => _setItem(provider, storedKey, setter(val))
    fun.remove = () => _removeItem(provider, storedKey)
    result[key] = fun
  })
  const $ = { getAll, setAll,  removeAll }

  return { ...result, $ } as {
    [K in keyof Required<T>]: {
      get(): T[K] | null
      set(data: T[K]): void
      remove(): void
    }
  } & { $: typeof $ }
}
