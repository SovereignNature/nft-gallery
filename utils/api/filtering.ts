import Axios from 'axios'

export async function getCollectionIds(): Promise<string[]> {
  const res = await Axios.get('https://api.sovereignnature.ch/api/collections')

  const collections = res.data.data
  const collectionIds: string[] = []

  collections.forEach((e: any) => collectionIds.push(e.attributes.collectionId))

  return collectionIds
}
