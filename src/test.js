import {createStore,createLocalStorage} from '../lib/index'

const store = createStore(
    { provider: () => localStorage },
    {
      token: "string",
  
      data: "object",
      amount: "number",
      // $get: "number"
    },
  )

  const store2=createLocalStorage()
  store2.getItem('')

  import { test } from '../lib/v2'
  const xx = test({ a: '', b: { c: '' } })
  xx.b.json
  xx.a.string()