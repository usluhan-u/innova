import { GlobalConfig } from 'payload/types';
import { CallToAction, CallToActionType } from '../fields';

export interface NotFoundType {
  title?: string;
  description?: string;
  callToAction: CallToActionType;
}

export const NotFound: GlobalConfig = {
  slug: 'not-found',
  label: 'Not Found',
  access: {
    read: () => true
  },
  admin: {
    description: 'The content that appears when a page is not found'
  },
  fields: [
    {
      label: 'Title',
      name: 'title',
      type: 'text',
      required: true,
      localized: true
    },
    {
      label: 'Description',
      name: 'description',
      type: 'text',
      required: true,
      localized: true
    },
    CallToAction({ required: true })
  ]
};
