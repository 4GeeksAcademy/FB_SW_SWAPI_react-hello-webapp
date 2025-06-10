import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { utils } from "../utils";

const Single = () => {
    const { store, dispatch } = useGlobalReducer();
    const { category, id } = useParams();
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);

    useEffect(() => {

        utils.loadItemDetails(dispatch, category, id);
        
        return () => {
            dispatch({ type: 'clear_current_item' });
        };
    }, [category, id]);

    const handleImageError = () => {
        setImageError(true);
    };

    if (store.loading || !store.currentItem) {
        return (
            <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <div className="loading-container d-inline-block p-5 rounded">
                        <div className="spinner-border text-warning mb-3" style={{ width: "4rem", height: "4rem" }}>
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <h4 className="text-light mb-2">Loading details...</h4>
                        <p className="text-muted mb-0">Fetching information from the Star Wars universe</p>
                    </div>
                </div>
            </div>
        );
    }

    if (store.error) {
        return (
            <div className="bg-dark min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <i className="fas fa-exclamation-triangle text-warning display-1 mb-4"></i>
                    <h2 className="text-light mb-3">Error Loading Details</h2>
                    <p className="text-muted mb-4 lead">{store.error}</p>
                    <div className="d-flex gap-3 justify-content-center">
                        <button 
                            className="btn btn-warning"
                            onClick={() => {
                                dispatch({ type: 'set_error', payload: null });
                                utils.loadItemDetails(dispatch, category, id);
                            }}
                        >
                            <i className="fas fa-redo me-2"></i>
                            Try Again
                        </button>
                        <Link to="/" className="btn btn-outline-warning">
                            <i className="fas fa-arrow-left me-2"></i>
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const item = store.currentItem.properties;
    const imageUrl = utils.getImageUrl(category, id);
    const isFavorite = utils.isFavorite(store, category, id);

    const handleFavoriteClick = () => {
        utils.toggleFavorite(dispatch, store, {
            name: item.name,
            category: category,
            id: id
        });
    };

    const getDetailedInfo = () => {
        switch (category) {
            case "people":
                return [
                    { label: "Birth Year", value: item.birth_year, icon: "fas fa-birthday-cake" },
                    { label: "Gender", value: item.gender, icon: "fas fa-venus-mars" },
                    { label: "Height", value: utils.formatValue(item.height, "cm"), icon: "fas fa-ruler-vertical" },
                    { label: "Mass", value: utils.formatValue(item.mass, "kg"), icon: "fas fa-weight" },
                    { label: "Hair Color", value: item.hair_color, icon: "fas fa-palette" },
                    { label: "Skin Color", value: item.skin_color, icon: "fas fa-hand-paper" },
                    { label: "Eye Color", value: item.eye_color, icon: "fas fa-eye" }
                ];
            case "planets":
                return [
                    { label: "Climate", value: item.climate, icon: "fas fa-thermometer-half" },
                    { label: "Population", value: utils.formatValue(item.population), icon: "fas fa-users" },
                    { label: "Orbital Period", value: utils.formatValue(item.orbital_period, "days"), icon: "fas fa-sync" },
                    { label: "Rotation Period", value: utils.formatValue(item.rotation_period, "hours"), icon: "fas fa-redo" },
                    { label: "Diameter", value: utils.formatValue(item.diameter, "km"), icon: "fas fa-circle" },
                    { label: "Gravity", value: utils.formatValue(item.gravity), icon: "fas fa-arrow-down" },
                    { label: "Terrain", value: item.terrain, icon: "fas fa-mountain" },
                    { label: "Surface Water", value: utils.formatValue(item.surface_water, "%"), icon: "fas fa-tint" }
                ];
            case "vehicles":
                return [
                    { label: "Model", value: item.model, icon: "fas fa-cog" },
                    { label: "Vehicle Class", value: item.vehicle_class, icon: "fas fa-tag" },
                    { label: "Manufacturer", value: item.manufacturer, icon: "fas fa-industry" },
                    { label: "Cost in Credits", value: utils.formatValue(item.cost_in_credits), icon: "fas fa-coins" },
                    { label: "Length", value: utils.formatValue(item.length, "m"), icon: "fas fa-ruler-horizontal" },
                    { label: "Max Speed", value: utils.formatValue(item.max_atmosphering_speed, "km/h"), icon: "fas fa-tachometer-alt" },
                    { label: "Crew", value: utils.formatValue(item.crew), icon: "fas fa-users-cog" },
                    { label: "Passengers", value: utils.formatValue(item.passengers), icon: "fas fa-user-friends" },
                    { label: "Cargo Capacity", value: utils.formatValue(item.cargo_capacity, "kg"), icon: "fas fa-boxes" },
                    { label: "Consumables", value: utils.formatValue(item.consumables), icon: "fas fa-utensils" }
                ];
            default:
                return [];
        }
    };

    const detailedInfo = getDetailedInfo();
    const categoryIcon = utils.getCategoryIcon(category);
    const categoryTitle = utils.getCategoryTitle(category);

    return (
        <div className="bg-dark min-vh-100">
            
            <div className="container-fluid bg-gradient-dark py-5">
                <div className="container">
                    
                    <nav aria-label="breadcrumb" className="mb-4">
                        <ol className="breadcrumb bg-transparent">
                            <li className="breadcrumb-item">
                                <Link to="/" className="text-warning text-decoration-none">
                                    <i className="fas fa-home me-1"></i>
                                    Home
                                </Link>
                            </li>
                            <li className="breadcrumb-item">
                                <button 
                                    className="btn btn-link text-warning text-decoration-none p-0 border-0"
                                    onClick={() => navigate(-1)}
                                >
                                    <i className={`${categoryIcon} me-1`}></i>
                                    {categoryTitle}s
                                </button>
                            </li>
                            <li className="breadcrumb-item active text-light" aria-current="page">
                                {item.name}
                            </li>
                        </ol>
                    </nav>

                    <div className="row align-items-center">
                        <div className="col-lg-8">
                            <div className="d-flex align-items-center mb-3">
                                <i className={`${categoryIcon} text-warning me-3`} style={{ fontSize: "3rem" }}></i>
                                <div>
                                    <h1 className="text-warning mb-1 fw-bold display-4">{item.name}</h1>
                                    <p className="text-light mb-0 lead">
                                        {categoryTitle} from the Star Wars universe
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-4 text-lg-end">
                            <div className="d-flex gap-2 justify-content-lg-end">
                                <button
                                    className={`btn ${isFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
                                    onClick={handleFavoriteClick}
                                >
                                    <i className={`fas fa-heart me-2 ${isFavorite ? 'text-dark' : ''}`}></i>
                                    {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
                                </button>
                                
                                <button
                                    className="btn btn-outline-light"
                                    onClick={() => window.history.back()}
                                >
                                    <i className="fas fa-arrow-left me-2"></i>
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container py-5">
                <div className="row">
                   
                    <div className="col-lg-5 mb-4">
                        <div className="card bg-dark border-warning h-100 shadow-lg">
                            <div className="card-body p-0 position-relative">
                                {!imageError ? (
                                    <img
                                        src={imageUrl}
                                        className="card-img w-100"
                                        alt={item.name}
                                        style={{ 
                                            height: "600px", 
                                            objectFit: "cover",
                                            borderRadius: "0.375rem"
                                        }}
                                        onError={handleImageError}
                                    />
                                ) : (
                                    <div 
                                        className="d-flex align-items-center justify-content-center bg-secondary text-light"
                                        style={{ height: "600px", borderRadius: "0.375rem" }}
                                    >
                                        <div className="text-center">
                                            <i className="fas fa-image text-warning mb-3" style={{ fontSize: "5rem" }}></i>
                                            <h4 className="mb-2">No Image Available</h4>
                                            <p className="mb-0 text-muted">
                                                Image not found for this {categoryTitle.toLowerCase()}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                
                                <div className="position-absolute top-0 end-0 m-3">
                                    <span className="badge bg-warning text-dark fs-6 px-3 py-2">
                                        <i className={`${categoryIcon} me-2`}></i>
                                        {categoryTitle}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="card bg-dark border-warning h-100 shadow-lg">
                            <div className="card-header bg-transparent border-warning">
                                <h3 className="text-warning mb-0 fw-bold">
                                    <i className="fas fa-info-circle me-2"></i>
                                    Detailed Information
                                </h3>
                            </div>
                            <div className="card-body">
                                <div className="row g-4">
                                    {detailedInfo.map((info, index) => (
                                        <div key={index} className="col-md-6">
                                            <div className="bg-dark bg-opacity-50 p-3 rounded border border-warning border-opacity-25 h-100">
                                                <div className="d-flex align-items-center mb-2">
                                                    <i className={`${info.icon} text-warning me-2`}></i>
                                                    <strong className="text-warning">{info.label}</strong>
                                                </div>
                                                <p className="text-light mb-0 fs-6">
                                                    {info.value || "Unknown"}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <div className="mt-4 pt-4 border-top border-warning border-opacity-25">
                                    <div className="row text-center">
                                        <div className="col-6">
                                            <small className="text-muted">
                                                <i className="fas fa-hashtag me-1"></i>
                                                ID: {id}
                                            </small>
                                        </div>
                                        <div className="col-6">
                                            <small className="text-muted">
                                                <i className="fas fa-database me-1"></i>
                                                Source: SWAPI
                                            </small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-12 text-center">
                        <div className="d-flex gap-3 justify-content-center flex-wrap">
                            <Link to="/" className="btn btn-outline-warning btn-lg">
                                <i className="fas fa-home me-2"></i>
                                Back to Home
                            </Link>
                            
                            <button 
                                className="btn btn-warning btn-lg"
                                onClick={() => window.history.back()}
                            >
                                <i className="fas fa-arrow-left me-2"></i>
                                Go Back
                            </button>
                            
                            <button
                                className="btn btn-outline-light btn-lg"
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            >
                                <i className="fas fa-arrow-up me-2"></i>
                                Back to Top
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Single;