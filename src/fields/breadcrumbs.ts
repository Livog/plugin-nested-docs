import deepMerge from 'deepmerge'
import type { ArrayField } from 'payload/dist/fields/config/types'
import type { Field } from 'payload/types'

const createBreadcrumbsField = (relationTo: string, overrides: Partial<ArrayField> = {}): Field => {
  const defaultField: Partial<ArrayField> = {
    name: 'breadcrumbs',
    type: 'array',
    localized: true,
    fields: [
      {
        name: 'doc',
        type: 'relationship',
        relationTo,
        maxDepth: 0,
        admin: {
          disabled: true,
        },
      },
      {
        type: 'row',
        fields: [
          {
            name: 'url',
            label: 'URL',
            type: 'text',
            admin: {
              width: '50%',
            },
          },
          {
            name: 'label',
            type: 'text',
            admin: {
              width: '50%',
            },
          },
        ],
      },
    ],
    admin: {
      readOnly: true,
    },
  }

  return deepMerge(defaultField, overrides)
}

export default createBreadcrumbsField
