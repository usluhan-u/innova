import {
  ContentType,
  TabsType,
  AccordionType,
  CardType,
  CardGroupType
} from './blocks';

export type BlockType =
  | ContentType['blockType']
  | TabsType['blockType']
  | AccordionType['blockType']
  | CardType['blockType']
  | CardGroupType['blockType'];
