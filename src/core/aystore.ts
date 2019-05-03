/*
 * @Author: saber2pr
 * @Date: 2019-05-02 12:55:24
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-03 11:42:05
 */
import { Job, Next } from './compose'
import { compose } from './compose'
import { Context, ContextType, Request, Response, Result } from './context'

export class AyStoreBody<C = Context> {
  public constructor(
    public context: C = <C>{},
    private jobs: Job<ContextType<C>>[] = []
  ) {}

  public use(...listener: Job<ContextType<C>>[]) {
    this.jobs.push(...listener)
    return this
  }

  public body() {
    return compose(...this.jobs)
  }

  private response: Response = {
    statusCode: 200,
    end: (...value: any[]) => {
      if (value) {
        this.result.statusCode = this.response.statusCode
        this.result.value = value.length === 1 ? value[0] : value.filter(v => v)
      }
    }
  }

  private result: Result = {
    statusCode: null,
    value: null
  }

  public async request(request: Request): Promise<Result>
  public async request(request: Request): Promise<Result>
  public async request(request: Request, next: Next): Promise<Result>
  public async request(
    request: Request,
    next: Next = () => Promise.resolve()
  ): Promise<Result> {
    const { context, response } = this
    const ctx = Object.assign(context, { request, response })
    await this.body()(ctx, next)
    return this.result
  }
}

export function AyStore(): AyStoreBody
export function AyStore<C = Context>(extraContext?: C): AyStoreBody<C>
export function AyStore<C = Context>(extraContext?: C): AyStoreBody<C> {
  return new AyStoreBody<C>(extraContext)
}
