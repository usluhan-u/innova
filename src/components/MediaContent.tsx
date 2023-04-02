import { Grid, GridItem, VStack } from '@chakra-ui/react';
import { RichText } from './RichText';
import { MediaContentAlignment, MediaContentType } from '../blocks';
import { MediaViewer } from './MediaViewer';
import { ExternalLink } from './ExternalLink';

export interface MediaContentProps extends MediaContentType {}

export const MediaContent = ({ header, content }: MediaContentProps) => {
  const getAlignment = (alignment: MediaContentAlignment) => {
    const alignmentMap: Record<string, string> = {
      contentOnLeft: '1',
      contentOnRight: '2'
    };

    return alignmentMap[alignment] || alignmentMap.contentOnLeft;
  };

  return (
    <VStack spacing={16} align="stretch">
      {header && (
        <RichText content={header.content} textAlign={header.alignment} />
      )}
      <Grid
        templateColumns="repeat(2, 1fr)"
        alignItems="center"
        justifyContent="space-between"
        gap={16}
        w="full"
      >
        <GridItem gridRow="1" gridColumn={getAlignment(content.alignment)}>
          <VStack alignItems="normal" spacing={4}>
            <RichText content={content.content} />
            {content.externalLink && (
              <ExternalLink
                href={content.externalLink?.url}
                newTab={content.externalLink.newTab}
              >
                {content.externalLink?.label}
              </ExternalLink>
            )}
          </VStack>
        </GridItem>
        <GridItem gridRow="1">
          <MediaViewer media={content.media} size={{ w: 'full', h: 'full' }} />
        </GridItem>
      </Grid>
    </VStack>
  );
};
