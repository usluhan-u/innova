import React from 'react';
import { Flex, Grid, GridItem, Image } from '@chakra-ui/react';
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
    <Grid
      templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
      alignItems={{ base: 'normal', md: 'center' }}
      w="full"
      gap={10}
    >
      {contentPosition === 'right' && (
        <>
          <GridItem>
            <Image
              objectFit="cover"
              src={image.url}
              alt={image.alt}
              w="full"
              h="full"
              maxH="2xl"
              borderRadius="lg"
            />
          </GridItem>
          <GridItem>
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
          </GridItem>
        </>
      )}

      {contentPosition === 'left' && (
        <>
          <GridItem>
            <Flex flexDir="column" justify="space-between" boxSize="full">
              <RichText content={content} />
              {callToAction && Object.keys(callToAction).length > 0 && (
                <TextIconCallToAction
                  {...callToAction}
                  color="text.blue"
                  icon={FiArrowRight}
                />
              )}
            </Flex>
          </GridItem>
          <GridItem>
            <Image
              objectFit="cover"
              src={image.url}
              alt={image.alt}
              borderRadius="lg"
              w="full"
              h={{ base: 'full', md: 'md' }}
            />
          </GridItem>
        </>
      )}
    </Grid>
  </Template>
);
