/* eslint-disable @typescript-eslint/no-non-null-assertion */
import escapeHTML from 'escape-html';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Text as SlateText } from 'slate';

export interface RichTextContentType {
  text: string;
  type?: string;
  linkType?: string;
  url?: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  children?: RichTextContentType[];
}

export interface RichTextProps {
  content: RichTextContentType[];
}

const serialize = (
  nodes: RichTextContentType[]
): (React.ReactElement | null)[] =>
  nodes.map((node) => {
    if (!node) {
      return null;
    }

    if (SlateText.isText(node)) {
      let text = (
        <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
      );

      if (node.bold) {
        text = <b key={uuidv4()}>{text}</b>;
      }

      if (node.code) {
        text = <code key={uuidv4()}>{text}</code>;
      }

      if (node.italic) {
        text = <i key={uuidv4()}>{text}</i>;
      }

      if (node.underline) {
        text = <u key={uuidv4()}>{text}</u>;
      }

      if (node.strikethrough) {
        text = <del key={uuidv4()}>{text}</del>;
      }

      return <React.Fragment key={uuidv4()}>{text}</React.Fragment>;
    }

    if (!(node as RichTextContentType).children) {
      return null;
    }

    switch ((node as RichTextContentType).type) {
      case 'h1':
        return (
          <h1 key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </h1>
        );
      case 'h2':
        return (
          <h2 key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </h2>
        );
      case 'h3':
        return (
          <h3 key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </h3>
        );
      case 'h4':
        return (
          <h4 key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </h4>
        );
      case 'h5':
        return (
          <h5 key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </h5>
        );
      case 'h6':
        return (
          <h6 key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </h6>
        );
      case 'quote':
        return (
          <blockquote key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </blockquote>
        );
      case 'ul':
        return (
          <ul key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </ul>
        );
      case 'ol':
        return (
          <ol key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </ol>
        );
      case 'li':
        return (
          <li key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </li>
        );
      case 'link':
        return (
          <a
            key={uuidv4()}
            href={escapeHTML((node as RichTextContentType).url)}
          >
            {serialize((node as RichTextContentType).children!)}
          </a>
        );
      default:
        return (
          <p key={uuidv4()}>
            {serialize((node as RichTextContentType).children!)}
          </p>
        );
    }
  });

export const RichText = ({ content }: RichTextProps) => (
  <div>{serialize(content)}</div>
);
