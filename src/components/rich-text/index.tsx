import React from 'react';
import escapeHTML from 'escape-html';
import { Text } from 'slate';
import { v4 as uuidv4 } from 'uuid';

export interface RichTextProps {
  content: any;
}

export const RichText = ({ content }: RichTextProps) => {
  if (!content) {
    return null;
  }

  return <div>{serialize(content)}</div>;
};

const serialize = (children: any): React.ReactElement[] =>
  children.map((node: any) => {
    if (Text.isText(node)) {
      let text = (
        <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
      );

      if ((node as any).bold) {
        text = <strong key={uuidv4()}>{text}</strong>;
      }

      if ((node as any).code) {
        text = <code key={uuidv4()}>{text}</code>;
      }

      if ((node as any).italic) {
        text = <em key={uuidv4()}>{text}</em>;
      }

      if ((node as any).underline) {
        text = (
          <span style={{ textDecoration: 'underline' }} key={uuidv4()}>
            {text}
          </span>
        );
      }

      if ((node as any).strikethrough) {
        text = (
          <span style={{ textDecoration: 'line-through' }} key={uuidv4()}>
            {text}
          </span>
        );
      }

      return <React.Fragment key={uuidv4()}>{text}</React.Fragment>;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case 'h1':
        return <h1 key={uuidv4()}>{serialize(node.children)}</h1>;
      case 'h2':
        return <h2 key={uuidv4()}>{serialize(node.children)}</h2>;
      case 'h3':
        return <h3 key={uuidv4()}>{serialize(node.children)}</h3>;
      case 'h4':
        return <h4 key={uuidv4()}>{serialize(node.children)}</h4>;
      case 'h5':
        return <h5 key={uuidv4()}>{serialize(node.children)}</h5>;
      case 'h6':
        return <h6 key={uuidv4()}>{serialize(node.children)}</h6>;
      case 'quote':
        return (
          <blockquote key={uuidv4()}>{serialize(node.children)}</blockquote>
        );
      case 'ul':
        return <ul key={uuidv4()}>{serialize(node.children)}</ul>;
      case 'ol':
        return <ol key={uuidv4()}>{serialize(node.children)}</ol>;
      case 'li':
        return <li key={uuidv4()}>{serialize(node.children)}</li>;
      case 'link':
        return (
          <a href={escapeHTML(node.url)} key={uuidv4()}>
            {serialize(node.children)}
          </a>
        );

      case 'hr':
        return <hr key={uuidv4()} />;

      default:
        return <p key={uuidv4()}>{serialize(node.children)}</p>;
    }
  });
