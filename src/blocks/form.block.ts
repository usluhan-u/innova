import { Block } from 'payload/types';
import { Form as FormBuilder } from '@payloadcms/plugin-form-builder/types';
import { BackgroundColor, BackgroundColorType } from '../fields';
import { RichTextContentType } from '../components';

interface ExtendedFormBuilder extends FormBuilder {
  leader: RichTextContentType[];
  type: 'default' | 'float';
  floatButtonLabel?: string;
}

export interface FormType {
  blockType: 'form';
  backgroundColor: BackgroundColorType;
  form: ExtendedFormBuilder;
}

export const Form: Block = {
  slug: 'form',
  labels: {
    singular: 'Form',
    plural: 'Forms'
  },
  fields: [
    BackgroundColor,
    {
      name: 'form',
      type: 'relationship',
      relationTo: 'forms',
      required: true,
      localized: true
    }
  ]
};
