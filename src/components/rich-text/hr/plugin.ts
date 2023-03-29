export const withHR = (incomingEditor: any) => {
  const editor = incomingEditor;
  const { isVoid } = editor;

  editor.isVoid = (element: any) =>
    element.type === 'hr' ? true : isVoid(element);

  return editor;
};
