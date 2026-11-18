import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: () => true, // Publicly readable for dynamic pages
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Page title (e.g. About Us, Contact Us, Commercial Services)',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL slug (e.g. about-us, contact, gallery)',
      },
    },
    {
      name: 'heroHeading',
      type: 'text',
      admin: {
        description: 'Top hero section headline',
      },
    },
    {
      name: 'heroSubheading',
      type: 'textarea',
      admin: {
        description: 'Subheadline or supporting context',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
      admin: {
        description: 'Page body content formatted with rich text',
      },
    },
  ],
}
