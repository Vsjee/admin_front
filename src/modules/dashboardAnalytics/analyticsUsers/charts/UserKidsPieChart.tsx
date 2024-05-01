import * as echarts from 'echarts';
import { Kid } from '../../../../core/types/kids_types';
import { useEffect, useRef } from 'react';

interface Props {
  kids: Kid[];
}

function UserKidsPieChart({ kids }: Props) {
  const chartRef = useRef(null);

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
          data: kids.map((kid) => ({
            value: 1,
            name: kid.gender === 'male' ? 'Masculino' : 'Femenino',
          })),
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ width: '600px', height: '400px' }}></div>;
}

export default UserKidsPieChart;
