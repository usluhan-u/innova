import { Block } from 'payload/types';
import {
  BackgroundColor,
  BackgroundColorType,
  Card,
  CardType,
  Width,
  WidthType
} from '../fields';

export interface CardGroupType {
  blockType: 'cardGroup';
  backgroundColor: BackgroundColorType;
  width: WidthType;
  cards: {
    card: CardType;
  }[];
}

export const CardGroup: Block = {
  slug: 'cardGroup',
  labels: {
    singular: 'Card Group',
    plural: 'Card Groups'
  },
  fields: [
    BackgroundColor,
    Width,
    {
      name: 'cards',
      label: 'Cards',
      type: 'array',
      minRows: 1,
      fields: [Card]
    }
  ]
};
