/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Flex } from '@chakra-ui/react';
import { PageLayout } from '../collections';
import { Content } from './Content';
import { Media } from './Media';
import { MediaContent } from './MediaContent';
import { MediaSlider } from './MediaSlider';
import { CallToAction } from './CallToAction';
import { BackgroundColorType } from '../fields';
import { Template } from './Template';
import { Tabs } from './Tabs';

interface RenderBlocksProps {
  layout: PageLayout[];
  paddingY?: string | number;
}

const components: Record<string, React.FC<any>> = {
  content: Content,
  media: Media,
  mediaContent: MediaContent,
  mediaSlider: MediaSlider,
  callToAction: CallToAction,
  tabs: Tabs
};

export const RenderBlocks = ({ layout, paddingY = 20 }: RenderBlocksProps) => {
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

        return (
          <Template
            key={uuidv4()}
            backgroundColor={
              block.blockType !== 'callToAction'
                ? getBackgroundColor(block.backgroundColor)
                : 'transparent'
            }
          >
            {Block ? (
              <Flex py={paddingY} w="full">
                <Block {...block} />
              </Flex>
            ) : null}
          </Template>
        );
      })}
    </>
  );
};
