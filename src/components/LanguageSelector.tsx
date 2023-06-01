import React from 'react';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  IconButtonProps
} from '@chakra-ui/react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/router';
import { EN, TR } from '../icons';

export interface LanguageSelectorProps
  extends Omit<IconButtonProps, 'type' | 'aria-label'> {
  asPath: string;
  availableLocales?: string[];
  activeLocale?: string;
  type?: 'menu' | 'button';
}

interface LocaleFlagProps {
  locale?: string;
}

const LocaleFlag = ({ locale }: LocaleFlagProps) => {
  switch (locale) {
    case 'en':
      return <EN width={32} height={32} />;
    case 'tr':
      return <TR width={32} height={32} />;
    default:
      return null;
  }
};

export const LanguageSelector = ({
  asPath,
  availableLocales,
  activeLocale,
  type = 'button',
  ...rest
}: LanguageSelectorProps) => {
  const router = useRouter();

  const otherAvailableLocale = availableLocales?.filter(
    (availableLocale) => availableLocale !== activeLocale
  )[0];

  const handleLocaleChange = () => {
    if (router.route.includes('award' || 'awards')) {
      router.push('/awards', undefined, {
        locale: otherAvailableLocale
      });
    }

    if (router.route.includes('blog' || 'blogs')) {
      router.push('/blogs', undefined, {
        locale: otherAvailableLocale
      });
    }

    if (router.route.includes('statement' || 'statements')) {
      router.push('/statements', undefined, {
        locale: otherAvailableLocale
      });
    }

    if (router.route.includes('success-story' || 'success-stories')) {
      router.push('/success-stories', undefined, {
        locale: otherAvailableLocale
      });
    }

    router.push(asPath, undefined, {
      locale: otherAvailableLocale
    });
  };

  return (
    <>
      {type === 'button' && (
        <IconButton
          variant="variant"
          borderRadius="full"
          border="none"
          aria-label="Language"
          icon={<LocaleFlag locale={activeLocale} />}
          onClick={handleLocaleChange}
          _hover={{ borderColor: 'transparent' }}
          _active={{ borderColor: 'transparent' }}
          {...rest}
        />
      )}
      {type === 'menu' && (
        <Menu>
          <MenuButton
            as={IconButton}
            variant="outline"
            borderRadius="full"
            border="none"
            aria-label="Language"
            icon={<LocaleFlag locale={activeLocale} />}
            _hover={{ bgColor: 'transparent' }}
            _active={{ bgColor: 'transparent' }}
          />
          <MenuList>
            {availableLocales?.map((locale) => (
              <MenuItem
                key={uuidv4()}
                as={Link}
                href={asPath}
                locale={locale}
                icon={<LocaleFlag locale={locale} />}
                _hover={{ bgColor: 'transparent' }}
                _active={{ bgColor: 'transparent' }}
              >
                {locale.toUpperCase()}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      )}
    </>
  );
};
