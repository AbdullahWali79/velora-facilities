import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'category', 'isFeatured', 'order'],
    group: 'Website CMS',
  },
  access: {
    read: () => true, // Publicly readable for service pages
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Service title (e.g., Deep Cleaning, AC Duct Cleaning, Villa Maintenance)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL-friendly identifier (e.g. deep-cleaning, ac-duct-cleaning)',
      },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Cleaning Services', value: 'cleaning' },
        { label: 'Maintenance & Technical Services', value: 'maintenance' },
        { label: 'Specialized Commercial Services', value: 'commercial' },
      ],
      defaultValue: 'cleaning',
    },
    {
      name: 'tagline',
      type: 'text',
      admin: {
        description: 'Short promotional hook (e.g., Hospital-grade sanitation for luxury villas)',
      },
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Brief overview displayed in service cards and search snippets',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Icon or vector graphic representing this service',
      },
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Comprehensive service overview, process details, and specifications',
      },
    },
    {
      name: 'features',
      type: 'array',
      labels: {
        singular: 'Feature / Benefit',
        plural: 'Features & Benefits',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'startingPrice',
          type: 'number',
          admin: {
            description: 'Starting price in AED (optional, for transparent pricing)',
          },
        },
        {
          name: 'priceUnit',
          type: 'select',
          options: [
            { label: 'Per Hour', value: 'hourly' },
            { label: 'Per Visit / Session', value: 'per_session' },
            { label: 'Per Sq. Ft.', value: 'per_sqft' },
            { label: 'Custom Quote Only', value: 'custom_quote' },
          ],
          defaultValue: 'custom_quote',
        },
      ],
    },
    {
      name: 'faqs',
      type: 'array',
      labels: {
        singular: 'FAQ',
        plural: 'Frequently Asked Questions',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order sorting priority (lowest number first)',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Highlight this service on the homepage',
      },
    },
  ],
}
