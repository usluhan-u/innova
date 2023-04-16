import { Flex, Grid, GridItem, Image } from '@chakra-ui/react';
import { FiArrowRight } from 'react-icons/fi';
import { MediaContentType } from '../blocks';
import { AutoPosition } from './AutoPosition';
import { BackgroundColor } from './BackgroundColor';
import { RichText } from './RichText';
import { TextIconCallToAction } from './TextIconCallToAction';

export interface MediaContentProps extends MediaContentType {}

export const MediaContent = ({
  backgroundColor,
  width,
  content,
  contentPosition,
  image,
  callToActionToggle
}: MediaContentProps) => (
  <BackgroundColor bgColor={backgroundColor}>
    <AutoPosition>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        w={{ base: 'full', md: width }}
        gap={8}
      >
        {contentPosition === 'left' && (
          <>
            <GridItem>
              <Image
                objectFit="cover"
                src={image.url}
                alt={image.alt}
                boxSize="full"
                borderRadius="lg"
              />
            </GridItem>
            <GridItem>
              <Flex flexDir="column" justify="space-between">
                <RichText content={content} />
                {callToActionToggle.enableCallToAction &&
                  callToActionToggle.callToAction && (
                    <TextIconCallToAction
                      {...callToActionToggle.callToAction}
                      color="text.blue"
                      icon={FiArrowRight}
                    />
                  )}
              </Flex>
            </GridItem>
          </>
        )}

        {contentPosition === 'right' && (
          <>
            <GridItem>
              <Flex flexDir="column" justify="space-between" boxSize="full">
                <RichText content={content} />
                {callToActionToggle.enableCallToAction &&
                  callToActionToggle.callToAction && (
                    <TextIconCallToAction
                      {...callToActionToggle.callToAction}
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
                boxSize="full"
              />
            </GridItem>
          </>
        )}
      </Grid>
    </AutoPosition>
  </BackgroundColor>
);
