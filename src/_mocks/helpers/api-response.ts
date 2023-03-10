import { RestContext } from 'msw'

interface ResponseType {
  res: any,
  ctx: RestContext,
  statusCode?: number,
  message?: string,
  data?: any
}

// export const successResponse = ({ res, ctx, statusCode = 200, message = 'SUCCESS', data }: ResponseType) =>
//   res(ctx.delay(3000), ctx.status(statusCode), ctx.json({ result: 1, message, data }))

export const successResponse = ({ res, ctx, statusCode = 200, message = 'SUCCESS', data = "" }: ResponseType) =>
  res(ctx.status(statusCode), ctx.json({ data, message, status: statusCode }))

export const errorResponse = ({ res, ctx, statusCode = 500, message = 'Internal Server Error', data = "" }: ResponseType) =>
  res(ctx.status(statusCode), ctx.json({ data, message, status: statusCode }))
