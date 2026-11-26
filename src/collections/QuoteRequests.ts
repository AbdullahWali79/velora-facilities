import type { CollectionConfig } from 'payload'

export const QuoteRequests: CollectionConfig = {
  slug: 'quote-requests',
  labels: {
    singular: 'Quotation Request',
    plural: 'Quotation Requests',
  },
  admin: {
    useAsTitle: 'fullName',
    defaultColumns: ['fullName', 'email', 'phone', 'service', 'propertyType', 'emirate', 'status', 'createdAt'],
    group: 'Lead Management',
    description: 'Residential & commercial quotation inquiries requiring estimating review.',
  },
  access: {
    // Authenticated admin & editor staff can view quotes
    read: ({ req: { user } }) => Boolean(user),
    // Public can create quote inquiries
    create: () => true,
    // Staff can update status and pricing notes
    update: ({ req: { user } }) => Boolean(user),
    // Only Admin role can delete quote records
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'fullName',
      type: 'text',
      required: true,
      admin: {
        description: 'Customer or corporate representative full name',
      },
    },
    {
      name: 'email',
      type: 'email',
      required: false,
      admin: {
        description: 'Contact email for proposal delivery (optional)',
      },
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
        description: 'Selected primary service for quote estimation',
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
        description: 'e.g. Dubai Hills Estate, Downtown Dubai, Palm Jumeirah, DIFC',
      },
    },
    {
      name: 'approximateSizeSqFt',
      type: 'number',
      admin: {
        description: 'Approximate property area in square feet',
      },
    },
    {
      name: 'preferredDate',
      type: 'date',
      admin: {
        description: 'Target service execution or inspection date',
      },
    },
    {
      name: 'details',
      type: 'textarea',
      admin: {
        description: 'Specific client requirements, scope notes, or surface care needs',
      },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Reviewing (In Contact)', value: 'contacted' },
        { label: 'Quoted (Estimate Sent)', value: 'quoted' },
        { label: 'Accepted (Converted)', value: 'accepted' },
        { label: 'Rejected (Closed)', value: 'closed' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Quotation lifecycle status',
      },
    },
    {
      name: 'internalNotes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Estimator notes on cost calculation, discounts, or scope agreement',
      },
    },
  ],
}
