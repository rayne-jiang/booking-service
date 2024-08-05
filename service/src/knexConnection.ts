import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./src/dev.sqlite3"
    },
    useNullAsDefault: true,
  },
};

export default config;