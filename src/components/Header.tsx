import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MenuType } from '../globals';
import { Menu } from './Menu';
import { InternalLink } from './InternalLink';
import { Logo } from '../icons';
import { LanguageSelector } from './LanguageSelector';

export interface HeaderProps {
  menu: MenuType;
}

export const Header = ({ menu }: HeaderProps) => {
  const { asPath, locale: activeLocale, locales } = useRouter();

  const availableLocales = locales?.filter((locale) => locale !== activeLocale);

  return (
    <Flex align="center" h={16} gap={10}>
      <InternalLink href={asPath}>
        <Logo />
      </InternalLink>
      <Flex align="center" boxSize="full">
        <Flex align="center" justify="space-between" boxSize="full" gap={4}>
          <Flex align="center" boxSize="full">
            <Menu menu={menu} />
            {/* <SearchBox /> */}
          </Flex>
          <LanguageSelector
            activeLocale={activeLocale}
            asPath={asPath}
            availableLocales={availableLocales}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};
