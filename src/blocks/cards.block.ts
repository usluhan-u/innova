import { Block } from 'payload/types';
import { BackgroundColor, BackgroundColorType } from '../fields';
import { CategoryType, PageType } from '../collections';
import { MediaTypeMediaType } from './media.block';

interface CardsCardsType {
  header: string;
  publishDate: string;
  category: CategoryType;
  media: MediaTypeMediaType;
  internalLink: {
    label: string;
    page: PageType;
  };
}

export interface CardsType {
  blockType: 'cards';
  backgroundColor: BackgroundColorType;
  cards: CardsCardsType[];
}

export const Cards: Block = {
  slug: 'cards',
  labels: {
    singular: 'Card',
    plural: 'Cards'
  },
  fields: [
    BackgroundColor,
    {
      name: 'cards',
      label: 'Cards',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'header',
          label: 'Header',
          type: 'text',
          required: true,
          localized: true
        },
        {
          name: 'publishDate',
          label: 'Publish Date',
          type: 'date',
          required: true,
          localized: true
        },
        {
          name: 'category',
          label: 'Category',
          type: 'relationship',
          relationTo: 'categories',
          required: true,
          localized: true
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'medias',
          required: true,
          localized: true
        },
        {
          name: 'internalLink',
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
              name: 'page',
              label: 'Page',
              type: 'relationship',
              relationTo: 'pages',
              required: true,
              localized: true
            }
          ]
        }
      ]
    }
  ]
};
