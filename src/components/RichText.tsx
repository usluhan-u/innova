/* eslint-disable @typescript-eslint/no-non-null-assertion */
import escapeHTML from 'escape-html';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Text as SlateText } from 'slate';
import { Heading, Text, chakra } from '@chakra-ui/react';

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
        <Text
          dangerouslySetInnerHTML={{ __html: escapeHTML(node.text) }}
          as="span"
        />
      );

      if (node.bold) {
        text = (
          <Text key={uuidv4()} as="b">
            {text}
          </Text>
        );
      }

      if (node.code) {
        text = (
          <Text key={uuidv4()} as="code">
            {text}
          </Text>
        );
      }

      if (node.italic) {
        text = (
          <Text key={uuidv4()} as="i">
            {text}
          </Text>
        );
      }

      if (node.underline) {
        text = (
          <Text key={uuidv4()} as="u">
            {text}
          </Text>
        );
      }

      if (node.strikethrough) {
        text = (
          <Text key={uuidv4()} as="s">
            {text}
          </Text>
        );
      }

      return <Text key={uuidv4()}>{text}</Text>;
    }

    if (!(node as RichTextContentType).children) {
      return null;
    }

    switch ((node as RichTextContentType).type) {
      case 'h1':
        return (
          <Heading key={uuidv4()} as="h1">
            {serialize((node as RichTextContentType).children!)}
          </Heading>
        );
      case 'h2':
        return (
          <Heading key={uuidv4()} as="h2">
            {serialize((node as RichTextContentType).children!)}
          </Heading>
        );
      case 'h3':
        return (
          <Heading key={uuidv4()} as="h3">
            {serialize((node as RichTextContentType).children!)}
          </Heading>
        );
      case 'h4':
        return (
          <Heading key={uuidv4()} as="h4">
            {serialize((node as RichTextContentType).children!)}
          </Heading>
        );
      case 'h5':
        return (
          <Heading key={uuidv4()} as="h5">
            {serialize((node as RichTextContentType).children!)}
          </Heading>
        );
      case 'h6':
        return (
          <Heading key={uuidv4()} as="h6">
            {serialize((node as RichTextContentType).children!)}
          </Heading>
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
          <Text key={uuidv4()} as="span">
            {serialize((node as RichTextContentType).children!)}
          </Text>
        );
    }
  });

export const RichText = ({ content }: RichTextProps) => (
  <chakra.div
    sx={{
      '&': {
        '& *': {
          whiteSpace: 'pre-wrap'
        },
        '& a': {
          color: 'text.blue'
        }
      }
    }}
  >
    {serialize(content)}
  </chakra.div>
);
