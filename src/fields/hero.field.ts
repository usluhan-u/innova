import { Field } from 'payload/types';
import { Media, UploadedMediaType } from './media.field';
import { CallToActionGroup } from './call-to-action-group.field';
import { CallToAction, CallToActionType } from './call-to-action.field';

export interface HeroType {
  type: 'home' | 'default';
  title: string;
  description?: string;
  callToAction: CallToActionType;
  callToActionGroup: {
    callToAction: CallToActionType;
  }[];
  backgroundImage: UploadedMediaType;
  logo?: UploadedMediaType;
}

export const Hero: Field = {
  name: 'hero',
  label: 'Hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      defaultValue: 'default',
      required: true,
      localized: true,
      options: [
        {
          label: 'Home',
          value: 'home'
        },
        {
          label: 'Default',
          value: 'default'
        }
      ]
    },
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'default'
      }
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      localized: true,
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'default'
      }
    },
    CallToAction({
      condition: (_, siblingData) => siblingData?.type === 'default'
    }),
    CallToActionGroup({
      condition: (_, siblingData) => siblingData?.type === 'default'
    }),
    Media({
      name: 'backgroundImage',
      label: 'Background Image',
      required: true,
      condition: (_, siblingData) => siblingData?.type === 'default'
    }),
    Media({
      name: 'logo',
      label: 'Logo',
      required: false,
      condition: (_, siblingData) => siblingData?.type === 'default'
    })
  ]
};
