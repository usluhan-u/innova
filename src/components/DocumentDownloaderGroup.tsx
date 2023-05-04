import React from 'react';
import { Flex } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { DocumentDownloaderGroupType } from '../blocks';
import { AutoPosition } from './AutoPosition';
import { BackgroundColor } from './BackgroundColor';
import { DocumentDownloader } from './DocumentDownloader';

export interface DocumentDownloaderGroupProps
  extends DocumentDownloaderGroupType {}

export const DocumentDownloaderGroup = ({
  backgroundColor,
  items,
  width
}: DocumentDownloaderGroupProps) => (
  <BackgroundColor bgColor={backgroundColor}>
    <AutoPosition>
      <Flex flexDir="column" w={{ base: 'full', md: width }} gap={6}>
        {items.map((item) => (
          <DocumentDownloader key={uuidv4()} documentDownloader={item} />
        ))}
      </Flex>
    </AutoPosition>
  </BackgroundColor>
);
