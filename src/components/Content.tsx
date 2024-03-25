import React from 'react';
import { Flex, Grid, GridItem, VStack, Image, Box } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { FiArrowRight } from 'react-icons/fi';
import { ContentType } from '../blocks';
import { RichText } from './RichText';
import { Template } from './Template';
import { TextIconCallToAction } from './TextIconCallToAction';

export interface ContentProps extends ContentType {
  maxWidth?: string;
}

export const Content = ({
  backgroundColor,
  width,
  columns,
  maxWidth
}: ContentProps) => (
  <Template backgroundColor={backgroundColor} width={width} maxWidth={maxWidth}>
    <Grid
      templateColumns={{
        base: 'repeat(1, 1fr)',
        md: `repeat(${columns.length}, 1fr)`
      }}
      w="full"
      gap={6}
    >
      {columns.map((column) => (
        <GridItem key={uuidv4()}>
          <VStack align="flex-start">
            {column.icon && (
              <Box boxSize="64px">
                <Image
                  objectFit="fill"
                  src={column.icon.url}
                  alt={column.icon.alt}
                  boxSize="full"
                />
              </Box>
            )}
            <Flex justify={column.align} textAlign={column.align} w="full">
              <RichText content={column.content} />
            </Flex>
            {column.callToAction &&
              Object.keys(column.callToAction).length > 0 && (
                <TextIconCallToAction
                  {...column.callToAction}
                  color="text.dark"
                  icon={FiArrowRight}
                />
              )}
          </VStack>
        </GridItem>
      ))}
    </Grid>
  </Template>
);
