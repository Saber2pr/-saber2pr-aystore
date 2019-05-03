/*
 * @Author: saber2pr
 * @Date: 2019-05-02 13:29:40
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-03 11:35:28
 */
export interface Request {
  url: string
  body?: any
}

export interface Response {
  statusCode: number
  end(...value: any[]): void
}

export interface Result {
  statusCode: number
  value: any
}

export interface Context {
  request: Request
  response: Response
}

export type ContextType<T = Context> = T & Context
