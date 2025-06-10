export const initialStore = () => ({
    people: [],
    planets: [],
    vehicles: [],
    favorites: [],
    loading: false,
    currentItem: null,
    error: null
});

const storeReducer = (state, action) => {
    console.log(`Reducer action: ${action.type}`, action);
    
    switch (action.type) {
        
        case 'set_loading':
            console.log(`Setting loading: ${action.payload}`);
            return {
                ...state,
                loading: action.payload,
                error: action.payload ? null : state.error
            };
            
        case 'set_error':
            console.log(`Setting error: ${action.payload}`);
            return {
                ...state,
                error: action.payload,
                loading: false
            };
            
        case 'load_initial_data':
            console.log(`Loading initial data:`, action.payload);
            const newState = {
                ...state,
                people: action.payload.people || [],
                planets: action.payload.planets || [],
                vehicles: action.payload.vehicles || [],
                loading: false,
                error: null
            };
            console.log(`New state after load_initial_data:`, newState);
            return newState;
            
        case 'load_item_details':
            console.log(`Loading item details:`, action.payload);
            return {
                ...state,
                currentItem: {
                    ...action.payload,
                    category: action.category,
                    id: action.id
                },
                loading: false,
                error: null
            };
            
        case 'add_favorite':
            const existingFavorite = state.favorites.find(fav => fav.id === action.payload.id);
            if (existingFavorite) {
                console.log(`Favorite already exists: ${action.payload.id}`);
                return state;
            }
            
            const newFavorites = [...state.favorites, action.payload];
            localStorage.setItem("swapi_favorites", JSON.stringify(newFavorites));
            console.log(`Added favorite: ${action.payload.name}`);
            
            return {
                ...state,
                favorites: newFavorites
            };
            
        case 'remove_favorite':
            const filteredFavorites = state.favorites.filter(fav => fav.id !== action.payload);
            localStorage.setItem("swapi_favorites", JSON.stringify(filteredFavorites));
            console.log(`Removed favorite: ${action.payload}`);
            
            return {
                ...state,
                favorites: filteredFavorites
            };
            
        case 'load_favorites_from_storage':
            console.log(`Loading favorites from storage:`, action.payload);
            return {
                ...state,
                favorites: action.payload || []
            };
            
        case 'clear_current_item':
            console.log(`Clearing current item`);
            return {
                ...state,
                currentItem: null
            };
            
        default:
            console.warn(`Unrecognized action: ${action.type}`);
            return state;
    }
};

export default storeReducer;
