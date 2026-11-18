import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer Content',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'aboutSummary',
      type: 'textarea',
      defaultValue: 'Velora Facilities is a premier UAE cleaning and maintenance provider delivering reliable, high-specification residential and commercial solutions.',
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2026 Velora Facilities LLC. All rights reserved. Registered in the United Arab Emirates.',
    },
    {
      name: 'columns',
      type: 'array',
      label: 'Footer Link Columns',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          type: 'array',
          fields: [
            {
              name: 'label',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
  ],
}
