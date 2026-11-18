import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Company & Contact Info',
  access: {
    read: () => true, // Publicly readable for contact cards and footer
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      required: true,
      defaultValue: 'Velora Facilities',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'Premium Cleaning & Maintenance Services UAE',
    },
    {
      name: 'tradeLicense',
      type: 'text',
      admin: {
        description: 'UAE Commercial License Number (optional)',
      },
    },
    {
      name: 'contactInfo',
      type: 'group',
      label: 'Contact Information',
      fields: [
        {
          name: 'phonePrimary',
          type: 'text',
          required: true,
          defaultValue: '+971 4 000 0000',
          admin: {
            description: 'Main telephone line',
          },
        },
        {
          name: 'whatsappNumber',
          type: 'text',
          required: true,
          defaultValue: '+971 50 000 0000',
          admin: {
            description: 'Direct WhatsApp click-to-chat number (e.g. 971500000000)',
          },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          defaultValue: 'info@velorafacilities.ae',
        },
        {
          name: 'supportEmail',
          type: 'email',
          defaultValue: 'support@velorafacilities.ae',
        },
        {
          name: 'address',
          type: 'textarea',
          defaultValue: 'Office Suite, Business Bay, Dubai, United Arab Emirates',
        },
        {
          name: 'workingHours',
          type: 'text',
          defaultValue: 'Monday – Saturday: 8:00 AM – 8:00 PM | Sunday: On-Call Emergency',
        },
        {
          name: 'googleMapsEmbedUrl',
          type: 'textarea',
          admin: {
            description: 'Google Maps iframe embed URL for Contact page',
          },
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media Profiles',
      fields: [
        { name: 'instagram', type: 'text' },
        { name: 'facebook', type: 'text' },
        { name: 'linkedin', type: 'text' },
        { name: 'youtube', type: 'text' },
        { name: 'tiktok', type: 'text' },
      ],
    },
  ],
}
