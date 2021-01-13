import React, { useState, useEffect, useRef } from 'react';
import Searchcard from '../partials/Searchcard';
import Packagecard from '../partials/Packagecard';
import { useStateValue } from '../StateProvider';
import { db } from '../Firebase';
import { gsap } from 'gsap';
import './Packages.css';

function Packages() {
	const revealRefs = useRef([]);
	revealRefs.current = [];

	const [{search}, dispatch] = useStateValue();

	const [packageSearch,setPackageSearch] = useState(search);
	const [startLocSearch,setStartLocSearch] = useState('');

	const [packages,setPackages] = useState([]);
	const [result,setResult] = useState([]);

	const addToRefs = (e) => {
		if(e && !revealRefs.current.includes(e)){
			revealRefs.current.push(e);
		}
	}

	useEffect(()=>{
		db.collection("project")
			.onSnapshot(function(docs) {
				docs.forEach(doc=>{
					var pack = doc.data();
					pack.id = doc.id;
					setPackages(packages => [...packages, pack]);
				})

				revealRefs.current.forEach((el, index) => {
		 
					gsap.from(el,{
						scrollTrigger: "el",
						duration: 0.3,
						opacity: 0,
						x: '-100',
						ease: 'circ.out',
						delay: index * 0.2,
					});
			 
				});
			})

		

		if(!(search === '')){
			searchPackage();
		}
	}, []);

	useEffect(()=>{
		if(search){
			gsap.from('#searchresult',{
				duration: 0.3,
				opacity: 0,
				y: '-100',
				ease: 'circ.out',
			});
		}
	}, [search]);

	const handleSearch = (e) => {
		e.preventDefault();
		dispatch({
			type: 'SET_SEARCH',
			search: packageSearch,
		});

		searchPackage();
	};

	const searchPackage = () =>{
		db.collection("project")
			.onSnapshot(function(docs) {
				setResult([]);
				docs.forEach(doc=>{
					var pack = doc.data();
					pack.id = doc.id;
					
					if(pack.packagename.toLowerCase().includes(packageSearch.toLowerCase()) 
						|| pack.destination.toLowerCase().includes(packageSearch.toLowerCase()) ){
						setResult(packages => [...packages, pack]);
					}
					
				})
			});	
	};

	return (
		<div className="section">
			<div className="section-body">
				<form className="packages-form">
					<div className="packages-form-inputplace">
						<input type="text" name="search" placeholder="Search package" value={packageSearch} onChange={e => setPackageSearch(e.target.value)}/>
					</div>
					<div className="packages-form-inputplace">
						<input type="text" name="start" placeholder="Start location" value={startLocSearch} onChange={e => setStartLocSearch(e.target.value)}/>
					</div>
					<div className="packages-form-inputplace-small">
						<input type="text" name="start" placeholder="Min. Price"/>
					</div>
					<div className="packages-form-inputplace-small">
						<input type="text" name="start" placeholder="Max. Price"/>
					</div>
					<button onClick={handleSearch}>Filter</button>
				</form>

				

				{
					search === '' ? '':
					<div id="searchresult">
						<div className="packages-title">Search Result for "{search}" :</div>
						<div className="packages-tableTitle">
							<div className="packages-name">Package Name</div>
							<div className="packages-start">Start Location</div>
							<div className="packages-time">Duration</div>
							<div className="packages-price">Price<small> per person</small></div>
						</div> 
						{result.map( pack => (
							<Searchcard key={pack.id} pack={pack}/>
						))}
						<div className="packages-empty">
							{ result.length === 0 ? 'No Packages Found' : 'No more Packages' }
						</div>
					</div>
				}
				

				<div className="packages-title">Our Packages :</div>
				{packages.map( pack => (
					<div ref={addToRefs} key={pack.id}>
						<Packagecard pack={pack}/>
					</div>
				))}
			</div>
		</div>
	);
}

export default Packages;