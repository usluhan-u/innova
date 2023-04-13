import { Field } from 'payload/types';
import { CallToAction, CallToActionType } from './call-to-action.field';
import { UploadedMediaType } from '../collections';

export interface HeroType {
  title: string;
  subtitle: string;
  callToAction?: CallToActionType;
  bgImage: UploadedMediaType;
  logo?: UploadedMediaType;
}

export const Hero: Field = {
  name: 'hero',
  label: 'Hero',
  type: 'group',
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'subtitle',
      label: 'Subtitle',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'enableCallToAction',
      label: 'Call to Action',
      type: 'checkbox',
      defaultValue: false,
      required: true
    },
    CallToAction({
      label: false,
      condition: (_, siblingData) => Boolean(siblingData?.enableCallToAction)
    }),
    {
      name: 'bgImage',
      label: 'Background Image',
      type: 'upload',
      relationTo: 'medias',
      required: true,
      localized: true
    },
    {
      name: 'logo',
      label: 'Logo',
      type: 'upload',
      relationTo: 'medias',
      localized: true
    }
  ]
};
