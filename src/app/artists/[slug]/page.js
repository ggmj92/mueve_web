import { client } from "@/sanity/lib/client"
import styles from "./artist.module.css"

export const revalidate = 0

async function getArtist(slug) {
    const query = `*[_type == "artist" && slug.current == $slug][0]{
    name,
    bio,
    "portraitUrl": portrait.asset->url,
    artworks[]->{
      title,
      year,
      technique,
      dimensions,
      "imageUrl": image.asset->url
    }
  }`
    return client.fetch(query, { slug })
}

export default async function ArtistPage({ params }) {
    const artist = await getArtist(params.slug)
    if (!artist) return <p style={{ padding: 'calc(70px + 2rem) 2rem' }}>Artist not found</p>

    return (
        <main className={`${styles.container} alignSecondCol`}>
            <h1 className={styles.name}>{artist.name}</h1>

            <section className={styles.profile}>
                {artist.portraitUrl && (
                    <img src={artist.portraitUrl} alt={artist.name} className={styles.portrait} />
                )}
                <p className={styles.bio}>{artist.bio}</p>
            </section>

            {artist.artworks?.length > 0 && (
                <section className={styles.artworks}>
                    {artist.artworks.map((art) => (
                        <div key={`${art.title}-${art.year}`} className={styles.artwork}>
                            {art.imageUrl && (
                                <img src={art.imageUrl} alt={art.title} className={styles.artImage} />
                            )}
                            <p className={styles.artInfo}>
                                <strong>{art.title}</strong>, {art.year} <br />
                                {art.technique} <br />
                                {art.dimensions}
                            </p>
                        </div>
                    ))}
                </section>
            )}
        </main>
    )
}
