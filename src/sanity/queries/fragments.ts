const imageAssetFields = `
  asset->{
    _id,
    url,
    metadata {
      dimensions,
      lqip
    }
  }
`;

export const localizedProjection = `
  en,
  ar
`;

export const projectSummaryProjection = `
  _id,
  title { ${localizedProjection} },
  "slug": slug.current,
  client,
  year,
  role { ${localizedProjection} },
  categories,
  shortDescription { ${localizedProjection} },
  cover { ${imageAssetFields} },
  coverAlt { ${localizedProjection} },
  cardSize,
  accentColor,
  featured,
  order,
  status
`;

export const projectDetailProjection = `
  _id,
  title { ${localizedProjection} },
  "slug": slug.current,
  client,
  year,
  role { ${localizedProjection} },
  categories,
  services,
  shortDescription { ${localizedProjection} },
  cover { ${imageAssetFields} },
  coverAlt { ${localizedProjection} },
  cardSize,
  accentColor,
  featured,
  order,
  caseStudyBlocks[]{
    ...,
    image { ${imageAssetFields} },
    leftImage { ${imageAssetFields} },
    rightImage { ${imageAssetFields} },
    beforeImage { ${imageAssetFields} },
    afterImage { ${imageAssetFields} },
    poster { ${imageAssetFields} },
    images[]{
      ...,
      image { ${imageAssetFields} }
    },
    file {
      asset->{
        url
      }
    }
  },
  credits[]{
    role { ${localizedProjection} },
    name,
    url
  },
  results[]{
    label { ${localizedProjection} },
    value,
    context { ${localizedProjection} }
  },
  seoTitle { ${localizedProjection} },
  seoDescription { ${localizedProjection} },
  ogImage { ${imageAssetFields} },
  status
`;

export const siteSettingsProjection = `
  siteTitle,
  professionalTitle { ${localizedProjection} },
  heroStatement { ${localizedProjection} },
  eyebrow { ${localizedProjection} },
  defaultLocale,
  defaultTheme,
  email,
  linkedin,
  seo {
    title { ${localizedProjection} },
    description { ${localizedProjection} },
    ogImage { ${imageAssetFields} }
  },
  socialImage { ${imageAssetFields} }
`;

export const aboutProjection = `
  shortBio { ${localizedProjection} },
  location { ${localizedProjection} },
  availability { ${localizedProjection} },
  portrait { ${imageAssetFields} },
  portraitAlt { ${localizedProjection} },
  cv {
    asset->{
      url
    }
  }
`;

export const contactProjection = `
  heading { ${localizedProjection} },
  body { ${localizedProjection} },
  email,
  linkedin,
  location { ${localizedProjection} },
  availabilityStatus,
  availabilityLabel { ${localizedProjection} },
  roleCtaLabel { ${localizedProjection} },
  projectCtaLabel { ${localizedProjection} },
  visible
`;

export const capabilityProjection = `
  _id,
  title { ${localizedProjection} },
  description { ${localizedProjection} },
  items { ${localizedProjection} },
  order,
  visible
`;

export const toolProjection = `
  _id,
  name,
  category,
  description { ${localizedProjection} },
  proficiency,
  icon,
  url,
  order,
  visible
`;

export const publishedStatusFilter = `status == "published"`;

export const homepageProjectsQuery = `*[_type == "project" && ${publishedStatusFilter}] | order(order asc, year desc, title.en asc) {
  ${projectSummaryProjection}
}`;

export const featuredProjectsQuery = `*[_type == "project" && ${publishedStatusFilter} && featured == true] | order(order asc) {
  ${projectSummaryProjection}
}`;

export const projectSlugsQuery = `*[_type == "project" && ${publishedStatusFilter}]{
  "slug": slug.current
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug && ${publishedStatusFilter}][0]{
  ${projectDetailProjection}
}`;

export const previewProjectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  ${projectDetailProjection}
}`;

export const publishedProjectsQuery = `*[_type == "project" && ${publishedStatusFilter}] | order(order asc, year desc, title.en asc) {
  ${projectDetailProjection}
}`;

export const sitemapProjectsQuery = `*[_type == "project" && ${publishedStatusFilter}]{
  "slug": slug.current,
  _updatedAt
}`;

export const siteSettingsQuery = `*[_type == "siteSettings" && _id == $id][0]{
  ${siteSettingsProjection}
}`;

export const aboutQuery = `*[_type == "about" && _id == $id][0]{
  ${aboutProjection}
}`;

export const contactQuery = `*[_type == "contactAvailability" && _id == $id][0]{
  ${contactProjection}
}`;

export const capabilitiesQuery = `*[_type == "capability" && visible == true] | order(order asc) {
  ${capabilityProjection}
}`;

export const toolsQuery = `*[_type == "tool" && visible == true] | order(order asc) {
  ${toolProjection}
}`;
