import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './schemaTypes/index.js'

export default defineConfig({
  name: 'default',
  title: 'Act Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'wpjddqhy',
  dataset: process.env.SANITY_STUDIO_DATASET || 'innhold',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
