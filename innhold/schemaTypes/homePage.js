import { defineField, defineType } from 'sanity'

const normalizeText = (value) =>
  String(value || '')
    .replace(/\s+/g, ' ')
    .trim()

const validateTextLimit = (value, maxWords, maxChars) => {
  const normalized = normalizeText(value)
  if (!normalized) return true

  const words = normalized.split(' ').filter(Boolean)
  if (words.length > maxWords) {
    return `Maks ${maxWords} ord.`
  }
  if (normalized.length > maxChars) {
    return `Maks ${maxChars} tegn.`
  }
  return true
}

const createCalendarPlaceholderEntries = () =>
  Array.from({ length: 5 }, (_, index) => {
    const baseDate = new Date()
    baseDate.setHours(18, 0, 0, 0)

    const placeholderDate = new Date(baseDate)
    placeholderDate.setDate(baseDate.getDate() + (index + 1) * 7)

    return {
      _key: `placeholder-${index + 1}`,
      title: `Plassholder ${index + 1}`,
      cardDetails: 'Kort tekst til kortvisning.',
      details: 'Oppdater med riktig tekst.',
      dateTime: placeholderDate.toISOString(),
    }
  })

const createOmOssPlaceholderPeople = () => [
  {
    _key: 'bjorn-placeholder',
    name: 'Bjørn',
    bio: 'Kort plassholdertekst om Bjørn. Oppdater med bio i Studio.',
    email: 'bjorn@placeholder.no',
    phone: '+47 400 00 001',
  },
  {
    _key: 'grettir-placeholder',
    name: 'Grettir',
    bio: 'Kort plassholdertekst om Grettir. Oppdater med bio i Studio.',
    email: 'grettir@placeholder.no',
    phone: '+47 400 00 002',
  },
]

export const header = defineType({
  name: 'header',
  title: 'Header',
  type: 'object',
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Topp-tittel',
      type: 'string',
    }),
    defineField({
      name: 'heroLead',
      title: 'Topp-intro',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroLeadSecondary',
      title: 'Topp-brødtekst',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroImage',
      title: 'Topp-bilde',
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

export const aktueltPage = defineType({
  name: 'aktueltPage',
  title: 'Aktuelt',
  type: 'document',
  initialValue: {
    body: '',
    hide: false,
    hideButton: false,
    buttonHref: '/aktuelt',
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Intern tittel',
      type: 'string',
      initialValue: 'Aktuelt',
      description: 'Kun brukt i Studio.',
    }),
    defineField({
      name: 'body',
      title: 'Tekst',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'hide',
      title: 'Skjul',
      type: 'boolean',
      initialValue: false,
      description: 'Skjul Aktuelt-seksjonen på nettsiden.',
    }),
    defineField({
      name: 'hideButton',
      title: 'Skjul knapp',
      type: 'boolean',
      initialValue: false,
      description: 'Skjul "Les mer"-knappen.',
    }),
    defineField({
      name: 'buttonHref',
      title: 'Lenke til knapp',
      type: 'string',
      initialValue: '/aktuelt',
      description: 'Bruk intern sti som /aktuelt eller full URL.',
    }),
  ],
})

export const omOssPerson = defineType({
  name: 'omOssPerson',
  title: 'Personkort',
  type: 'object',
  fields: [
    defineField({
      name: 'name',
      title: 'Navn',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Kort tekst',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'email',
      title: 'E-post',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Bilde',
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
  ],
})

export const omOssPage = defineType({
  name: 'omOssPage',
  title: 'Om oss',
  type: 'document',
  initialValue: {
    title: 'Om oss',
    heading: 'Om oss',
    body: 'Kort plassholdertekst om ACT. Oppdater teksten i Studio.',
    people: createOmOssPlaceholderPeople(),
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Intern tittel',
      type: 'string',
      description: 'Kun brukt i Studio.',
    }),
    defineField({
      name: 'heading',
      title: 'Overskrift (H1)',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Ingress',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'introImage',
      title: 'Toppbilde',
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
      name: 'people',
      title: 'Personkort',
      type: 'array',
      of: [{ type: 'omOssPerson' }],
      options: {
        sortable: true,
      },
    }),
  ],
})

