/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Center,
  Checkbox,
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
import { FormFieldBlock } from '@payloadcms/plugin-form-builder/types';
import { FormType } from '../blocks';
import { RichText, RichTextProps } from './RichText';
import { BackgroundColor } from './BackgroundColor';
import { Width } from './Width';

interface FormProps extends Omit<FormType, 'blockType'> {}

const fields: Record<string, React.FC<any>> = {
  text: ({ label }) => <Input placeholder={label} />,
  textarea: ({ label }) => <Textarea placeholder={label} />,
  select: Select,
  checkbox: ({ label }) => <Checkbox>{label}</Checkbox>,
  email: ({ label }) => <Input type="email" placeholder={label} />,
  message: (props: RichTextProps) => <RichText content={props.content} />
};

const Field = ({ blockType, ...restOfField }: FormFieldBlock) => {
  const Field = fields[blockType];

  if (Field) {
    return <Field borderColor="border.primary" {...restOfField} />;
  }

  return null;
};

const FormContent = ({ backgroundColor, width, form }: FormProps) => (
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
                  bgColor="background.blue"
                  width="fit-content"
                  _hover={{ bgColor: 'background.blue' }}
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
                bgColor="background.blue"
                width="fit-content"
                _hover={{ bgColor: 'background.blue' }}
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
            bgColor="background.blue"
            borderRadius="3xl"
            zIndex="overlay"
            left="calc(100vw - 10rem)"
            top="calc(100vh - 5rem)"
            _hover={{ bgColor: 'background.blue' }}
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
                width="100%"
              />
            </PopoverBody>
            <PopoverFooter borderTop="none" />
          </PopoverContent>
        </Portal>
      </Popover>
    )}
  </>
);
