import { Grid, GridItem, Image } from '@chakra-ui/react';
import { MediaContentType } from '../blocks';
import { AutoPosition } from './AutoPosition';
import { BackgroundColor } from './BackgroundColor';
import { RichText } from './RichText';

export interface MediaContentProps extends MediaContentType {}

export const MediaContent = ({
  backgroundColor,
  width,
  content,
  contentPosition,
  image
}: MediaContentProps) => (
  <BackgroundColor bgColor={backgroundColor}>
    <AutoPosition>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        w={{ base: 'full', md: width }}
      >
        {contentPosition === 'left' && (
          <>
            <GridItem>
              <Image
                objectFit="cover"
                src={image.url}
                alt={image.alt}
                w="xl"
                borderRadius="lg"
              />
            </GridItem>
            <GridItem>
              <RichText content={content} />
            </GridItem>
          </>
        )}

        {contentPosition === 'right' && (
          <>
            <GridItem>
              <RichText content={content} />
            </GridItem>
            <GridItem>
              <Image
                objectFit="cover"
                src={image.url}
                alt={image.alt}
                w="xl"
                borderRadius="lg"
              />
            </GridItem>
          </>
        )}
      </Grid>
    </AutoPosition>
  </BackgroundColor>
);
