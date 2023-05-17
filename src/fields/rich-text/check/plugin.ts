/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */

export const withCheck = (incomingEditor: any) => {
  const { isBlock } = incomingEditor;

  incomingEditor.isBlock = (element: any) =>
    element.type === 'check' ? true : isBlock(element);

  return incomingEditor;
};
