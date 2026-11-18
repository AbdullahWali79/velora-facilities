import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    useAsTitle: 'clientName',
    defaultColumns: ['clientName', 'rating', 'location', 'isFeatured', 'createdAt'],
  },
  access: {
    read: () => true, // Publicly readable for reviews section
  },
  fields: [
    {
      name: 'clientName',
      type: 'text',
      required: true,
      admin: {
        description: 'Customer or representative name',
      },
    },
    {
      name: 'clientRole',
      type: 'text',
      admin: {
        description: 'Client title or relationship (e.g. Villa Owner, Property Manager, Resident)',
      },
    },
    {
      name: 'company',
      type: 'text',
      admin: {
        description: 'Company name (for B2B commercial facility management clients)',
      },
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'Emirate or Community (e.g., Emirates Hills, Dubai / Al Reem Island, Abu Dhabi)',
      },
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      defaultValue: 5,
      admin: {
        description: 'Star rating (1 to 5 stars)',
      },
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Client review or testimonial text',
      },
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        description: 'Service utilized by the client (optional)',
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Client photo or profile picture (optional)',
      },
    },
    {
      name: 'isVerified',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Verified UAE customer badge',
      },
    },
    {
      name: 'isFeatured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Display in featured testimonials carousel on the homepage',
      },
    },
  ],
}
