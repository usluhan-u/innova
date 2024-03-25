import React from 'react';
import { Grid, GridItem, VStack, Text, Flex } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { FiArrowRight } from 'react-icons/fi';
import { FlippableCardGroupType } from '../blocks';
import { UnstyledFlippableCard } from './FlippableCard';
import { Template } from './Template';
import { TextIconCallToAction } from './TextIconCallToAction';

export interface FlippableCardGroupProps extends FlippableCardGroupType {}

export const FlippableCardGroup = ({
  backgroundColor,
  width,
  items,
  title,
  callToAction
}: FlippableCardGroupProps) => (
  <Template backgroundColor={backgroundColor} width={width}>
    <VStack align="flex-start" w="full" gap={3}>
      <Flex w="full" align="center" justify="space-between">
        <Text color="text.primary" fontSize="4xl">
          {title}
        </Text>
        {callToAction && Object.keys(callToAction).length > 0 ? (
          <TextIconCallToAction
            label={callToAction.label}
            type={callToAction.type}
            page={callToAction.page}
            color="text.dark"
            icon={FiArrowRight}
          />
        ) : null}
      </Flex>
      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }}
        w="full"
      >
        {items.map((item) => (
          <GridItem key={uuidv4()}>
            <UnstyledFlippableCard {...item} blockType="flippableCard" />
          </GridItem>
        ))}
      </Grid>
    </VStack>
  </Template>
);
