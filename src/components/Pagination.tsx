import React from 'react';
import {
  Pagination as AjnaPagination,
  PaginationContainer as AjnaPaginationContainer,
  usePagination as useAjnaPagination,
  PaginationPageGroup as AjnaPaginationPageGroup,
  PaginationSeparator as AjnaPaginationSeparator,
  PaginationPage as AjnaPaginationPage
} from '@ajna/pagination';
import { v4 as uuidv4 } from 'uuid';

interface PaginationProps {
  totalSize: number;
  onPageChange: (nextPage: number) => void;
}

export const Pagination = ({ totalSize, onPageChange }: PaginationProps) => {
  const { pages, pagesCount, currentPage, setCurrentPage, isDisabled } =
    useAjnaPagination({
      total: totalSize,
      initialState: {
        pageSize: 10,
        isDisabled: false,
        currentPage: 1
      }
    });

  const handlePageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
    onPageChange(nextPage);
  };

  return (
    <AjnaPagination
      pagesCount={pagesCount}
      currentPage={currentPage}
      isDisabled={isDisabled}
      onPageChange={handlePageChange}
    >
      <AjnaPaginationContainer align="center" justify="center" w="full">
        <AjnaPaginationPageGroup
          align="center"
          isInline
          separator={<AjnaPaginationSeparator jumpSize={11} />}
        >
          {pages.map((page) => (
            <AjnaPaginationPage
              key={uuidv4()}
              page={page}
              color="text.primary"
              bg="background.secondary"
              w="10"
              _current={{
                bg: 'background.blue.200',
                color: 'text.light',
                _hover: {
                  bg: 'background.blue.200'
                }
              }}
            />
          ))}
        </AjnaPaginationPageGroup>
      </AjnaPaginationContainer>
    </AjnaPagination>
  );
};
