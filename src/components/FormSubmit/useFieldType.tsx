import React from 'react';
import {
  useForm,
  useFormModified,
  useFormProcessing,
  useFormSubmitted
} from './context';
import { Action, Options, SetValue, Value } from './types';

const useDebounce = (value: unknown, delay: number) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export const useFieldType = ({ path, validate }: Options) => {
  const formContext = useForm();
  const submitted = useFormSubmitted();
  const processing = useFormProcessing();
  const modified = useFormModified();

  const { dispatchFields, getField, setModified } = formContext;

  const field = getField(path);

  const fieldExists = Boolean(field);

  const initialValue = field?.initialValue;

  const [internalValue, setInternalValue] = React.useState<Value>();

  const debouncedValue = useDebounce(internalValue, 120);

  const valid = field && typeof field.valid === 'boolean' ? field.valid : true;
  const showError = valid === false && submitted;

  const sendField = React.useCallback(
    async (valueToSend: Value) => {
      const fieldToDispatch: Action = {
        type: 'UPDATE',
        path,
        value: valueToSend,
        valid: true
      };

      const validationResult =
        typeof validate === 'function' ? await validate(valueToSend) : true;

      if (typeof validationResult === 'string') {
        fieldToDispatch.errorMessage = validationResult;
        fieldToDispatch.valid = false;
      }

      fieldToDispatch.initialValue = initialValue;

      dispatchFields(fieldToDispatch);
    },
    [path, dispatchFields, validate, initialValue]
  );

  const setValue = React.useCallback<SetValue>(
    (value) => {
      if (!modified) {
        setModified(true);
      }

      setInternalValue(value);
    },
    [setModified, modified]
  );

  React.useEffect(() => {
    if (initialValue !== undefined) {
      setInternalValue(initialValue);
    }
  }, [initialValue]);

  React.useEffect(() => {
    if (debouncedValue !== undefined || !fieldExists) {
      sendField(debouncedValue);
    }
  }, [debouncedValue, sendField, fieldExists]);

  React.useEffect(
    () => () => {
      dispatchFields({ type: 'REMOVE', path });
    },
    [dispatchFields, path]
  );

  return {
    path,
    validate,
    showError,
    errorMessage: field?.errorMessage,
    value: internalValue,
    formSubmitted: submitted,
    formProcessing: processing,
    setValue
  };
};
