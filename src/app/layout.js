import './globals.css'
import styles from './layout.module.css'
import { Work_Sans } from 'next/font/google'
import Header from '@/components/Header'
import RouteTheme from '@/components/RouteTheme'

const workSans = Work_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'], // thin, normal, medium
  display: 'swap',
})

export const metadata = {
  title: 'Mueve Gallery',
  description: 'Contemporary art gallery in Lima, Perú',
}

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${styles.body} ${workSans.className}`}>
        <RouteTheme />
        <Header />
        <main className={styles.main}>{children}</main>
        <footer className={styles.footer}>
          <div className={styles.footerInner}>
            <div>
              <p>
                Gral Borgoño 123, Miraflores
                <br />
                Lima, Perú
              </p>
            </div>
            <div>
              <p>
                info@mueve.com.pe
                <br />
                +51 987 654 321
              </p>
            </div>
            <div>
              <a
                href="https://instagram.com/muevegallery"
                target="_blank"
                rel="noreferrer"
              >
                INSTAGRAM
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
