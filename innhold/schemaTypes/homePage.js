import { defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'details',
      title: 'Details',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'dateTime',
      title: 'Dato og tidspunkt',
      type: 'datetime',
    }),
  ],
})

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'object',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero-tittel',
      type: 'string',
    }),
    defineField({
      name: 'heroLead',
      title: 'Hero-intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroLeadSecondary',
      title: 'Hero-tillegg',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero-bilde',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt-tekst',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'ctaPrimaryLabel',
      title: 'Primær CTA-tekst',
      type: 'string',
    }),
    defineField({
      name: 'ctaPrimaryHref',
      title: 'Primær CTA-lenke',
      type: 'string',
      description: 'Bruk anker som #kalender eller full URL.',
    }),
    defineField({
      name: 'ctaSecondaryLabel',
      title: 'Sekundær CTA-tekst',
      type: 'string',
    }),
    defineField({
      name: 'ctaSecondaryHref',
      title: 'Sekundær CTA-lenke',
      type: 'string',
      description: 'Bruk anker som #kontakt eller full URL.',
    }),
  ],
})

export const footer = defineType({
  name: 'footer',
  title: 'Footer',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Footer-tittel',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Footer-tekst',
      type: 'text',
      rows: 3,
    }),
  ],
})

export const sectionAktuelt = defineType({
  name: 'sectionAktuelt',
  title: 'Aktuelt',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Tittel', type: 'string' }),
    defineField({ name: 'body', title: 'Tekst', type: 'text', rows: 4 }),
  ],
})

export const sectionKalender = defineType({
  name: 'sectionKalender',
  title: 'Kalender',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Tittel', type: 'string' }),
    defineField({
      name: 'events',
      title: 'Arrangementer',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'event' }] }],
    }),
  ],
})

export const sectionAnnet = defineType({
  name: 'sectionAnnet',
  title: 'Annet',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Tittel', type: 'string' }),
    defineField({ name: 'body', title: 'Tekst', type: 'text', rows: 4 }),
  ],
})

export const sectionKjope = defineType({
  name: 'sectionKjope',
  title: 'Kjøpe',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Tittel', type: 'string' }),
    defineField({ name: 'body', title: 'Tekst', type: 'text', rows: 4 }),
  ],
})

export const sectionKontakt = defineType({
  name: 'sectionKontakt',
  title: 'Kontakt',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Tittel', type: 'string' }),
    defineField({ name: 'body', title: 'Tekst', type: 'text', rows: 4 }),
    defineField({ name: 'email', title: 'E-post', type: 'string' }),
    defineField({ name: 'phone', title: 'Telefon', type: 'string' }),
  ],
})

export const sectionOmOss = defineType({
  name: 'sectionOmOss',
  title: 'Om oss',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Tittel', type: 'string' }),
    defineField({ name: 'body', title: 'Tekst', type: 'text', rows: 4 }),
  ],
})

export const homePage = defineType({
  name: 'homePage',
  title: 'Forside',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Intern tittel',
      type: 'string',
      description: 'Kun brukt i Studio.',
    }),
    defineField({
      name: 'header',
      title: 'Header',
      type: 'header',
    }),
    defineField({
      name: 'sections',
      title: 'Innhold (flyttbart)',
      description: 'Legg til seksjoner og dra for å endre rekkefølge.',
      type: 'array',
      options: {
        sortable: true,
      },
      of: [
        { type: 'sectionAktuelt' },
        { type: 'sectionKalender' },
        { type: 'sectionAnnet' },
        { type: 'sectionKjope' },
        { type: 'sectionKontakt' },
        { type: 'sectionOmOss' },
      ],
    }),
    defineField({
      name: 'footer',
      title: 'Footer',
      type: 'footer',
    }),
  ],
})
