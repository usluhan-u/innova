import { Grid, GridItem } from '@chakra-ui/react';
import { Media } from './Media';
import { RichText, RichTextNode } from './RichText';
import { Media as MediaType } from '../payload-types';

type Alignment = 'contentOnLeft' | 'contentOnRight';

export interface MediaContentProps {
  blockType: 'mediaContent';
  alignment: Alignment;
  content: RichTextNode[];
  media: MediaType;
}

export const MediaContent = ({
  content,
  alignment,
  media
}: MediaContentProps) => {
  const getAlignment = (alignment: Alignment) => {
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
