import { Grid, GridItem } from '@chakra-ui/react';
import { Media } from './Media';
import { RichText } from './RichText';
import { Media as MediaType } from '../payload-types';

type alignment = 'contentOnLeft' | 'contentOnRight';

export interface MediaContentProps {
  blockType: 'mediaContent';
  alignment: alignment;
  content: unknown;
  media: MediaType;
}

export const MediaContent = ({
  content,
  alignment,
  media
}: MediaContentProps) => {
  const getAlignment = (alignment: alignment) => {
    const alignmentMap: Record<string, string> = {
      contentOnLeft: '1',
      contentOnRight: '2'
    };

    return alignmentMap[alignment] || alignmentMap.contentOnLeft;
  };

  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={8}>
      <GridItem gridRow="1" gridColumn={getAlignment(alignment)}>
        <RichText content={content} />
      </GridItem>
      <GridItem gridRow="1">
        <Media media={media} blockType="media" />
      </GridItem>
    </Grid>
  );
};
