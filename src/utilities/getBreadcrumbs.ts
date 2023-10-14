import type { CollectionConfig } from 'payload/types'

import type { Breadcrumb, PluginConfig } from '../types'
import formatBreadcrumb from './formatBreadcrumb'
import getParents from './getParents'

const ensureDocId = (breadcrumb: Breadcrumb): Breadcrumb => ({
  ...breadcrumb,
  doc: isNaN(parseInt(breadcrumb.doc as string)) ? undefined : parseInt(breadcrumb.doc as string),
})

interface GetBreadcrumbsParams {
  req: any
  pluginConfig: PluginConfig
  collection: CollectionConfig
  data: any
  originalDoc?: any
}

const getBreadcrumbs = async ({
  req,
  pluginConfig,
  collection,
  data,
  originalDoc,
}: GetBreadcrumbsParams): Promise<Breadcrumb[]> => {
  const breadcrumbDocs = [
    ...(await getParents(req, pluginConfig, collection, {
      ...originalDoc,
      ...data,
    })),
    {
      ...originalDoc,
      ...data,
      id: originalDoc?.id,
    },
  ]

  const breadcrumbs = breadcrumbDocs
    .map((_, i) => formatBreadcrumb(pluginConfig, collection, breadcrumbDocs.slice(0, i + 1)))
    .map(ensureDocId)

  return breadcrumbs
}

export default getBreadcrumbs
