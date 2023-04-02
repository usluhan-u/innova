import { CollectionConfig } from 'payload/types';

export const Menu: CollectionConfig = {
  slug: 'menus',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'label'
  },
  fields: [
    {
      name: 'label',
      label: 'Label',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'group',
      label: 'Group',
      type: 'group',
      fields: [
        {
          name: 'type',
          label: 'Menu Type',
          type: 'radio',
          required: true,
          options: [
            {
              label: 'Multiple',
              value: 'multiple'
            },
            {
              label: 'Single',
              value: 'single'
            }
          ],
          defaultValue: 'multiple',
          admin: {
            layout: 'horizontal'
          }
        },
        {
          type: 'row',
          fields: [
            {
              name: 'menuGroups',
              label: 'Menu Groups',
              type: 'array',
              required: true,
              minRows: 1,
              labels: {
                singular: 'Menu Group',
                plural: 'Menu Groups'
              },
              fields: [
                {
                  name: 'label',
                  label: 'Label',
                  type: 'text',
                  required: true,
                  localized: true
                },
                {
                  name: 'subMenus',
                  label: 'Sub Menus',
                  type: 'array',
                  minRows: 1,
                  labels: {
                    singular: 'Sub Menu',
                    plural: 'Sub Menus'
                  },
                  fields: [
                    {
                      name: 'label',
                      label: 'Label',
                      type: 'text',
                      required: true,
                      localized: true
                    },
                    {
                      name: 'page',
                      label: 'Page',
                      type: 'relationship',
                      relationTo: 'pages',
                      required: true
                    }
                  ]
                }
              ],
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'multiple'
              }
            }
          ]
        },
        {
          name: 'page',
          label: 'Page',
          type: 'relationship',
          relationTo: 'pages',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'single'
          }
        }
      ]
    }
  ]
};
