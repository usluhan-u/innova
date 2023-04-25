/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const withCheckCircle = (incomingEditor: any) => {
  const { shouldBreakOutOnEnter } = incomingEditor;

  incomingEditor.shouldBreakOutOnEnter = (element: any) =>
    element.type === 'check-circle' ? true : shouldBreakOutOnEnter(element);

  return incomingEditor;
};
