import React from 'react';
import {
  Divider,
  Flex,
  Icon,
  IconButton,
  IconButtonProps,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  useMediaQuery
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FiMenu, FiX } from 'react-icons/fi';
import { MenuType } from '../globals';
import { DesktopViewMenu } from './DesktopViewMenu';
import { InternalLink } from './InternalLink';
import { Chat, Logo } from '../icons';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Container } from './Container';
import { DesktopViewSearchBox } from './DesktopViewSearchBox';
import { MobileViewMenu } from './MobileViewMenu';
import { FormContent } from './Form';
import { ExtendedFormBuilder } from '../blocks';

export interface HeaderProps {
  menu: MenuType;
  form: ExtendedFormBuilder | null;
}

interface DesktopMenuProps {
  menu: MenuType;
  availableLocales?: string[];
  asPath: string;
  activeLocale?: string;
}

interface HamburgerMenuProps extends DesktopMenuProps {
  form: ExtendedFormBuilder | null;
}

interface HamburgerMenuButtonProps extends Omit<IconButtonProps, 'variant'> {}

const DesktopMenu = ({
  menu,
  availableLocales,
  asPath,
  activeLocale
}: DesktopMenuProps) => {
  const [expanded, setExpanded] = React.useState(false);

  return (
    <Flex align="center" boxSize="full">
      <Flex align="center" justify="space-between" boxSize="full" gap={4}>
        <Flex align="center" boxSize="full">
          {!expanded && <DesktopViewMenu menu={menu} />}
          <DesktopViewSearchBox expanded={expanded} setExpanded={setExpanded} />
        </Flex>
        <LanguageSwitcher
          activeLocale={activeLocale}
          asPath={asPath}
          availableLocales={availableLocales}
        />
      </Flex>
    </Flex>
  );
};

const HamburgerMenuButton = ({
  'aria-label': ariaLabel,
  size,
  icon,
  h,
  minW,
  onClick
}: HamburgerMenuButtonProps) => (
  <IconButton
    aria-label={ariaLabel}
    variant="variant"
    size={size}
    icon={icon}
    h={h}
    minW={minW}
    onClick={onClick}
  />
);

const HamburgerMenu = ({
  activeLocale,
  asPath,
  availableLocales,
  menu,
  form
}: HamburgerMenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selected, setSelected] = React.useState<'chat' | 'menu'>('menu');

  return (
    <>
      <HamburgerMenuButton
        aria-label="Hamburger Menu"
        size="lg"
        icon={<Icon as={FiMenu} />}
        onClick={onOpen}
      />
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="full"
        motionPreset="slideInRight"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader p={0}>
            <Container>
              <Flex h={16} align="center" justify="flex-end" gap={4}>
                <LanguageSwitcher
                  activeLocale={activeLocale}
                  asPath={asPath}
                  availableLocales={availableLocales}
                  size="md"
                  h="6"
                  minW="4"
                  w="4"
                />
                <HamburgerMenuButton
                  aria-label="Chat"
                  size="md"
                  icon={<Icon as={Chat} />}
                  h="6"
                  minW="4"
                  onClick={() => setSelected('chat')}
                />
                <HamburgerMenuButton
                  name="menu"
                  aria-label="Hamburger Menu"
                  size="md"
                  icon={<Icon as={FiMenu} />}
                  h="6"
                  minW="4"
                  onClick={() => setSelected('menu')}
                />
                <Divider
                  orientation="vertical"
                  h="5"
                  borderColor="border.secondary"
                />
                <HamburgerMenuButton
                  aria-label="Close Button"
                  size="md"
                  icon={<Icon as={FiX} />}
                  h="6"
                  minW="4"
                  onClick={onClose}
                />
              </Flex>
            </Container>
          </ModalHeader>
          <ModalBody>
            {selected === 'chat' && form && (
              <FormContent
                backgroundColor="background.primary"
                width="90%"
                form={form}
              />
            )}
            {selected === 'menu' && (
              <MobileViewMenu menu={menu} onClose={onClose} />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export const Header = ({ menu, form }: HeaderProps) => {
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');
  const { asPath, locale: activeLocale, locales } = useRouter();

  const availableLocales = locales?.filter((locale) => locale !== activeLocale);

  return (
    <Flex h={16} pos="sticky" top={0} bgColor="white" zIndex={2}>
      <Container>
        <Flex align="center" justify="space-between" gap={10} boxSize="full">
          <InternalLink slug="home">
            <Logo />
          </InternalLink>
          {isLargerThanMd ? (
            <DesktopMenu
              menu={menu}
              availableLocales={availableLocales}
              asPath={asPath}
              activeLocale={activeLocale}
            />
          ) : (
            <HamburgerMenu
              menu={menu}
              form={form}
              activeLocale={activeLocale}
              asPath={asPath}
              availableLocales={availableLocales}
            />
          )}
        </Flex>
      </Container>
    </Flex>
  );
};
