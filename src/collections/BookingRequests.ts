import type { CollectionConfig } from 'payload'

export const BookingRequests: CollectionConfig = {
  slug: 'booking-requests',
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'service', 'preferredDate', 'timeSlot', 'emirate', 'bookingStatus', 'createdAt'],
  },
  access: {
    // Only authenticated admin/staff can read booking records
    read: ({ req: { user } }) => Boolean(user),
    // Public can submit booking inquiries
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'customerName',
      type: 'text',
      required: true,
      admin: {
        description: 'Customer full name',
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
      required: true,
      admin: {
        description: 'UAE contact number for manual booking confirmation via phone or WhatsApp',
      },
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      required: true,
      admin: {
        description: 'Service selected by the customer',
      },
    },
    {
      name: 'preferredDate',
      type: 'date',
      required: true,
      admin: {
        description: 'Customer preferred appointment date',
      },
    },
    {
      name: 'timeSlot',
      type: 'select',
      required: true,
      options: [
        { label: 'Morning (08:00 AM - 12:00 PM)', value: 'morning_08_12' },
        { label: 'Afternoon (12:00 PM - 04:00 PM)', value: 'afternoon_12_16' },
        { label: 'Evening (04:00 PM - 08:00 PM)', value: 'evening_16_20' },
        { label: 'Flexible / Any Time', value: 'flexible' },
      ],
      defaultValue: 'morning_08_12',
      admin: {
        description: 'Customer preferred time window',
      },
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
      name: 'fullAddress',
      type: 'textarea',
      required: true,
      admin: {
        description: 'Street address, building/villa number, community, and landmarks',
      },
    },
    {
      name: 'specialInstructions',
      type: 'textarea',
      admin: {
        description: 'Access instructions, security gate codes, parking notes, or pet details',
      },
    },
    {
      name: 'bookingStatus',
      type: 'select',
      required: true,
      defaultValue: 'pending_confirmation',
      options: [
        { label: 'Pending Confirmation (Awaiting Call)', value: 'pending_confirmation' },
        { label: 'Confirmed (Manual Confirmation Complete)', value: 'confirmed' },
        { label: 'Service Completed', value: 'completed' },
        { label: 'Cancelled / Rescheduled', value: 'cancelled' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Velora Facilities manually contacts the client to confirm dispatch time & team',
      },
    },
    {
      name: 'manualConfirmationNotes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Staff logs: Confirmation phone call notes, assigned technician team, dispatch details',
      },
    },
  ],
}
