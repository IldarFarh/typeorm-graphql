import DataLoader from "dataloader";
import { Author } from "../entities/Author";
import { toObjectArray } from "../utils/toObjectId"

export const createAuthorLoader = () =>
  new DataLoader<string, Author>(async (authorIds) => {
    const authors = await Author.find({
      where: {
        _id: { $in: toObjectArray(authorIds) },
      }
    });
    const authorIdToAuthor: Record<string, Author> = {};
    authors.forEach((author) => {
      authorIdToAuthor[author.id.toString()] = author;
    });
    return authorIds.map((id) => authorIdToAuthor[id]);
  });
