import type { GlobalConfig } from 'payload'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer Content',
  admin: {
    group: 'Website CMS',
  },
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
      defaultValue: 'Velora Elite Technical Services L.L.C. delivers European-standard residential and commercial cleaning, deep sanitization, and technical facility services across Dubai and the UAE. Committed to precision, vetted professionals, and a higher standard of clean.',
    },
    {
      name: 'copyright',
      type: 'text',
      defaultValue: '© 2026 Velora Elite Technical Services L.L.C. All rights reserved. Registered & Licensed in Dubai, United Arab Emirates.',
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
