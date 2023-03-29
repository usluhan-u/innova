import React from 'react';
import { Modal, useModal } from '@faceless-ui/modal';
import { Transforms } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { ElementButton } from 'payload/components/rich-text';
import { Form, Select, Text, Submit } from 'payload/components/forms';
import { MinimalTemplate, Button, X } from 'payload/components';
import { VideoIcon } from './VideoIcon';

export interface VideoButtonProps {
  path: string;
}

const initialFormData = {
  source: 'youtube'
};

const sources = [
  {
    label: 'YouTube',
    value: 'youtube'
  },
  {
    label: 'Vimeo',
    value: 'vimeo'
  }
];

const baseClass = 'video-rich-text-button';

const insertVideo = (editor: any, { id, source }: any) => {
  const text = { text: ' ' };

  const video = {
    type: 'video',
    id,
    source,
    children: [text]
  };

  const nodes = [video, { type: 'p', children: [{ text: '' }] }];

  if (editor.blurSelection) {
    Transforms.select(editor, editor.blurSelection);
  }

  Transforms.insertNodes(editor, nodes);
  ReactEditor.focus(editor);
};

export const VideoButton = ({ path }: VideoButtonProps) => {
  const { openModal, toggleModal } = useModal();
  const editor = useSlate();
  const [renderModal, setRenderModal] = React.useState(false);
  const modalSlug = `${path}-add-video`;

  const handleAddVideo = React.useCallback(
    (_: any, { id, source }: any) => {
      insertVideo(editor, { id, source });
      toggleModal(modalSlug);
      setRenderModal(false);
    },
    [editor, toggleModal]
  );

  React.useEffect(() => {
    if (renderModal) {
      openModal(modalSlug);
    }
  }, [renderModal, openModal, modalSlug]);

  return (
    <React.Fragment>
      <ElementButton
        className={baseClass}
        format="video"
        onClick={(e) => {
          e.preventDefault();
          setRenderModal(true);
        }}
      >
        <VideoIcon />
      </ElementButton>
      {renderModal && (
        <Modal slug={modalSlug} className={`${baseClass}__modal`}>
          <MinimalTemplate className={`${baseClass}__template`}>
            <header className={`${baseClass}__header`}>
              <h3>Add Video</h3>
              <Button
                buttonStyle="none"
                onClick={() => {
                  toggleModal(modalSlug);
                  setRenderModal(false);
                }}
              >
                <X />
              </Button>
            </header>
            <Form onSubmit={handleAddVideo} initialData={initialFormData}>
              <Select
                required
                label="Video Source"
                options={sources}
                name="source"
              />
              <Text label="ID" required name="id" />
              <Submit>Add video</Submit>
            </Form>
          </MinimalTemplate>
        </Modal>
      )}
    </React.Fragment>
  );
};
