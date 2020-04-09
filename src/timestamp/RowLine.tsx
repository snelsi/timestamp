import * as React from "react";
import { LineCell } from "timestamp";

interface RowLineProps {
  from?: number;
  numbers: number;
  fillTo: number;
  current?: number;
  dataType?: string;
}
export const RowLine: React.FC<RowLineProps> = React.memo(
  ({ numbers, fillTo, from = 1, dataType = undefined, current = undefined, ...props }) => (
    <>
      {[...Array(numbers)].map((_, index) => {
        const value = index + from;
        const status = value === current ? "current" : undefined;

        return (
          <LineCell
            key={value}
            fillTo={fillTo - value}
            data-type={dataType}
            data-status={status}
            {...props}
          >
            {value}
          </LineCell>
        );
      })}
    </>
  ),
);
