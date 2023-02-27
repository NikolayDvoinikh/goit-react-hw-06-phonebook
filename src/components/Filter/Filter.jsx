import css from './filter.module.css';
import { useDispatch } from 'react-redux';
import { setFilter } from 'Redux/filter/filter-slice';

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <label htmlFor="filter" className={css.label}>
      Find contacts by name
      <input
        className={css.filter}
        type="text"
        name="filter"
        onChange={({ target }) => dispatch(setFilter(target.value))}
      />
    </label>
  );
};

export default Filter;
