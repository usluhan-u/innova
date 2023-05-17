/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const withCheckCircle = (incomingEditor: any) => {
  const { isBlock } = incomingEditor;

  incomingEditor.isBlock = (element: any) =>
    element.type === 'check-circle' ? true : isBlock(element);

  return incomingEditor;
};
