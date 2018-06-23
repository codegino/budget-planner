export const ON_LOADING_START = 'ON_LOADING_START';
export const ON_LOADING_END = 'ON_LOADING_END';

export const onLoadingStart = () => ({
  type: ON_LOADING_START,
});

export const onLoadingEnd = () => ({
  type: ON_LOADING_END,
});
