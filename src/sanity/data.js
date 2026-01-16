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
  const query = `*[_type == "homePage" && title == "Act Forside"][0]{
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
      email,
      phone,
      events[]->{
        _id,
        title,
        details,
        dateTime
      }
    },
    footer{
      title,
      body
    }
  }`;

  return sanityClient.fetch(query);
}
