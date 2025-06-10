import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { utils } from "../utils";
import Card from "../components/Card";

export const Home = () => {
 	 const {store, dispatch} = useGlobalReducer()

	useEffect(() => {
		if (store.people.length === 0 && store.planets.length === 0 && store.vehicles.length === 0) {
			utils.loadInitialData(dispatch);
		}

		utils.loadFavoritesFromStorage(dispatch);
	}, [])

	const Section = ({title, items, category, icon, sectionId}) => (
		<div className="mb-5" id={sectionId}>
			<div className="d-flex align-items-center mb-4">
				<i className={`${icon} text-warning me-3`} style={{ fontSize: "2.5rem"}}></i>
				<div className="flex-grow-1">
					<h2 className="text-warning mb-1 fw-bold">{title}</h2>
					<small className="text-muted">
						Explore {items.length} amazing {title.toLowerCase()} from Star Wars Universe
					</small>
				</div>
			</div>

			<hr className="border-warning mb-4" />

			{items.length === 0 ? (
				<div className="text-center py-5">
					<div className="loading-container d-inline-block p-4 rounded">
						<div className="spinner-border text-warning mb-3" role="status" style={{ width:"3rem", height: "3rem"}}>
							<span className="visually-hidden">Loading...</span>
						</div>
						<h5 className="text-light">Loading {title.toLowerCase()}...</h5>
						<p className="text-muted mb-0">Fetching data from a galaxy far, far away...</p>
					</div>
				</div>
			) : (
				<div className="row">
					{items.map((item, index) => (
						<Card
							key={`${category}-${index}`}
							item={item}
							category={category}
						/>
					))}
				</div>
			)}
		</div>
	);

	if (store.error) {
		return (
			<div className="container-fluid bg-dark min-vh-100 d-flex align-items-center justify-content-center">
                <div className="text-center">
                    <i className="fas fa-exclamation-triangle text-warning display-1 mb-4"></i>
                    <h2 className="text-light mb-3">Houston, we have a problem!</h2>
                    <p className="text-muted mb-4 lead">{store.error}</p>
                    <div className="d-flex gap-3 justify-content-center">
                        <button 
                            className="btn btn-warning"
                            onClick={() => {
                                dispatch({ type: 'set_error', payload: null });
                                utils.loadInitialData(dispatch);
                            }}
                        >
                            <i className="fas fa-redo me-2"></i>
                            Try Again
                        </button>
                        <button 
                            className="btn btn-outline-warning"
                            onClick={() => window.location.reload()}
                        >
                            <i className="fas fa-refresh me-2"></i>
                            Reload Page
                        </button>
                    </div>
                </div>
            </div>
		)
	};


	return (
		<div className="bg-dark min-vh-100">

			<div className="container-fluid bg-gradient-dark py-5 mb-5">
				<div className="container">
					<div className="text-center">
						<h1 className="display-3 text-warning mb-3 fw-bold">
							<i className="fas fa-rocket me-3"></i>
							Star Wars Universe
						</h1>
						<p className="lead text-light mb-4">
							Explore characters, planets, and vehicles from a galaxy far, far away...
						</p>

						<div className="row justify-content-center">
							<div className="col-lg-8">
								<div className="row g-3">
									<div className="col-md-4">
										<div className="bg-dark bg-opacity-50 p-3 rounded border border-warning border-opacity-25">
											<i className="fas fa-users text-warning display-6 mb-2"></i>
											<h4 className="text-warning mb-1">{store.people.length}</h4>
											<small className="text-light">Characters</small>
										</div>
									</div>
									<div className="col-md-4">
										<div className="bg-dark bg-opacity-50 p-3 rounded border border-warning border-opacity-25">
											<i className="fas fa-globe text-warning display-6 mb-2"></i>
											<h4 className="text-warning mb-1">{store.planets.length}</h4>
											<small className="text-light">Planets</small>
										</div>
									</div>
									<div className="col-md-4">
										<div className="bg-dark bg-opacity-50 p-3 rounded border border-warning border-opacity-25">
											<i className="fas fa-rocket text-warning display-6 mb-2"></i>
											<h4 className="text-warning mb-1">{store.vehicles.length}</h4>
											<small className="text-light">Vehicles</small>
										</div>
									</div>
								</div>
							</div>
						</div>

						{store.favorites.length > 0 && (
							<div className="mt-4">
								<div className="alert alert-warning border-0 bg-warning bg-opacity-10 text-warning">
									<i className="fas fa-heart me-2"></i>
									You have {store.favorites.length} favorite{store.favorites.length !== 1 ? 's' : ''} saved!
								</div>
							</div>
						)}
					</div>
				</div>
			</div>

			{store.loading && (
				<div className="text-center py-5">
					<div className="loading-container d-inline-block p-5 rounded">
						<div className="spinner-border text-warning mb-3" style={{ width: "4rem", height: "4rem"}}>
							<span className="visually-hidden">Loading...</span>
						</div>
						<h4 className="text-light mb-2">Loading Star Wars data...</h4>
						<p className="text-muted mb-0">Please wait while we fetch information from the galaxy</p>
					</div>
				</div>
			)}

			<div className="container py-4">
				{!store.loading && (store.people.length > 0 || store.planets.length > 0 || store.vehicles.length > 0) && (
					<div className="text-center mb-5">
						<p className="text-light lead">
							<i className="fas fa-info-circle text-warning me-2"></i>
							Browse through our collection and click the heart icon to add items to your favorites!
						</p>
					</div>
				)}

				<Section 
					title="Characters"
					items={store.people}
					category="people"
					icon="fas fa-users"
					sectionId="characters-section"
				/>
				
				<Section 
					title="Planets"
					items={store.planets}
					category="planets"
					icon="fas fa-globe"
					sectionId="planets-section"
				/>

				<Section 
					title="Vehicles"
					items={store.vehicles}
					category="vehicles"
					icon="fas fa-rocket"
					sectionId="vehicles-section"
				/>
			</div>

			<div className="container-fluid bg-gradient-dark py-5 mt-5">
				<div className="text-center">
					<h3 className="text-warning mb-3">
						<i className="fas fa-jedi me-2"></i>
						May the Force be with you!
					</h3>
					<p className="text-light mb-0">
						Continue exploring the vast Star Wars Universe and discover new favorites.
					</p>
				</div>
			</div>
		</div>
	);
}; 

export default Home;