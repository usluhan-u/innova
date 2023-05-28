import React from 'react';
import { Flex, Grid, GridItem, Spacer } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { TagGroupType } from '../blocks';
import { Tag } from './Tag';
import { Template } from './Template';

export interface TagGroupProps extends TagGroupType {}

export const TagGroup = ({
  backgroundColor,
  width,
  items,
  displayLayout
}: TagGroupProps) => (
  <Template backgroundColor={backgroundColor} width={width}>
    {(!displayLayout || displayLayout === 'grid') && (
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(5, 1fr)' }}
        w="full"
        gap={6}
      >
        {items.map((item) => (
          <GridItem key={uuidv4()}>
            <Tag tag={item} />
          </GridItem>
        ))}
      </Grid>
    )}

    {displayLayout === 'flex' && (
      <Flex
        flexDir={{ base: 'column', md: 'row' }}
        w="full"
        gap={{ base: 3, md: 6 }}
      >
        {items.map((item, index) => (
          <React.Fragment key={uuidv4()}>
            <Tag tag={item} />
            <>{index < items.length - 1 && <Spacer />}</>
          </React.Fragment>
        ))}
      </Flex>
    )}
  </Template>
);
