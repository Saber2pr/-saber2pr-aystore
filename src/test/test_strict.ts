/*
 * @Author: saber2pr
 * @Date: 2019-05-02 14:19:16
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-03 11:42:30
 */
import { AyStore } from '../core/aystore'

const user = AyStore({ test: 'it is test' })

user.use(async (ctx, next) => {
  if (ctx.request.url === '/user') {
    ctx.response.end('user!', ctx.request.body, ctx.test)
  } else {
    await next()
  }
})

const store = AyStore({ test: 'test?' })
  .use(async (ctx, next) => {
    if (ctx.request.url === '/saber') {
      ctx.response.end('saber!', ctx.request.body)
    } else {
      await next()
    }
  })
  .use(user.body())

store.request({ url: '/user' }).then(res => {
  console.log(res)
})
