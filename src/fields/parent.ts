import deepMerge from 'deepmerge'
import type { RelationshipField } from 'payload/dist/fields/config/types'

const createParentField = (
  relationTo: string,
  overrides?: Partial<RelationshipField>,
): RelationshipField => {
  const defaultField: Partial<RelationshipField> = {
    name: 'parent',
    relationTo,
    type: 'relationship',
    maxDepth: 1,
    filterOptions: ({ id }) => ({
      id: { not_equals: id },
      'breadcrumbs.doc': { not_in: [id] },
    }),
    admin: {
      position: 'sidebar',
    },
  }

  return deepMerge(defaultField, overrides || {})
}

export default createParentField
