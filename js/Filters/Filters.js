import {sortPicture} from '../Sort/Sort.js';
import {debounce} from '../Utils/Utils.js';

const filter = document.querySelector('.img-filters');

const sortFilter = (data) => {
  filter.classList.remove('img-filters--inactive');
  filter.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button') && !evt.target.classList.contains('img-filters__button--active')) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      const filterName = evt.target.id;
      debounce(sortPicture(filterName, data));
    }
  });
};

export {sortFilter};
