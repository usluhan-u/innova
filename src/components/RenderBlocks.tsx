/* eslint-disable @typescript-eslint/no-explicit-any */
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { PageLayout } from '../collections';
import { BlockType } from '../types';
import { Content } from './Content';
import { Tabs } from './Tabs';
import { Accordion } from './Accordion';

export interface RenderBlocksProps {
  layout: PageLayout[];
}

const COMPONENTS: Record<BlockType, React.FC<any>> = {
  content: Content,
  tabs: Tabs,
  accordion: Accordion
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
