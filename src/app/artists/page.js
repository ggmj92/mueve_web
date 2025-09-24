import { client } from '@/sanity/lib/client'
import styles from './artists.module.css'

async function getArtists() {
  const query = `*[_type == "artist" && defined(slug.current)] | order(name asc){
    _id, name, "slug": slug.current
  }`
  return client.fetch(query)
}

export const revalidate = 0

export default async function ArtistsPage() {
  const artists = await getArtists()
  return (
    <div className={`${styles.container} alignSecondCol`}>
      <ul className={styles.list}>
        {artists.map((a) => (
          <li key={a.slug ?? a._id}>
            <a href={`/artists/${a.slug}`}>{a.name}</a>
          </li>
        ))}
      </ul>
    </div>
  )
}
