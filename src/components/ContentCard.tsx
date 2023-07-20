import React from 'react';
import {
  Box,
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
  <ChakraCard overflow="hidden">
    <ChakraCardBody>
      <Box w="full" h="36">
        <RichText content={contentCard.content} />
      </Box>
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
