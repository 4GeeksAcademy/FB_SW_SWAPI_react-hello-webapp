import api from './api';

import {
    getImageUrl,
    isFavorite,
    getIdFromUrl,
    toggleFavorite,
    loadFavoritesFromStorage,
    retryLoadData,
    formatValue,
    getCategoryIcon,
    getCategoryTitle
} from './helpers'

export const utils = {
    ...api,

    getImageUrl,
    isFavorite,
    getIdFromUrl,
    toggleFavorite,
    loadFavoritesFromStorage,
    retryLoadData,
    formatValue,
    getCategoryIcon,
    getCategoryTitle
};

export { api };

export {
    getImageUrl,
    isFavorite,
    getIdFromUrl,
    toggleFavorite,
    loadFavoritesFromStorage,
    retryLoadData,
    formatValue,
    getCategoryIcon,
    getCategoryTitle
};

export default utils;