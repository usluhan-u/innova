import { Field } from 'payload/types';
import { CallToAction, CallToActionType } from './call-to-action.field';
import { CategoryType, UploadedMediaType } from '../collections';

export interface CardType {
  title: string;
  date: string;
  category?: CategoryType;
  image: UploadedMediaType;
  callToAction: CallToActionType;
}

export const Card: Field = {
  name: 'card',
  label: 'Card',
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
      name: 'date',
      label: 'Date',
      type: 'date',
      required: true,
      localized: true
    },
    {
      name: 'category',
      label: 'Category',
      type: 'relationship',
      relationTo: 'categories',
      localized: true
    },
    {
      name: 'image',
      label: 'Image',
      type: 'upload',
      relationTo: 'medias',
      required: true,
      localized: true
    },
    CallToAction()
  ]
};
