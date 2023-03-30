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
      required: true
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
              label: 'Dropdown',
              value: 'dropdown'
            },
            {
              label: 'Link',
              value: 'link'
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
              name: 'menuGroups',
              label: 'Menu Groups',
              type: 'array',
              labels: {
                singular: 'Menu Group',
                plural: 'Menu Groups'
              },
              fields: [
                {
                  name: 'label',
                  label: 'Label',
                  type: 'text',
                  required: true
                },
                {
                  name: 'subMenus',
                  label: 'Sub Menus',
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
                      name: 'link',
                      label: 'Link',
                      type: 'relationship',
                      relationTo: 'links',
                      required: true
                    }
                  ]
                }
                // {
                //   name: 'group',
                //   label: 'Group,
                //   type: 'group',
                //   fields: [
                //     {
                //       name: 'allMenuContent',
                //       label: 'All Menu Content',
                //       type: 'checkbox'
                //     },
                //     {
                //       type: 'row',
                //       fields: [
                //         {
                //           name: 'label',
                //           label: 'Label',
                //           type: 'text',
                //           required: true
                //         },
                //         {
                //           name: 'link',
                //           label: 'Link',
                //           type: 'relationship',
                //           relationTo: 'links',
                //           required: true
                //         }
                //       ],
                //       admin: {
                //         condition: (_, siblingData) =>
                //           siblingData?.allMenuContent === 'true'
                //       }
                //     }
                //   ]
                // }
              ],
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'dropdown'
              }
            }
          ]
        },
        {
          name: 'link',
          label: 'Link',
          type: 'relationship',
          relationTo: 'links',
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'link'
          }
        }
      ]
    }
  ]
};
