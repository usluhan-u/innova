/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field } from 'payload/types';
import { CallToAction } from './call-to-action.field';

interface Args {
  condition?: (data: any, siblingData: any) => boolean;
}

export const CallToActionGroup = (args?: Args): Field => {
  const { condition } = args || {};

  return {
    name: 'callToActionGroup',
    label: 'Call To Action Group',
    type: 'array',
    fields: [CallToAction({ label: false })],
    admin: {
      condition
    }
  };
};
