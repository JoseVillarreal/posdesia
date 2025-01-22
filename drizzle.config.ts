import { defineConfig } from "drizzle-kit";

const DB_CONFIG = {
    HOST: Deno.env.get("DATABASE_HOST")!;
    USER: Deno.env.get("DATABASE_USER")!;
    PASS:
    TABLE:
    URL: "postgresql://${DB_CONFIG.HOST}/${DB_CONFIG.TABLE}?user=${DB_CONFIG.USER}&password=${DB_CONFIG.PASS}",
};

export default defineConfig({
    out: "./drizzle",
    schema: "./src/db/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
        url: DB_CONFIG.URL
    },
});
