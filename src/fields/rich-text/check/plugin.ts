/* eslint-disable @typescript-eslint/no-explicit-any */
export const withCheck = (incomingEditor: any) => {
  const editor = incomingEditor;
  const { isBlock } = editor;

  editor.isBlock = (element: any) =>
    element.type === 'check' ? true : isBlock(element);

  return incomingEditor;
};
