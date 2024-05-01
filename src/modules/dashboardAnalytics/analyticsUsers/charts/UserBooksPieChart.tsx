import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { IBook } from '../../../../core/types/books_types';

interface Props {
  books: IBook[];
}

function UserBooksPieChart({ books }: Props) {
  const chartRef = useRef(null);

  const calculateAprobationPercentage = (books: IBook[]) => {
    let aprovedCount = 0;
    let disaprovedCount = 0;

    books.forEach((book) =>
      book.is_story_approved ? aprovedCount++ : disaprovedCount++
    );

    return [
      {
        value: aprovedCount,
        name: 'Libros Aprobados',
      },
      {
        value: disaprovedCount,
        name: 'Lirbos Sin aprobar',
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
          name: 'Porcentaje de aprobación',
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
          data: calculateAprobationPercentage(books),
        },
      ],
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [books]);

  return <div ref={chartRef} style={{ width: '500px', height: '400px' }}></div>;
}

export default UserBooksPieChart;
