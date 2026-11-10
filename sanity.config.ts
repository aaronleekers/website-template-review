import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/sanity/schema';

// Build-safe placeholders only. The Studio route requires explicit configuration.
export default defineConfig({
  name: 'review', title: 'Website Review Studio', basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'sample',
  plugins: [structureTool()], schema: { types: schemaTypes },
});
