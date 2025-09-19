import { client } from "@/sanity/lib/client"
import styles from "./about.module.css"

async function getAbout() {
    const query = `*[_type == "about"][0]{
    spanish,
    english
  }`
    return await client.fetch(query)
}

export default async function AboutPage() {
    const about = await getAbout()

    if (!about) return <p>No content found</p>

    return (
        <main className={`${styles.container} alignSecondCol`}>
            <div className={styles.title}>( m)</div>

            <section className={styles.section}>
                <p>{about.spanish}</p>
            </section>

            <section className={`${styles.section} ${styles.english}`}>
                <p>{about.english}</p>
            </section>
        </main>
    )
}