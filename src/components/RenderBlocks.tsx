import React from 'react';
import { PageLayout } from '../collections';
import { Content } from './Content';
import { v4 as uuidv4 } from 'uuid';
import { Media } from './Media';
import { MediaContent } from './MediaContent';
import { MediaSlider } from './MediaSlider';
import { CallToAction } from './CallToAction';

interface RenderBlocksProps {
  layout: PageLayout[];
}

const components = {
  content: Content,
  media: Media,
  mediaContent: MediaContent,
  mediaSlider: MediaSlider,
  callToAction: CallToAction
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
