import { Request, Response, NextFunction } from 'express'

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestedAt = Date.now()

  // small trick to get status code on response
  // https://stackoverflow.com/a/41010040
  // evade `end` function temporary and give it back once it's done.
  const end = res.end
  res.end = (chunck, encoding?) => {
    console.log(
      // tslint:disable-next-line:max-line-length
      `${req.ip} - - [${requestedAt}] "${req.method} ${req.originalUrl} ${req.hostname} ${res.statusCode}" ${Date.now() - requestedAt}ms`
    )

    res.end = end
    res.end(chunck, encoding)
  }
  next()
}
