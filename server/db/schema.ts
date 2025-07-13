import { mysqlTable, varchar, int, date } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 100 }).notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    role: varchar("role", { length: 20 }).notNull().default("client"), // 'client', 'dev', 'admin'
    createdAt: date("created_at", { mode: "date" }).default(new Date()),
    updatedAt: date("updated_at", { mode: "date" }).default(new Date()),
});

// Team table for About page
export const team = mysqlTable("team", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 100 }).notNull(),
    position: varchar("position", { length: 100 }).notNull(),
    photo: varchar("photo", { length: 255 }),
    bio: varchar("bio", { length: 1000 }),
    email: varchar("email", { length: 255 }),
    createdAt: date("created_at", { mode: "date" }).default(new Date()),
    updatedAt: date("updated_at", { mode: "date" }).default(new Date()),
});

// Blog tables (like WordPress)
export const blogPosts = mysqlTable("blog_posts", {
    id: int("id").primaryKey().autoincrement(),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).unique().notNull(),
    content: varchar("content", { length: 5000 }).notNull(),
    excerpt: varchar("excerpt", { length: 500 }),
    authorId: int("author_id").notNull(),
    status: varchar("status", { length: 20 }).notNull().default("draft"), // 'draft', 'published'
    publishedAt: date("published_at", { mode: "date" }),
    createdAt: date("created_at", { mode: "date" }).default(new Date()),
    updatedAt: date("updated_at", { mode: "date" }).default(new Date()),
});

export const blogCategories = mysqlTable("blog_categories", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 100 }).unique().notNull(),
    description: varchar("description", { length: 500 }),
});

export const blogPostCategories = mysqlTable("blog_post_categories", {
    postId: int("post_id").notNull(),
    categoryId: int("category_id").notNull(),
});

export const blogComments = mysqlTable("blog_comments", {
    id: int("id").primaryKey().autoincrement(),
    postId: int("post_id").notNull(),
    authorName: varchar("author_name", { length: 100 }).notNull(),
    authorEmail: varchar("author_email", { length: 255 }),
    content: varchar("content", { length: 1000 }).notNull(),
    createdAt: date("created_at", { mode: "date" }).default(new Date()),
});

export const features = mysqlTable("features", {
    id: int("id").primaryKey().autoincrement(),
    title: varchar("title", { length: 100 }).notNull(),
    category: varchar("category", { length: 50 }).notNull(),
    icon: varchar("icon", { length: 100 }), // store icon name or path
    image: varchar("image", { length: 255 }), // image URL or path
    shortDescription: varchar("short_description", { length: 255 }).notNull(),
    longDescription: varchar("long_description", { length: 2000 }),
    createdAt: date("created_at", { mode: "date" }).default(new Date()),
    updatedAt: date("updated_at", { mode: "date" }).default(new Date()),
});

export const featureSubFeatures = mysqlTable("feature_sub_features", {
    id: int("id").primaryKey().autoincrement(),
    featureId: int("feature_id").notNull(),
    name: varchar("name", { length: 100 }).notNull(),
});

export const pricingPackages = mysqlTable("pricing_packages", {
    id: int("id").primaryKey().autoincrement(),
    name: varchar("name", { length: 100 }).notNull(),
    description: varchar("description", { length: 500 }),
    isPopular: int("is_popular").notNull().default(0), // 0 = false, 1 = true
    createdAt: date("created_at", { mode: "date" }).default(new Date()),
    updatedAt: date("updated_at", { mode: "date" }).default(new Date()),
});

export const pricingPackageFeatures = mysqlTable("pricing_package_features", {
    id: int("id").primaryKey().autoincrement(),
    packageId: int("package_id").notNull(),
    feature: varchar("feature", { length: 255 }).notNull(),
    order: int("order").notNull().default(0),
});