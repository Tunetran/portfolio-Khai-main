import './globals.css';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GalaxyBackground from '@/components/GalaxyBackground';
import { ThemeProvider } from '@/components/ThemeProvider';

export const metadata: Metadata = {
  title: 'Trần Văn Khải - Cybersecurity & Network Security Portfolio',
  description: 'Portfolio chuyên nghiệp của Trần Văn Khải - Sinh viên ngành An Ninh Mạng tại Đại học Ngoại ngữ - Tin học TP.HCM. Chuyên về Cybersecurity, Network Security, Penetration Testing và Information Security.',
  keywords: [
    'Trần Văn Khải',
    'network security',
    'cybersecurity', 
    'penetration testing',
    'ethical hacking',
    'information security',
    'portfolio',
    'web developer',
    'IT student',
    'HCMUFLIT',
    'an ninh mạng',
    'bảo mật mạng',
    'CEH'
  ].join(', '),
  authors: [{ name: 'Trần Văn Khải', url: 'https://tranvankhai.dev' }],
  creator: 'Trần Văn Khải',
  publisher: 'Trần Văn Khải',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: 'https://tranvankhai.dev',
    title: 'Trần Văn Khải - Cybersecurity & Network Security Portfolio',
    description: 'Portfolio chuyên nghiệp về Cybersecurity và Network Security. Sinh viên ngành An Ninh Mạng với đam mê tìm hiểu và thực hành bảo mật.',
    siteName: 'Trần Văn Khải Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Trần Văn Khải - Cybersecurity Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Trần Văn Khải - Cybersecurity Portfolio',
    description: 'Portfolio chuyên nghiệp về Cybersecurity và Network Security',
    creator: '@tranvankhai',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://tranvankhai.dev',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#0070f3" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-inter">
        <ThemeProvider
          defaultTheme="dark"
          storageKey="portfolio-theme"
        >
          <GalaxyBackground />
          <div className="content-overlay">
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}