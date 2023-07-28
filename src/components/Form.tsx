/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Button,
  ButtonProps,
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
import { FormSubmit } from './FormSubmit';

interface FormProps extends Omit<FormType, 'blockType'> {}

interface SubmitButtonProps extends ButtonProps {
  label: string;
}

const fields: Record<string, React.FC<any>> = {
  text: ({ label, name }: { label: string; name: string }) => (
    <Input placeholder={label} name={name} id={name} />
  ),
  textarea: ({ label, name }: { label: string; name: string }) => (
    <Textarea placeholder={label} name={name} id={name} />
  ),
  select: ({
    label,
    name,
    options
  }: {
    label: string;
    name: string;
    options: SelectFieldOption[];
  }) => (
    <Select placeholder={label} name={name} id={name} w="full">
      {options.map((option) => (
        <option key={uuidv4()} value={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  ),
  checkbox: ({ label, name }: { label: string; name: string }) => (
    <Checkbox name={name} id={name}>
      {label}
    </Checkbox>
  ),
  email: ({ label, name }: { label: string; name: string }) => (
    <Input type="email" placeholder={label} name={name} id={name} />
  ),
  message: ({ message }: { message: RichTextContentType[] }) => (
    <RichText content={message} />
  )
};

const Field = ({
  blockType,
  ...rest
}: FormFieldBlock & {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const Field = fields[blockType];

  if (Field) {
    return <Field borderColor="border.primary" {...rest} />;
  }

  return null;
};

const SubmitButton = ({ label, ...rest }: SubmitButtonProps) => (
  <Button
    type="submit"
    color="text.light"
    bgColor="background.blue.100"
    _hover={{ bgColor: 'background.blue.100' }}
    {...rest}
  >
    {label}
  </Button>
);

export const FormContent = ({ backgroundColor, width, form }: FormProps) => {
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  }, [submitted]);

  return (
    <BackgroundColor bgColor={backgroundColor}>
      <Center w="full">
        <Width value={width}>
          {submitted ? (
            <Center>
              <RichText content={form.confirmationMessage} />
            </Center>
          ) : (
            <VStack align="stretch" w="full">
              <Center textAlign="center">
                <RichText content={form.leader} />
              </Center>
              {form.type === 'default' && form.fields.length === 1 ? (
                <InputGroup size="md">
                  <Field {...form.fields[0]} />
                  <InputRightElement w="6rem">
                    <SubmitButton
                      label={form.submitButtonLabel || ''}
                      size="sm"
                      width="fit-content"
                    />
                  </InputRightElement>
                </InputGroup>
              ) : (
                <FormSubmit
                  formId={form.id}
                  submitButton={
                    <SubmitButton
                      label={form.submitButtonLabel || ''}
                      width={{ base: 'full', md: 'fit-content' }}
                    />
                  }
                  setSubmitted={setSubmitted}
                >
                  {form.fields.map((field) => (
                    <Field key={uuidv4()} {...field} />
                  ))}
                </FormSubmit>
              )}
            </VStack>
          )}
        </Width>
      </Center>
    </BackgroundColor>
  );
};

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
            <PopoverBody maxH={{ md: 'sm', '2xl': 'full' }} overflowY="auto">
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
