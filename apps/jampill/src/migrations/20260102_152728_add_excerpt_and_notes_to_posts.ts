import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts\` ADD \`excerpt\` text;`)
  await db.run(sql`ALTER TABLE \`posts\` ADD \`notes\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_excerpt\` text;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_notes\` text;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`excerpt\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`notes\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_excerpt\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_notes\`;`)
}
