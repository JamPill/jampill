import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`post_categories\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text NOT NULL,
  	\`slug\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`post_categories_slug_idx\` ON \`post_categories\` (\`slug\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`post_categories_updated_at_idx\` ON \`post_categories\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`post_categories_created_at_idx\` ON \`post_categories\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`posts\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`slug\` text,
  	\`published_at\` text,
  	\`featured_image_id\` integer,
  	\`content\` text,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`_status\` text DEFAULT 'draft',
  	FOREIGN KEY (\`featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE UNIQUE INDEX IF NOT EXISTS \`posts_slug_idx\` ON \`posts\` (\`slug\`);`)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_featured_image_idx\` ON \`posts\` (\`featured_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_updated_at_idx\` ON \`posts\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_created_at_idx\` ON \`posts\` (\`created_at\`);`,
  )
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`posts__status_idx\` ON \`posts\` (\`_status\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`posts_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`post_categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`post_categories_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_rels_order_idx\` ON \`posts_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_rels_parent_idx\` ON \`posts_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_rels_path_idx\` ON \`posts_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_rels_users_id_idx\` ON \`posts_rels\` (\`users_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_rels_post_categories_id_idx\` ON \`posts_rels\` (\`post_categories_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_posts_v\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`parent_id\` integer,
  	\`version_title\` text,
  	\`version_slug\` text,
  	\`version_published_at\` text,
  	\`version_featured_image_id\` integer,
  	\`version_content\` text,
  	\`version_updated_at\` text,
  	\`version_created_at\` text,
  	\`version__status\` text DEFAULT 'draft',
  	\`created_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`updated_at\` text DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')) NOT NULL,
  	\`latest\` integer,
  	\`autosave\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`version_featured_image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_parent_idx\` ON \`_posts_v\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version_slug_idx\` ON \`_posts_v\` (\`version_slug\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version_featured_image_idx\` ON \`_posts_v\` (\`version_featured_image_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version_updated_at_idx\` ON \`_posts_v\` (\`version_updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version_created_at_idx\` ON \`_posts_v\` (\`version_created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_version_version__status_idx\` ON \`_posts_v\` (\`version__status\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_created_at_idx\` ON \`_posts_v\` (\`created_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_updated_at_idx\` ON \`_posts_v\` (\`updated_at\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_latest_idx\` ON \`_posts_v\` (\`latest\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_autosave_idx\` ON \`_posts_v\` (\`autosave\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_posts_v_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`post_categories_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`post_categories_id\`) REFERENCES \`post_categories\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_rels_order_idx\` ON \`_posts_v_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_rels_parent_idx\` ON \`_posts_v_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_rels_path_idx\` ON \`_posts_v_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_rels_users_id_idx\` ON \`_posts_v_rels\` (\`users_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_rels_post_categories_id_idx\` ON \`_posts_v_rels\` (\`post_categories_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`payload_kv\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`key\` text NOT NULL,
  	\`data\` text NOT NULL
  );
  `)
  await db.run(
    sql`CREATE UNIQUE INDEX IF NOT EXISTS \`payload_kv_key_idx\` ON \`payload_kv\` (\`key\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`header_nav_items\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`link_type\` text DEFAULT 'reference',
  	\`link_label\` text NOT NULL,
  	\`link_url\` text,
  	\`link_new_tab\` integer,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`header_nav_items_order_idx\` ON \`header_nav_items\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`header_nav_items_parent_id_idx\` ON \`header_nav_items\` (\`_parent_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`header\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`logo_id\` integer NOT NULL,
  	\`updated_at\` text,
  	\`created_at\` text,
  	FOREIGN KEY (\`logo_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null
  );
  `)
  await db.run(sql`CREATE INDEX IF NOT EXISTS \`header_logo_idx\` ON \`header\` (\`logo_id\`);`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`header_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`posts_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`header\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`posts_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`header_rels_order_idx\` ON \`header_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`header_rels_parent_idx\` ON \`header_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`header_rels_path_idx\` ON \`header_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`header_rels_posts_id_idx\` ON \`header_rels\` (\`posts_id\`);`,
  )
  // await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`post_categories_id\` integer REFERENCES post_categories(id);`)
  // await db.run(sql`ALTER TABLE \`payload_locked_documents_rels\` ADD \`posts_id\` integer REFERENCES posts(id);`)
  // await db.run(sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_post_categories_id_idx\` ON \`payload_locked_documents_rels\` (\`post_categories_id\`);`)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_posts_id_idx\` ON \`payload_locked_documents_rels\` (\`posts_id\`);`,
  )
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`post_categories\`;`)
  await db.run(sql`DROP TABLE \`posts\`;`)
  await db.run(sql`DROP TABLE \`posts_rels\`;`)
  await db.run(sql`DROP TABLE \`_posts_v\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_rels\`;`)
  await db.run(sql`DROP TABLE \`payload_kv\`;`)
  await db.run(sql`DROP TABLE \`header_nav_items\`;`)
  await db.run(sql`DROP TABLE \`header\`;`)
  await db.run(sql`DROP TABLE \`header_rels\`;`)
  await db.run(sql`PRAGMA foreign_keys=OFF;`)
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`__new_payload_locked_documents_rels\` (
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`order\` integer,
  	\`parent_id\` integer NOT NULL,
  	\`path\` text NOT NULL,
  	\`users_id\` integer,
  	\`media_id\` integer,
  	FOREIGN KEY (\`parent_id\`) REFERENCES \`payload_locked_documents\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`users_id\`) REFERENCES \`users\`(\`id\`) ON UPDATE no action ON DELETE cascade,
  	FOREIGN KEY (\`media_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`INSERT INTO \`__new_payload_locked_documents_rels\`("id", "order", "parent_id", "path", "users_id", "media_id") SELECT "id", "order", "parent_id", "path", "users_id", "media_id" FROM \`payload_locked_documents_rels\`;`,
  )
  await db.run(sql`DROP TABLE \`payload_locked_documents_rels\`;`)
  await db.run(
    sql`ALTER TABLE \`__new_payload_locked_documents_rels\` RENAME TO \`payload_locked_documents_rels\`;`,
  )
  await db.run(sql`PRAGMA foreign_keys=ON;`)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_order_idx\` ON \`payload_locked_documents_rels\` (\`order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_parent_idx\` ON \`payload_locked_documents_rels\` (\`parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_path_idx\` ON \`payload_locked_documents_rels\` (\`path\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_users_id_idx\` ON \`payload_locked_documents_rels\` (\`users_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`payload_locked_documents_rels_media_id_idx\` ON \`payload_locked_documents_rels\` (\`media_id\`);`,
  )
}
