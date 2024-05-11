import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { Kid } from '../../../core/types/kids_types';

interface Props {
  kids: Kid[];
}

function DashboardKidsCharts({ kids }: Props) {
  return (
    <div className="pt-5">
      <h1 className="text-xl pb-3">Niños data</h1>
      <div className="flex justify-center">
        <GenderPercentageKidsPieChart kids={kids} />
        <AgeAverageKidsPieChart kids={kids} />
      </div>
    </div>
  );
}

function GenderPercentageKidsPieChart({ kids }: Props) {
  const chartRef = useRef(null);

  const calculateGendersPercentage = (kids: Kid[]) => {
    let maleCount = 0;

    let femaleCount = 0;

    kids.forEach((kid) =>
      kid.gender === 'male' ? maleCount++ : femaleCount++
    );

    return [
      {
        value: maleCount,
        name: 'Masculino',
      },
      {
        value: femaleCount,
        name: 'Femenino',
      },
    ];
  };

  useEffect(() => {
    const myChart = echarts.init(chartRef.current);

    const option = {
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
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
      series: [
        {
          name: 'Distribucion de genero',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          padAngle: 5,
          itemStyle: {
            borderRadius: 10,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          data: calculateGendersPercentage(kids),
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

function AgeAverageKidsPieChart({ kids }: Props) {
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
          name: 'Promedio de edad',
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

export default DashboardKidsCharts;
