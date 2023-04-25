import { Field, RichTextField } from 'payload/types';
import {
  RichTextElement,
  RichTextLeaf
} from 'payload/dist/fields/config/types';
import { deepMerge } from '../utils';

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
  // video
];

export const RichText: Field = deepMerge<RichTextField, Partial<RichTextField>>(
  {
    name: 'richText',
    type: 'richText',
    required: true,
    localized: true,
    admin: {
      elements: [...elements],
      leaves: [...leaves]
    }
  },
  {}
);
