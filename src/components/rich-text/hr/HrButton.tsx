import { ElementButton } from 'payload/components/rich-text';
import React from 'react';
import { BaseEditor, Transforms } from 'slate';
import { useSlate, ReactEditor } from 'slate-react';

export interface HrButtonProps {
  path: string;
}

const baseClass = 'rich-text-hr-button';

const insertButton = (editor: any) => {
  const text = { text: ' ' };
  const button = {
    type: 'hr',
    children: [text]
  };

  const nodes = [button, { children: [{ text: '' }] }];

  if (editor.blurSelection) {
    Transforms.select(editor, editor.blurSelection);
  }

  Transforms.insertNodes(editor, nodes);
  ReactEditor.focus(editor);
};

export const HrButton = ({ path }: HrButtonProps) => {
  const editor = useSlate();

  const handleAddHR = React.useCallback(() => {
    insertButton(editor);
  }, [editor]);

  return (
    <ElementButton className={baseClass} format="hr" onClick={handleAddHR}>
      —
    </ElementButton>
  );
};
