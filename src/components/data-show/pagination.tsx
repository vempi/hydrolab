import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../lib/utils";
import { DataContext } from "../../context-provider/data-context";
import React from "react";

export function PaginationButton({
  num,
  className,
  onClickHandler,
}: {
  num: number | string;
  className?: string;
  onClickHandler: () => void;
}) {
  return (
    <div
      onClick={onClickHandler}
      className={cn(
        "p-1 text-sm min-w-8 aspect-square rounded-md bg-gray-200 hover:bg-gray-300 flex justify-center items-center cursor-pointer",
        className
      )}
    >
      {num}
    </div>
  );
}

export default function Pagination() {
  const max_showed_pagination = 6;

  const { pagNum, setPagNum, TOTAL_PAGE } = React.useContext(DataContext);
  const [minTempPagNum, setMinTempPagNum] = React.useState(pagNum);
  const [maxTempPagNum, setMaxTempPagNum] = React.useState(max_showed_pagination);

  const [paginationNumbers, setPaginationNumbers] = React.useState<number[]>([]);

  React.useEffect(() => {
    const retreievedNumbers: number[] = []
    for (let i = minTempPagNum; i < maxTempPagNum; i++) {
      retreievedNumbers.push(1 + i)
    }
    setPaginationNumbers(retreievedNumbers)
  }, [maxTempPagNum, minTempPagNum]);

  React.useEffect(() => {
    const half = Math.floor(max_showed_pagination / 2);

    let newMin = Math.max(pagNum - half - 1, 0);
    let newMax = newMin + max_showed_pagination;

    if (newMax > TOTAL_PAGE) {
      newMax = TOTAL_PAGE;
      newMin = Math.max(TOTAL_PAGE - max_showed_pagination, 0);
    }

    setMinTempPagNum(newMin);
    setMaxTempPagNum(newMax);
  }, [pagNum, TOTAL_PAGE]);


  return (
    <div className="w-full flex items-center justify-center gap-3 pb-5">

      <div
        className={cn(
          "p-1 text-sm min-w-8 aspect-square rounded-md bg-gray-200 hover:bg-gray-300 flex justify-center items-center cursor-pointer",
          maxTempPagNum <= max_showed_pagination && "opacity-40 pointer-events-none"
        )}
        onClick={() => {
          setMinTempPagNum(minTempPagNum - 1)
          setMaxTempPagNum(Math.max(maxTempPagNum - 1, 0))
        }}
      >
        <ChevronLeft />
      </div>

      {paginationNumbers.map((num) => (
        <PaginationButton
          key={num}
          num={num}
          onClickHandler={() => setPagNum(num)}
          className={
            pagNum === num
              ? "bg-gray-400 text-white hover:bg-gray-400"
              : "bg-gray-200 hover:bg-gray-300"
          }
        />
      ))}

      <div
        className={cn(
          "p-1 text-sm min-w-8 aspect-square rounded-md bg-gray-200 hover:bg-gray-300 flex justify-center items-center cursor-pointer",
          maxTempPagNum >= TOTAL_PAGE &&
          "opacity-40 pointer-events-none"
        )}
        onClick={() => {
          setMinTempPagNum(Math.min(minTempPagNum + 1, TOTAL_PAGE - max_showed_pagination))
          setMaxTempPagNum(Math.min(maxTempPagNum + 1, TOTAL_PAGE))
        }}
      >
        <ChevronRight />
      </div>

    </div>
  );
}
