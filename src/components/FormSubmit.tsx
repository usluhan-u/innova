/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import React from 'react';
import {
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
  Select,
  Text,
  Textarea,
  VStack
} from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { UseFormRegister, useForm } from 'react-hook-form';
import {
  FormFieldBlock,
  SelectFieldOption
} from '@payloadcms/plugin-form-builder/types';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { Language, useLanguage } from '../contexts';
import { submitForm } from '../api';
import { RichText, RichTextContentType } from './RichText';
import { ExternalLink } from './ExternalLink';

export interface FormValues {
  [k: string]: string;
}

interface FormSubmitProps {
  formId: string;
  children: React.ReactNode | React.ReactNode[];
  submitButton: React.ReactNode;
  message?: string;
  setSubmitted: (value: boolean) => void;
}

const fields: Record<string, React.FC<any>> = {
  text: ({
    label,
    name,
    language,
    required,
    register
  }: {
    label: string;
    name: string;
    language: Language;
    required: boolean;
    register: UseFormRegister<any>;
  }) => (
    <Input
      {...register(name, {
        required: required
          ? language === 'tr'
            ? `Lütfen ${label} alanını doldurunuz`
            : language === 'en'
            ? `Please fill in the ${label} field`
            : 'Unknown language'
          : false
      })}
      placeholder={label}
      name={name}
      id={name}
    />
  ),
  textarea: ({
    label,
    name,
    language,
    required,
    register
  }: {
    label: string;
    name: string;
    language: Language;
    required: boolean;
    register: UseFormRegister<any>;
  }) => (
    <Textarea
      {...register(name, {
        required: required
          ? language === 'tr'
            ? `Lütfen ${label} alanını doldurunuz`
            : language === 'en'
            ? `Please fill in the ${label} field`
            : 'Unknown language'
          : false
      })}
      placeholder={label}
      name={name}
      id={name}
    />
  ),
  select: ({
    label,
    name,
    options,
    language,
    required,
    register
  }: {
    label: string;
    name: string;
    options: SelectFieldOption[];
    language: Language;
    required: boolean;
    register: UseFormRegister<any>;
  }) => (
    <Select
      {...register(name, {
        required: required
          ? language === 'tr'
            ? `Lütfen ${label} alanını doldurunuz`
            : language === 'en'
            ? `Please fill in the ${label} field`
            : 'Unknown language'
          : false
      })}
      placeholder={label}
      name={name}
      id={name}
      w="full"
    >
      {options.map((option) => (
        <option key={uuidv4()} value={option.value.trim()}>
          {option.label}
        </option>
      ))}
    </Select>
  ),
  checkbox: ({
    label,
    name,
    link,
    url,
    language,
    required,
    register
  }: {
    label: string;
    name: string;
    link: boolean;
    url?: string;
    language: Language;
    required: boolean;
    register: UseFormRegister<any>;
  }) => (
    <>
      {link && url ? (
        <Flex align="center" gap="2">
          <Checkbox
            {...register(name, {
              required: required
                ? language === 'tr'
                  ? `Lütfen ${label} alanını doldurunuz`
                  : language === 'en'
                  ? `Please fill in the ${label} field`
                  : 'Unknown language'
                : false
            })}
            name={name}
            id={name}
          />
          <ExternalLink
            href={url}
            textDecor="underline"
            _hover={{ textDecor: 'underline' }}
            newTab
          >
            <Text fontSize="sm">{label}</Text>
          </ExternalLink>
        </Flex>
      ) : (
        <Checkbox
          {...register(name, {
            required: required
              ? language === 'tr'
                ? `Lütfen ${label} alanını doldurunuz`
                : language === 'en'
                ? `Please fill in the ${label} field`
                : 'Unknown language'
              : false
          })}
          name={name}
          id={name}
        >
          <Text fontSize="sm">{label}</Text>
        </Checkbox>
      )}
    </>
  ),
  email: ({
    label,
    name,
    language,
    required,
    register
  }: {
    label: string;
    name: string;
    language: Language;
    required: boolean;
    register: UseFormRegister<any>;
  }) => (
    <Input
      {...register(name, {
        required: required
          ? language === 'tr'
            ? `Lütfen ${label} alanını doldurunuz`
            : language === 'en'
            ? `Please fill in the ${label} field`
            : 'Unknown language'
          : false
      })}
      type="email"
      placeholder={label}
      name={name}
      id={name}
    />
  ),
  message: ({
    label,
    name,
    message,
    language,
    required,
    register
  }: {
    label: string;
    name: string;
    message: RichTextContentType[];
    language: Language;
    required: boolean;
    register: UseFormRegister<any>;
  }) => (
    <RichText
      {...register(name, {
        required: required
          ? language === 'tr'
            ? `Lütfen ${label} alanını doldurunuz`
            : language === 'en'
            ? `Please fill in the ${label} field`
            : 'Unknown language'
          : false
      })}
      content={message}
    />
  )
};

export const Field = ({
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

export const FormSubmit = React.forwardRef<HTMLFormElement, FormSubmitProps>(
  ({ formId, children, submitButton, setSubmitted }: FormSubmitProps, ref) => {
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { language } = useLanguage();
    const {
      register,
      handleSubmit,
      formState: { errors }
    } = useForm<FormValues>();

    const onSubmit = React.useCallback(
      async (data: FormValues) => {
        if (!executeRecaptcha) {
          console.error('Recaptcha not initialized');
          return;
        }

        try {
          const token = await executeRecaptcha('submit');

          if (!token) {
            console.error('Recaptcha verification failed');
          }

          // const captchaResponse = await fetch(`/api/captcha?token=${token}`, {
          //   method: 'GET',
          //   headers: {
          //     'Content-Type': 'application/json'
          //   }
          // });

          // const captchaData = await captchaResponse.json();

          // if (!captchaData.success) {
          //   console.error('Recaptcha verification failed');
          // }

          const dataToSend = Object.entries(data).map(([name, value]) => ({
            field: name,
            value
          }));

          const response = await submitForm({
            body: {
              form: formId,
              submissionData: dataToSend
            }
          });

          setSubmitted(response);
        } catch (error) {
          console.error(error);
        }
      },
      [formId, setSubmitted, executeRecaptcha]
    );

    return (
      <form onSubmit={handleSubmit(onSubmit)} ref={ref}>
        <VStack spacing={2} align="stretch">
          {Array.isArray(children)
            ? children.map((child: any) =>
                child.props.name ? (
                  <FormControl
                    key={uuidv4()}
                    isInvalid={Boolean(errors[child.props.name])}
                  >
                    {React.createElement(child.type, {
                      ...{
                        ...child.props,
                        register,
                        language
                      }
                    })}
                    <FormErrorMessage fontSize="xs">
                      {errors[child.props.name]?.message}
                    </FormErrorMessage>
                  </FormControl>
                ) : (
                  child
                )
              )
            : children}
        </VStack>
        {submitButton}
      </form>
    );
  }
);
