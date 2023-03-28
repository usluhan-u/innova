import { GenericLink } from './GenericLink';
import { Logo } from '../icons';
import { Box, Container, HStack } from '@chakra-ui/react';

export const Header = () => {
  return (
    <Container
      maxW="90%"
      h="70px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <HStack alignItems="center" justifyContent="space-between" w="100%">
        <HStack alignItems="center" spacing={32}>
          <GenericLink href="/">
            <Logo />
          </GenericLink>
          <HStack alignItems="center" spacing={16}>
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
            <Box>4</Box>
            <Box>5</Box>
            <Box>6</Box>
          </HStack>
        </HStack>
        <Box>Search/Language</Box>
      </HStack>
    </Container>
  );
};
