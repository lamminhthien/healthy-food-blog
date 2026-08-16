import type { Metadata } from 'next';
import '../public/css/style.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://nhabepcualyn.com'),
  title: 'Nhà bếp của Lyn — Ăn ngon, sống khỏe',
  description: 'Những công thức healthy, meal prep và góc sống khỏe cho một nhịp ăn uống tự nhiên hơn.',
  icons: { icon: '/assets/images/logo-lyn-kitchen.svg' },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    title: 'Nhà bếp của Lyn — Ăn ngon, sống khỏe',
    description: 'Những công thức healthy, meal prep và góc sống khỏe cho một nhịp ăn uống tự nhiên hơn.',
    siteName: 'Nhà bếp của Lyn',
    images: [
      {
        url: '/assets/images/articles/healthy-breakfast-editorial.jpeg',
        width: 1200,
        height: 630,
        alt: 'Bữa sáng healthy',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nhà bếp của Lyn — Ăn ngon, sống khỏe',
    description: 'Những công thức healthy, meal prep và góc sống khỏe cho một nhịp ăn uống tự nhiên hơn.',
    images: ['/assets/images/articles/healthy-breakfast-editorial.jpeg'],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
