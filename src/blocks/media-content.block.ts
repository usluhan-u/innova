import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  CallToAction,
  CallToActionType,
  RichText,
  UploadedMediaType,
  Width,
  WidthType
} from '../fields';
import { RichTextContentType } from '../components';

export interface MediaContentType {
  blockType: 'mediaContent';
  backgroundColor: BackgroundColorType;
  width: WidthType;
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
    BackgroundColor,
    Width,
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
    RichText({ name: 'content', label: 'Content', required: true }),
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
