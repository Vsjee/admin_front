import { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { Kid } from '../../../../core/types/kids_types';

interface Props {
  kids: Kid[];
}

function UserKidsSimpleBarChart({ kids }: Props) {
  const chartRef = useRef(null);

  const calculateAverageAgeByGender = (kids: Kid[]) => {
    const averageMaleAge: number[] = [];
    let averageMaleAgeLen = 0;
    const averageFemaleAge: number[] = [];
    let averageFemaleAgeLen = 0;

    kids.forEach((kid) =>
      kid.gender === 'male'
        ? (averageMaleAge.push(kid.years), averageMaleAgeLen++)
        : (averageFemaleAge.push(kid.years), averageFemaleAgeLen++)
    );
    console.log(averageMaleAge, averageFemaleAge);

    const maleAverage =
      averageMaleAge.reduce((acc, curr) => acc + curr, 0) / averageMaleAgeLen;

    const femaleAverage =
      averageFemaleAge.reduce((acc, curr) => acc + curr, 0) /
      averageFemaleAgeLen;

    return [maleAverage, femaleAverage];
  };

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
      },
      legend: {
        top: '5%',
        left: 'center',
        textStyle: {
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          data: ['Masculino', 'Femenino'],
          axisTick: {
            alignWithLabel: true,
          },
        },
      ],
      yAxis: [
        {
          type: 'value',
        },
      ],
      series: [
        {
          name: 'Promedio edad por genero',
          type: 'bar',
          barWidth: '60%',
          data: calculateAverageAgeByGender(kids),
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [kids]);

  return <div ref={chartRef} style={{ width: '500px', height: '400px' }}></div>;
}

export default UserKidsSimpleBarChart;
