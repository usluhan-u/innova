import { Field } from 'payload/types';
import { populateFullTitle } from '../hooks';

export const FullTitle: Field = {
  name: 'fullTitle',
  type: 'text',
  localized: true,
  hooks: {
    beforeChange: [populateFullTitle]
  },
  admin: {
    components: {
      Field: () => null
    }
  }
};
