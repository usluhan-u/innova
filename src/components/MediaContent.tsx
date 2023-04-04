import { Flex, SimpleGrid, VStack } from '@chakra-ui/react';
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
    <Flex gap={{ base: 6, md: 16 }} flexDirection="column">
      {header && (
        <RichText content={header.content} textAlign={header.alignment} />
      )}
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        alignItems="center"
        justifyContent={{ base: 'center', md: 'space-between' }}
        spacing={{ base: 4, md: 16 }}
        w="full"
      >
        <MediaViewer media={content.media} size={{ w: 'full', h: 'full' }} />
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
      </SimpleGrid>
    </Flex>
  );
};
