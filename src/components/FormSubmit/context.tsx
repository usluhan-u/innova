import React from 'react';
import { Context } from './types';

export const initialContext: Context = {
  initialState: {},
  fields: {},
  validateForm: () => false,
  setModified: () => false,
  setProcessing: () => false,
  setSubmitted: () => false,
  dispatchFields: () => false,
  getFields: () => ({}),
  getField: () => undefined
};

export const FormContext = React.createContext(initialContext);
export const FieldContext = React.createContext(initialContext);
export const SubmittedContext = React.createContext(false);
export const ProcessingContext = React.createContext(false);
export const ModifiedContext = React.createContext(false);

export const useForm = (): Context => React.useContext(FormContext);
export const useFormFields = (): Context => React.useContext(FieldContext);
export const useFormSubmitted = (): boolean =>
  React.useContext(SubmittedContext);
export const useFormProcessing = (): boolean =>
  React.useContext(ProcessingContext);
export const useFormModified = (): boolean => React.useContext(ModifiedContext);
