import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  Width,
  Card as CardField,
  CardType as CardFieldType,
  WidthType
} from '../fields';

export interface CardType {
  blockType: 'card';
  backgroundColor: BackgroundColorType;
  width: WidthType;
  card: CardFieldType;
}

export const Card: Block = {
  slug: 'card',
  labels: {
    singular: 'Card',
    plural: 'Cards'
  },
  fields: [BackgroundColor, Width, CardField]
};
