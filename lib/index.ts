// type BaseStore = {
//   clear(): void;
//   getItem(key: string): string | null;
//   removeItem(key: string): void;
//   setItem(key: string, value: string): void;
// };

// function createStorage<
//   Store extends BaseStore,
//   T extends { [key: string]: any }
// >(storage: Store) {
//   function getItem<Key extends keyof T & string>(
//     key: Key
//   ): Extract<T[Key], undefined> extends never
//     ? T[Key]
//     : Exclude<T[Key], undefined> | null {
//     const data = storage.getItem(key);
//     let parsed: any = data;
//     if (data?.startsWith("{") && data.endsWith("}")) {
//       try {
//         parsed = JSON.parse(data);
//       } catch (error) {
//         parsed = null;
//       }
//     }

//     return parsed;
//   }
//   function setItem<Key extends keyof T & string>(key: Key, data: T[Key]) {
//     //设置值为 undefined或null时移除该记录
//     if (data === null || data === undefined) {
//       storage.removeItem(key);
//     } else {
//       let parsed: any = data;
//       if (data && typeof data === "object") {
//         parsed = JSON.stringify(data);
//       }
//       storage.setItem(key, parsed);
//     }
//   }

//   function removeItem(key: keyof T & string) {
//     storage.removeItem(key);
//   }

//   function clear() {
//     storage.clear();
//   }

//   function setData(data: T) {
//     Object.keys(data).forEach((key) => {
//       setItem(key, data[key]);
//     });
//   }

//   return {
//     getItem,
//     setItem,
//     removeItem,
//     clear,
//     set: setData,
//   };
// }

function parseObj(data: any) {
    let parsed: any = data
    if (data?.startsWith("{") && data.endsWith("}")) {
        try {
            parsed = JSON.parse(data)
        } catch (error) {
            parsed = null
        }
    }

    return parsed
}
function stringifyObj(data: any) {
    let parsed: any = data
    if (data && typeof data === "object") {
        parsed = JSON.stringify(data)
    }
    return parsed
}

export function createLocalStorage<T extends { [key: string]: any }>() {
    function getItem<Key extends keyof T & string>(
        key: Key
    ): Extract<T[Key], undefined> extends never
        ? T[Key]
        : Exclude<T[Key], undefined> | null {
        return parseObj(localStorage.getItem(key))
    }
    function setItem<Key extends keyof T & string>(key: Key, data: T[Key]) {
        //设置值为 undefined或null时移除该记录
        if (data === null || data === undefined) {
            localStorage.removeItem(key)
        } else {
            localStorage.setItem(key, stringifyObj(data))
        }
    }

    function removeItem(key: keyof T & string) {
        localStorage.removeItem(key)
    }

    function clear() {
        localStorage.clear()
    }

    return {
        getItem,
        setItem,
        removeItem,
        clear
    }
}


export function createSessionStorage<T extends { [key: string]: any }>() {
    function getItem<Key extends keyof T & string>(
        key: Key
    ): Extract<T[Key], undefined> extends never
        ? T[Key]
        : Exclude<T[Key], undefined> | null {
        return parseObj(sessionStorage.getItem(key))
    }
    function setItem<Key extends keyof T & string>(key: Key, data: T[Key]) {
        //设置值为 undefined或null时移除该记录
        if (data === null || data === undefined) {
            sessionStorage.removeItem(key)
        } else {
            sessionStorage.setItem(key, stringifyObj(data))
        }
    }

    function removeItem(key: keyof T & string) {
        sessionStorage.removeItem(key)
    }

    function clear() {
        sessionStorage.clear()
    }
    return {
        getItem,
        setItem,
        removeItem,
        clear
    }
}

// type DD = string
// type xx = Extract<DD, undefined>
// type cc = never extends undefined ? true : false
// type zz = undefined extends never ? true : false
// type AA = Extract<DD, undefined> extends undefined
//     ? Exclude<DD, undefined> | null
//     : DD
