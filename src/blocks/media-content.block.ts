import { Block } from 'payload/types';
import { RichText } from '../fields';
import { Media as MediaType } from '../payload-types';

export interface MediaContentType {
  alignment: 'contentOnLeft' | 'contentOnRight';
  content: unknown;
  media: MediaType;
  type: 'mediaContent';
}

export const MediaContent: Block = {
  slug: 'mediaContent',
  labels: {
    singular: 'Media + Content',
    plural: 'Media + Content Blocks'
  },
  fields: [
    {
      name: 'alignment',
      label: 'Alignment',
      type: 'radio',
      defaultValue: 'contentOnLeft',
      required: true,
      options: [
        {
          label: 'Content on Left',
          value: 'contentOnLeft'
        },
        {
          label: 'Content on Right',
          value: 'contentOnRight'
        }
      ],
      admin: {
        layout: 'horizontal'
      }
    },
    RichText(
      {},
      {
        elements: ['ol', 'ul', 'indent']
      }
    ),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'medias',
      required: true,
      admin: {
        condition: (_, { embeddedVideo }) => Boolean(!embeddedVideo?.embed)
      }
    }
  ]
};
