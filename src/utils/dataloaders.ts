import DataLoader from "dataloader";
import { Author } from "../entities/Author";

export const createAuthorLoader = () =>
  new DataLoader<number, Author>(async (authorIds) => {
    const authors = await Author.findByIds(authorIds as number[]);
    const authorIdToAuthor: Record<number, Author> = {};
    authors.forEach((author) => {
      authorIdToAuthor[author.authorId] = author;
    });
    return authorIds.map((id) => authorIdToAuthor[id]);
  });
