import React from 'react';
import { Box, Flex, Text, VStack } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { BackgroundImage } from './BackgroundImage';
import { PostType } from '../collections';
import { CallToActionType } from '../fields';
import { TextIconCallToAction } from './TextIconCallToAction';

interface FlippableCardProps
  extends Pick<PostType, 'featuredImage' | 'category' | 'name'> {
  callToAction?: CallToActionType;
}

export const FlippableCard = ({
  featuredImage: backgroundImage,
  name,
  category,
  callToAction
}: FlippableCardProps) => {
  const [flipped, setFlipped] = React.useState(false);

  return (
    <Box
      pos="relative"
      bgColor="background.primary"
      h="64"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <Flex pos="relative" boxSize="full">
        <Flex
          boxSize="full"
          pos="relative"
          transform={`rotateY(${flipped ? 180 : 0}deg)`}
          transition="all 1s ease-in-out"
          cursor="pointer"
          sx={{
            backfaceVisibility: 'hidden'
          }}
        >
          <BackgroundImage url={backgroundImage.url} />
        </Flex>
        <VStack
          boxSize="full"
          align="stretch"
          justify="space-between"
          pos="absolute"
          transform={`rotateY(${flipped ? 0 : -180}deg)`}
          transition="all 1s ease-in-out"
          cursor="pointer"
          sx={{
            backfaceVisibility: 'hidden'
          }}
        >
          {category && <Text>{category.name}</Text>}
          {name && <Text>{name}</Text>}
          {callToAction && Object.keys(callToAction).length > 0 && (
            <TextIconCallToAction
              {...callToAction}
              color="text.blue"
              icon={FiArrowRight}
            />
          )}
        </VStack>
      </Flex>
    </Box>
  );
};
