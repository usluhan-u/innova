import {
  Button,
  Divider,
  HStack,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
  VStack,
  Text,
  IconButton,
  Grid,
  GridItem
} from '@chakra-ui/react';
import { ArrowForwardIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import Link from 'next/link';
import { Logo, EN, TR } from '../icons';
import { InternalLink } from './GenericLink';
import { SearchBox } from './SearchBox';
import { Template } from './Template';
import { MenuType } from '../collections';

export interface HeaderProps {
  menuList: MenuType[];
}

export const Header = ({ menuList }: HeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { locale: activeLocale, locales, defaultLocale, asPath } = useRouter();
  const [expanded, setExpanded] = React.useState(false);

  const availableLocales = locales?.filter((locale) => locale !== activeLocale);

  const getLocaleFlag = (locale?: string) => {
    if (!locale) {
      return undefined;
    }

    const localeMap: Record<string, React.ReactElement> = {
      en: <EN width={32} height={32} />,
      tr: <TR width={32} height={32} />
    };

    return localeMap[locale];
  };

  const handleExpandToggle = () => {
    setExpanded(!expanded);
  };

  return (
    <Template
      h="70px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid templateColumns="repeat(24, 1fr)" alignItems="center" gap={8}>
        <GridItem>
          <InternalLink href={asPath}>
            <Logo />
          </InternalLink>
        </GridItem>
        {!expanded && (
          <GridItem>
            <Menu isOpen={isOpen}>
              {menuList.map((menu) =>
                menu.group.type === 'multiple' ? (
                  <React.Fragment key={uuidv4()}>
                    <MenuButton
                      as={Button}
                      rightIcon={<ChevronDownIcon />}
                      onMouseEnter={onOpen}
                      backgroundColor="transparent"
                      color="text.primary"
                      fontWeight={400}
                      _hover={{
                        backgroundColor: 'transparent',
                        color: 'text.blue'
                      }}
                      _active={{
                        backgroundColor: 'transparent'
                      }}
                    >
                      {menu.label}
                    </MenuButton>
                    <MenuList onMouseEnter={onOpen} onMouseLeave={onClose}>
                      <HStack spacing={8} alignItems="normal" padding="20px">
                        {menu.group.menuGroups?.map((menuGroup) => (
                          <MenuGroup
                            key={uuidv4()}
                            title={menuGroup.label}
                            color="text.secondary"
                            fontWeight={500}
                          >
                            {menuGroup.subMenus?.map((subMenu) => (
                              <MenuItem
                                key={uuidv4()}
                                as="a"
                                href={subMenu.page.slug}
                                color="text.primary"
                                fontWeight={400}
                                _hover={{ backgroundColor: 'transparent' }}
                              >
                                {subMenu.label}
                              </MenuItem>
                            ))}
                          </MenuGroup>
                        ))}
                      </HStack>
                      <VStack alignItems="normal" p={8}>
                        <Divider borderBottomColor="black" />
                        <InternalLink href={asPath}>
                          <Text color="text.blue">
                            Tüm Ürünleri İnceleyin <ArrowForwardIcon />
                          </Text>
                        </InternalLink>
                      </VStack>
                    </MenuList>
                  </React.Fragment>
                ) : (
                  <InternalLink key={uuidv4()} href={menu.group.page.slug}>
                    {menu.label}
                  </InternalLink>
                )
              )}
            </Menu>
          </GridItem>
        )}
        <GridItem colStart={expanded ? 2 : undefined} colEnd={26}>
          <SearchBox
            expanded={expanded}
            handleToggle={handleExpandToggle}
            placeholder="Search"
          />
        </GridItem>
        <GridItem colEnd={27} alignItems="flex-end">
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Languages"
              icon={getLocaleFlag(activeLocale)}
              variant="outline"
              borderRadius="full"
              border="none"
              _hover={{ backgroundColor: 'transparent' }}
              _active={{ backgroundColor: 'transparent' }}
            />
            <MenuList>
              {availableLocales?.map((locale) => (
                <MenuItem
                  key={uuidv4()}
                  as={Link}
                  href={asPath}
                  locale={locale}
                  icon={getLocaleFlag(locale)}
                  _hover={{ backgroundColor: 'transparent' }}
                  _focus={{ backgroundColor: 'transparent' }}
                >
                  {locale.toUpperCase()}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </GridItem>
      </Grid>
    </Template>
  );
};
