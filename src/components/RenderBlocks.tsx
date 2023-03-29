import React from 'react';
import { components } from '../blocks';
import { PageLayout } from '../collections';

type RenderBlocksProps = {
  layout: PageLayout[];
};

export const RenderBlocks = ({ layout }: RenderBlocksProps) => (
  <div>
    {layout.map((block, i) => {
      const Block: React.FC<any> = components[block.type];

      if (Block) {
        return (
          <section key={i}>
            <Block {...block} />
          </section>
        );
      }

      return null;
    })}
  </div>
);
