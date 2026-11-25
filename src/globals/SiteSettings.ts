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
      defaultValue: 'Velora Elite',
    },
    {
      name: 'tagline',
      type: 'text',
      defaultValue: 'A Higher Standard of Clean',
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
          defaultValue: '04 579 2137',
          admin: {
            description: 'Main telephone line',
          },
        },
        {
          name: 'whatsappNumber',
          type: 'text',
          required: true,
          defaultValue: '+971 55 675 1854',
          admin: {
            description: 'Direct WhatsApp click-to-chat number (e.g. +971 55 675 1854)',
          },
        },
        {
          name: 'email',
          type: 'email',
          required: true,
          defaultValue: 'info@veloraelite.ae',
        },
        {
          name: 'supportEmail',
          type: 'email',
          defaultValue: 'info@veloraelite.ae',
        },
        {
          name: 'address',
          type: 'textarea',
          defaultValue: 'Office 4301F, Aspin Commercial Tower, 106 Sheikh Zayed Rd, Trade Center First, Dubai, UAE',
        },
        {
          name: 'workingHours',
          type: 'text',
          defaultValue: 'Monday – Saturday: 8:00 AM – 6:00 PM | Sunday: Closed / Commercial Appointments',
        },
        {
          name: 'googleMapsEmbedUrl',
          type: 'textarea',
          defaultValue: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3610.1786221193375!2d55.2721867!3d25.2157522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f428ce0a9f5c1%3A0x6b4cf99863c33dc6!2sAspin%20Commercial%20Tower!5e0!3m2!1sen!2sae!4v1700000000000!5m2!1sen!2sae',
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
        { name: 'instagram', type: 'text', defaultValue: 'https://instagram.com/veloraelite' },
        { name: 'facebook', type: 'text', defaultValue: 'https://facebook.com/veloraelite' },
        { name: 'linkedin', type: 'text', defaultValue: 'https://linkedin.com/company/veloraelite' },
        { name: 'youtube', type: 'text' },
        { name: 'tiktok', type: 'text', defaultValue: 'https://tiktok.com/@veloraelite' },
      ],
    },
  ],
}
