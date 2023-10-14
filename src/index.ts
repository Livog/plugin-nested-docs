import type { Config } from 'payload/config'

import createBreadcrumbsField from './fields/breadcrumbs'
import createParentField from './fields/parent'
import createPathField from './fields/path'
import resaveChildren from './hooks/resaveChildren'
import resaveSelfAfterCreate from './hooks/resaveSelfAfterCreate'
import type { PluginConfig } from './types'
import setBreadcrumbs from './utilities/setBreadcrumbs'
import setPathFromBreadcrumbs from './utilities/setPathFromBreadcrumbs'

const nestedDocs =
  (pluginConfig: PluginConfig) =>
  (config: Config): Config => ({
    ...config,
    collections: (config.collections || []).map(collection => {
      if (pluginConfig.collections.indexOf(collection.slug) > -1) {
        const fields = [...(collection?.fields || [])]

        if (!pluginConfig.parentFieldSlug) {
          fields.push(createParentField(collection.slug, pluginConfig.overrides?.parentField))
        }

        if (!pluginConfig.breadcrumbsFieldSlug) {
          fields.push(
            createBreadcrumbsField(collection.slug, pluginConfig.overrides?.breadcrumbsField || {}),
          )
        }

        if (!pluginConfig.pathFieldSlug) {
          fields.push(createPathField(pluginConfig.overrides?.pathField || {}))
        }

        return {
          ...collection,
          hooks: {
            ...(collection.hooks || {}),
            beforeValidate: [
              async ({ req, data, originalDoc }) =>
                setBreadcrumbs({
                  req,
                  pluginConfig,
                  collection,
                  data,
                  originalDoc,
                }),
              setPathFromBreadcrumbs,
              ...(collection?.hooks?.beforeValidate || []),
            ],
            afterChange: [
              resaveChildren(pluginConfig, collection),
              resaveSelfAfterCreate(collection),
              ...(collection?.hooks?.afterChange || []),
            ],
          },
          fields,
        }
      }

      return collection
    }),
  })

export default nestedDocs
