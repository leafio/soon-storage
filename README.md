# soon-storage

**A type-safe storage wrapper for localStorage , sessionStorage .**

## Usage

```ts
const storage = createStorage<{
  name: string;
  age: number;
  birth: Date;
  graduated: boolean;
  school: {
    name: string;
    address: string;
  };
}>({
  // stored key prefix
  prefix: "soon-",
  // choose localStorage or SessionStorage
  provider: () => localStorage,
  // string,number,boolean,json  are built-in transform method
  // you can define your own transform like below for a Date type
  transforms: {
    name: "string",
    age: "number",
    birth: {
      getter: (val) => (val === null ? null : new Date(val)),
      setter: (val) => val.toUTCString(),
    },
    graduated: "boolean",
    school: "json",
  },
});

// set a key-value
storage.birth.set(new Date("2008-08-08"));
// get a key-value
storage.birth.get();
// remove a key-value
storage.birth.remove();

//set all key-values
store.$.setAll({
  name: "Lucy",
  age: 100,
  birth: new Date(),
  graduated: false,
  school: {
    name: "Green Land",
    address: "Qingdao",
  },
});

// get all key-values
// any key value would be null
storage.$.getAll();

// remove all key-values
// only this instance keys would be removed
storage.$.removeAll();
```
