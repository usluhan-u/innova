import React from 'react';
import { Flex, Image } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { MediaContentType } from '../blocks';
import { RichText } from './RichText';
import { TextIconCallToAction } from './TextIconCallToAction';
import { Template } from './Template';

export interface MediaContentProps extends MediaContentType {}

export const MediaContent = ({
  content,
  contentPosition,
  image,
  callToAction,
  backgroundColor,
  width
}: MediaContentProps) => (
  <Template backgroundColor={backgroundColor} width={width}>
    <Flex
      w="full"
      flexDir={{ base: 'column', lg: 'row' }}
      gap={{ base: 5, lg: 10 }}
    >
      {contentPosition === 'right' && (
        <>
          <Image
            objectFit="fill"
            src={image.url}
            alt={image.alt}
            w="full"
            maxH="xl"
            borderRadius="lg"
          />
          <Flex flexDir="column" justify="space-between">
            <RichText content={content} />
            {callToAction && Object.keys(callToAction).length > 0 && (
              <TextIconCallToAction
                {...callToAction}
                color="text.blue"
                icon={FiArrowRight}
              />
            )}
          </Flex>
        </>
      )}
      {contentPosition === 'left' && (
        <>
          <Flex flexDir="column" justify="space-between">
            <RichText content={content} />
            {callToAction && Object.keys(callToAction).length > 0 && (
              <TextIconCallToAction
                {...callToAction}
                color="text.blue"
                icon={FiArrowRight}
              />
            )}
          </Flex>
          <Image
            objectFit="fill"
            src={image.url}
            alt={image.alt}
            w="full"
            maxH="xl"
            borderRadius="lg"
          />
        </>
      )}
    </Flex>
  </Template>
);
