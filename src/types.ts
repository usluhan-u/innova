import { ContentType, TabsType, AccordionType } from './blocks';

export type BlockType =
  | ContentType['blockType']
  | TabsType['blockType']
  | AccordionType['blockType'];
