/* tslint:disable */
/**
 * This file was automatically generated by Payload CMS.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

export interface Config {
  collections: {
    links: Link;
    medias: Media;
    menus: Menu;
    pages: Page;
    users: User;
  };
  globals: {};
}
export interface Link {
  id: string;
  type: 'page' | 'custom';
  label: string;
  page: string | Page;
  url: string;
  createdAt: string;
  updatedAt: string;
}
export interface Page {
  id: string;
  title: string;
  layout?: (
    | {
        alignment: 'contentOnLeft' | 'contentOnRight';
        content?: {
          [k: string]: unknown;
        }[];
        media: string | Media;
        id?: string;
        blockName?: string;
        blockType: 'mediaContent';
      }
    | {
        columns?: {
          width: 'oneThird' | 'half' | 'twoThirds' | 'full';
          alignment: 'left' | 'center' | 'right';
          content?: {
            [k: string]: unknown;
          }[];
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'content';
      }
    | {
        slides?: {
          content?: {
            [k: string]: unknown;
          }[];
          callToAction?: {
            label: string;
            type: 'page' | 'custom';
            page: string | Page;
            url: string;
            newTab: boolean;
          };
          media: string | Media;
          id?: string;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'mediaSlider';
      }
    | {
        media: string | Media;
        size?: 'normal' | 'wide' | 'fullscreen';
        caption?: {
          [k: string]: unknown;
        }[];
        id?: string;
        blockName?: string;
        blockType: 'media';
      }
    | {
        label: string;
        type: 'page' | 'custom';
        page: string | Page;
        url: string;
        newTab: boolean;
        id?: string;
        blockName?: string;
        blockType: 'callToAction';
      }
  )[];
  slug: string;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string;
  };
  createdAt: string;
  updatedAt: string;
}
export interface Media {
  id: string;
  alt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  createdAt: string;
  updatedAt: string;
}
export interface Menu {
  id: string;
  label: string;
  group?: {
    type: 'dropdown' | 'link';
    menuGroups?: {
      label: string;
      subMenus?: {
        label: string;
        link: string | Link;
        id?: string;
      }[];
      id?: string;
    }[];
    link: string | Link;
  };
  createdAt: string;
  updatedAt: string;
}
export interface User {
  id: string;
  email?: string;
  resetPasswordToken?: string;
  resetPasswordExpiration?: string;
  loginAttempts?: number;
  lockUntil?: string;
  createdAt: string;
  updatedAt: string;
  password?: string;
}
