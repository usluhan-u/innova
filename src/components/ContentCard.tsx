import React from 'react';
import {
  Card as ChakraCard,
  CardBody as ChakraCardBody,
  CardFooter as ChakraCardFooter
} from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { TextIconCallToAction } from './TextIconCallToAction';
import { ContentCardGroupItemType } from '../blocks';
import { RichText } from './RichText';

export interface ContentCardProps {
  contentCard: ContentCardGroupItemType;
}

export const ContentCard = ({ contentCard }: ContentCardProps) => (
  <ChakraCard overflow="hidden" minH="80">
    <ChakraCardBody>
      <RichText content={contentCard.content} />
    </ChakraCardBody>
    <ChakraCardFooter justify="space-between" flexWrap="wrap">
      {contentCard.callToAction &&
        Object.keys(contentCard.callToAction).length > 0 && (
          <TextIconCallToAction
            {...contentCard.callToAction}
            color="text.blue"
            icon={FiArrowRight}
          />
        )}
    </ChakraCardFooter>
  </ChakraCard>
);
