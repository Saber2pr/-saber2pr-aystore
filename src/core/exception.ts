/*
 * @Author: saber2pr
 * @Date: 2019-05-03 11:33:51
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-05-03 11:39:23
 */
import { Response } from './context'

export class Exception extends Error {
  constructor(public code: number, public message: string) {
    super(message)
  }
  static async resolve(Exception: any, response: Response) {
    const err: Exception = Exception
    response.statusCode = err.code
    response.end(err.message)
    return response
  }
}
