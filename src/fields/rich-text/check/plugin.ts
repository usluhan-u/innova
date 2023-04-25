/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const withCheck = (incomingEditor: any) => {
  const { shouldBreakOutOnEnter } = incomingEditor;

  incomingEditor.shouldBreakOutOnEnter = (element: any) =>
    element.type === 'check' ? true : shouldBreakOutOnEnter(element);

  return incomingEditor;
};
