import { sanityClient } from './client';

// Assumes your Sanity schema uses `page` and `siteSettings` document types.
// Adjust the _type names and fields to match your studio.

export function getPageBySlug(slug) {
  const query = `*[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug
  }`;

  return sanityClient.fetch(query, { slug });
}

export function getAllPages() {
  const query = `*[_type == "page"]{
    _id,
    title,
    slug
  }`;

  return sanityClient.fetch(query);
}

export function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0]{
    _id,
    title,
    description
  }`;

  return sanityClient.fetch(query);
}

export function getHomePage() {
  const homePageId =
    import.meta.env.VITE_SANITY_HOME_PAGE_ID ||
    '5db524c7-6851-4f28-a326-b1735de0fcdb'
  const query = `*[_type == "homePage" && _id == $homePageId][0]{
    _id,
    title,
    header{
      heroTitle,
      heroLead,
      heroLeadSecondary,
      heroImage{
        alt,
        asset->{
          url
        }
      },
      ctaPrimaryLabel,
      ctaPrimaryHref,
      ctaSecondaryLabel,
      ctaSecondaryHref
    },
    sections[]{
      _key,
      _type,
      title,
      body,
      hide,
      email,
      phone
    },
    footer{
      title,
      body
    }
  }`;

  return sanityClient.fetch(query, { homePageId });
}

export function getAktueltPage() {
  const aktueltPageId = import.meta.env.VITE_SANITY_AKTUELT_PAGE_ID || 'aktuelt-page'
  const query = `*[_type == "aktueltPage" && _id == $aktueltPageId][0]{
    _id,
    title,
    body,
    hide,
    hideButton
  }`

  return sanityClient.fetch(query, { aktueltPageId })
}

export function getCalendarSection() {
  const calendarSectionId =
    import.meta.env.VITE_SANITY_CALENDAR_SECTION_ID || 'calendar-section'
  const query = `*[_type == "calendarSection" && _id == $calendarSectionId][0]{
    _id,
    title,
    body,
    entries[]{
      _key,
      title,
      cardImage{
        alt,
        asset->{
          url
        }
      },
      cardDetails,
      details,
      dateTime,
      signupLink
    }
  }`

  return sanityClient.fetch(query, { calendarSectionId })
}
