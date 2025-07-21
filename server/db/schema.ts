import {
  InferInsertModel,
  InferSelectModel,
  relations,
} from "drizzle-orm";
import {
  mysqlTable,
  serial,
  varchar,
  text,
  int,
  boolean,
  timestamp,
  decimal,
  json,
} from "drizzle-orm/mysql-core";
import { createId } from "@paralleldrive/cuid2";

// ==============================
// Users
// ==============================

export const users = mysqlTable("users", {
  id: varchar({ length: 128 }).primaryKey().$defaultFn(() => createId()),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role", { length: 100 }).notNull(),
  avatar: varchar("avatar", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  isActive: boolean("is_active").notNull().default(true),
  lastLoginAt: timestamp("last_login_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ==============================
// Settings
// ==============================

export const settings = mysqlTable("settings", {
  id: serial("id").primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  companyAbbr: varchar("company_abbr", { length: 50 }),
  about: text("about"),
  excerpt: text("excerpt"),
  moto: varchar("moto", { length: 255 }),
  logo: varchar("logo", { length: 255 }),
  keywords: json("keywords").$type<string[]>().notNull().default([]),
  vision: json("vision").$type<string[]>().notNull().default([]),
  mission: json("mission").$type<string[]>().notNull().default([]),
  email: varchar("email", { length: 255 }).notNull(),
  address: text("address"),
  phoneNumber: varchar("phone_number", { length: 20 }),
  linkedin: varchar("linkedin", { length: 255 }),
  instagram: varchar("instagram", { length: 255 }),
  twitter: varchar("twitter", { length: 255 }),
  youtube: varchar("youtube", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ==============================
// Team
// ==============================

export const team = mysqlTable("team", {
  id: varchar({ length: 128 }).primaryKey().$defaultFn(() => createId()),
  name: varchar("name", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  photo: varchar("photo", { length: 255 }),
  bio: text("bio"),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 20 }),
  linkedin: varchar("linkedin", { length: 255 }),
  instagram: varchar("instagram", { length: 255 }),
  twitter: varchar("twitter", { length: 255 }),
  // sortOrder: int("sort_order").notNull().default(0),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ==============================
// Blog Categories
// ==============================

export const blogCategories = mysqlTable("blog_categories", {
  id: varchar({ length: 128 }).primaryKey().$defaultFn(() => createId()),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ==============================
// Blog Posts
// ==============================

export const blogPosts = mysqlTable("blog_posts", {
  id: varchar({ length: 128 }).primaryKey().$defaultFn(() => createId()),
  title: varchar("title", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).unique().notNull(),
  excerpt: text("excerpt"),
  content: text("content").notNull(),
  keywords: json("keywords").$type<string[]>().notNull().default([]),
  featuredImage: varchar("featured_image", { length: 255 }),
  authorId: varchar("author_id", { length: 128 }).notNull(),
  status: varchar("status", { length: 100 }).notNull(),
  viewCount: int("view_count").notNull().default(0),
  isFeatured: boolean("is_featured").notNull().default(false),
  publishedAt: timestamp("published_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ==============================
// Blog Post Categories Pivot
// ==============================

export const blogPostCategories = mysqlTable("blog_post_categories", {
  postId: varchar("post_id", { length: 128 }).notNull(),
  categoryId: varchar("category_id", { length: 128 }).notNull(),
});

// ==============================
// Blog Comments
// ==============================

export const blogComments = mysqlTable("blog_comments", {
  id: varchar({ length: 128 }).primaryKey().$defaultFn(() => createId()),
  postId: varchar("post_id", { length: 128 }).notNull(),
  parentId: varchar("parent_id", { length: 128 }),
  authorName: varchar("author_name", { length: 255 }).notNull(),
  authorEmail: varchar("author_email", { length: 255 }).notNull(),
  content: text("content").notNull(),
  ipAddress: varchar("ip_address", { length: 100 }),
  userAgent: varchar("user_agent", { length: 255 }),
  status: varchar("status", { length: 50 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ==============================
// Features
// ==============================

export const features = mysqlTable("features", {
  id: varchar({ length: 128 }).primaryKey().$defaultFn(() => createId()),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category", { length: 255 }).notNull(),
  icon: varchar("icon", { length: 100 }),
  image: varchar("image", { length: 255 }),
  shortDescription: text("short_description"),
  longDescription: text("long_description"),
  featuresList: json("features_list").$type<string[]>().notNull().default([]),
  isActive: boolean("is_active").notNull().default(true),
  isFeatured: boolean("is_featured").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ==============================
// Pricing Plans
// ==============================

export const pricingPlans = mysqlTable("pricing_plans", {
  id: varchar({ length: 128 }).primaryKey().$defaultFn(() => createId()),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  type: varchar("type", { length: 100 }).notNull(),
  features: json("features").$type<string[]>().notNull().default([]),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  isPopular: boolean("is_popular").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// ==============================
// Suggestions
// ==============================

export const suggestions = mysqlTable("suggestions", {
  id: varchar({ length: 128 }).primaryKey().$defaultFn(() => createId()),
  userId: varchar("user_id", { length: 128 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(),
  image: varchar("image", { length: 255 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow().onUpdateNow(),
});

// === blogPosts Relations ===
export const blogPostsRelations = relations(blogPosts, ({ one, many }) => ({
  author: one(users, {
    fields: [blogPosts.authorId],
    references: [users.id],
  }),
  categories: many(blogPostCategories),
  comments: many(blogComments),
}));

// === blogCategories Relations ===
export const blogCategoriesRelations = relations(
  blogCategories,
  ({ many }) => ({
    posts: many(blogPostCategories),
  })
);

// === blogPostCategories Relations ===
export const blogPostCategoriesRelations = relations(
  blogPostCategories,
  ({ one }) => ({
    post: one(blogPosts, {
      fields: [blogPostCategories.postId],
      references: [blogPosts.id],
    }),
    category: one(blogCategories, {
      fields: [blogPostCategories.categoryId],
      references: [blogCategories.id],
    }),
  })
);

// === blogComments Relations ===
export const blogCommentsRelations = relations(
  blogComments,
  ({ one, many }) => ({
    post: one(blogPosts, {
      fields: [blogComments.postId],
      references: [blogPosts.id],
    }),
    parent: one(blogComments, {
      fields: [blogComments.parentId],
      references: [blogComments.id],
    }),
    replies: many(blogComments),
  })
);

// === suggentions Relations ===
export const suggestionsRelations = relations(suggestions, ({ one }) => ({
  users: one(users, {
    fields: [suggestions.userId],
    references: [users.id],
  }),
}));

// === user Relations ===
export const usersRelations = relations(users, ({ many }) => ({
  blogPosts: many(blogPosts),
  suggestions: many(suggestions),
}));

// Select types (when reading from the DB)
export type User = InferSelectModel<typeof users>;
export type BlogPost = InferSelectModel<typeof blogPosts>;
export type BlogCategory = InferSelectModel<typeof blogCategories>;
export type BlogComment = InferSelectModel<typeof blogComments>;
export type BlogPostCategory = InferSelectModel<typeof blogPostCategories>;
export type Setting = InferSelectModel<typeof settings>;
export type Team = InferSelectModel<typeof team>;
export type Feature = InferSelectModel<typeof features>;
export type PricingPlan = InferSelectModel<typeof pricingPlans>;
export type Suggestion = InferSelectModel<typeof suggestions>;

// Insert types (when inserting into the DB)
export type NewUser = InferInsertModel<typeof users>;
export type NewBlogPost = InferInsertModel<typeof blogPosts>;
export type NewBlogCategory = InferInsertModel<typeof blogCategories>;
export type NewBlogComment = InferInsertModel<typeof blogComments>;
export type NewBlogPostCategory = InferInsertModel<typeof blogPostCategories>;
export type NewSetting = InferInsertModel<typeof settings>;
export type NewTeam = InferInsertModel<typeof team>;
export type NewFeature = InferInsertModel<typeof features>;
export type NewPricingPlan = InferInsertModel<typeof pricingPlans>;
export type NewSuggestion = InferInsertModel<typeof suggestions>;