import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260102_004631_initial_schema from './20260102_004631_initial_schema';
import * as migration_20260102_133348_add_seo_fields from './20260102_133348_add_seo_fields';

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
    name: '20260102_133348_add_seo_fields'
  },
];
