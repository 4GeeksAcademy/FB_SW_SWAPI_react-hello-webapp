import React from "react";

const Footer = () => (
	<footer className="bg-dark border-top border-warning py-4 mt-auto">
		<div className="container">
			<div className="row">
				<div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
					<h5 className="text-warning mb-2">
						<i className="fas fa-jedi me-2"></i>
						Star Wars Universe
					</h5>
					<p className="text-light mb-1">
						Explore the galaxy with data from SWAPI
					</p>
					<small className="text-muted">
						Built with React, Bootstrap and the Force
					</small>
				</div>

				<div className="col-md-6 text-center text-md-end">
					<div className="mb-2">
						<a 
							href="https://swapi.tech"
							target="_blank"
							rel="noopener noreferrer" 
							className="text-warning text-decoration-none me-3 hover-warning"
						>
							<i className="fas fa-database me-1"></i>
							SWAPI Data
						</a>
						<a 
							href="https://starwars-visualguide.com" 
							target="_blank"
							rel="noopener noreferrer"
							className="text-warning text-decoration-none hover-warning"
						>
							<i className="fas fa-images me-1"></i>
							Visual Guide
						</a>
					</div>
					<p className="text-light mb-1">
						<i className="fas fa-heart text-danger me-1"></i>
						Made by a Padawan Developer
					</p>
					<small className="text-muted">
						© {new Date().getFullYear()} - May the Force be with you!
					</small>
				</div>
			</div>

			<div className="row mt-3">
				<div className="col-12">
					<hr className="border-warning opacity-50" />
					<div className="text-center">
						<small className="text-muted">
							<i className="fas fa-code me-1"></i>
							A long time ago in a galaxy far, far away... we learned React
							<i className="fas fa-rocket ms-1"></i>
						</small>
					</div>
				</div>
			</div>
		</div>
	</footer>
);

export default Footer;