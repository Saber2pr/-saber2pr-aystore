/*
 * @Author: saber2pr
 * @Date: 2019-05-02 13:29:40
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-02 13:56:44
 */
export interface Request {
  url: string
  body?: any
}

export interface Response {
  end(...value: any[]): void
}

export interface Context {
  request: Request
  response: Response
}

export type ContextType<T = Context> = T & Context
