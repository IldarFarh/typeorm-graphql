import {createAuthorLoader} from './utils/dataloaders'

export type AppContext = {
  authorLoader: ReturnType<typeof createAuthorLoader>
}