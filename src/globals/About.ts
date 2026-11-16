import type { GlobalConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { revalidateAbout } from '../hooks/revalidate'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About',
  access: {
    read: () => true,
    update: authenticated,
  },
  hooks: {
    afterChange: [revalidateAbout],
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
    },
    {
      name: 'headline',
      type: 'text',
      required: true,
    },
    {
      name: 'intro',
      type: 'textarea',
      required: true,
    },
    {
      name: 'sections',
      type: 'array',
      minRows: 1,
      required: true,
      labels: {
        singular: 'Section',
        plural: 'Sections',
      },
      fields: [
        {
          name: 'heading',
          type: 'text',
          required: true,
        },
        {
          name: 'body',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
