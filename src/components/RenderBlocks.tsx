import React from 'react';
import { PageLayout } from '../collections';
import { Content } from './Content';
import { v4 as uuidv4 } from 'uuid';

interface RenderBlocksProps {
  layout: PageLayout[];
}

const components = {
  content: Content,
  mediaBlock: () => null,
  mediaContent: () => null,
  mediaSlider: () => null
};

export const RenderBlocks = ({ layout }: RenderBlocksProps) => (
  <>
    {layout.map((block) => {
      const Block: React.FC<any> = components[block.blockType];

      return Block ? (
        <section key={uuidv4()}>{<Block {...block} />}</section>
      ) : null;
    })}
  </>
);
