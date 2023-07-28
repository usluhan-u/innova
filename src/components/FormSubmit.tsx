/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  Checkbox,
  FormControl,
  FormErrorMessage,
  Input,
  Select,
  Textarea,
  VStack
} from '@chakra-ui/react';
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
  setSubmitted: (value: boolean) => void;
}

export const FormSubmit = ({
  formId,
  children,
  submitButton,
  setSubmitted
}: FormSubmitProps) => {
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
        value
      }));
      const response = await submitForm({
        body: {
          form: formId,
          submissionData: dataToSend
        }
      });
      setSubmitted(response);
    },
    [formId, setSubmitted]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={2} align="stretch">
        <Input {...register('fullname')} placeholder="Ad & Soyad" />
        <Input {...register('telephone')} placeholder="Telefon" />
        <Input {...register('company')} placeholder="Çalıştığınız Şirket" />
        <Textarea {...register('message')} placeholder="Mesajınız" />
        <Select {...register('subject')} w="full">
          <option value="Recommendation">Öneri</option>
          <option value="Complaint">Şikayet</option>
          <option value="Satisfaction">Memnuniyet</option>
          <option value="New Product / Service Request">
            Yeni Ürün / Hizmet Talebi
          </option>
        </Select>
        <FormControl isInvalid={Boolean(errors.info)}>
          <Checkbox
            {...register('info', {
              required:
                language === 'tr'
                  ? `Lütfen Aydınlatma Metni’ni kabul ediniz.`
                  : language === 'en'
                  ? `Please accept the Information Text.`
                  : 'Unknown language'
            })}
          >
            Aydınlatma Metni’ni kabul ediyorum.
          </Checkbox>
          <FormErrorMessage>{errors.info?.message}</FormErrorMessage>
        </FormControl>
        <Checkbox {...register('consent')}>
          Ticari elektronik ileti gönderilmesine onay veriyorum.
        </Checkbox>
      </VStack>

      {/* {React.Children.map(childrenArray, (child) => (
        <FormControl
          key={uuidv4()}
          isInvalid={Boolean(errors[child.props.name])}
        >
          <Input {...register(child.props.name)} />
          {React.cloneElement(child, {
            ref: {
              ...register(child.props.name, {
                required: child.props.required
                  ? language === 'tr'
                    ? `Lütfen ${child.props.label} alanını doldurunuz`
                    : language === 'en'
                    ? `Please fill in the ${child.props.label} field`
                    : 'Unknown language'
                  : false
              })
            }
          })}
          <FormErrorMessage>
            {errors[child.props.name]?.message}
          </FormErrorMessage>
        </FormControl>
      ))} */}
      {submitButton}
    </form>
  );
};
