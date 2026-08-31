'use client';

import { defineConfig } from 'sanity';
import { presentationTool } from 'sanity/presentation';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';

import { presentationConfig } from './presentation';
import { schemaTypes } from './schemas';
import { structure } from './structure';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

export default defineConfig({
  name: 'creative-portfolio',
  title: 'Creative Portfolio Studio',
  projectId: projectId ?? 'placeholder',
  dataset,
  basePath: '/studio',
  plugins: [
    presentationTool({ ...presentationConfig, title: 'Preview' }),
    structureTool({ structure }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
