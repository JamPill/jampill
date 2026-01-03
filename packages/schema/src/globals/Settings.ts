import type { GlobalConfig } from 'payload'

export const Settings: GlobalConfig = {
  slug: 'settings',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Configurazione',
  },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Generale',
          fields: [
            {
              name: 'siteState',
              type: 'select',
              defaultValue: 'construction',
              required: true,
              options: [
                { label: 'Online', value: 'online' },
                { label: 'In Manutenzione', value: 'maintenance' },
                { label: 'In Costruzione', value: 'construction' },
              ],
              admin: {
                description:
                  'Stato attuale del sito. "In Manutenzione" bloccherà l\'accesso al frontend.',
              },
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'appName',
                  type: 'text',
                  admin: { width: '50%' },
                },
                {
                  name: 'appNameExtended',
                  type: 'text',
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'contactUs',
              type: 'group',
              fields: [
                {
                  name: 'emails',
                  type: 'array',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'label', type: 'text', required: true, admin: { width: '40%' } },
                        { name: 'email', type: 'text', required: true, admin: { width: '60%' } },
                      ],
                    },
                  ],
                },
                {
                  name: 'phones',
                  type: 'array',
                  fields: [
                    {
                      type: 'row',
                      fields: [
                        { name: 'label', type: 'text', required: true, admin: { width: '40%' } },
                        { name: 'phone', type: 'text', required: true, admin: { width: '60%' } },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Loghi',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'logoSquareLight',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%', description: 'Versione quadrata (per sfondi chiari)' },
                },
                {
                  name: 'logoSquareDark',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%', description: 'Versione quadrata (per sfondi scuri)' },
                },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'logoWideLight',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%', description: 'Versione estesa (per sfondi chiari)' },
                },
                {
                  name: 'logoWideDark',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { width: '50%', description: 'Versione estesa (per sfondi scuri)' },
                },
              ],
            },
          ],
        },
        {
          label: 'Aspetto (Colori)',
          fields: [
            {
              type: 'group',
              name: 'colors',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'primary',
                      type: 'text',
                      defaultValue: '#000000',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'secondary',
                      type: 'text',
                      defaultValue: '#ffffff',
                      admin: { width: '33%' },
                    },
                    {
                      name: 'tertiary',
                      type: 'text',
                      defaultValue: '#f0f0f0',
                      admin: { width: '33%' },
                    },
                  ],
                },
              ],
            },
            {
              type: 'group',
              name: 'typography',
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'fontTitle',
                      type: 'select',
                      defaultValue: 'Inter',
                      options: [
                        { label: 'Inter (Moderno)', value: 'Inter' },
                        { label: 'Outfit (Geometrico)', value: 'Outfit' },
                        { label: 'Gantari (Elegante)', value: 'Gantari' },
                        { label: 'Plus Jakarta Sans', value: 'PlusJakartaSans' },
                        { label: 'Montserrat', value: 'Montserrat' },
                        { label: 'Roboto (Standard)', value: 'Roboto' },
                      ],
                      admin: { width: '50%' },
                    },
                    {
                      name: 'fontBody',
                      type: 'select',
                      defaultValue: 'Inter',
                      options: [
                        { label: 'Inter', value: 'Inter' },
                        { label: 'Outfit', value: 'Outfit' },
                        { label: 'Gantari', value: 'Gantari' },
                        { label: 'Plus Jakarta Sans', value: 'PlusJakartaSans' },
                        { label: 'Montserrat', value: 'Montserrat' },
                        { label: 'Roboto', value: 'Roboto' },
                      ],
                      admin: { width: '50%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Accessibilità',
          fields: [
            {
              name: 'accessibility',
              type: 'group',
              fields: [
                {
                  name: 'underlineLinks',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Sottolinea sempre i link',
                },
                {
                  name: 'accentFocus',
                  type: 'checkbox',
                  defaultValue: true,
                  label: 'Focus evidenziato su pulsanti e input',
                },
                {
                  name: 'highContrastBorders',
                  type: 'checkbox',
                  defaultValue: false,
                  label: 'Bordi ad alto contrasto sugli input',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
