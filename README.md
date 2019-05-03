# @saber2pr/aystore

> Async Store! 异步的 Store!

```bash
# from npm
npm install @saber2pr/aystore

# from github
git clone https://github.com/Saber2pr/-saber2pr-aystore.git
```

# 它用来干什么？

它是浏览器端的虚拟 server 程序

发起 http 请求，你将使用组合中间件的机制来封装接口！

它作为代理去请求后端接口.

# API

1. store.body

> 返回 store requestListener 处理程序

```ts
const store = AyStore()

store.body()

// store.use(store.body())
```

2. store.use

> 注册一个 requestListener

```ts
const store = AyStore()

store.use(async ctx => {
  if (ctx.request.url === '/hello') {
    ctx.response.end('hello!')
  }
})
```

3. store.context

> 在 requestListener 间传递的上下文

```ts
const store = AyStore({ name: 'aystore' })

store.use(async (ctx, next) => {
  ctx.name // 'aystore'
  store.context // 'aystore'
})
```

4. store.request

> 发起一个请求

```ts
const store = AyStore()

store.use(async ctx => {
  if (ctx.request.url === '/hello') {
    ctx.response.end('hello!')
  }
})

store.request({ url: '/hello' }).then(res => {
  console.log(res) // hello!
})
```

传递参数

```ts
const store = AyStore()

store.use(async ctx => {
  if (ctx.request.url === '/hello') {
    ctx.response.end('hello!', ctx.request.body)
  }
})

store.request({ url: '/hello', body: 'world!' }).then(res => {
  console.log(res) // ['hello!', 'world!']
})
```

## 协变

Typescript 对函数参数类型默认允许双向协变，但是它不安全！
例如组合两个 AyStore 的 body 会涉及到 对 context 的依赖，如果允许双向协变，它将不会报错！

强烈建议开启：--strictFunctionTypes

```json
{
  "compilerOptions": {
    "strictFunctionTypes": true
  }
}
```

---

## start

```bash
npm install
```

```bash
npm start

npm run dev

```

> Author: saber2pr

---

## develope and test

> you should write ts in /src

> you should make test in /src/test

> export your core in /src/index.ts!
