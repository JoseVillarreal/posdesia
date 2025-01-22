import { drizzle } from "drizzle-orm/node-postgres";
// Import Schemas

import pg from "pg";

// instantiate Drizzle client with pg driver and schema.
export const db = drizzle({
    client: new Pool({
        connectionString: Deno.env.get("DATABASE_URL"),
    }),
    schema: {},
});
