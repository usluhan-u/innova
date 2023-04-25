import { Block } from 'payload/types';
import { CallToAction, CallToActionType, UploadedMediaType } from '../fields';
import { RichTextContentType } from '../components';

export interface MediaContentType {
  blockType: 'mediaContent';
  contentPosition: 'left' | 'right';
  content: RichTextContentType[];
  callToAction: CallToActionType;
  image: UploadedMediaType;
}

export const MediaContent: Block = {
  slug: 'mediaContent',
  labels: {
    singular: 'Media + Content',
    plural: 'Media + Contents'
  },
  fields: [
    {
      name: 'contentPosition',
      label: 'Content Position',
      type: 'radio',
      defaultValue: 'left',
      required: true,
      localized: true,
      options: [
        {
          label: 'Left',
          value: 'left'
        },
        {
          label: 'Right',
          value: 'right'
        }
      ],
      admin: {
        layout: 'horizontal'
      }
    },
    {
      name: 'content',
      label: 'Content',
      type: 'richText',
      required: true,
      localized: true
    },
    CallToAction(),
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'medias',
      required: true,
      localized: true
    }
  ]
};
