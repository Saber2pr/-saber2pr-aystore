# @saber2pr/aystore

> Async Store! 异步的 Store!

```bash
# from npm
npm install @saber2pr/aystore

# from github
git clone https://github.com/Saber2pr/-saber2pr-aystore.git
```

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
