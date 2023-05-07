import React from 'react';
import { Flex } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { DocumentDownloaderGroupType } from '../blocks';
import { DocumentDownloader } from './DocumentDownloader';
import { Template } from './Template';

export interface DocumentDownloaderGroupProps
  extends DocumentDownloaderGroupType {}

export const DocumentDownloaderGroup = ({
  backgroundColor,
  items,
  width
}: DocumentDownloaderGroupProps) => (
  <Template backgroundColor={backgroundColor} width={width}>
    <Flex flexDir="column" w="full" gap={6}>
      {items.map((item) => (
        <DocumentDownloader key={uuidv4()} documentDownloader={item} />
      ))}
    </Flex>
  </Template>
);
