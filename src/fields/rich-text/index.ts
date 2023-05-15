/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Field,
  RichTextElement,
  RichTextLeaf
} from 'payload/dist/fields/config/types';
import { RichTextField } from 'payload/types';
import { deepMerge } from '../../utils';
// import { check } from './check';
// import { checkCircle } from './check-circle';

const leaves: RichTextLeaf[] = [
  'bold',
  'italic',
  'underline',
  'strikethrough',
  'code'
];

const elements: RichTextElement[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'blockquote',
  'ul',
  'ol',
  'link',
  'upload',
  'indent'
  // check,
  // checkCircle
  // video
];

interface Args {
  label?: string | false;
  name?: string;
  required?: boolean;
  condition?: (data: any, siblingData: any) => boolean;
}

export const RichText = (args?: Args): Field => {
  const { label, name = 'richText', required, condition } = args || {};

  return deepMerge<RichTextField, Partial<RichTextField>>(
    {
      name,
      label: typeof label === 'boolean' ? label : label || 'Rich Text',
      type: 'richText',
      required,
      localized: true,
      admin: {
        elements: [...elements],
        leaves: [...leaves],
        condition
      }
    },
    {}
  );
};
