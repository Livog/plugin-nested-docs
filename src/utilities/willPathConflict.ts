const willPathConflict = async ({
  req,
  path,
  currentDocId,
  collectionsToCheck = [],
}: {
  req?: any
  path: string
  currentDocId: string
  collectionsToCheck: string[]
}): Promise<Boolean> => {
  if (!req) return false
  const { payload, locale } = req
  if (!payload || collectionsToCheck.length === 0) return false // Just make it pass the check.

  const foundDocs = await Promise.all(
    // This is for Mongo DB support. This takes ~140ms where union & selct drizzle query takes ~40ms, but it's not a big deal.
    collectionsToCheck?.map(collectionItem => {
      return payload.find({
        req,
        collection: collectionItem,
        where: {
          path: {
            equals: path,
          },
          id: {
            not_equals: currentDocId,
          },
        },
        locale,
        depth: 0,
      })
    }),
  ).then(results => results.reduce((acc, { docs }) => acc.concat(docs), [] as unknown[]))

  return foundDocs.length === 0 ? false : true
}

export default willPathConflict
