/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { BlockType, PageLayout } from '../collections';
import { Accordion } from './Accordion';
import { CardGroup } from './CardGroup';
import { ImageTagGroup } from './ImageTagGroup';
import { TagGroup } from './TagGroup';
import { Content } from './Content';
import { MediaContent } from './MediaContent';

export interface RenderBlocksProps {
  layout: PageLayout[];
}

const COMPONENTS: Record<BlockType, React.FC<any>> = {
  accordion: Accordion,
  cardGroup: CardGroup,
  imageTagGroup: ImageTagGroup,
  tagGroup: TagGroup,
  content: Content,
  mediaContent: MediaContent
};

export const RenderBlocks = ({ layout }: RenderBlocksProps) => (
  <>
    {layout.map((block) => {
      const Block = COMPONENTS[block.blockType];

      return (
        <React.Fragment key={uuidv4()}>
          {Block && <Block {...block} />}
        </React.Fragment>
      );
    })}
  </>
);
