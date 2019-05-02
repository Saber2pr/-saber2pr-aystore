/*
 * @Author: saber2pr
 * @Date: 2019-05-02 12:55:24
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-02 14:19:47
 */
import { Job, Next } from './compose'
import { compose } from './compose'
import { Context, ContextType, Request, Response } from './context'

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
    end: (...value: any[]) => {
      if (value) {
        this.data = value.length === 1 ? value[0] : value.filter(v => v)
      }
    }
  }

  private data = null

  public async request(request: Request): Promise<Response>
  public async request(request: Request): Promise<Response>
  public async request(request: Request, next: Next): Promise<Response>
  public async request(
    request: Request,
    next: Next = () => Promise.resolve()
  ): Promise<Response> {
    const { context, response } = this
    const ctx = Object.assign(context, { request, response })
    await this.body()(ctx, next)
    return this.data
  }
}

export function AyStore(): AyStoreBody
export function AyStore<C = Context>(extraContext?: C): AyStoreBody<C>
export function AyStore<C = Context>(extraContext?: C): AyStoreBody<C> {
  return new AyStoreBody<C>(extraContext)
}
