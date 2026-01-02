import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`posts_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`image_id\` integer,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_blocks_hero_order_idx\` ON \`posts_blocks_hero\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_blocks_hero_parent_id_idx\` ON \`posts_blocks_hero\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_blocks_hero_path_idx\` ON \`posts_blocks_hero\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_blocks_hero_image_idx\` ON \`posts_blocks_hero\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`posts_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` text PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`posts\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_blocks_content_order_idx\` ON \`posts_blocks_content\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_blocks_content_parent_id_idx\` ON \`posts_blocks_content\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`posts_blocks_content_path_idx\` ON \`posts_blocks_content\` (\`_path\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_posts_v_blocks_hero\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`title\` text,
  	\`subtitle\` text,
  	\`image_id\` integer,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`image_id\`) REFERENCES \`media\`(\`id\`) ON UPDATE no action ON DELETE set null,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_blocks_hero_order_idx\` ON \`_posts_v_blocks_hero\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_blocks_hero_parent_id_idx\` ON \`_posts_v_blocks_hero\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_blocks_hero_path_idx\` ON \`_posts_v_blocks_hero\` (\`_path\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_blocks_hero_image_idx\` ON \`_posts_v_blocks_hero\` (\`image_id\`);`,
  )
  await db.run(sql`CREATE TABLE IF NOT EXISTS \`_posts_v_blocks_content\` (
  	\`_order\` integer NOT NULL,
  	\`_parent_id\` integer NOT NULL,
  	\`_path\` text NOT NULL,
  	\`id\` integer PRIMARY KEY NOT NULL,
  	\`rich_text\` text,
  	\`_uuid\` text,
  	\`block_name\` text,
  	FOREIGN KEY (\`_parent_id\`) REFERENCES \`_posts_v\`(\`id\`) ON UPDATE no action ON DELETE cascade
  );
  `)
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_blocks_content_order_idx\` ON \`_posts_v_blocks_content\` (\`_order\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_blocks_content_parent_id_idx\` ON \`_posts_v_blocks_content\` (\`_parent_id\`);`,
  )
  await db.run(
    sql`CREATE INDEX IF NOT EXISTS \`_posts_v_blocks_content_path_idx\` ON \`_posts_v_blocks_content\` (\`_path\`);`,
  )

  // Safely migrate existing content from posts to blocks
  await db.run(sql`
    INSERT INTO posts_blocks_content (_order, _parent_id, _path, id, rich_text, block_name)
    SELECT 
      1, 
      id, 
      'blocks', 
      lower(hex(randomblob(16))), 
      content, 
      'content' 
    FROM posts 
    WHERE content IS NOT NULL;
  `)

  // Safely migrate existing versions content
  await db.run(sql`
    INSERT INTO _posts_v_blocks_content (_order, _parent_id, _path, rich_text, _uuid, block_name)
    SELECT 
      1, 
      id, 
      'blocks', 
      version_content, 
      lower(hex(randomblob(16))), 
      'content' 
    FROM _posts_v 
    WHERE version_content IS NOT NULL;
  `)

  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`content\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_content\`;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP TABLE \`posts_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`posts_blocks_content\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_hero\`;`)
  await db.run(sql`DROP TABLE \`_posts_v_blocks_content\`;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`content\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_content\` text;`)
}
