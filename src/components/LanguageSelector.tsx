import {
  Menu as ChakraMenu,
  MenuButton as ChakraMenuButton,
  MenuList as ChakraMenuList,
  MenuItem as ChakraMenuItem,
  IconButton
} from '@chakra-ui/react';
import Link from 'next/link';
import { v4 as uuidv4 } from 'uuid';
import { EN, TR } from '../icons';

export interface LanguageSelectorProps {
  asPath: string;
  availableLocales?: string[];
  activeLocale?: string;
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
  activeLocale
}: LanguageSelectorProps) => (
  <ChakraMenu>
    <ChakraMenuButton
      as={IconButton}
      variant="outline"
      borderRadius="full"
      border="none"
      aria-label="Languages"
      icon={<LocaleFlag locale={activeLocale} />}
      _hover={{ bgColor: 'transparent' }}
      _active={{ bgColor: 'transparent' }}
    >
      <ChakraMenuList>
        {availableLocales?.map((locale) => (
          <ChakraMenuItem
            key={uuidv4()}
            as={Link}
            href={asPath}
            locale={locale}
            icon={<LocaleFlag locale={locale} />}
            _hover={{ bgColor: 'transparent' }}
            _active={{ bgColor: 'transparent' }}
          >
            {locale.toUpperCase()}
          </ChakraMenuItem>
        ))}
      </ChakraMenuList>
    </ChakraMenuButton>
  </ChakraMenu>
);
