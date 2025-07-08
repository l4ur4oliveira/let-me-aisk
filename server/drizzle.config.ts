import { defineConfig } from 'drizzle-kit';
import { env } from './infra/env.ts';

export default defineConfig({
  dialect: 'postgresql',
  casing: 'snake_case',
  schema: './infra/db/schema/**.ts',
  out: './infra/db/migrations',
  dbCredentials: {
    url: env.DATABASE_URL,
  }
})
