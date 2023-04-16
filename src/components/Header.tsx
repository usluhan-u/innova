import { Flex } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { MenuType } from '../globals';
import { Menu } from './Menu';
import { InternalLink } from './InternalLink';
import { Logo } from '../icons';
import { LanguageSelector } from './LanguageSelector';
import { Container } from './Container';

export interface HeaderProps {
  menu: MenuType;
}

export const Header = ({ menu }: HeaderProps) => {
  const { asPath, locale: activeLocale, locales } = useRouter();

  const availableLocales = locales?.filter((locale) => locale !== activeLocale);

  return (
    <Flex h={16}>
      <Container>
        <Flex align="center" gap={10} boxSize="full">
          <InternalLink slug={asPath}>
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
      </Container>
    </Flex>
  );
};
