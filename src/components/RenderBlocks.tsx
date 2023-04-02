/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Box } from '@chakra-ui/react';
import { PageLayout } from '../collections';
import { Content } from './Content';
import { Media } from './Media';
import { MediaContent } from './MediaContent';
import { MediaSlider } from './MediaSlider';
import { CallToAction } from './CallToAction';
import { BackgroundColorType } from '../fields';

interface RenderBlocksProps {
  layout: PageLayout[];
}

const components: Record<string, React.FC<any>> = {
  content: Content,
  media: Media,
  mediaContent: MediaContent,
  mediaSlider: MediaSlider,
  callToAction: CallToAction
};

export const RenderBlocks = ({ layout }: RenderBlocksProps) => {
  const getBackgroundColor = (layoutBgColor: BackgroundColorType) => {
    const backgroundColorMap: Record<BackgroundColorType, string> = {
      white: 'background.primary',
      gray: 'background.secondary'
    };

    return backgroundColorMap[layoutBgColor];
  };

  return (
    <>
      {layout.map((block) => {
        const Block: React.FC<any> = components[block.blockType];

        return Block ? (
          <Box
            key={uuidv4()}
            py="20"
            backgroundColor={
              block.blockType !== 'callToAction'
                ? getBackgroundColor(block.backgroundColor)
                : 'transparent'
            }
          >
            <Block {...block} />
          </Box>
        ) : null;
      })}
    </>
  );
};
