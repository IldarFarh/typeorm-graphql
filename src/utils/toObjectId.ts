import { ObjectId } from "mongodb";

export const toObjectId = (value: string | ObjectId): ObjectId => {
  return typeof value === 'string' ? new ObjectId(value) : value
}

export const toObjectArray = (value: readonly string[]): ObjectId[] => {
  return value.map(id => new ObjectId(id))
}