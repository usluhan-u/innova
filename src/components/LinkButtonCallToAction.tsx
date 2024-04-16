import React from 'react';
import { Button, ButtonProps, Flex } from '@chakra-ui/react';
import { CallToAction, CallToActionProps } from './CallToAction';

export interface LinkButtonCallToActionProps
  extends Omit<CallToActionProps, 'children'>,
    Pick<ButtonProps, 'bgColor' | 'color'> {
  label: string;
  active?: boolean;
}

export const LinkButtonCallToAction = ({
  label,
  type,
  page,
  url,
  color,
  active
}: LinkButtonCallToActionProps) => (
  <Flex align="center" gap={2} color={color}>
    <CallToAction type={type} page={page} url={url}>
      <Button
        variant="outline"
        color={active ? 'text.light' : 'text.secondary.100'}
        bgColor="transparent"
        fontWeight="normal"
        border="none"
        borderBottomWidth="5px"
        borderBottomStyle={active ? 'solid' : 'none'}
        borderBottomColor={active ? 'background.blue.100' : 'transparent'}
        borderRadius="none"
        _hover={{
          color: active ? 'text.light' : 'text.secondary.100',
          bgColor: 'transparent'
        }}
      >
        {label}
      </Button>
    </CallToAction>
  </Flex>
);
