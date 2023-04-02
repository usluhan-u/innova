import { Grid, GridItem } from '@chakra-ui/react';
import { Media } from './Media';
import { RichText } from './RichText';
import { MediaContentAlignment, MediaContentType } from '../blocks';

export interface MediaContentProps extends MediaContentType {}

export const MediaContent = ({
  content,
  alignment,
  media
}: MediaContentProps) => {
  const getAlignment = (alignment: MediaContentAlignment) => {
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
        <Media
          media={media.media}
          caption={media.caption}
          size={media.size}
          backgroundColor={media.backgroundColor}
          blockType="media"
        />
      </GridItem>
    </Grid>
  );
};
