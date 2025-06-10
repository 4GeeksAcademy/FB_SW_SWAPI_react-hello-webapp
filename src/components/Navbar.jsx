import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from '../hooks/useGlobalReducer';
import { utils } from '../utils';


const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();

	const removeFavorite = (favoriteId, e) => {
		e.preventDefault();
		e.stopPropagation();

		const favorite = store.favorites.find(fav => fav.id === favoriteId);
		if (favorite) {
			utils.toggleFavorite(dispatch, store, {
				name: favorite.name,
				category: favorite.category,
				id: favorite.itemId
			});
		}
	};

	const scrollToSection = (sectionId) => {
		const element = document.getElementById(sectionId);
		if (element) {
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	};

	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark border-bottom border-warning shadow-sm">
			<div className="container-fluid">
				<Link className="navbar-brand d-flex align-items-center" to="/">
					<i className="fas fa-jedi text-warning me-2" style={{ fontSize: "1.8rem"}}></i>
					<div>
						<span className="text-warning fw-bold fs-4">Star Wars</span>
						<small className="d-block text-muted" style={{ fontSize: "0.7rem", lineHeight: "1"}}>
							Universe Explorer
						</small>
					</div>
				</Link>

				<button 
					className="navbar-toggler border-warning"
					type="button"
					data-bs-toggle="collapse"
					data-bs-target="#navbarNav"
					aria-controls="navbarNav"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<span className="navbar-toggler-icon"></span>
				</button>

				<div className="collapse navbar-collapse" id="navbarNav">
					<ul className="navbar-nav me-auto">
						<li className="nav-item">
							<Link className="nav-link text-light hover-warning d-flex align-items-center" to="/">
								<i className="fas fa-home me-1"></i>
								Home
							</Link>
						</li>
						<li className="nav-item">
							<button 
								className="nav-link btn btn-link text-light hover-warning border-0 d-flex align-items-center"
								onClick={() => scrollToSection('characters-section')}
							>
								<i className="fas fa-users me-1"></i>
								Characters
							</button>
						</li>
						<li className="nav-item">
							<button 
								className="nav-link btn btn-link text-light hover-warning border-0 d-flex align-items-center"
								onClick={() => scrollToSection('planets-section')}
							>
								<i className="fas fa-globe me-1"></i>
								Planets
							</button>
						</li>
						<li className="nav-item">
							<button 
								className="nav-link btn btn-link text-light hover-warning border-0 d-flex align-items-center"
								onClick={() => scrollToSection('vehicles-section')}
							>
								<i className="fas fa-rocket me-1"></i>
								Vehicles
							</button>
						</li>
					</ul>

					<div className="d-none d-lg-flex me-3">
						<small className="text-muted">
							<i className="fas fa-chart-bar me-1"></i>
							{store.people.length + store.planets.length + store.vehicles.length} Items loaded
						</small>
					</div>

					<div className="dropdown">
						<button 
							className="btn btn-outline-warning dropdown-toggle d-flex align-items-center position-relative"
							type="button"
							data-bs-toggle="dropdown"
							aria-expanded="false"
						>
							<i className="fas fa-heart me-2"></i>
							<span className="d-none d-md-inline">Favorites</span>
							<span className="d-md-none">
								<i className="fas fa-star"></i>
							</span>

							{store.favorites.length > 0 && (
								<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
									{store.favorites.length}
									<span className="visually-hidden">favorites count</span>
								</span>
							)}
						</button>

						<ul 
							className="dropdown-menu dropdown-menu-end bg-dark border-warning shadow-lg"
							style={{ minWidth: "320px", maxHeight: "400px", overflowY: "auto"}}
						>
							{store.favorites.length === 0 ? (
								<li>
									<div className="dropdown-item-text text-center py-4">
										<i className="fas fa-heart-broken text-warning mb-3" style={{ fontSize: "2.5rem"}}></i>
										<h6 className="text-light mb-2">No favorites yet</h6>
										<p className="text-muted mb-0 small">
											Start exploring and add some characters, planets, or vehicles to your favorites!
										</p>
									</div>
								</li>
							) : (
								<>
									<li>
										<h6 className="dropdown-header text-warning border-bottom border-warning pb-2 mb-2">
											<i className="fas fa-star me-2"></i>
											Your Favorites ({store.favorites.length})
										</h6>
									</li>

									{store.favorites.map((favorite) => (
										<li key={favorite.id}>
											<div className="dropdown-item bg-transparent text-light py-2 px-3">
												<div className="d-flex align-items-center justify-content-between">
													<Link
														to={`/single/${favorite.category}/${favorite.itemId}`}
														className="text-decoration-none flex-grow-1 me-2"
														style={{ color: "inherit" }}
													>
														<div className="d-flex align-items-center">
															<i className={`${utils.getCategoryIcon(favorite.category)} text-warning me-2`}></i>
															<div className="flex-grow-1">
																<div className="text-truncate fw-bold" style={{ maxWidth: "160px" }}>
																	{favorite.name}
																</div>
																<small className="text-muted">
																	{utils.getCategoryTitle(favorite.category)}
																</small>
															</div>
														</div>
													</Link>

													<button 
														className="btn btn-sm btn-outline-danger"
														onClick={(e) => removeFavorite(favorite.id, e)}
														title="Remove from favorites"
													>
														<i className="fas fa-trash-alt"></i>
													</button>
												</div>
											</div>
										</li>
									))}

									<li><hr className="dropdown-divider border-warning opacity-50" /></li>
									<li>
										<div className="dropdown-item-text text-center py-2">
											<small className="text-muted">
												<i className="fas fa-mouse-pointer me-1"></i>
												Click on any item to view details
											</small>
										</div>
									</li>
								</>
							)}

						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;