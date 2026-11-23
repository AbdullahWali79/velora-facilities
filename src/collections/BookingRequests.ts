import type { CollectionConfig } from 'payload'

export const BookingRequests: CollectionConfig = {
  slug: 'booking-requests',
  labels: {
    singular: 'Booking Request',
    plural: 'Booking Requests',
  },
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['customerName', 'service', 'preferredDate', 'timeSlot', 'emirate', 'bookingStatus', 'createdAt'],
    group: 'Leads & Inquiries',
    description: 'Customer appointment booking requests requiring manual staff confirmation.',
  },
  access: {
    // Authenticated admin & editor staff can view records
    read: ({ req: { user } }) => Boolean(user),
    // Public can create booking inquiries
    create: () => true,
    // Staff can update statuses and add confirmation notes
    update: ({ req: { user } }) => Boolean(user),
    // Only Admin role can delete booking records
    delete: ({ req: { user } }) => user?.role === 'admin',
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
      admin: {
        description: 'Customer email for acknowledgement and communication',
      },
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      admin: {
        description: 'UAE contact number for phone/WhatsApp confirmation (+971...)',
      },
    },
    {
      name: 'service',
      type: 'relationship',
      relationTo: 'services',
      required: true,
      admin: {
        description: 'Selected technical or cleaning service',
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
        description: 'Customer preferred dispatch window',
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
        description: 'Street address, villa/apartment number, community, and landmarks',
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
        { label: 'Pending (Awaiting Call)', value: 'pending_confirmation' },
        { label: 'Confirmed (Manual Confirmation Complete)', value: 'confirmed' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Status of the booking request. Manual confirmation required by Velora team.',
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
