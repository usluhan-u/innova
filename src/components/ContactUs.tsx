import { ChatIcon } from '@chakra-ui/icons';
import {
  Flex,
  Button,
  Text,
  Input,
  Textarea,
  Portal,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import { ContactUsType, InputType } from '../globals';

export interface ContactUsProps extends ContactUsType {}

export const ContactUs = ({ stickyButtonLabel, form }: ContactUsProps) => (
  <Popover placement="top-start">
    <PopoverTrigger>
      <Button
        rightIcon={<ChatIcon />}
        colorScheme="blue"
        borderRadius="3xl"
        right={50}
        bottom={50}
        position="fixed"
        zIndex="overlay"
      >
        {stickyButtonLabel}
      </Button>
    </PopoverTrigger>
    <Portal>
      <PopoverContent>
        <PopoverHeader borderBottom="none" />
        <PopoverCloseButton />
        <PopoverBody>
          <Flex flexDirection="column" alignItems="center" gap={6}>
            <Text fontWeight={500} color="text.primary">
              {form.title}
            </Text>
            <Text color="text.secondary">{form.description}</Text>
            <Flex flexDirection="column" gap={4} w="full">
              {form.inputs?.map((input) => {
                const inputMap: Record<InputType, React.ReactNode> = {
                  text: (
                    <Input
                      key={uuidv4()}
                      placeholder={input.inputGroup.placeholder}
                    />
                  ),
                  textarea: (
                    <Textarea
                      key={uuidv4()}
                      placeholder={input.inputGroup.placeholder}
                    />
                  ),
                  email: (
                    <Input
                      type="email"
                      key={uuidv4()}
                      placeholder={input.inputGroup.placeholder}
                    />
                  ),
                  tel: (
                    <Input
                      type="tel"
                      key={uuidv4()}
                      placeholder={input.inputGroup.placeholder}
                    />
                  )
                };

                return inputMap[input.inputGroup.type];
              })}
            </Flex>
            <Button colorScheme="blue" w="full">
              {form.sendButtonLabel}
            </Button>
          </Flex>
        </PopoverBody>
        <PopoverFooter borderTop="none" />
      </PopoverContent>
    </Portal>
  </Popover>
);
