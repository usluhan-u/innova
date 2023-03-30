import React from 'react';
import escapeHTML from 'escape-html';
import { Text as SlateText } from 'slate';
import { v4 as uuidv4 } from 'uuid';
import { chakra, ChakraProps } from '@chakra-ui/react';

export interface RichTextProps extends ChakraProps {
  content: unknown;
}

export const RichText = chakra(({ content, ...rest }: RichTextProps) => {
  if (!content) {
    return null;
  }

  return <chakra.div {...rest}>{serialize(content)}</chakra.div>;
});

type Children = Leaf[];

type Leaf = {
  type: string;
  value?: {
    url: string;
    alt: string;
  };
  children?: Children;
  url?: string;
  [key: string]: unknown;
};

const serialize = (children: any): React.ReactElement[] =>
  children.map((node: any) => {
    if (SlateText.isText(node)) {
      let text = (
        <span dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }} />
      );

      if ((node as any).bold) {
        text = <b key={uuidv4()}>{text}</b>;
      }

      if ((node as any).code) {
        text = <code key={uuidv4()}>{text}</code>;
      }

      if ((node as any).italic) {
        text = <i key={uuidv4()}>{text}</i>;
      }

      if ((node as any).underline) {
        text = <u key={uuidv4()}>{text}</u>;
      }

      if ((node as any).strikethrough) {
        text = <del key={uuidv4()}>{text}</del>;
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
      default:
        return <p key={uuidv4()}>{serialize(node.children)}</p>;
    }
  });
