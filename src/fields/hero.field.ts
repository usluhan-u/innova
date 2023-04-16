import { Field } from 'payload/types';
import { CallToAction, CallToActionType } from './call-to-action.field';
import { UploadedMediaType } from '../collections';
import {
  CallToActionToggle,
  CallToActionToggleType
} from './call-to-action-toggle.field';

interface BottomCallToAction {
  callToAction: CallToActionType;
}

export interface HeroType {
  title: string;
  subtitle?: string;
  callToActionToggle: CallToActionToggleType;
  enableBottomCallToActions?: boolean;
  bottomCallToActions?: BottomCallToAction[];
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
      localized: true
    },
    CallToActionToggle,
    {
      name: 'enableBottomCallToActions',
      label: 'Bottom Call to Actions',
      type: 'checkbox',
      defaultValue: false,
      required: true
    },
    {
      name: 'bottomCallToActions',
      labels: {
        singular: 'Bottom Call to Action',
        plural: 'Bottom Call to Actions'
      },
      type: 'array',
      minRows: 1,
      fields: [CallToAction({ label: false })],
      admin: {
        condition: (_, siblingData) =>
          Boolean(siblingData?.enableBottomCallToActions)
      }
    },
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
