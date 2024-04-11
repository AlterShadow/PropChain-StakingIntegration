import React, { useMemo } from "react";
import numeral from "numeral";
import { scaleLinear, scaleTime } from "@visx/scale";
import { max, min, extent } from "d3-array";
import { PrimaryChartProps } from "./interfaces";
import { DataProps } from "interfaces/DataProps";
import LineChart from "components/LineChart";

// accessors
const getDate = (d: DataProps) => new Date(d.date);
const getStockValue = (d: DataProps) => d?.price;

const PrimaryChart: React.FC<PrimaryChartProps> = ({
  data,
  width = 10,
  height,
  margin = { top: 0, right: 0, bottom: 0, left: 0 },
}) => {
  // bounds
  const xMax = Math.max(width - margin.left - margin.right, 0);
  const yMax = Math.max(height - margin.top - margin.bottom, 0);

  // scales
  const dateScale = useMemo(() => {
    return scaleTime({
      range: [0, xMax],
      domain: extent(data, getDate) as [Date, Date],
    });
  }, [xMax, data]);
  const priceScale = useMemo(() => {
    return scaleLinear({
      range: [yMax + margin.top, margin.top],
      domain: [min(data, getStockValue) || 0, max(data, getStockValue) || 0],
      nice: true,
    });
    //
  }, [margin.top, yMax, data]);

  return (
    <div style={{ position: "relative", margin: "0 0 1rem" }}>
      <svg width={width} height={height}>
        <LineChart
          data={data}
          width={width}
          margin={{ ...margin }}
          yMax={yMax}
          xScale={dateScale}
          yScale={priceScale}
          stroke="#26619C"
          xTickFormat={(d) => {
            return numeral(d).format(d <= 100 ? "$0.00" : "$0,0");
          }}
        />
      </svg>
    </div>
  );
};

export default PrimaryChart;