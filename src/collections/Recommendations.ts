import { slugField, type CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

export const Recommendations: CollectionConfig = {
  slug: 'recommendations',
  labels: {
    singular: 'Recommendation',
    plural: 'Recommendations',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: () => true,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'meal', 'minutes', 'updatedAt'],
  },
  defaultSort: 'sortOrder',
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField({ useAsSlug: 'title' }),
    {
      name: 'meal',
      type: 'select',
      required: true,
      options: [
        { label: 'Lunch', value: 'lunch' },
        { label: 'Dinner', value: 'dinner' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'minutes',
      type: 'number',
      required: true,
      min: 1,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'serves',
      type: 'number',
      required: true,
      min: 1,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'sortOrder',
      type: 'number',
      required: true,
      admin: {
        position: 'sidebar',
        description: 'Lower numbers appear first on the home page.',
      },
    },
    {
      type: 'collapsible',
      label: 'Home card',
      fields: [
        {
          name: 'excerpt',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Shown on the home list.',
          },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Article',
      fields: [
        {
          name: 'summary',
          type: 'textarea',
          required: true,
          admin: {
            description: 'Shown under the title on the article.',
          },
        },
        {
          name: 'why',
          type: 'textarea',
          label: 'Why I recommend it',
          required: true,
        },
        {
          name: 'ingredients',
          type: 'textarea',
          label: "What you'll need",
          required: true,
        },
        {
          name: 'method',
          type: 'textarea',
          label: 'Keep it simple',
          required: true,
        },
        {
          name: 'tip',
          type: 'textarea',
          label: 'One small tip',
          required: true,
        },
        {
          name: 'upNext',
          type: 'relationship',
          relationTo: 'recommendations',
          label: 'Up next',
        },
      ],
    },
  ],
}
