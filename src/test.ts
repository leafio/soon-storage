
// enum StorageKey {
//     Token = 'token',
//     User='user'
//   }

//   localStorage.getItem(StorageKey.Token)

// const StorageKey = {
//     Token: 'token',
//     User: 'user'
// }

// localStorage.getItem(StorageKey.Token)

const createStorage2 = <T>() => {
    const key='app'
    return {
        get(): Partial<T> {
            const app = localStorage.getItem(key)
            return app === null ? {} : JSON.parse(app)
        },
        set(data: Partial<T>) {
            localStorage.setItem(key, JSON.stringify(data))
        }
    }

}

const storage2=createStorage2<{token:string,user:{username:string}}>()
storage2.get().token
const data=storage2.get()
storage2.set({...data,user:{username:'张三'}})