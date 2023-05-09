/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from 'payload/types';
import { CallToAction, CallToActionType } from './call-to-action.field';
import { UploadedMediaType } from './media.field';

export interface SlideType {
  title?: string;
  description: string;
  backgroundImage: UploadedMediaType;
  callToAction: CallToActionType;
}

interface Args {
  label?: string | false;
  condition?: (data: any, siblingData: any) => boolean;
}

export const Slide = (args?: Args): Field => {
  const { label, condition } = args || {};

  return {
    name: 'slide',
    label: typeof label === 'boolean' ? label : label || 'Slider',
    type: 'group',
    fields: [
      {
        name: 'title',
        label: 'Title',
        type: 'text',
        localized: true
      },
      {
        name: 'description',
        label: 'Description',
        type: 'textarea',
        required: true,
        localized: true
      },
      {
        name: 'backgroundImage',
        label: 'Background Image',
        type: 'upload',
        relationTo: 'medias',
        required: true,
        localized: true
      },
      CallToAction()
    ],
    admin: {
      condition
    }
  };
};
