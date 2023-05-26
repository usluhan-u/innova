import React from 'react';
import { ChakraProps, Flex, Icon, Text } from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { CallToAction, CallToActionProps } from './CallToAction';

export interface TextIconCallToActionProps
  extends Omit<CallToActionProps, 'children'>,
    ChakraProps {
  icon: IconType;
  label: string;
}

export const TextIconCallToAction = ({
  label,
  type,
  page,
  url,
  icon,
  color,
  ...rest
}: TextIconCallToActionProps) => (
  <Flex align="center" gap={2} color={color}>
    <CallToAction type={type} page={page} url={url} {...rest}>
      <Text
        transition="all 100ms ease"
        _hover={{ textDecoration: 'none', letterSpacing: '2px' }}
      >
        {label}
      </Text>
    </CallToAction>
    <Icon as={icon} />
  </Flex>
);
