import type { CollectionConfig } from 'payload/types'

import type { PluginConfig } from '../types'
import getBreadcrumbs from './getBreadcrumbs'

interface SetBreadcrumbsParams {
  req?: any
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
  const breadcrumbs = await getBreadcrumbs({
    req,
    pluginConfig,
    collection,
    data,
    originalDoc,
  })

  return {
    ...newData,
    [pluginConfig?.breadcrumbsFieldSlug || 'breadcrumbs']: breadcrumbs,
  }
}

export default setBreadcrumbs
