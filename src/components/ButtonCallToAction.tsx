import { Button, ButtonProps, Flex } from '@chakra-ui/react';
import { CallToAction, CallToActionProps } from './CallToAction';

export interface ButtonCallToActionProps
  extends Omit<CallToActionProps, 'children'>,
    Pick<ButtonProps, 'bgColor' | 'color' | 'leftIcon' | 'rightIcon'> {
  label: string;
}

export const ButtonCallToAction = ({
  label,
  type,
  page,
  url,
  color,
  leftIcon,
  rightIcon
}: ButtonCallToActionProps) => (
  <Flex align="center" gap={2} color={color}>
    <CallToAction type={type} page={page} url={url}>
      <Button
        color="text.light"
        bgColor="background.blue"
        fontWeight="normal"
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        _hover={{ color: 'text.light', bgColor: 'background.blue' }}
      >
        {label}
      </Button>
    </CallToAction>
  </Flex>
);
