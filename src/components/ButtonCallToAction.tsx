import React from 'react';
import { Button, ButtonProps, Center } from '@chakra-ui/react';
import { CallToAction, CallToActionProps } from './CallToAction';

export interface ButtonCallToActionProps
  extends Omit<CallToActionProps, 'children'>,
    Pick<ButtonProps, 'bgColor' | 'color' | 'leftIcon' | 'rightIcon' | 'size'> {
  label: string;
}

export const ButtonCallToAction = ({
  label,
  type,
  page,
  url,
  newTab,
  color = 'text.light',
  leftIcon,
  rightIcon,
  bgColor = 'background.blue.100',
  size = 'sm'
}: ButtonCallToActionProps) => (
  <Center color={color}>
    <CallToAction type={type} page={page} url={url} newTab={newTab}>
      <Button
        color={color}
        bgColor={bgColor}
        fontWeight="normal"
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        size={size}
        _hover={{ color, bgColor }}
      >
        {label}
      </Button>
    </CallToAction>
  </Center>
);
