import * as echarts from 'echarts';
import { Kid } from '../../../../core/types/kids_types';
import { useEffect, useRef } from 'react';

interface Props {
  kids: Kid[];
}

function UserKidsPieChart({ kids }: Props) {
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
          name: 'Porcentaje de niños creados por genero',
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

export default UserKidsPieChart;
