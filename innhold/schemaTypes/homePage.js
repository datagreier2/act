import { defineField, defineType } from 'sanity'

export const workshop = defineType({
  name: 'workshop',
  title: 'Workshop',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'date', title: 'Date', type: 'string' }),
    defineField({ name: 'time', title: 'Time', type: 'string' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Short description for accessibility.',
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'bullets',
      title: 'Bullet points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})

export const privateSession = defineType({
  name: 'privateSession',
  title: 'Privattime',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Short description for accessibility.',
        }),
      ],
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'points',
      title: 'Key points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
})

export const priceItem = defineType({
  name: 'priceItem',
  title: 'Price item',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'body', title: 'Body', type: 'text', rows: 3 }),
    defineField({ name: 'price', title: 'Price', type: 'string' }),
  ],
})

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
      title: 'Date & time',
      type: 'datetime',
    }),
  ],
})

export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal title',
      type: 'string',
      description: 'Only used inside Sanity Studio.',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
    }),
    defineField({
      name: 'heroLead',
      title: 'Hero lead',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroLeadSecondary',
      title: 'Hero secondary lead',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          description: 'Short description for accessibility.',
        }),
      ],
    }),
    defineField({
      name: 'ctaPrimaryLabel',
      title: 'Primary CTA label',
      type: 'string',
    }),
    defineField({
      name: 'ctaPrimaryHref',
      title: 'Primary CTA link',
      type: 'string',
      description: 'Use anchors like #workshops or full URLs.',
    }),
    defineField({
      name: 'ctaSecondaryLabel',
      title: 'Secondary CTA label',
      type: 'string',
    }),
    defineField({
      name: 'ctaSecondaryHref',
      title: 'Secondary CTA link',
      type: 'string',
      description: 'Use anchors like #interesse or full URLs.',
    }),
    defineField({
      name: 'workshopsTitle',
      title: 'Workshops title',
      type: 'string',
    }),
    defineField({
      name: 'workshopsLead',
      title: 'Workshops intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'workshopsNote',
      title: 'Workshops note',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'workshops',
      title: 'Workshops',
      type: 'array',
      of: [{ type: 'workshop' }],
    }),
    defineField({
      name: 'privateSessionsTitle',
      title: 'Privattimer title',
      type: 'string',
    }),
    defineField({
      name: 'privateSessionsLead',
      title: 'Privattimer intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'privateSessions',
      title: 'Privattimer',
      type: 'array',
      of: [{ type: 'privateSession' }],
    }),
    defineField({
      name: 'pricesTitle',
      title: 'Prices title',
      type: 'string',
    }),
    defineField({
      name: 'pricesLead',
      title: 'Prices intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'prices',
      title: 'Prices',
      type: 'array',
      of: [{ type: 'priceItem' }],
    }),
    defineField({
      name: 'contactTitle',
      title: 'Contact title',
      type: 'string',
    }),
    defineField({
      name: 'contactLead',
      title: 'Contact intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'contactFormTitle',
      title: 'Contact form title',
      type: 'string',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact email',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Contact phone',
      type: 'string',
    }),
  ],
})
