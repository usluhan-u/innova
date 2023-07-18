/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Button,
  Center,
  Checkbox,
  Icon,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Select,
  Textarea,
  VStack
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import {
  FormFieldBlock,
  SelectFieldOption
} from '@payloadcms/plugin-form-builder/types';
import { FormType } from '../blocks';
import { RichText, RichTextContentType } from './RichText';
import { BackgroundColor } from './BackgroundColor';
import { Width } from './Width';
import { Chat } from '../icons';

interface FormProps extends Omit<FormType, 'blockType'> {}

const fields: Record<string, React.FC<any>> = {
  text: ({ label }: { label: string }) => <Input placeholder={label} />,
  textarea: ({ label }: { label: string }) => <Textarea placeholder={label} />,
  select: ({
    label,
    options
  }: {
    label: string;
    options: SelectFieldOption[];
  }) => (
    <Select placeholder={label} w="full">
      {options.map((option) => (
        <option key={uuidv4()} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  ),
  checkbox: ({ label }: { label: string }) => <Checkbox>{label}</Checkbox>,
  email: ({ label }: { label: string }) => (
    <Input type="email" placeholder={label} />
  ),
  message: ({ message }: { message: RichTextContentType[] }) => (
    <RichText content={message} />
  )
};

const Field = ({ blockType, ...restOfField }: FormFieldBlock) => {
  const Field = fields[blockType];

  if (Field) {
    return <Field borderColor="border.primary" {...restOfField} />;
  }

  return null;
};

export const FormContent = ({ backgroundColor, width, form }: FormProps) => (
  <BackgroundColor bgColor={backgroundColor}>
    <Center w="full">
      <Width value={width}>
        <VStack align="stretch" w="full">
          <Center textAlign="center">
            <RichText content={form.leader} />
          </Center>
          {form.type === 'default' && form.fields.length === 1 ? (
            <InputGroup size="md">
              <Field {...form.fields[0]} />
              <InputRightElement w="6rem">
                <Button
                  size="sm"
                  color="text.light"
                  bgColor="background.blue.100"
                  width="fit-content"
                  _hover={{ bgColor: 'background.blue.100' }}
                >
                  {form.submitButtonLabel}
                </Button>
              </InputRightElement>
            </InputGroup>
          ) : (
            <>
              {form.fields.map((field) => (
                <Field key={uuidv4()} {...field} />
              ))}
              <Button
                color="text.light"
                bgColor="background.blue.100"
                width={{ base: 'full', md: 'fit-content' }}
                _hover={{ bgColor: 'background.blue.100' }}
              >
                {form.submitButtonLabel}
              </Button>
            </>
          )}
        </VStack>
      </Width>
    </Center>
  </BackgroundColor>
);

export const Form = ({ backgroundColor, width, form }: FormProps) => (
  <>
    {form.type === 'default' && (
      <FormContent
        backgroundColor={backgroundColor}
        width={width}
        form={form}
      />
    )}
    {form.type === 'float' && (
      <Popover placement="top-start">
        <PopoverTrigger>
          <Button
            pos="fixed"
            color="text.light"
            bgColor="background.blue.100"
            borderRadius="3xl"
            zIndex="overlay"
            left="calc(100vw - 15rem)"
            bottom="3.5rem"
            rightIcon={<Icon as={Chat} />}
            _hover={{ bgColor: 'background.blue.100' }}
          >
            {form.floatButtonLabel}
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverHeader borderBottom="none" />
            <PopoverCloseButton />
            <PopoverBody>
              <FormContent
                backgroundColor={backgroundColor}
                form={form}
                width="90%"
              />
            </PopoverBody>
            <PopoverFooter borderTop="none" />
          </PopoverContent>
        </Portal>
      </Popover>
    )}
  </>
);
