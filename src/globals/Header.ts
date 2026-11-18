import type { GlobalConfig } from 'payload'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Header & Navigation',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Brand logo image for header navbar',
      },
    },
    {
      name: 'navItems',
      type: 'array',
      label: 'Main Navigation Menu',
      defaultValue: [
        { label: 'Home', url: '/' },
        { label: 'About Us', url: '/about' },
        { label: 'Services', url: '/services' },
        { label: 'Gallery', url: '/gallery' },
        { label: 'Request a Quote', url: '/quote' },
        { label: 'Book Online', url: '/book' },
        { label: 'Contact Us', url: '/contact' },
      ],
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
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'ctaButton',
      type: 'group',
      label: 'Call to Action Button',
      fields: [
        {
          name: 'text',
          type: 'text',
          defaultValue: 'Book Now',
        },
        {
          name: 'url',
          type: 'text',
          defaultValue: '/book',
        },
      ],
    },
  ],
}
