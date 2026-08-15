import type { Metadata } from 'next';
import '../public/css/style.css';

export const metadata: Metadata = {
  title: 'Nhà bếp của Lyn — Ăn ngon, sống khỏe',
  description: 'Những công thức healthy, meal prep và góc sống khỏe cho một nhịp ăn uống tự nhiên hơn.',
  icons: { icon: '/assets/images/logo-lyn-kitchen.svg' },
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
