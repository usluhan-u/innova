/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { FormControl, FormErrorMessage } from '@chakra-ui/react';
import { v4 as uuidv4 } from 'uuid';
import { useForm } from 'react-hook-form';
import { useLanguage } from '../contexts';
import { submitForm } from '../api';

export interface FormValues {
  [k: string]: string;
}

interface FormSubmitProps {
  formId: string;
  children: React.ReactNode | React.ReactNode[];
  submitButton: React.ReactNode;
  message?: string;
}

export const FormSubmit = ({
  formId,
  children,
  submitButton,
  message
}: FormSubmitProps) => {
  const [submitted, setSubmitted] = React.useState(false);
  const { language } = useLanguage();
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormValues>();

  const childrenArray: any = React.Children.toArray(children);

  const onSubmit = React.useCallback(
    async (data: FormValues) => {
      const dataToSend = Object.entries(data).map(([name, value]) => ({
        field: name,
        value: 'test'
      }));

      const response = await submitForm({
        body: {
          form: formId,
          submissionData: dataToSend
        }
      });

      setSubmitted(response);
    },
    [formId]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {React.Children.map(childrenArray, (child) => (
        <FormControl
          key={uuidv4()}
          isInvalid={Boolean(errors[child.props.name])}
        >
          {React.cloneElement(child, {
            // refs: {
            //   ...register(child.props.name, {
            //     required: child.props.required
            //       ? language === 'tr'
            //         ? `Lütfen ${child.props.label} alanını doldurunuz`
            //         : language === 'en'
            //         ? `Please fill in the ${child.props.label} field`
            //         : 'Unknown language'
            //       : false
            //   })
            // }
          })}
          <FormErrorMessage>
            {errors[child.props.name]?.message}
          </FormErrorMessage>
        </FormControl>
      ))}
      {submitButton}
    </form>
  );
};
