import React from 'react';
import { Context, InitialState, OnSubmit } from './types';
import { reduceFieldsToValues, reducer } from './reducer';
import {
  FieldContext,
  FormContext,
  ModifiedContext,
  ProcessingContext,
  SubmittedContext,
  initialContext
} from './context';

interface FormSubmitProps {
  onSubmit?: OnSubmit;
  children: React.ReactNode;
  initialState: InitialState;
  method?: 'GET' | 'POST';
  action?: string;
}

export const FormSubmit = ({
  action,
  initialState,
  method,
  onSubmit,
  children
}: FormSubmitProps) => {
  const [fields, dispatchFields] = React.useReducer(reducer, initialState);
  const [modified, setModified] = React.useState(false);
  const [processing, setProcessing] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const contextRef = React.useRef<Context>(initialContext);

  contextRef.current.initialState = initialState;
  contextRef.current.fields = fields;

  const handleOnSubmit = React.useCallback(
    async (e: React.ChangeEvent<HTMLFormElement>) => {
      setSubmitted(true);
      setProcessing(true);

      if (processing) {
        e.preventDefault();
        e.stopPropagation();
      }

      const isValid = contextRef.current.validateForm();

      if (!isValid) {
        e.preventDefault();

        // console.error('Please check your submission and try again.');

        setProcessing(false);
        return false;
      }

      if (typeof onSubmit === 'function') {
        e.preventDefault();
        e.stopPropagation();

        await onSubmit(reduceFieldsToValues(fields));

        setSubmitted(false);
        setProcessing(false);
        setModified(false);
      }

      return false;
    },
    [fields, onSubmit, processing]
  );

  const getFields = React.useCallback(
    () => contextRef.current.fields,
    [contextRef]
  );
  const getField = React.useCallback(
    (path: string) => contextRef.current.fields[path],
    [contextRef]
  );
  const getData = React.useCallback(
    () => reduceFieldsToValues(contextRef.current.fields),
    [contextRef]
  );
  const validateForm = React.useCallback(
    () =>
      !Object.values(contextRef.current.fields).some(
        (field): boolean => field.valid === false
      ),
    [contextRef]
  );

  contextRef.current.dispatchFields = dispatchFields;
  contextRef.current.submit = handleOnSubmit;
  contextRef.current.getFields = getFields;
  contextRef.current.getField = getField;
  contextRef.current.getData = getData;
  contextRef.current.validateForm = validateForm;
  contextRef.current.setModified = setModified;
  contextRef.current.setProcessing = setProcessing;
  contextRef.current.setSubmitted = setSubmitted;

  React.useEffect(() => {
    contextRef.current = { ...initialContext };
    dispatchFields({ type: 'REPLACE_STATE', state: initialState });
  }, [initialState]);

  const memoizedContextCurrentValue = React.useMemo(
    () => contextRef.current,
    []
  );

  return (
    <form
      method={method}
      action={action}
      noValidate
      onSubmit={contextRef.current.submit}
    >
      <FormContext.Provider value={contextRef.current}>
        <FieldContext.Provider value={memoizedContextCurrentValue}>
          <SubmittedContext.Provider value={submitted}>
            <ProcessingContext.Provider value={processing}>
              <ModifiedContext.Provider value={modified}>
                {children}
              </ModifiedContext.Provider>
            </ProcessingContext.Provider>
          </SubmittedContext.Provider>
        </FieldContext.Provider>
      </FormContext.Provider>
    </form>
  );
};
