import { Button } from "./Button";

const Pagination = ({
  listPerPage,
  totalData,
  paginateData,
  className,
}: {
  listPerPage: number;
  totalData: number;
  paginateData: (pageNumber:number) => void;
  className: string;
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalData / listPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={className}>
      {pageNumbers.map((page, index) => (
        <Button key={index} onClick={() => paginateData(page)} label={String(page)} />
      ))}
    </div>
  );
};

export default Pagination;
