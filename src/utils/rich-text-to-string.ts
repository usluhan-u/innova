import { RichTextContentType } from '../components';

export const traverseContent = (content: RichTextContentType[]) => {
  const texts: string[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const item of content) {
    if (item.text) {
      texts.push(item.text);
    }
    if (item.children) {
      traverseContent(item.children);
    }
  }

  return texts;
};

export const extractTextValues = (content: RichTextContentType[]) => {
  const texts = traverseContent(content);
  return texts;
};
