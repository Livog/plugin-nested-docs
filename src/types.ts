import type { ArrayField, CollectionConfig, Field, RelationshipField } from 'payload/types'

export interface Breadcrumb {
  url?: string
  label: string
  doc: string | number | undefined
}

export type GenerateURL = (
  docs: Array<Record<string, unknown>>,
  currentDoc: Record<string, unknown>,
  collection: CollectionConfig,
) => string

export type GenerateLabel = (
  docs: Array<Record<string, unknown>>,
  currentDoc: Record<string, unknown>,
) => string

export interface PluginConfig {
  collections: string[]
  generateURL?: GenerateURL
  generateLabel?: GenerateLabel
  parentFieldSlug?: string
  breadcrumbsFieldSlug?: string
  pathFieldSlug?: string
  overrides?: {
    pathField?: Partial<Field>
    breadcrumbsField?: Partial<ArrayField>
    parentField?: Partial<RelationshipField>
  }
}
