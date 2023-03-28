import { MenuType } from '../collections';

export const menuData: MenuType[] = [
  {
    title: 'Ürünler',
    menu: {
      link: '/',
      type: 'dropdown',
      subMenus: [
        {
          label: 'Ürün Ailesi',
          subMenuItems: [
            {
              label: 'Skywave Ürün Ailesi',
              link: '/'
            },
            {
              label: 'Payflex Ürün Ailesi',
              link: '/'
            },
            {
              label: 'Lega Ürün Ailesi',
              link: '/'
            },
            {
              label: 'Kiosk Innova Ürün Ailesi',
              link: '/'
            },
            {
              label: 'Avio Flex Ürün Ailesi',
              link: '/'
            },
            {
              label: 'HICAMP Ürün Ailesi',
              link: '/'
            }
          ]
        },
        {
          label: 'Ürünler',
          subMenuItems: [
            {
              label: 'Hermes',
              link: '/'
            },
            {
              label: 'Digital Signage',
              link: '/'
            },
            {
              label: 'Documents Innova',
              link: '/'
            },
            {
              label: 'Robotik Süreç Otomasyonu',
              link: '/'
            },
            {
              label: 'RaaS',
              link: '/'
            },
            {
              label: 'Nova',
              link: '/'
            },
            {
              label: 'Network 360',
              link: '/'
            },
            {
              label: 'Innova AI',
              link: '/'
            },
            {
              label: 'BioIz',
              link: '/'
            }
          ]
        }
      ]
    }
  },
  {
    title: 'Menu 2',
    menu: {
      link: '/',
      type: 'single'
    }
  }
];
