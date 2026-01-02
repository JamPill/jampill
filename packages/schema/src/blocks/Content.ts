import type { Block } from 'payload'

export const Content: Block = {
  slug: 'content',
  labels: {
    singular: 'Testo',
    plural: 'Testi',
  },
  fields: [
    {
      name: 'richText',
      type: 'richText',
      required: true,
    },
  ],
}
