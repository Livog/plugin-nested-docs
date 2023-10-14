import deepMerge from 'deepmerge'
import type { Field } from 'payload/dist/fields/config/types'

const createPathField = (overrides?: Partial<Field>): Field => {
  const defaultField: Partial<Field> = {
    type: 'text',
    name: 'path',
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      readOnly: true,
    },
  }

  return deepMerge(defaultField, overrides || {})
}

export default createPathField
