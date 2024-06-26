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
import { Language, useData, useLanguage } from '../contexts';

export interface LanguageSwitcherProps
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

export const LanguageSwitcher = ({
  asPath,
  availableLocales,
  activeLocale,
  type = 'button',
  ...rest
}: LanguageSwitcherProps) => {
  const router = useRouter();
  const { switchLanguage } = useLanguage();
  const { localizedSlugs } = useData();

  const otherAvailableLocale = availableLocales?.filter(
    (availableLocale) => availableLocale !== activeLocale
  )[0];

  const handleLocaleChange = () => {
    if (switchLanguage && typeof switchLanguage === 'function')
      switchLanguage(otherAvailableLocale as Language);

    const parentSlug = router.asPath.split('/').slice(0, -1).join('/');

    router.push(
      `${parentSlug}/${localizedSlugs[otherAvailableLocale || 'tr'] ?? 'home'}`,
      undefined,
      {
        locale: otherAvailableLocale
      }
    );
  };

  return (
    <>
      {type === 'button' && (
        <IconButton
          variant="variant"
          borderRadius="full"
          border="none"
          aria-label="Language"
          icon={<LocaleFlag locale={otherAvailableLocale} />}
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
            icon={<LocaleFlag locale={otherAvailableLocale} />}
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
