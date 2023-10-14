import type { BeforeValidateHook } from 'payload/dist/collections/config/types'

const setPathFromBreadcrumbs: BeforeValidateHook = async args => {
  const { data } = args
  if (!data || !Array.isArray(data.breadcrumbs)) return undefined
  const path = data.breadcrumbs.at(-1)?.url
  return {
    ...data,
    path: path,
  }
}

export default setPathFromBreadcrumbs
