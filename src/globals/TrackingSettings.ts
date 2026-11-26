import type { GlobalConfig } from 'payload'

export const TrackingSettings: GlobalConfig = {
  slug: 'tracking-settings',
  label: 'SEO & Analytics',
  admin: {
    group: 'Configuration',
  },
  access: {
    // Only authenticated admins can manage tracking tags
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'googleAnalyticsId',
      type: 'text',
      admin: {
        description: 'Google Analytics 4 Measurement ID (format: G-XXXXXXXXXX). Can also be overridden by NEXT_PUBLIC_GA_ID in env.',
      },
    },
    {
      name: 'googleTagManagerId',
      type: 'text',
      admin: {
        description: 'Google Tag Manager Container ID (format: GTM-XXXXXXX). Can also be overridden by NEXT_PUBLIC_GTM_ID.',
      },
    },
    {
      name: 'googleSearchConsoleVerification',
      type: 'text',
      admin: {
        description: 'Google Search Console HTML tag content token or verification string.',
      },
    },
    {
      name: 'googleAdsConversionId',
      type: 'text',
      admin: {
        description: 'Google Ads Conversion ID (format: AW-XXXXXXXXXX).',
      },
    },
    {
      name: 'googleAdsBookingConversionLabel',
      type: 'text',
      admin: {
        description: 'Conversion label for completed booking requests.',
      },
    },
    {
      name: 'googleAdsQuoteConversionLabel',
      type: 'text',
      admin: {
        description: 'Conversion label for completed quote requests.',
      },
    },
    {
      name: 'metaPixelId',
      type: 'text',
      admin: {
        description: 'Meta (Facebook) Pixel ID (e.g. 1234567890123456). Can also be configured via NEXT_PUBLIC_META_PIXEL_ID.',
      },
    },
    {
      name: 'tikTokPixelId',
      type: 'text',
      admin: {
        description: 'TikTok Pixel ID (e.g. CXXXXXXXXXXXXXXX). Can also be configured via NEXT_PUBLIC_TIKTOK_PIXEL_ID.',
      },
    },
    {
      name: 'enableTracking',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Global master toggle to enable client-side tracking scripts in production.',
      },
    },
  ],
}
