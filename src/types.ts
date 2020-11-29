import { Request, Response } from 'express'
import { createAuthorLoader } from './utils/dataloaders'

export type AppContext = {
  req: Request & { session: any };
  res: Response;
  authorLoader: ReturnType<typeof createAuthorLoader>;
}