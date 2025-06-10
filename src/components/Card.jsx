import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';
import { utils } from '../utils';

const Card = ({item, category}) => {
    const { store, dispatch } = useGlobalReducer();
    const [imageError, setImageError] = useState(false);

    const itemId = utils.getIdFromUrl(item.url);
    const imageUrl = utils.getImageUrl(category, itemId);
    const isFavorite = utils.isFavorite(store, category, itemId);

    const handleImageError = () => {
        setImageError(true);
    };

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        utils.toggleFavorite(dispatch, store, {
            name: item.name,
            category: category,
            id: itemId
        });
    };

    // Imagen de respaldo simple
    const fallbackImage = `https://via.placeholder.com/400x600/333333/ffcc00?text=${encodeURIComponent(item.name)}`;

    return (
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 bg-dark text-light border-warning shadow-lg card-hover">
                <div className="card-img-container position-relative" style={{ height: "300px", overflow: "hidden"}}>
                    <img 
                        src={imageError ? fallbackImage : imageUrl}
                        alt={item.name}
                        style={{ objectFit: "cover"}}
                        onError={handleImageError} 
                        className="card-img-top w-100 h-100" 
                    />

                    <div className="position-absolute top-0 end-0 m-2">
                        <span className="badge bg-warning text-dark">
                            <i className={`${utils.getCategoryIcon(category)} me-1`}></i>
                            {utils.getCategoryTitle(category)}
                        </span>
                    </div>
                </div>

                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-warning mb-4 fw-bold text-center mt-4">
                        {item.name}
                    </h5>

                    <div className="d-flex justify-content-between align-items-center mt-auto">
                        <Link
                            to={`/single/${category}/${itemId}`}
                            className="btn btn-outline-warning btn-sm flex-grow-1 me-2"    
                        >
                            <i className="fas fa-info-circle me-1"></i>
                            Learn More
                        </Link>

                        <button
                            className={`btn btn-sm ${isFavorite ? 'btn-warning' : 'btn-outline-warning'}`}
                            onClick={handleFavoriteClick}
                            title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                        >
                            <i className={`fas fa-heart ${isFavorite ? 'text-dark' : ''}`}></i>
                        </button>
                    </div>
                </div>

                <div className="card-footer bg-transparent border-warning border-opacity-50">
                    <small className="text-muted d-flex justify-content-between">
                        <span>
                            <i className="fas fa-hashtag me-1"></i>
                            ID: {itemId}
                        </span>
                        <span>
                            <i className="fas fa-database me-1"></i>
                            SWAPI
                        </span>
                    </small>
                </div>
            </div>
        </div>
    );
}

export default Card;