import type { CollectionConfig } from 'payload'

export const QuoteRequests: CollectionConfig = {
  slug: 'quote-requests',
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'phone', 'propertyType', 'emirate', 'status', 'createdAt'],
  },
  access: {
    // Only authenticated admin/staff can read submitted quotes
    read: ({ req: { user } }) => Boolean(user),
    // Public can create/submit a quote request
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      admin: {
        description: 'UAE phone or WhatsApp number (+971...)',
      },
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      admin: {
        description: 'Selected primary service',
      },
    },
    {
      name: 'propertyType',
      type: 'select',
      required: true,
      options: [
        { label: 'Apartment / Flat', value: 'apartment' },
        { label: 'Villa / Townhouse', value: 'villa' },
        { label: 'Commercial Office', value: 'office' },
        { label: 'Retail / Restaurant / Storefront', value: 'retail' },
        { label: 'Warehouse / Industrial Facility', value: 'warehouse' },
        { label: 'Entire Building / Compound', value: 'building' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: 'villa',
    },
    {
      name: 'emirate',
      type: 'select',
      required: true,
      options: [
        { label: 'Dubai', value: 'dubai' },
        { label: 'Abu Dhabi', value: 'abu_dhabi' },
        { label: 'Sharjah', value: 'sharjah' },
        { label: 'Ajman', value: 'ajman' },
        { label: 'Ras Al Khaimah', value: 'ras_al_khaimah' },
        { label: 'Umm Al Quwain', value: 'umm_al_quwain' },
        { label: 'Fujairah', value: 'fujairah' },
      ],
      defaultValue: 'dubai',
    },
    {
      name: 'areaOrCommunity',
      type: 'text',
      admin: {
        description: 'e.g. Dubai Hills, Downtown, Al Maryah Island',
      },
    },
    {
      name: 'approximateSizeSqFt',
      type: 'number',
      admin: {
        description: 'Approximate area in square feet (optional)',
      },
    },
    {
      name: 'preferredDate',
      type: 'date',
    },
    {
      name: 'details',
      type: 'textarea',
      admin: {
        description: 'Specific client requirements or scope notes',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New Lead', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Quoted', value: 'quoted' },
        { label: 'Accepted / Converted', value: 'accepted' },
        { label: 'Closed / Lost', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Staff notes on quote calculation or client communication',
      },
    },
  ],
}
