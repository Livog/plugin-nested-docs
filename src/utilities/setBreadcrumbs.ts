import type { CollectionConfig, PayloadRequest } from 'payload/types'

import type { PluginConfig } from '../types'
import formatBreadcrumb from './formatBreadcrumb'
import getParents from './getParents'

interface SetBreadcrumbsParams {
  req?: PayloadRequest
  pluginConfig: PluginConfig
  collection: CollectionConfig
  data: any
  originalDoc?: any
}

const setBreadcrumbs = async ({
  req,
  pluginConfig,
  collection,
  data,
  originalDoc,
}: SetBreadcrumbsParams): Promise<any> => {
  if (!req) return data
  const newData = data
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

  const breadcrumbs = breadcrumbDocs.map((_, i) =>
    formatBreadcrumb(pluginConfig, collection, breadcrumbDocs.slice(0, i + 1)),
  ) // eslint-disable-line function-paren-newline

  return {
    ...newData,
    [pluginConfig?.breadcrumbsFieldSlug || 'breadcrumbs']: breadcrumbs,
  }
}

export default setBreadcrumbs