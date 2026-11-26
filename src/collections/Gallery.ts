import type { CollectionConfig } from 'payload'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'service', 'location', 'isFeatured', 'createdAt'],
    group: 'Website CMS',
  },
  access: {
    read: () => true, // Publicly readable for gallery page
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Project title (e.g., Luxury Penthouse Deep Cleaning, Palm Jumeirah)',
      },
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        description: 'Related service category',
      },
    },
    {
      name: 'beforeImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Photo taken before service execution',
      },
    },
    {
      name: 'afterImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Photo taken after service completion',
      },
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'Location or Emirate (e.g. Dubai Marina, Downtown Dubai, Yas Island)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Short summary of the scope of work and transformation',
      },
    },
    {
      name: 'completionDate',
      type: 'date',
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Show on homepage transformation showcase',
      },
    },
  ],
}
