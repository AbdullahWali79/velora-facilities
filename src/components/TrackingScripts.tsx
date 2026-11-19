'use client'

import Script from 'next/script'

interface TrackingSettingsProps {
  settings: {
    googleAnalyticsId?: string | null
    googleTagManagerId?: string | null
    googleAdsConversionId?: string | null
    metaPixelId?: string | null
    enableTracking?: boolean | null
  }
}

export function TrackingScripts({ settings }: TrackingSettingsProps) {
  // If tracking is disabled globally and no IDs are set, do not render tracking scripts
  if (!settings.enableTracking && !settings.googleAnalyticsId && !settings.googleTagManagerId && !settings.metaPixelId) {
    return null
  }

  return (
    <>
      {/* Google Tag Manager (GTM) */}
      {settings.googleTagManagerId && (
        <>
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${settings.googleTagManagerId}');
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${settings.googleTagManagerId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {/* Google Analytics 4 (GA4) */}
      {settings.googleAnalyticsId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-script" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${settings.googleAnalyticsId}', {
                page_path: window.location.pathname,
              });
              ${settings.googleAdsConversionId ? `gtag('config', '${settings.googleAdsConversionId}');` : ''}
            `}
          </Script>
        </>
      )}

      {/* Meta (Facebook) Pixel */}
      {settings.metaPixelId && (
        <Script id="meta-pixel-script" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${settings.metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  )
}
