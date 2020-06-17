import React, { useEffect, useRef } from 'react';
import { drawAxisY, drawAxisX, drawChartTitle } from './helper';
import { DEFAULT_CANVAS_SPACING } from './constants';

const drawSingleBar = (ctx, startX, startY, width, height, color) => {
  ctx.save();
  ctx.fillStyle = color;
  ctx.fillRect(startX, startY, width, height);
  ctx.restore();
};

const drawBarChart = (chartOptions, canvasRef) => {
  const canvas = canvasRef.current;
  const canvasOptions = {};
  const snakeData = chartOptions.data;
  const width = 500;
  const height = 500;
  const canvasHeight = 500;
  const canvasWidth = 500;

  let barIndex = 0;
  let colorIndex = 0;
  for (let j = 0; j <= snakeData.length; j += 1) {
    if (
      snakeData[j] &&
      snakeData[j]['data'] &&
      snakeData[j]['data'][i] &&
      snakeData[j]['data'][i][1]
    ) {
      const barHeight = Math.round((canvasHeight / maxHeight) * snakeData[j]['data'][i][1]);
      const x = canvasOptions.padding + barIndex * barSize;
      const y = height - barHeight - canvasOptions.padding;
      console.log(`height => ${barHeight}, width => ${barSize} x => ${x} y => ${y}`);
      drawSingleBar(canvasOptions.context, x, y, 10, 10, colors[colorIndex]);
      barIndex++;
    } else {
      barIndex++;
      continue;
    }
    colorIndex++;
  }
};

const BarChart = ({ chartOptions }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    drawBarChart(chartOptions, canvasRef);
  });

  return (
    <div>
      <canvas
        className='canvas-bar'
        ref={canvasRef}
        width={chartOptions.chartWidth}
        height={chartOptions.chartHeight}
      />
    </div>
  );
};

export default BarChart;
