import { client } from '@/sanity/lib/client'
import styles from './artist.module.css'
import ArtistCarousel from '@/components/ArtistCarousel'

export const revalidate = 0 // dev-friendly

async function getArtistWithWorks(slug) {
  const query = `*[_type == "artist" && slug.current == $slug][0]{
    _id,
    name,
    bio,
    artworks[]->{
      _id,
      title,
      year,
      technique,
      dimensions,
      image{
        asset->{
          url,
          metadata{ dimensions{ width, height, aspectRatio } }
        }
      }
    }
  }`
  return client.fetch(query, { slug })
}

export default async function ArtistPage({ params }) {
  const artist = await getArtistWithWorks(params.slug)

  if (!artist) {
    return (
      <main className={styles.container}>
        <p>Artist not found</p>
      </main>
    )
  }

  // Normalize slides
  const slides = (artist.artworks || [])
    .filter((a) => a?.image?.asset?.url)
    .map((a) => ({
      id: a._id,
      url: a.image.asset.url,
      w: a.image.asset.metadata?.dimensions?.width || 0,
      h: a.image.asset.metadata?.dimensions?.height || 0,
      ar: a.image.asset.metadata?.dimensions?.aspectRatio || 1,
      title: a.title || '',
      year: a.year || '',
      technique: a.technique || '',
      dims: a.dimensions || '',
    }))

  return (
    <main>
      {/* Top: blown-up carousel fills the first viewport (above footer) */}
      <ArtistCarousel slides={slides} />

      {/* Below the fold: artist info section (left aligned to page edge) */}
      <section className={styles.info}>
        <div className={styles.infoRow}>
          <h1 className={styles.name}>{artist.name}</h1>
          <a className={styles.portfolio} href="#" aria-label="Ver portafolio">
            Portafolio
          </a>
        </div>
        {artist.bio ? <p className={styles.bio}>{artist.bio}</p> : null}
      </section>

      {/* 5-up portrait cards; horizontally scrollable if more */}
      {artist.artworks?.length > 0 && (
        <section className={styles.cardsSection}>
          <div className={styles.cards}>
            {artist.artworks.map((aw) => {
              const url = aw?.image?.asset?.url
              if (!url) return null
              return (
                <a
                  href={`/artists/${params.slug}/work/${aw._id}`}
                  key={aw._id}
                  className={styles.card}
                >
                  <img
                    src={url}
                    alt={aw.title || 'Artwork'}
                    className={styles.cardImage}
                  />
                </a>
              )
            })}
          </div>
        </section>
      )}
    </main>
  )
}
