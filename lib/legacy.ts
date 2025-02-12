// function createStorageWrapper<T extends { [key: string]: any }>(options: {
//     provider: () => Storage
//     prefix?: string
//     types: { [key in keyof Required<T>]: Type2Str<T[key]> }
//   }) {
//     function prefixedKey(key: string) {
//       return options?.prefix ?? "" + key
//     }
//     const { types, provider } = options
  
//     function getItem<Key extends keyof T & string>(key: Key): Exclude<T[Key], undefined> | null {
//       const _key = prefixedKey(key)
//       const value = _getItem(provider, _key)
//       let getter = (val: string | null) => val as any
//       const parseName = types[key as keyof typeof types]
//       const trans = typeof parseName === "string" ? parsers[parseName as keyof typeof parsers] : (parseName as any)
  
//       if (trans.getter) getter = trans.getter
  
//       return getter(value) as any
//     }
  
//     function setItem<Key extends keyof T & string>(key: Key, data: T[Key]) {
//       const _key = prefixedKey(key)
//       //设置值为 undefined或null时移除该记录
//       if (data === null || data === undefined) {
//         _removeItem(provider, _key)
//       } else {
//         let setter = (val: string | null) => val
//         const parseName = types[key as keyof typeof types]
//         const trans = typeof parseName === "string" ? parsers[parseName as keyof typeof parsers] : (parseName as any)
  
//         if (trans.setter) setter = trans.setter
//         _setItem(provider, _key, setter(data))
//       }
//     }
  
//     function removeItem(key: keyof T & string) {
//       const _key = prefixedKey(key)
//       _removeItem(provider, _key)
//     }
//     const keys = Object.keys(types ?? {})
//     const clear = () => {
//       keys.forEach((key) => {
//         removeItem(key)
//       })
//     }
//     const set = (data: T) => {
//       keys.forEach((key) => {
//         setItem(key, data[key] as any)
//       })
//     }
//     const get = (): T => {
//       const res = {} as any
//       keys.forEach((key) => {
//         res[key] = getItem(key)
//       })
//       return res
//     }
  
//     return {
//       getItem,
//       setItem,
//       removeItem,
//       clear,
//       get,
//       set,
//     }
//   }
  
//   export function createLocalStorage<T extends { [key: string]: any }>(config: { prefix?: string; types: { [key in keyof Required<T>]: Type2Str<T[key]> } }) {
//     return createStorageWrapper<T>({ provider: () => localStorage, ...config })
//   }
  
//   export function createSessionStorage<T extends { [key: string]: any }>(config: { prefix?: string; types: { [key in keyof Required<T>]: Type2Str<T[key]> } }) {
//     return createStorageWrapper<T>({ provider: () => sessionStorage, ...config })
//   }
  