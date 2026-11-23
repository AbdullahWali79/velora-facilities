import type { CollectionConfig } from 'payload'

export const ContactMessages: CollectionConfig = {
  slug: 'contact-messages',
  labels: {
    singular: 'Contact Inquiry',
    plural: 'Contact Inquiries',
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'phone', 'subject', 'status', 'createdAt'],
    group: 'Leads & Inquiries',
    description: 'General customer inquiries and corporate messages from the Contact Us form.',
  },
  access: {
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      admin: {
        description: 'Sender full name',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        description: 'Sender phone or WhatsApp number',
      },
    },
    {
      name: 'subject',
      type: 'text',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'unread',
      options: [
        { label: 'New (Unread)', value: 'unread' },
        { label: 'Contacted / In Progress', value: 'followed_up' },
        { label: 'Closed / Resolved', value: 'resolved' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Customer care follow-up status',
      },
    },
  ],
}
