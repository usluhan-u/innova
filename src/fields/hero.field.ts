import { Field } from 'payload/types';
import { CallToAction, CallToActionType } from './call-to-action.field';
import { UploadedMediaType } from '../collections';
import {
  CallToActionToggle,
  CallToActionToggleType
} from './call-to-action-toggle.field';

interface CallToActionGroupItemType {
  callToAction: CallToActionType;
}

interface CallToActionGroupType {
  items: CallToActionGroupItemType[];
}

export interface HeroType {
  title: string;
  subtitle?: string;
  callToActionToggle: CallToActionToggleType;
  enableCallToActionGroup?: boolean;
  callToActionGroup?: CallToActionGroupType;
  backgroundImage: UploadedMediaType;
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
      localized: true
    },
    CallToActionToggle,
    {
      name: 'enableCallToActionGroup',
      label: 'Call to Action Group',
      type: 'checkbox',
      defaultValue: false,
      required: true
    },
    {
      name: 'callToActionGroup',
      label: false,
      type: 'group',
      fields: [
        {
          name: 'items',
          labels: {
            singular: 'Item',
            plural: 'Items'
          },
          type: 'array',
          minRows: 1,
          fields: [CallToAction({ label: false })]
        }
      ],
      admin: {
        condition: (_, siblingData) =>
          Boolean(siblingData?.enableCallToActionGroup)
      }
    },
    {
      name: 'backgroundImage',
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
