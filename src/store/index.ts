import { create, State, StateCreator, StoreMutatorIdentifier } from 'zustand'
import { persist } from 'zustand/middleware'

type SystemState = {
  name: string
  age: number
  updateName: (name: string) => void
  updateAge: (age: number) => void
}

type Logger = <
  T extends State,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = [],
>(
  fun: StateCreator<T, Mps, Mcs>,
  name?: string,
) => StateCreator<T, Mps, Mcs>

type LoggerImpl = <T extends State>(
  fun: StateCreator<T, [], []>,
  name?: string,
) => StateCreator<T, [], []>

// 自定义日志中间件（不改变存储类型的中间件）
const logMiddleware: LoggerImpl = (fun, name) => (set, get, store) => {
  // 拦截set方法
  const loggedSet: typeof set = (...args) => {
    set(...args)
    console.log(...(name ? [`${name}:set`] : ['log:set']), get());
  }

  // 拦截setState方法
  const setState = store.setState
  store.setState = (...args) => {
    setState(...args)
    console.log(...(name ? [`${name}:setState`] : ['log:setState']), store.getState())
  }

  return fun(loggedSet, get, store)
}
const logger = logMiddleware as unknown as Logger

export const useSystemStore = create<SystemState>()(logger(persist((set) => ({
  name: 'coderwhy',
  age: 18,
  updateName: (name: string) => set(() => ({ name })),
  updateAge: (age: number) => set(() => ({ age })),
}), { name: 'system' }), '日志'))