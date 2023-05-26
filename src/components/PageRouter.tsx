import React from 'react';
import { Center, VStack } from '@chakra-ui/react';
import { PageRouterType } from '../blocks';
import { Template } from './Template';
import { RichText } from './RichText';
import { ButtonCallToAction } from './ButtonCallToAction';

interface PageRouterProps extends PageRouterType {}

export const PageRouter = ({
  backgroundColor,
  content,
  width,
  callToAction
}: PageRouterProps) => (
  <Template backgroundColor={backgroundColor} width={width}>
    <VStack w="full">
      <Center textAlign="center">
        <RichText content={content} color="text.light" />
      </Center>
      <Center>
        {callToAction && Object.keys(callToAction).length > 0 && (
          <ButtonCallToAction
            {...callToAction}
            bgColor="background.primary"
            color="text.primary"
          />
        )}
      </Center>
    </VStack>
  </Template>
);
