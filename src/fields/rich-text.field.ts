import {
  RichTextElement,
  RichTextField,
  RichTextLeaf
} from 'payload/dist/fields/config/types';
import { deepMerge } from '../utils';
import { largeBody } from '../components/rich-text/large-body';

const leaves: RichTextLeaf[] = ['bold', 'italic', 'underline'];
const elements: RichTextElement[] = [
  'blockquote',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  largeBody
];

type RichText = (
  overrides?: Partial<RichTextField>,
  additions?: {
    elements?: RichTextElement[];
    leaves?: RichTextLeaf[];
  }
) => RichTextField;

export const RichText: RichText = (
  overrides,
  additions = {
    elements: [],
    leaves: []
  }
) =>
  deepMerge<RichTextField, Partial<RichTextField>>(
    {
      name: 'richText',
      type: 'richText',
      admin: {
        upload: {
          collections: {
            media: {
              fields: [
                {
                  type: 'richText',
                  name: 'caption',
                  label: 'Caption',
                  admin: {
                    elements: [...elements],
                    leaves: [...leaves]
                  }
                },
                {
                  type: 'radio',
                  name: 'alignment',
                  label: 'Alignment',
                  options: [
                    {
                      label: 'Left',
                      value: 'left'
                    },
                    {
                      label: 'Center',
                      value: 'center'
                    },
                    {
                      label: 'Right',
                      value: 'right'
                    }
                  ]
                },
                {
                  name: 'enableLink',
                  type: 'checkbox',
                  label: 'Enable Link'
                }
              ]
            }
          }
        },
        elements: [...elements, ...(additions.elements || [])],
        leaves: [...leaves, ...(additions.leaves || [])]
      }
    },
    overrides
  );
