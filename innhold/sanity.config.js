import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './schemaTypes/index.js'

const HOME_PAGE_DOCUMENT_ID =
  process.env.SANITY_STUDIO_HOME_PAGE_ID || '5db524c7-6851-4f28-a326-b1735de0fcdb'
const AKTUELT_PAGE_DOCUMENT_ID =
  process.env.SANITY_STUDIO_AKTUELT_PAGE_ID || 'aktuelt-page'
const CALENDAR_SECTION_DOCUMENT_ID =
  process.env.SANITY_STUDIO_CALENDAR_SECTION_ID || 'calendar-section'
const singletonTypes = new Set(['homePage', 'aktueltPage', 'calendarSection'])
const singletonActions = new Set(['publish', 'discardChanges', 'restore'])

export default defineConfig({
  name: 'default',
  title: 'Act Studio',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'wpjddqhy',
  dataset: process.env.SANITY_STUDIO_DATASET || 'innhold',
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Innhold')
          .items([
            S.listItem()
              .id('singleton-home-page')
              .title('Forside')
              .child(S.document().schemaType('homePage').documentId(HOME_PAGE_DOCUMENT_ID)),
            S.listItem()
              .id('singleton-aktuelt-page')
              .title('Aktuelt')
              .child(S.document().schemaType('aktueltPage').documentId(AKTUELT_PAGE_DOCUMENT_ID)),
            S.listItem()
              .id('singleton-calendar-section')
              .title('Kalender')
              .child(
                S.document()
                  .schemaType('calendarSection')
                  .documentId(CALENDAR_SECTION_DOCUMENT_ID)
              ),
            ...S.documentTypeListItems().filter((listItem) => !singletonTypes.has(listItem.getId())),
          ]),
    }),
    visionTool(),
  ],
  document: {
    newDocumentOptions: (previousOptions) =>
      previousOptions.filter((templateItem) => !singletonTypes.has(templateItem.templateId)),
    actions: (previousActions, context) =>
      singletonTypes.has(context.schemaType)
        ? previousActions.filter(
            (actionItem) => actionItem.action && singletonActions.has(actionItem.action)
          )
        : previousActions,
  },
  schema: {
    types: schemaTypes,
  },
})
