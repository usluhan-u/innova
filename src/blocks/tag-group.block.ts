import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  CallToAction,
  CallToActionType,
  UploadedLottieType,
  UploadedMediaType,
  Width,
  WidthType
} from '../fields';

export interface TagGroupItemType {
  title: string;
  content?: string;
  callToAction: CallToActionType;
  imageType: 'icon' | 'lottie';
  icon?: UploadedMediaType;
  lottie?: UploadedLottieType;
}

export interface TagGroupType {
  blockType: 'tagGroup';
  backgroundColor: BackgroundColorType;
  width: WidthType;
  displayLayout?: 'grid' | 'flex';
  items: TagGroupItemType[];
}

export const TagGroup: Block = {
  slug: 'tagGroup',
  labels: {
    singular: 'Tag Group',
    plural: 'Tag Groups'
  },
  fields: [
    BackgroundColor,
    Width,
    {
      name: 'displayLayout',
      label: 'Display Layout',
      type: 'radio',
      defaultValue: 'grid',
      required: true,
      localized: true,
      options: [
        {
          label: 'Grid',
          value: 'grid'
        },
        {
          label: 'Flex',
          value: 'flex'
        }
      ]
    },
    {
      name: 'items',
      labels: {
        singular: 'Item',
        plural: 'Items'
      },
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          localized: true
        },
        {
          name: 'content',
          label: 'Content',
          type: 'textarea',
          localized: true
        },
        {
          name: 'imageType',
          label: 'Image Type',
          type: 'radio',
          defaultValue: 'icon',
          options: [
            {
              label: 'Icon',
              value: 'icon'
            },
            {
              label: 'Lottie',
              value: 'lottie'
            }
          ]
        },
        {
          name: 'icon',
          label: 'Icon',
          type: 'upload',
          relationTo: 'medias',
          required: true,
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData.imageType === 'icon'
          }
        },
        {
          name: 'lottie',
          label: 'Lottie',
          type: 'upload',
          relationTo: 'lotties',
          required: true,
          localized: true,
          admin: {
            condition: (_, siblingData) => siblingData.imageType === 'lottie'
          }
        },
        CallToAction()
      ]
    }
  ]
};
