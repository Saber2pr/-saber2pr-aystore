/*
 * @Author: saber2pr
 * @Date: 2019-05-02 14:19:13
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-03 11:41:37
 */
import { AyStore } from '../core/aystore'

const store = AyStore()

store.use(async ctx => {
  if (ctx.request.url === '/hello') {
    ctx.response.end('hello!')
  }
})

store.request({ url: '/hello' }).then(res => {
  console.log(res.value, res.statusCode)
})
