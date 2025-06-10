const api = {
    loadInitialData: async (dispatch) => {
        dispatch({ type: 'set_loading', payload: true });
        
        try {
            console.log("Cargando datos iniciales...");
            
            const [peopleResponse, planetsResponse, vehiclesResponse] = await Promise.all([
                fetch("https://www.swapi.tech/api/people/"),
                fetch("https://www.swapi.tech/api/planets/"),
                fetch("https://www.swapi.tech/api/vehicles/")
            ]);
            
            console.log("Respuestas recibidas:", {
                people: peopleResponse.status,
                planets: planetsResponse.status,
                vehicles: vehiclesResponse.status
            });
            
            if (!peopleResponse.ok || !planetsResponse.ok || !vehiclesResponse.ok) {
                throw new Error(`Failed to fetch data from SWAPI. Status: ${peopleResponse.status}, ${planetsResponse.status}, ${vehiclesResponse.status}`);
            }
            
            const peopleData = await peopleResponse.json();
            const planetsData = await planetsResponse.json();
            const vehiclesData = await vehiclesResponse.json();
            
            console.log("Datos parseados:", {
                people: peopleData,
                planets: planetsData,
                vehicles: vehiclesData
            });
            
            console.log("Datos cargados:", {
                people: peopleData.results?.length || 0,
                planets: planetsData.results?.length || 0,
                vehicles: vehiclesData.results?.length || 0
            });
            
            dispatch({
                type: 'load_initial_data',
                payload: {
                    people: peopleData.results || [],
                    planets: planetsData.results || [],
                    vehicles: vehiclesData.results || []
                }
            });
            
        } catch (error) {
            console.error("Error cargando datos:", error);
            console.error("Error stack:", error.stack);
            dispatch({
                type: 'set_error',
                payload: `Error loading data: ${error.message}`
            });
        }
    },

    loadItemDetails: async (dispatch, category, id) => {
        dispatch({ type: 'set_loading', payload: true });
        
        try {
            console.log(`Cargando detalles de ${category} con ID: ${id}`);
            
            const response = await fetch(`https://www.swapi.tech/api/${category}/${id}/`);
            
            console.log(`Respuesta para ${category}/${id}:`, response.status);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            console.log("Detalles cargados:", data.result);
            
            dispatch({
                type: 'load_item_details',
                payload: data.result,
                category: category,
                id: id
            });
            
        } catch (error) {
            console.error("Error cargando detalles:", error);
            dispatch({
                type: 'set_error',
                payload: `Error loading ${category} details: ${error.message}`
            });
        }
    },

    fetchFromSWAPI: async (endpoint) => {
        try {
            console.log(`Fetching: https://www.swapi.tech/api/${endpoint}`);
            const response = await fetch(`https://www.swapi.tech/api/${endpoint}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            console.log(`Fetch successful for ${endpoint}:`, data);
            return data;
        } catch (error) {
            console.error(`Error fetching from SWAPI: ${endpoint}`, error);
            throw error;
        }
    }
};

export default api;