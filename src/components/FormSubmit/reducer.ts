import { Action, Fields, Property } from './types';

export const reduceFieldsToValues = (fields: Fields) => {
  const data: Property = {};

  Object.keys(fields).forEach((key) => {
    if (fields[key].value !== undefined) {
      data[key] = fields[key].value;
    }
  });

  return data;
};

export const reducer = (state: Fields, action: Action) => {
  switch (action.type) {
    case 'REPLACE_STATE': {
      return action.state || {};
    }

    case 'REMOVE': {
      const newState = { ...state };
      delete newState[action.path];
      return newState;
    }

    default: {
      const newField = {
        value: action.value,
        valid: action.valid,
        errorMessage: action.errorMessage,
        initialValue: action.initialValue
      };

      return {
        ...state,
        [action.path]: newField
      };
    }
  }
};
