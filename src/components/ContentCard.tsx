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
  <ChakraCard overflow="hidden">
    <ChakraCardBody>
      <RichText content={contentCard.content} />
    </ChakraCardBody>

    <ChakraCardFooter justify="space-between" flexWrap="wrap">
      {contentCard.callToActionToggle.enableCallToAction &&
        contentCard.callToActionToggle.callToAction && (
          <TextIconCallToAction
            {...contentCard.callToActionToggle.callToAction}
            color="text.blue"
            icon={FiArrowRight}
          />
        )}
    </ChakraCardFooter>
  </ChakraCard>
);
