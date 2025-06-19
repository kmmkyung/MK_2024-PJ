interface PaginationProps {
  itemLength: number;
  itemShowLength?: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function PageNation({itemLength,itemShowLength=5,currentPage,onPageChange}:PaginationProps) {
  const totalPages = Math.ceil(itemLength / itemShowLength);

  // if (totalPages <= 1) return null;

  return (
    <ol className="my-5 flex justify-center items-end gap-1 text-sm text-neutral-600 dark:text-neutral-400">
    {Array.from({ length: totalPages }, (_, i) => {
      const page = i + 1;
      const isLast = page === totalPages;
      return (
        <li key={page} className="flex items-center">
          <span
            onClick={() => onPageChange(page)}
            className={`cursor-pointer px-1 select-none ${
              page === currentPage ? "font-bold text-primary" : ""
            }`}>
            {page}
          </span>
          {!isLast && <span className="px-1 select-none">|</span>}
        </li>
      );
    })}
  </ol>
  );
}
