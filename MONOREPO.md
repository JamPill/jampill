# Monorepo Architecture & Development Rules

This project uses a Monorepo structure managed by **Turborepo** and **pnpm Workspaces**.

## Directory Structure

```text
/
├── apps/
│   └── jampill/             # Next.js + Payload app (Client Instance)
├── packages/
│   ├── schema/              # Shared Payload Collections and Globals
│   ├── ui/                  # Shared React Components and CSS
│   └── config/              # Shared TS, ESLint, and Tailwind configs
├── turbo.json               # Turborepo configuration
├── pnpm-workspace.yaml      # pnpm workspace definition
└── package.json             # Root scripts and workspace settings
```

## Shared Packages Strategy

To maximize code reuse and maintain consistency across multiple sites, follow these rules:

### 1. @repo/schema
- **Content**: All Payload `CollectionConfig` and `GlobalConfig` definitions.
- **Rule**: Never define a collection schema inside an app folder if it might be reused.
- **Usage**: Export from `packages/schema/index.ts` and import in `payload.config.ts`.

### 2. @repo/ui
- **Content**: Shared React components (Server and Client), CSS files, and design tokens.
- **Rule**: Components should be generic enough to accept data via props.
- **Usage**: Import in app components (e.g., `import { NavbarClient } from '@repo/ui'`).

### 3. @repo/config
- **Content**: Base configurations for TypeScript, ESLint, etc.
- **Rule**: Apps should extend these base configs to ensure uniformity.

## Development Workflow

### Starting the Environment
- **Run all apps**: `pnpm dev` (runs all applications in the `apps/` directory).
- **Run a specific app**: `pnpm dev --filter <app-name>` (e.g., `pnpm dev --filter jampill`).

### Managing Dependencies
- To add a shared package to an app:
  ```bash
  cd apps/your-app
  pnpm add @repo/ui --workspace
  ```

### Adding a New Site (Client)
1. Copy an existing app folder (e.g., `apps/jampill`).
2. Update `package.json`: change `"name": "new-client-name"`.
3. Update `wrangler.jsonc`: change `name` and `database_id` for Cloudflare D1 isolation.
4. Update `.env`: set a unique `PAYLOAD_SECRET`.
5. Run `pnpm install` from the root.

## TypeScript and Type Generation
- Payload types are generated per app because schemas can diverge.
- Run `pnpm generate:types` from the root to update types for all apps in the workspace.

## Deployment (Cloudflare)
- Each app in `apps/` is a standalone Cloudflare Worker/Page.
- **Cloudflare Pages Configuration**:
  - **Build command**: `pnpm run build --filter <app-name>`
  - **Deploy command**: `pnpm run deploy --filter <app-name>` (ensure this runs `wrangler deploy` inside the app folder)
  - **Root directory**: `/` (Leave as root to allow Turbo to access workspace packages)

### Troubleshooting Deployment
- **Infinite Build Loop**: Ensure `build` script in `apps/<app>/package.json` runs `next build` BEFORE `opennextjs-cloudflare build` and uses the `--skipBuild` flag for the latter.
- **Missing Database Tables (500 Error)**: Deploying the code DOES NOT update the database schema. You must run migrations manually (see Database Management).

## Database Management (Cloudflare D1)
Payload with D1 adapter requires manual migration management.

### Workflow for Schema Changes
1. **Modify Schema**: Edit collections in `@repo/schema` or the app's `payload.config.ts`.
2. **Generate Migration** (Locally):
   ```bash
   cd apps/<app-name>
   pnpm run payload migrate:create <descriptive_name>
   ```
   *Note: Ensure packages like `@repo/schema` have `"type": "module"` in `package.json` to avoid import errors.*
3. **Apply Migration** (Remote D1):
   ```bash
   cd apps/<app-name>
   pnpm run deploy:database
   ```
   *This connects to the remote D1 database via Wrangler proxy and applies the changes.*

## Troubleshooting & Tips
- **ESM Modules**: All shared packages in `packages/` should be configured as ESM (`"type": "module"`) to be correctly resolved by Payload CLI tools.
- **OpenNext**: Requires `output: 'standalone'` in `next.config.ts`.

## SEO & Privacy Management
We use a centralized approach to handle SEO and search engine indexing across all apps.

### 1. Centralized SEO Logic (@repo/schema)
Instead of configuring the SEO plugin in each app, we use a "factory" in `packages/schema/src/plugins/seo.ts`.
- **Usage**: Import `createSeoPlugin` in your `payload.config.ts`.
- **Convention**: Collections using this plugin should include an `excerpt` (textarea) field. The plugin is configured to automatically use `excerpt` as a fallback for the Meta Description if the SEO tab is left empty.

### 2. Standardized Metadata (@repo/ui)
- **`generateMeta`**: A shared utility to map Payload SEO fields to Next.js `Metadata` objects.
- **`seoDefaults`**: Standard profiles (`NO_INDEX_METADATA`, `BLOCK_ALL_ROBOTS`, `ALLOW_ALL_ROBOTS`) for blocking or allowing crawlers.

### 3. Blocking/Unblocking Apps (Privacy)
By default, every new app should start as "private" (no indexing).
- **To Block (Development/Staging)**:
  - In `layout.tsx`: Spread `...NO_INDEX_METADATA` into the `metadata` object.
  - In `robots.ts`: Return `BLOCK_ALL_ROBOTS`.
- **To Unblock (Production)**:
  - In `layout.tsx`: Remove `NO_INDEX_METADATA` and use `generateMeta` for dynamic pages.
  - In `robots.ts`: Return `ALLOW_ALL_ROBOTS`.

## Shared Schema Conventions
To maintain a professional and consistent Admin UI across all apps, follow these patterns in `packages/schema`:

### 1. Internal-Only Fields
Fields intended for internal use (like author notes, draft reminders, or audit logs) should:
- Use `name: 'notes'` or similar.
- Be placed in the sidebar: `admin: { position: 'sidebar' }`.
- **Security**: Remember that Payload's Access Control should be configured to prevent these fields from being exposed via the public API if they contain sensitive info.

### 2. Slugs and Titles
- Always use `useAsTitle: 'title'` in the collection config.
- Implement auto-generated slugs using a `beforeValidate` hook based on the `title` field.
- Place the `slug` field in the sidebar to keep the main content area focused on the text.