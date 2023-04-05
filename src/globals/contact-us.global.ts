import { GlobalConfig } from 'payload/types';

export type InputType = 'text' | 'textarea' | 'email' | 'tel';

interface ContactUsFormInputInputGroup {
  placeholder: string;
  type: InputType;
}

interface ContactUsFormInput {
  inputGroup: ContactUsFormInputInputGroup;
}

interface ContactUsForm {
  title: string;
  description: string;
  inputs: ContactUsFormInput[];
  sendButtonLabel: string;
}

export interface ContactUsType {
  stickyButtonLabel: string;
  form: ContactUsForm;
}

export const ContactUs: GlobalConfig = {
  slug: 'contactUs',
  label: 'Contact Us',
  access: {
    read: () => true
  },
  fields: [
    {
      name: 'stickyButtonLabel',
      label: 'Sticky Button Label',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'form',
      label: 'Form',
      type: 'group',
      fields: [
        {
          name: 'title',
          label: 'Title',
          type: 'text',
          required: true,
          localized: true
        },
        {
          name: 'description',
          label: 'Description',
          type: 'text',
          required: true,
          localized: true
        },
        {
          name: 'inputs',
          label: 'Inputs',
          type: 'array',
          minRows: 1,
          fields: [
            {
              name: 'inputGroup',
              label: 'Input Group',
              type: 'group',
              fields: [
                {
                  name: 'type',
                  label: 'Type',
                  type: 'radio',
                  required: true,
                  defaultValue: 'text',
                  options: [
                    {
                      label: 'Text Input',
                      value: 'text'
                    },
                    {
                      label: 'Text Area',
                      value: 'textarea'
                    },
                    {
                      label: 'Tel',
                      value: 'tel'
                    },
                    {
                      label: 'Email',
                      value: 'email'
                    }
                  ],
                  admin: {
                    width: '50%'
                  }
                },
                {
                  name: 'placeholder',
                  label: 'Placeholder',
                  type: 'text',
                  required: true,
                  localized: true,
                  admin: {
                    width: '50%'
                  }
                }
              ]
            }
          ]
        },
        {
          name: 'sendButtonLabel',
          label: 'Send Button Label',
          type: 'text',
          required: true,
          localized: true
        }
      ]
    }
  ]
};
