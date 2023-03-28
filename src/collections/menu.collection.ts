import { CollectionConfig } from 'payload/types';

export interface MenuType {}

export const Menu: CollectionConfig = {
  slug: 'menus',
  access: {
    read: () => true
  },
  admin: {
    useAsTitle: 'title'
  },
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true
    },
    {
      name: 'menu',
      label: 'Menu',
      type: 'group',
      fields: [
        {
          name: 'type',
          label: 'Type',
          type: 'radio',
          options: [
            {
              label: 'Dropdown',
              value: 'dropdown'
            },
            {
              label: 'Single',
              value: 'single'
            }
          ],
          defaultValue: 'dropdown',
          admin: {
            layout: 'horizontal'
          }
        },
        {
          type: 'row',
          fields: [
            {
              name: 'submenu',
              label: 'Sub Menu',
              type: 'array',
              labels: {
                singular: 'Sub Menu',
                plural: 'Sub Menus'
              },
              fields: [
                {
                  name: 'label',
                  label: 'Label',
                  type: 'text',
                  required: true
                },
                {
                  name: 'subMenuItem',
                  label: 'Sub Menu Item',
                  type: 'array',
                  labels: {
                    singular: 'Submenu Item',
                    plural: 'Submenu Items'
                  },
                  fields: [
                    {
                      name: 'link',
                      label: 'Link',
                      type: 'relationship',
                      relationTo: 'links',
                      required: true
                    }
                  ]
                }
              ],
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'dropdown'
              }
            },
            {
              name: 'link',
              label: 'Link',
              type: 'relationship',
              relationTo: 'links',
              required: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'single'
              }
            }
          ]
        }
      ]
    }
  ]
};
