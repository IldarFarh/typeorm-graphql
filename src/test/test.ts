import { Connection } from "typeorm";
import { testConn } from "./testConn";
import { graphqlCall } from "./graphqlCall";

let conn: Connection;
beforeAll(async () => {
  conn = await testConn();
});
afterAll(async () => {
  await conn.dropDatabase();
  await conn.close();
});

const createAuthor = `
  mutation CreateAuthor($name: String!){
    createAuthor(name: $name) {
      authorId
      name
    }
  }
`;

describe("Author", () => {
  it("create author", async () => {
    const response = await graphqlCall({
      source: createAuthor,
      variableValues: {
        name: "Pushkin",
      },
    });

    expect(response).toMatchObject({
      data: {
        createAuthor: { name: "Pushkin" },
      },
    });
  });
});

const createBook = `
  mutation CreateBook($BookInput:BookInput!){
    createBook(input: $BookInput) {
      name
      pageCount
      authorId
    }
  }
`;

describe("Book", () => {
  it("create book", async () => {
    const response = await graphqlCall({
      source: createBook,
      variableValues: {
        BookInput: {
          name: "Ruslan & Ludmila",
          pageCount: 324,
          authorId: 1,
        },
      },
    });
    expect(response).toMatchObject({
      data: {
        createBook: { name: "Ruslan & Ludmila", pageCount: 324, authorId: 1 },
      },
    });
  });

  it("books list", async () => {
    const response = await graphqlCall({
      source: `
        query Books {
          books {
            name
            pageCount
            authorId
          }
        }
      `,
    });
    expect(response).toMatchObject({
      data: {
        books: [{ name: "Ruslan & Ludmila", pageCount: 324, authorId: 1 }],
      },
    });
  });

  it("books with author", async () => {
    const response = await graphqlCall({
      source: `
        query BooksAuthors {
          books {
            name
            pageCount
            author {
              name
            }
          }
        }
      `,
    });
    expect(response).toMatchObject({
      data: {
        books: [
          {
            name: "Ruslan & Ludmila",
            pageCount: 324,
            author: { name: "Pushkin" },
          },
        ],
      },
    });
  });
});
