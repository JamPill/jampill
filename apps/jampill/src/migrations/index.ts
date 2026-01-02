import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260102_004631_initial_schema from './20260102_004631_initial_schema';
import * as migration_20260102_133348_add_seo_fields from './20260102_133348_add_seo_fields';
import * as migration_20260102_152728_add_excerpt_and_notes_to_posts from './20260102_152728_add_excerpt_and_notes_to_posts';
import * as migration_20260102_161348_add_pages_collection_and_blocks from './20260102_161348_add_pages_collection_and_blocks';
import * as migration_20260102_195633_refactor_blocks_and_posts from './20260102_195633_refactor_blocks_and_posts';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260102_004631_initial_schema.up,
    down: migration_20260102_004631_initial_schema.down,
    name: '20260102_004631_initial_schema',
  },
  {
    up: migration_20260102_133348_add_seo_fields.up,
    down: migration_20260102_133348_add_seo_fields.down,
    name: '20260102_133348_add_seo_fields',
  },
  {
    up: migration_20260102_152728_add_excerpt_and_notes_to_posts.up,
    down: migration_20260102_152728_add_excerpt_and_notes_to_posts.down,
    name: '20260102_152728_add_excerpt_and_notes_to_posts',
  },
  {
    up: migration_20260102_161348_add_pages_collection_and_blocks.up,
    down: migration_20260102_161348_add_pages_collection_and_blocks.down,
    name: '20260102_161348_add_pages_collection_and_blocks',
  },
  {
    up: migration_20260102_195633_refactor_blocks_and_posts.up,
    down: migration_20260102_195633_refactor_blocks_and_posts.down,
    name: '20260102_195633_refactor_blocks_and_posts'
  },
];
