import { GlobalConfig } from 'payload/types';
import { CallToAction, CallToActionType } from '../fields';

export interface MenuItemGroupSubMenuItemType {
  callToAction: CallToActionType;
}

export interface MenuItemGroupType {
  label: string;
  subMenuItems: MenuItemGroupSubMenuItemType[];
}

export interface MenuItemType {
  label: string;
  type: 'multiple' | 'single';
  menuItemGroups?: MenuItemGroupType[];
  menuItem?: CallToActionType;
  enableNavigateTo: boolean;
  navigateTo?: CallToActionType;
}

export interface MenuType {
  menuItems: MenuItemType[];
}

export const Menu: GlobalConfig = {
  slug: 'menu',
  label: 'Menu',
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'menuItems',
      labels: {
        singular: 'Menu Item',
        plural: 'Menu Items'
      },
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'label',
          label: 'Label',
          type: 'text',
          required: true,
          localized: true
        },
        {
          name: 'type',
          label: 'Type',
          type: 'radio',
          defaultValue: 'multiple',
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
          admin: {
            layout: 'horizontal'
          }
        },
        {
          name: 'menuItemGroups',
          labels: {
            singular: 'Menu Item Group',
            plural: 'Menu Item Groups'
          },
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              required: true,
              localized: true
            },
            {
              name: 'subMenuItems',
              labels: {
                singular: 'Sub Menu Item',
                plural: 'Sub Menu Items'
              },
              type: 'array',
              minRows: 1,
              fields: [CallToAction()]
            }
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'multiple'
          }
        },
        {
          name: 'enableNavigateTo',
          label: 'Navigate To',
          type: 'checkbox',
          defaultValue: false,
          required: true,
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'multiple'
          }
        },
        {
          name: 'navigateTo',
          label: false,
          type: 'group',
          fields: [
            {
              name: 'label',
              label: 'Label',
              type: 'text',
              required: true,
              localized: true
            },
            {
              name: 'type',
              label: 'Type',
              type: 'radio',
              defaultValue: 'page',
              required: true,
              options: [
                {
                  label: 'Page',
                  value: 'page'
                },
                {
                  label: 'Custom URL',
                  value: 'custom'
                }
              ],
              admin: {
                layout: 'horizontal'
              }
            },
            {
              name: 'page',
              label: 'Page',
              type: 'relationship',
              relationTo: 'pages',
              required: true,
              localized: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'page'
              }
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              required: true,
              localized: true,
              admin: {
                condition: (_, siblingData) => siblingData?.type === 'custom'
              }
            }
          ],
          admin: {
            condition: (_, siblingData) => Boolean(siblingData.enableNavigateTo)
          }
        },
        {
          name: 'menuItem',
          label: 'Menu Item',
          type: 'group',
          fields: [CallToAction()],
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'single'
          }
        }
      ]
    }
  ]
};
