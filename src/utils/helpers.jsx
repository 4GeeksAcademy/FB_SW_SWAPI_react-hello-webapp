export const getImageUrl = (category, id) => {
    const baseUrl = "https://starwars-visualguide.com/assets/img";
    let imageUrl;

    switch (category) {
        case "people":
            imageUrl = `${baseUrl}/characters/${id}.jpg`;
            break;
        case "planets":
            imageUrl = `${baseUrl}/planets/${id}.jpg`;
            break;
        case "vehicles":
            imageUrl = `${baseUrl}/vehicles/${id}.jpg`;
            break;
        default:
            imageUrl = "https://via.placeholder.com/400x600/000000/FFFF00?text=No+Image";
    }

    return imageUrl;
};

export const isFavorite = (store, category, id) => {
    const itemId = `${category}-${id}`;
    const result = store.favorites.some(fav => fav.id === itemId);
    
    return result;
};

// SOLO ESTA FUNCIÓN CAMBIA - Para extraer el número correcto
export const getIdFromUrl = (url) => {
    const match = url.match(/\/(\d+)\/?$/);
    return match ? match[1] : null;
};

export const toggleFavorite = (dispatch, store, item) => {
    const itemId = `${item.category}-${item.id}`;

    console.log(`toggleFavorite for ${itemId}:`, item);

    const existingFavorite = store.favorites.find(fav => fav.id === itemId);

    if (existingFavorite) {
        dispatch({
            type: 'remove_favorite',
            payload: itemId
        });
        console.log(`Removed from favorites: ${item.name}`);
    } else {
        const newFavorite = {
            id: itemId,
            name: item.name,
            category: item.category,
            itemId: item.id
        };

        dispatch({
            type: 'add_favorite',
            payload: newFavorite
        });
        console.log(`Added to favorites: ${item.name}`);
    }
};

export const loadFavoritesFromStorage = (dispatch) => {
    try {
        const savedFavorites = localStorage.getItem("swapi_favorites");
        if (savedFavorites) {
            const favorites = JSON.parse(savedFavorites);
            dispatch({
                type: 'load_favorites_from_storage',
                payload: favorites
            });
            console.log("Favorites loaded from localStorage:", favorites.length);
        } else {
            console.log("No favorites found in localStorage");
        }
    } catch (error) {
        console.error("Error loading favorites from localStorage:", error);
        dispatch({
            type: 'set_error',
            payload: 'Error loading favorites from storage'
        });
    }
};

export const retryLoadData = (dispatch, loadFunction) => {
    dispatch({ type: 'set_error', payload: null});
    loadFunction(dispatch);
};

export const formatValue = (value, unit = '') => {
    if (!value || value === 'unknown' || value === 'n/a') {
        return 'Unknown';
    }
    return unit ? `${value} ${unit}` : value;
};

export const getCategoryIcon = (category) => {
    switch (category) {
        case 'people':
            return "fas fa-user";
        case 'planets':
            return "fas fa-globe";
        case 'vehicles':
            return "fas fa-rocket";
        default:
            return "fas fa-star";
    }
};

export const getCategoryTitle = (category) => {
    switch (category) {
        case "people":
            return "Character";
        case "planets":
            return "Planet";
        case "vehicles":
            return "Vehicle";
        default:
            return "Item";
    }
};