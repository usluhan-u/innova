import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  CallToAction,
  CallToActionType,
  RichText,
  Width,
  WidthType
} from '../fields';
import { RichTextContentType } from '../components';

export interface PageRouterType {
  blockType: 'pageRouter';
  backgroundColor: BackgroundColorType;
  width: WidthType;
  content: RichTextContentType[];
  callToAction: CallToActionType;
}

export const PageRouter: Block = {
  slug: 'pageRouter',
  labels: {
    singular: 'Page Router',
    plural: 'Page Routers'
  },
  fields: [
    BackgroundColor,
    Width,
    RichText({ name: 'content', label: 'Content', required: true }),
    CallToAction({ label: false, required: true })
  ]
};
