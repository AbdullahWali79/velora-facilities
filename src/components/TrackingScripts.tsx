'use client'

import Script from 'next/script'

interface TrackingSettingsProps {
  settings: {
    googleAnalyticsId?: string | null
    googleTagManagerId?: string | null
    googleAdsConversionId?: string | null
    metaPixelId?: string | null
    tikTokPixelId?: string | null
    enableTracking?: boolean | null
  }
}

function isValidTrackingId(id?: string | null): boolean {
  if (!id) return false
  const trimmed = id.trim()
  if (trimmed.length < 5) return false
  if (/^G-X+$/i.test(trimmed)) return false
  if (/^GTM-X+$/i.test(trimmed)) return false
  if (/^AW-X+$/i.test(trimmed)) return false
  if (/^123456789/i.test(trimmed)) return false
  if (/placeholder/i.test(trimmed)) return false
  return true
}

export function TrackingScripts({ settings }: TrackingSettingsProps) {
  const isGtmValid = isValidTrackingId(settings.googleTagManagerId)
  const isGaValid = isValidTrackingId(settings.googleAnalyticsId)
  const isMetaValid = isValidTrackingId(settings.metaPixelId)
  const isTikTokValid = isValidTrackingId(settings.tikTokPixelId)

  return (
    <>
      {/* Fallback Client-side DataLayer & Stubs */}
      <script
        id="tracking-stubs"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            if (!window.gtag) {
              window.gtag = function(){window.dataLayer.push(arguments);};
            }
          `,
        }}
      />

      {/* Google Tag Manager (GTM) */}
      {isGtmValid && (
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
      {isGaValid && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-script" strategy="afterInteractive">
            {`
              gtag('js', new Date());
              gtag('config', '${settings.googleAnalyticsId}', {
                page_path: window.location.pathname,
              });
              ${isValidTrackingId(settings.googleAdsConversionId) ? `gtag('config', '${settings.googleAdsConversionId}');` : ''}
            `}
          </Script>
        </>
      )}

      {/* Meta (Facebook) Pixel */}
      {isMetaValid && (
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

      {/* TikTok Pixel */}
      {isTikTokValid && (
        <Script id="tiktok-pixel-script" strategy="afterInteractive">
          {`
            !function (w, d, t) {
              w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};var a=document.createElement("script");a.type="text/javascript",a.async=!0,a.src=r+"?sdkid="+e+"&lib="+t;var c=document.getElementsByTagName("script")[0];c.parentNode.insertBefore(a,c)};
              ttq.load('${settings.tikTokPixelId}');
              ttq.page();
            }(window, document, 'ttq');
          `}
        </Script>
      )}
    </>
  )
}
