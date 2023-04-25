import {
  Divider,
  Flex,
  Icon,
  IconButton,
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
import { Menu } from './Menu';
import { InternalLink } from './InternalLink';
import { Chat, EN, Logo, TR } from '../icons';
import { LanguageSelector } from './LanguageSelector';
import { Container } from './Container';

export interface HeaderProps {
  menu: MenuType;
}

interface HamburgerMenuProps {
  activeLocale?: string;
}

interface DesktopMenuProps {
  menu: MenuType;
  availableLocales?: string[];
  asPath: string;
  activeLocale?: string;
}

interface LocaleFlagProps {
  locale?: string;
}

const LocaleFlag = ({ locale }: LocaleFlagProps) => {
  switch (locale) {
    case 'en':
      return <EN width={16} height={16} />;
    case 'tr':
      return <TR width={16} height={16} />;
    default:
      return null;
  }
};

const DesktopMenu = ({
  menu,
  availableLocales,
  asPath,
  activeLocale
}: DesktopMenuProps) => (
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
);

const HamburgerMenu = ({ activeLocale }: HamburgerMenuProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        aria-label="Hamburger Menu"
        variant="unstyled"
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
          <ModalHeader p={0} border="1px solid blue">
            <Container>
              <Flex h={16} align="center" justify="flex-end" gap={4}>
                <IconButton
                  aria-label="Language"
                  variant="unstyled"
                  size="md"
                  icon={<LocaleFlag locale={activeLocale} />}
                  h="6"
                  minW="4"
                  // onClick={() => console.log('clicked')}
                />
                <IconButton
                  aria-label="Chat"
                  variant="unstyled"
                  size="md"
                  icon={<Icon as={Chat} />}
                  h="6"
                  minW="4"
                  // onClick={() => console.log('clicked')}
                />
                <IconButton
                  aria-label="Hamburger Menu"
                  variant="unstyled"
                  size="md"
                  icon={<Icon as={FiMenu} />}
                  h="6"
                  minW="4"
                  // onClick={() => console.log('clicked')}
                />
                <Divider
                  orientation="vertical"
                  h="5"
                  borderColor="border.secondary"
                />
                <IconButton
                  aria-label="Close Button"
                  variant="unstyled"
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
            <p>Body</p>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export const Header = ({ menu }: HeaderProps) => {
  const [isLargerThanMd] = useMediaQuery('(min-width: 768px)');
  const { asPath, locale: activeLocale, locales } = useRouter();

  const availableLocales = locales?.filter((locale) => locale !== activeLocale);

  return (
    <Flex h={16}>
      <Container>
        <Flex align="center" justify="space-between" gap={10} boxSize="full">
          <InternalLink slug={asPath}>
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
            <HamburgerMenu activeLocale={activeLocale} />
          )}
        </Flex>
      </Container>
    </Flex>
  );
};
