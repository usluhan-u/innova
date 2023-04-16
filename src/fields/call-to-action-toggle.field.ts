import { Field } from 'payload/types';
import { CallToAction, CallToActionType } from './call-to-action.field';

export interface CallToActionToggleType {
  enableCallToAction: boolean;
  callToAction?: CallToActionType;
}

export const CallToActionToggle: Field = {
  name: 'callToActionToggle',
  label: false,
  type: 'group',
  fields: [
    {
      name: 'enableCallToAction',
      label: 'Call to Action',
      type: 'checkbox',
      defaultValue: false,
      required: true
    },
    CallToAction({
      label: false,
      condition: (_, siblingData) => Boolean(siblingData?.enableCallToAction)
    })
  ]
};
