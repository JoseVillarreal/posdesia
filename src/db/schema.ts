import { sql } from 'drizzle-orm'
import {
    boolean,
    integer,
    pgTable,
    serial,
    text,
    timestamp,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    id: serial('id').primaryKey().notNull(),
    created_on: timestamp("created_on").notNull().defaultNow(),
    username: text("username").notNull(),
    email: text("email").notNull(),
});

export const poems = pgTable("poems", {
    id: serial('poemId').primaryKey().notNull(),
    created_on: timestamp("created_on").notNull().defaultNow(),
    title: text("title").default("untitled").notNull(),
    poem: text("poem").default("").notNull(),
    author: text("author").default("").notNull(),
    userId: integer("userId").notNull(),
    annotations: integer("annotations").array().default(sql`ARRAY[]::integer[]`),
    comments: integer("comments").array().default(sql`ARRAY[]::integer[]`),
});

export const annotations = pgTable("annotations", {
    id: serial("annotationId").primaryKey().notNull(),
    created_on: timestamp("created_on").notNull().defaultNow(),
    poem: integer("poem").notNull(),
    linePosition: integer("linePosition").notNull(),
    message: text("message").notNull(),
    userId: integer("userId").notNull(),
    comments: integer("comments").array().default(sql`ARRAY[]::integer[]`),
});

export const comments = pgTable("comments", {
    id: serial("commentId").primaryKey().notNull()
    created_on: timestamp("created_on").notNull.defaultNow(),
    userId: integer("userId").notNull(),
    message: text("message").notNull(),
});
