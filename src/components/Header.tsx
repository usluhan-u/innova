import {
  Button,
  Divider,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  useDisclosure,
  Text,
  IconButton,
  Flex,
  useMediaQuery
} from '@chakra-ui/react';
import {
  ArrowForwardIcon,
  ChevronDownIcon,
  HamburgerIcon
} from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import React from 'react';
import Link from 'next/link';
import { Logo, EN, TR } from '../icons';
import { InternalLink } from './InternalLink';
import { SearchBox } from './SearchBox';
import { Template } from './Template';
import { MenuType } from '../collections';

export interface HeaderProps {
  menuList: MenuType[];
}

export const Header = ({ menuList }: HeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { locale: activeLocale, locales, asPath } = useRouter();
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');
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
      backgroundColor="white"
      h="70px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex
        alignItems="center"
        justifyContent="space-between"
        boxSize="full"
        gap={expanded ? 8 : 16}
      >
        <InternalLink href={asPath}>
          <Logo />
        </InternalLink>
        {isLargerThanMd ? (
          <Flex
            w="full"
            alignItems="center"
            justifyContent="space-between"
            gap={4}
          >
            <Flex alignItems="center" justifyContent="space-between" w="full">
              <Flex alignItems="center">
                {!expanded && (
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
                          <MenuList
                            onMouseEnter={onOpen}
                            onMouseLeave={onClose}
                          >
                            <Flex gap={8} padding="1rem">
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
                                      _hover={{
                                        backgroundColor: 'transparent'
                                      }}
                                    >
                                      {subMenu.label}
                                    </MenuItem>
                                  ))}
                                </MenuGroup>
                              ))}
                            </Flex>
                            <Flex flexDirection="column" p={8}>
                              <Divider borderBottomColor="black" />
                              <InternalLink href={asPath}>
                                <Text color="text.blue">
                                  Tüm Ürünleri İnceleyin <ArrowForwardIcon />
                                </Text>
                              </InternalLink>
                            </Flex>
                          </MenuList>
                        </React.Fragment>
                      ) : (
                        <InternalLink
                          key={uuidv4()}
                          href={menu.group.page.slug}
                        >
                          {menu.label}
                        </InternalLink>
                      )
                    )}
                  </Menu>
                )}
              </Flex>
              <SearchBox
                expanded={expanded}
                handleToggle={handleExpandToggle}
              />
            </Flex>
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
          </Flex>
        ) : (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="unstyled"
              size="lg"
            >
              <MenuList>
                <MenuItem>Download</MenuItem>
                <MenuItem>Create a Copy</MenuItem>
                <MenuItem>Mark as Draft</MenuItem>
                <MenuItem>Delete</MenuItem>
                <MenuItem>Attend a Workshop</MenuItem>
              </MenuList>
            </MenuButton>
          </Menu>
        )}
      </Flex>
    </Template>
  );
};
