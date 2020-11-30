import { MiddlewareFn } from "type-graphql"
import { AppContext } from "../types"

export const isAuth: MiddlewareFn<AppContext> = ({context}, next) => {
  if (!context.req.session.userId) {
    throw new Error("Not authenticated");
  }
  return next();
}

export const isAdmin: MiddlewareFn<AppContext> = ({context}, next) => {
  if (!context.req.session.userId || context.req.session.role !== 'admin') {
    throw new Error("Not authenticated");
  }
  return next();
}