/*
 * @Author: saber2pr
 * @Date: 2019-05-03 11:22:09
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-03 11:22:37
 */
import { Context } from './context'

export type Next = () => Promise<any>

export type Job<T extends Context = Context> = (
  ctx: T,
  next: Next
) => Promise<void>

export const compose = <T extends Context = Context>(
  ...jobs: (Job<T>)[]
): Job<T> => async (ctx, next) =>
  jobs.reduceRight(
    (next: Next, job: Job<T>) => async () => await job(ctx, next),
    next
  )()
