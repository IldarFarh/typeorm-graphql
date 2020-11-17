import { createConnection } from "typeorm"
import {Author} from '../entities/Author'
import {Book} from '../entities/Book'

export const testConn = () => {
  return createConnection({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    database: "typeorm-test",
    synchronize: true,
    dropSchema: true,
    entities: [Author, Book],
  });
}