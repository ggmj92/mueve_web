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
                <a
                  href="https://maps.app.goo.gl/g22oW8UUtikFqpVe7"
                  target="_blank"
                  rel="noreferrer"
                >
                  Gral Borgoño 123, Miraflores
                  <br />
                  Lima, Perú
                </a>
              </p>
            </div>
            <div>
              <p>
                <a
                  href="mailto:info@mueve.com.pe?subject=Consulta desde Mueve Web&body=Hola,%0D%0A%0D%0AMe gustaría saber más sobre..."
                  target="_blank"
                  rel="noreferrer"
                >
                  info@mueve.com.pe
                </a>
                <br />
                <a
                  href="https://wa.me/51987654321?text=Hola,%20estoy%20interesado%20en..."
                  target="_blank"
                  rel="noreferrer"
                >
                  +51 987 654 321
                </a>
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
