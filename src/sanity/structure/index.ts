import type { StructureResolver } from 'sanity/structure';

import {
  SINGLETON_IDS,
  SINGLETON_SCHEMA_TYPES,
  type SingletonDocumentType,
} from '@/sanity/constants/singletons';

function singletonListItem(
  S: Parameters<StructureResolver>[0],
  type: SingletonDocumentType,
  title: string,
) {
  const schemaType = SINGLETON_SCHEMA_TYPES[type];
  const documentId = SINGLETON_IDS[type];

  return S.listItem()
    .title(title)
    .child(S.document().schemaType(schemaType).documentId(documentId).title(title));
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Portfolio')
    .items([
      S.listItem()
        .title('Projects')
        .child(
          S.list()
            .title('Projects')
            .items([
              S.listItem()
                .title('All Projects')
                .child(
                  S.documentTypeList('project')
                    .title('All Projects')
                    .defaultOrdering([
                      { field: 'order', direction: 'asc' },
                      { field: 'year', direction: 'desc' },
                    ]),
                ),
              S.listItem()
                .title('Featured Projects')
                .child(
                  S.documentList()
                    .title('Featured Projects')
                    .filter('_type == "project" && featured == true')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),
              S.listItem()
                .title('Published')
                .child(
                  S.documentList()
                    .title('Published')
                    .filter('_type == "project" && status == "published"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),
              S.listItem()
                .title('Draft / In Progress')
                .child(
                  S.documentList()
                    .title('Draft / In Progress')
                    .filter('_type == "project" && status in ["draft", "ready"]')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }]),
                ),
              S.listItem()
                .title('Archived')
                .child(
                  S.documentList()
                    .title('Archived')
                    .filter('_type == "project" && status == "archived"')
                    .defaultOrdering([{ field: 'year', direction: 'desc' }]),
                ),
            ]),
        ),
      S.listItem()
        .title('Tools')
        .child(
          S.documentTypeList('tool')
            .title('Tools')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]),
        ),
      S.listItem()
        .title('Capabilities')
        .child(
          S.documentTypeList('capability')
            .title('Capabilities')
            .defaultOrdering([{ field: 'order', direction: 'asc' }]),
        ),
      singletonListItem(S, 'about', 'About'),
      singletonListItem(S, 'contactAvailability', 'Contact & Availability'),
      singletonListItem(S, 'siteSettings', 'Site Settings'),
    ]);