export const kontaktPage = defineType({
  name: 'kontaktPage',
  title: 'Kontakt',
  type: 'document',
  initialValue: {
    title: 'Kontakt',
    heading: 'Kontakt',
    body: 'Ta kontakt med oss for workshops, privattimer eller samarbeid.',
    email: 'hei@actstudio.no',
    phone: '+47 400 00 000',
    address: 'Eksempelgata 1, 0000 Oslo',
    openingHours: 'Man-fre 09:00-16:00',
    formTitle: 'Send melding',
    formBody: 'Bruk skjemaet under, så tar vi kontakt.',
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Intern tittel',
      type: 'string',
      description: 'Kun brukt i Studio.',
    }),
    defineField({
      name: 'heading',
      title: 'Overskrift (H1)',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Ingress',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'introImage',
      title: 'Toppbilde',
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
      name: 'email',
      title: 'E-post',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'string',
    }),
    defineField({
      name: 'openingHours',
      title: 'Åpningstider',
      type: 'string',
    }),
    defineField({
      name: 'mapLink',
      title: 'Kartlenke',
      type: 'url',
    }),
    defineField({
      name: 'formTitle',
      title: 'Skjema-tittel',
      type: 'string',
    }),
    defineField({
      name: 'formBody',
      title: 'Skjema-tekst',
      type: 'text',
      rows: 3,
    }),
  ],
})

export const sectionKalender = defineType({
  name: 'sectionKalender',
  title: 'Kalender',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Tittel', type: 'string' }),
    defineField({
      name: 'body',
      title: 'Tekst',
      type: 'text',
      rows: 4,
      description: 'Arrangementer hentes fra singleton-dokumentet "Kalender".',
    }),
  ],
})

export const calendarEntry = defineType({
  name: 'calendarEntry',
  title: 'Kalenderoppføring',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
    }),
    defineField({
      name: 'cardImage',
      title: 'Bilde (kort)',
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
      name: 'cardDetails',
      title: 'Detaljer (i kort)',
      type: 'text',
      rows: 3,
      validation: (Rule) =>
        Rule.custom((value) => validateTextLimit(value, 20, 140)),
    }),
    defineField({
      name: 'details',
      title: 'Detaljer (les mer)',
      type: 'text',
      rows: 4,
      validation: (Rule) =>
        Rule.required().custom((value) => validateTextLimit(value, 48, 340)),
    }),
    defineField({
      name: 'dateTime',
      title: 'Dato og tidspunkt',
      type: 'datetime',
      options: {
        dateFormat: 'DD.MM.YYYY',
        timeFormat: 'HH:mm',
        timeStep: 15,
        displayTimeZone: 'Europe/Oslo',
        allowTimeZoneSwitch: false,
      },
    }),
    defineField({
      name: 'signupLink',
      title: 'Lenke til skjema',
      type: 'url',
    }),
    defineField({
      name: 'hideSignupButton',
      title: 'Skjul meld interesse-knapp',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'fewSpots',
      title: 'Få plasser',
      type: 'boolean',
      initialValue: false,
    }),
  ],
})

export const calendarSection = defineType({
  name: 'calendarSection',
  title: 'Kalender (singleton)',
  type: 'document',
  initialValue: {
    title: 'Kalender',
    body: 'Workshops og kurs som er planlagt.',
    entries: createCalendarPlaceholderEntries(),
  },
  fields: [
    defineField({
      name: 'title',
      title: 'Tittel',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Tekst',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'entries',
      title: 'Arrangementer',
      type: 'array',
      of: [{ type: 'calendarEntry' }],
      options: {
        sortable: true,
      },
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
