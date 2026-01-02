import type { CollectionConfig } from 'payload'
import { Hero } from '../blocks/Hero'
import { Content } from '../blocks/Content'

export const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'authors', 'publishedAt', '_status'],
    group: 'Blog',
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return {
        _status: {
          equals: 'published',
        },
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'excerpt',
      type: 'textarea',
      admin: {
        description: 'Breve riassunto mostrato nelle liste e nelle anteprime.',
      },
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      index: true,
      admin: {
        position: 'sidebar',
      },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (value) return value
            return data?.title
              ?.toLowerCase()
              .replace(/ /g, '-')
              .replace(/[^\w-]+/g, '')
          },
        ],
      },
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: {
        position: 'sidebar',
        description: 'Appunti editoriali non visibili sul sito.',
      },
    },
    {
      name: 'authors',
      type: 'relationship',
      relationTo: 'users',
      hasMany: true,
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'post-categories',
      hasMany: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'blocks',
      type: 'blocks',
      blocks: [Hero, Content],
      required: true,
    },
  ],
}
