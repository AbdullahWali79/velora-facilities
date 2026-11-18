import type { GlobalConfig } from 'payload'

export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage & Banners',
  access: {
    read: () => true, // Publicly readable for homepage rendering
  },
  fields: [
    {
      name: 'heroBanners',
      type: 'array',
      label: 'Hero Banners & Slides',
      minRows: 1,
      fields: [
        {
          name: 'badge',
          type: 'text',
          defaultValue: 'Premier Cleaning & Facility Management in the UAE',
        },
        {
          name: 'headline',
          type: 'text',
          required: true,
          defaultValue: 'Excellence in Every Detail for UAE Homes & Businesses',
        },
        {
          name: 'subheadline',
          type: 'textarea',
          required: true,
          defaultValue: 'Delivering European-standard cleaning, disinfection, and MEP technical maintenance for luxury villas, penthouses, and commercial facilities across Dubai and Abu Dhabi.',
        },
        {
          name: 'backgroundImage',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'primaryCtaText',
          type: 'text',
          defaultValue: 'Book a Service',
        },
        {
          name: 'primaryCtaUrl',
          type: 'text',
          defaultValue: '/book',
        },
        {
          name: 'secondaryCtaText',
          type: 'text',
          defaultValue: 'Request a Quote',
        },
        {
          name: 'secondaryCtaUrl',
          type: 'text',
          defaultValue: '/quote',
        },
      ],
    },
    {
      name: 'trustBadges',
      type: 'array',
      label: 'Trust & Credibility Highlights',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'subtitle',
          type: 'text',
        },
      ],
    },
    {
      name: 'stats',
      type: 'array',
      label: 'Key Statistics',
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
        },
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'ctaBanner',
      type: 'group',
      label: 'Bottom Call-to-Action Banner',
      fields: [
        {
          name: 'heading',
          type: 'text',
          defaultValue: 'Ready for an Uncompromising Standard of Cleanliness?',
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Connect with our team for a bespoke maintenance plan or immediate booking confirmation.',
        },
        {
          name: 'buttonText',
          type: 'text',
          defaultValue: 'Schedule Your Appointment',
        },
        {
          name: 'buttonUrl',
          type: 'text',
          defaultValue: '/book',
        },
      ],
    },
  ],
}
