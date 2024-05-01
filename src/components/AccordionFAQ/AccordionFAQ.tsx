import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { SyntheticEvent, useState } from 'react';
import { faqsList } from '../../models/home.model';
import './accordionFAQ.css';

function AccordionFAQ() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [filter, setFilter] = useState('');

  const handleChange = (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const clearInput = () => {
    setFilter('');
  };

  return (
    <>
      <div className='relative w-full'>
        <input
          type='text'
          className='bg-green-3 py-1 px-3 w-full h-11 rounded text-white placeholder:text-gray-200 focus:outline-none'
          placeholder='Buscar...'
          name='filter'
          value={filter}
          onChange={(event) => setFilter(event.target.value)}
        />
        {filter.length !== 0 ? (
          <button
            className='absolute right-1 top-1 px-2 hover:text-black ease-in duration-300'
            title='Limpiar'
            onClick={clearInput}
          >
            X
          </button>
        ) : (
          <></>
        )}
      </div>
      {faqsList
        .filter(
          (item) => item.question.toLowerCase().includes(filter.toLowerCase()) || filter === ''
        )
        .map((item, i) => {
          const panel = 'panel' + i.toString();

          return (
            <Accordion
              expanded={expanded === panel}
              onChange={handleChange(panel)}
              className='accordion w-full border-b-2'
              key={i}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon className='text-white' />}
                aria-controls={panel + '-content'}
                id={panel + '-header'}
                className='accordion__header font-bold'
              >
                <h1 className='text-white'>{item.question}</h1>
              </AccordionSummary>
              <AccordionDetails className='accordion__details text-ls font-sans'>
                {item.answer}
              </AccordionDetails>
            </Accordion>
          );
        })}
      {faqsList.filter((item) => {
        return item.question.toLowerCase().includes(filter.toLowerCase()) || filter === '';
      }).length === 0 ? (
        <span className='pt-20 pb-10'>No se encontro la pregunta.</span>
      ) : (
        <></>
      )}
    </>
  );
}
export default AccordionFAQ;
