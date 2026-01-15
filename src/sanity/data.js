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
  const query = `*[_type == "homePage"][0]{
    _id,
    title,
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
    ,
    workshopsTitle,
    workshopsLead,
    workshopsNote,
    workshops[]{
      _key,
      title,
      date,
      time,
      location,
      description,
      bullets,
      image{
        alt,
        asset->{
          url
        }
      },
      "meta": [date, time, location]
    },
    privateSessionsTitle,
    privateSessionsLead,
    privateSessions[]{
      _key,
      title,
      summary,
      points,
      image{
        alt,
        asset->{
          url
        }
      }
    },
    pricesTitle,
    pricesLead,
    prices[]{
      _key,
      title,
      body,
      price
    },
    contactTitle,
    contactLead,
    contactFormTitle,
    contactEmail,
    contactPhone
  }`;

  return sanityClient.fetch(query);
}
