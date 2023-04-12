import { Button, ChakraProps, Flex } from '@chakra-ui/react';
import { CallToAction, CallToActionProps } from './CallToAction';

export interface ButtonCallToActionProps
  extends Omit<CallToActionProps, 'children'>,
    Pick<ChakraProps, 'bgColor' | 'color'> {
  label: string;
}

export const ButtonCallToAction = ({
  label,
  type,
  page,
  url,
  color
}: ButtonCallToActionProps) => (
  <Flex align="center" gap={2} color={color}>
    <CallToAction type={type} page={page} url={url}>
      <Button
        color="text.light"
        bgColor="background.blue"
        fontWeight="normal"
        _hover={{ color: 'text.light', bgColor: 'background.blue' }}
      >
        {label}
      </Button>
    </CallToAction>
  </Flex>
);
