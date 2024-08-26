import React from 'react';
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface CustomPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const CustomPagination: React.FC<CustomPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const delta = window.innerWidth < 640 ? 1 : 2; // 在小屏幕上减少显示的页码数
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }
    
    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }
    
    range.unshift(1);
    if (totalPages !== 1) {
      range.push(totalPages);
    }
    
    return range;
  };

  return (
    <ShadcnPagination>
      <PaginationContent className="flex flex-wrap justify-center gap-2">
        <PaginationItem>
          <PaginationPrevious 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (currentPage > 1) onPageChange(currentPage - 1);
            }}
            className={`${currentPage === 1 ? 'pointer-events-none opacity-50' : ''} hover:bg-white hover:text-black transition-colors`}
          />
        </PaginationItem>
        
        {getPageNumbers().map((number, index) => (
          <PaginationItem key={index}>
            {number === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink 
                href="#" 
                isActive={currentPage === number}
                onClick={(e) => { e.preventDefault(); onPageChange(number as number); }}
                className={`
                  ${currentPage === number ? 'bg-white text-black' : 'bg-transparent text-white'} 
                  hover:bg-white hover:text-black transition-colors
                `}
              >
                {number}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}
        
        <PaginationItem>
          <PaginationNext 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (currentPage < totalPages) onPageChange(currentPage + 1);
            }}
            className={`${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} hover:bg-white hover:text-black transition-colors`}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
};