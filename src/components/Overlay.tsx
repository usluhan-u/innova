import { Box } from '@chakra-ui/react';
import React from 'react';

interface OverlayProps {
  children: React.ReactNode | React.ReactNode[];
}

export const Overlay = ({ children }: OverlayProps) => (
  <Box
    pos="relative"
    boxSize="full"
    overflow="hidden"
    _after={{
      content: '""',
      pos: 'absolute',
      inset: '0',
      bgGradient: 'linear(0deg, rgba(9, 34, 50, 0.4), rgba(9, 34, 50, 0.4))'
    }}
  >
    {children}
  </Box>
);
