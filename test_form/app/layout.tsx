"use client";

import '@/styles/mixins.scss'
import '@/styles/globals.scss'
import '@/styles/shared.scss'
import Script from 'next/script'
import { useEffect } from 'react'
import { ReduxProvider } from '@/store/provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // IF TOUCHPAD DEVICE'S HEIGHT CHANGES - CHANGE BASE 100VH HEIGHT
  const appHeight = (): void => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  };

  // ON WINDOW RESIZE
  const onResize = (): void => {
    appHeight();
  };

  useEffect(() => {
    // ADD WINDOW EVENT LISTENER
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);


  return (
    <html lang="en">
      <body className='page'>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
      <Script defer={false} src='/SmoothScroll.min.js' />
      <Script defer={false} src='/librariesInit.js' />
      <link rel="icon" href="/favicon.png" />
      <meta name="description" content="Form to send data" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="" />
      <meta property="og:title" content="Form" />
      <meta property="og:description" content="
" />
    </html>
  )
}
