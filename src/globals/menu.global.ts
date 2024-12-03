import { GlobalConfig } from 'payload/types';
import { CallToAction, CallToActionType } from '../fields';

export interface MenuItemGroupSubMenuItemType {
  type: 'dropdown' | 'text';
  label: string;
  dropdownMenuItems: {
    callToAction: CallToActionType;
  }[];
  callToAction: CallToActionType;
}

export interface MenuItemGroupType {
  label?: string;
  subMenuItems: MenuItemGroupSubMenuItemType[];
}

export interface MenuItemType {
  label: string;
  type: 'multiple' | 'single';
  menuItemGroups: MenuItemGroupType[];
  menuItem: {
    callToAction: CallToActionType;
  };
  callToAction: CallToActionType;
}

export interface MenuType {
  menuItems?: MenuItemType[];
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
              fields: [
                {
                  name: 'type',
                  label: 'Type',
                  type: 'radio',
                  defaultValue: 'text',
                  required: true,
                  options: [
                    {
                      label: 'Dropdown',
                      value: 'dropdown'
                    },
                    {
                      label: 'Text',
                      value: 'text'
                    }
                  ],
                  admin: {
                    layout: 'horizontal'
                  }
                },
                CallToAction({
                  condition: (_, siblingData) => siblingData?.type === 'text'
                }),
                {
                  name: 'label',
                  label: 'Label',
                  type: 'text',
                  localized: true,
                  admin: {
                    condition: (_, siblingData) =>
                      siblingData?.type === 'dropdown'
                  }
                },
                {
                  name: 'dropdownMenuItems',
                  labels: {
                    singular: 'Dropdown Menu Item',
                    plural: 'Dropdown Menu Items'
                  },
                  type: 'array',
                  minRows: 1,
                  fields: [CallToAction()],
                  admin: {
                    condition: (_, siblingData) =>
                      siblingData?.type === 'dropdown'
                  }
                }
              ]
            }
          ],
          admin: {
            condition: (_, siblingData) => siblingData?.type === 'multiple'
          }
        },
        CallToAction({
          condition: (_, siblingData) => siblingData?.type === 'multiple'
        }),
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
