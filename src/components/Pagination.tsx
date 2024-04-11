import React from 'react';
import {
  Pagination as AjnaPagination,
  PaginationContainer as AjnaPaginationContainer,
  usePagination as useAjnaPagination,
  PaginationPageGroup as AjnaPaginationPageGroup,
  PaginationSeparator as AjnaPaginationSeparator,
  PaginationPage as AjnaPaginationPage
} from '@ajna/pagination';

interface PaginationProps {
  totalSize: number;
  onPageChange: (nextPage: number) => void;
}

export const Pagination = ({ totalSize, onPageChange }: PaginationProps) => {
  const { pages, pagesCount, currentPage, setCurrentPage, isDisabled } =
    useAjnaPagination({
      total: totalSize,
      limits: {
        outer: 1,
        inner: 1
      },
      initialState: {
        pageSize: 12,
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
          separator={<AjnaPaginationSeparator jumpSize={10} />}
        >
          {pages.map((page) => (
            <AjnaPaginationPage
              key={`pagination_page_${page}`}
              page={page}
              color="text.primary"
              bg="background.secondary"
              w="10"
              _current={{
                bg: 'background.dark',
                color: 'text.light',
                _hover: {
                  bg: 'background.dark'
                }
              }}
            />
          ))}
        </AjnaPaginationPageGroup>
      </AjnaPaginationContainer>
    </AjnaPagination>
  );
};
