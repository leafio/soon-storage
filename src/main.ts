import { createStorage } from '../lib/index'

const storage = createStorage<{
    name: string,
    age: number,
    birth: Date,
    graduated: boolean,
    school: {
        name: string,
        address: string
    }
}>({
    prefix: 'soon-',
    provider: () => localStorage,
    transforms: {
        name: 'string',
        age: 'number',
        birth: {
            getter: (val) => val === null ? null : new Date(val),
            setter: (val) => val.toUTCString()
        },
        graduated: 'boolean',
        school: 'json'
    }
})

storage.name.set('Jack')
console.log(storage.name.get())
storage.age.set(1)
console.log(storage.age.get())
storage.birth.set(new Date('2008-08-08'))
console.log(storage.birth.get()?.toISOString())
storage.birth.remove()

storage.graduated.set(true)
console.log(storage.graduated.get())
storage.school.set({
    name: 'Blue Sky',
    address: 'Shanghai'
})
console.log(storage.school.get())
storage.$.setAll({
    name: 'Lucy',
    age: 100,
    birth: new Date(),
    graduated: false,
    school: {
        name: 'Green Land',
        address: 'Qingdao'
    }
})
storage.birth.remove()
console.log(storage.$.getAll())
storage.$.removeAll()

