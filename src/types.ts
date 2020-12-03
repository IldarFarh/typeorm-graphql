import { Request, Response } from 'express'
import { createUserLoader, createTagLoader } from './utils/dataloaders'

export type AppContext = {
  req: Request & { session: any };
  res: Response;
  userLoader: ReturnType<typeof createUserLoader>;
  tagLoader: ReturnType<typeof createTagLoader>;
}