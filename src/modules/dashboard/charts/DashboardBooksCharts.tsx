import * as echarts from 'echarts';
import { useEffect, useRef } from 'react';
import { IBook } from '../../../core/types/books_types';
import { IStory } from '../../../core/types/stories_types';
import bumii_coin_cute from '../../../assets/images/home/bumii_coin_cute.jpg';
import bumii_coin_reading from '../../../assets/images/home/bumii_coin_reading.jpg';

interface Props {
  books: IBook[];
  stories: IStory[];
}

interface BooksProps {
  books: IBook[];
}

interface StoriesProps {
  stories: IStory[];
}

function DashboardBooksChart({ books, stories }: Props) {
  return (
    <div className="pt-5">
      <h1 className="text-xl pb-3">Libros data</h1>
      <UsedTokens stories={stories} />
      <div className="flex justify-center pt-5">
        <BooksAprovationPercentagePieChart books={books} />
      </div>
    </div>
  );
}

function BooksAprovationPercentagePieChart({ books }: BooksProps) {
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
        name: 'Libros Sin aprobar',
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

function UsedTokens({ stories }: StoriesProps) {
  return (
    <div className="flex gap-5">
      <div className="card w-full  h-64 bg-base-100 shadow-xl image-full">
        <figure>
          <img
            src={bumii_coin_cute}
            alt="Bumii kids"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </figure>
        <div className="card-body grid place-content-center">
          <div
            className="radial-progress text-primary"
            style={
              {
                '--size': '12rem',
                '--thickness': '15px',
                animation:
                  'load 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards',
              } as React.CSSProperties
            }
            role="progressbar">
            <h1 className="text-xl text-center">
              Total Story Tokens
              <br />
              <span className="text-4xl">
                {stories.reduce(
                  (acc, storie) =>
                    acc +
                    (storie.story_tokens
                      ? storie.story_tokens.total_tokens
                      : 0),
                  0
                )}
              </span>
            </h1>
          </div>
        </div>
      </div>{' '}
      <div className="card w-full  h-64 bg-base-100 shadow-xl image-full">
        <figure>
          <img
            src={bumii_coin_reading}
            alt="Bumii kids"
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </figure>
        <div className="card-body grid place-content-center">
          <div
            className="radial-progress text-primary"
            style={
              {
                '--size': '12rem',
                '--thickness': '15px',
                animation:
                  'load 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) forwards',
              } as React.CSSProperties
            }
            role="progressbar">
            <h1 className="text-xl text-center">
              Total Image Prompt Tokens
              <br />
              <span className="text-4xl">
                {stories.reduce(
                  (acc, storie) =>
                    acc +
                    (storie.image_prompt_tokens
                      ? storie.image_prompt_tokens.total_tokens
                      : 0),
                  0
                )}
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardBooksChart;
