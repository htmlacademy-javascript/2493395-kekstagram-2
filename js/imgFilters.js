export const showFilters = () => {
  const filters = document.querySelector('.img-filters');
  if (filters) {
    filters.classList.remove('img-filters--inactive');
  }
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const FilterFunctions = {
  'filter-default': (posts) => [...posts],
  'filter-random': (posts) => [...posts].sort(() => 0.5 - Math.random()).slice(0, 10),
  'filter-discussed': (posts) => [...posts].sort((a, b) => b.comments.length - a.comments.length)
};

export const initFilters = (posts, renderFunction) => {
  const filterForm = document.querySelector('.img-filters__form');
  if (!filterForm) {
    return;
  }

  showFilters();

  const debouncedRender = debounce((filterId) => {
    const pictureElements = document.querySelectorAll('.picture');
    pictureElements.forEach((element) => {
      element.remove();
    });

    renderFunction(FilterFunctions[filterId](posts));
  });

  filterForm.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      const activeButton = document.querySelector('.img-filters__button--active');
      if (activeButton) {
        activeButton.classList.remove('img-filters__button--active');
      }
      evt.target.classList.add('img-filters__button--active');
      debouncedRender(evt.target.id);
    }
  });

  const defaultFilter = document.getElementById('filter-default');
  if (defaultFilter) {
    defaultFilter.classList.add('img-filters__button--active');
  }
};
