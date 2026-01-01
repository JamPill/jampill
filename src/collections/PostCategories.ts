import type { CollectionConfig } from 'payload'

export const PostCategories: CollectionConfig = {
  slug: 'post-categories',
  admin: {
    useAsTitle: 'title',
    group: 'Blog',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
