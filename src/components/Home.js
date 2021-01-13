import React, { useState, useEffect } from 'react';
import './Home.css';
import { useHistory } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { gsap } from "gsap";

function Home() {
	const history = useHistory();
	const [homeSearch, setHomeSearch] = useState('');
	const [{search}, dispatch] = useStateValue();

	useEffect(()=>{
		if(search){
			setHomeSearch(search);
		}
		gsap.from(`.home-title1`, { duration: 0.5, opacity: 0, x: "-100" });
		gsap.from(`.home-title2`, { duration: 0.7, opacity: 0, x: "100", delay: 0.3 });
		gsap.from(`.home-form`, { duration: 1, opacity: 0, y: "100", delay: 1, ease: "back.out(5)" });
	}, []);

	const handleHomeSearchChange = (e) =>{
		setHomeSearch(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch({
			type: 'SET_SEARCH',
			search: homeSearch,
		});
		history.push('/packages');
	};

	return (
	<div className='home'>
		<div className="home-image"></div>
		<div className="home-darkcolor">
			<div className="home-body">
				<div className="home-title">
					<div className="home-title1">Jobs fills your pocket,</div>
					<div className="home-title2">Adventure fills your Soul</div>
				</div>
				<form className="home-form">
					<input type="text" name="search" placeholder="Search your Destination" value={homeSearch} onChange={handleHomeSearchChange}/>
					<button type="submit" onClick={handleSubmit}>Get Started</button>
				</form>
			</div>
		</div>
	</div>
	);
}

export default Home;