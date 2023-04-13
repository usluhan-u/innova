import { GlobalConfig } from 'payload/types';
import { CallToAction, CallToActionType } from '../fields';

export interface NotFoundType {
  description: string;
  detailedDescription: string;
  callToAction: CallToActionType;
}

export const NotFound: GlobalConfig = {
  slug: 'not-found',
  label: 'Not Found',
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'detailedDescription',
      label: 'Detailed Description',
      type: 'text',
      required: true,
      localized: true
    },
    CallToAction()
  ]
};
