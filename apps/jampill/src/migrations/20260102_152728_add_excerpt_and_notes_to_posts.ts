import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'
import path from 'path'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  try {
    await db.run(sql`ALTER TABLE \`posts\` ADD \`excerpt\` text;`)
    await db.run(sql`ALTER TABLE \`posts\` ADD \`notes\` text;`)
    await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_excerpt\` text;`)
    await db.run(sql`ALTER TABLE \`_posts_v\` ADD \`version_notes\` text;`)
  } catch (err: any) {
    if (err.message?.includes('duplicate column name')) {
      payload.logger.warn(
        `Skipping migration ${path.basename(import.meta.url)}: columns already exist`,
      )
    } else {
      throw err
    }
  }
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`excerpt\`;`)
  await db.run(sql`ALTER TABLE \`posts\` DROP COLUMN \`notes\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_excerpt\`;`)
  await db.run(sql`ALTER TABLE \`_posts_v\` DROP COLUMN \`version_notes\`;`)
}
