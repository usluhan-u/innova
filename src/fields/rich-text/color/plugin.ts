/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-explicit-any */
export const withColor = (incomingEditor: any) => {
  const editor = incomingEditor;
  const { isInline } = editor;

  editor.isInline = (element: any) =>
    element.type === 'color' ? true : isInline(element);

  editor.addMark = (format: string, value: any) => {
    const { selection } = editor;
    if (selection) {
      editor.addMarkAtRange(selection, { [format]: value });
    }
  };

  editor.removeMark = (format: string) => {
    const { selection } = editor;
    if (selection) {
      editor.removeMarkAtRange(selection, format);
    }
  };

  return editor;
};
