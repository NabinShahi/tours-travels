import React, { useEffect, useState, useRef } from 'react';
import { db } from '../Firebase';
import { gsap } from 'gsap';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import './Packagedetail.css';
import { useStateValue } from'../StateProvider';
import CurrencyFormat from 'react-currency-format';

function Packagedetail() {
	const { id } = useParams();
	const history = useHistory();
	const [{user}, dispatch] = useStateValue();
	const loc = useLocation();

	const [pack, setPack] = useState({});
	const [description, setDescription] = useState([]);
	const [imageList, setImageList] = useState([]);
	const [ticketno, setTicketno] = useState(1);
	const [currImg, setcurrImg] = useState(0);

	const imageRefs = useRef([]);
	imageRefs.current = [];

	useEffect(()=>{	
		db.collection("project").doc(id)
		.get().then(data=>{
			var temppack = data.data();
			setPack(temppack);
			setDescription(temppack.description);
			setImageList(temppack.image1);
		}).then(()=>{
			imageRefs.current.forEach((el, index) => {
		 		if( index === currImg){
		 			gsap.fromTo(el,{
						x: 0,
					},
					{
						duration: 0.3,
						x: 0,
					});
		 		}else{
		 			gsap.fromTo(el,{
						x: '0%',
					},
					{
						duration: 0.3,
						x: '100%',
					});
		 		}
				
		 
			});
		});

	}, []);

	const addToRefs = (e) => {
		if(e && !imageRefs.current.includes(e)){
			imageRefs.current.push(e);
		}
	}

	const moveToLeft = () => {
		let num = currImg;	

		if(num+1 === imageList.length){
			setcurrImg(0);
			gsap.fromTo(imageRefs.current[num],{
				x: '0',
			},
			{
				duration: 0.3,
				x: '-100%',
			});

			gsap.fromTo(imageRefs.current[0],{
				x: '100%',
			},
			{
				duration: 0.3,
				x: '0',
			});
		}else{
			setcurrImg(cur=> cur+1);
			gsap.fromTo(imageRefs.current[num],{
				x: '0',
			},
			{
				duration: 0.3,
				x: '-100%',
			});

			gsap.fromTo(imageRefs.current[num+1],{
				x: '100%',
			},
			{
				duration: 0.3,
				x: '0',
			});
		}

	}

	const moveToRight = () => {
		let num = currImg;	

		if(num-1 === -1){
			setcurrImg(imageList.length-1);
			gsap.fromTo(imageRefs.current[num],{
				x: '0',
			},
			{
				duration: 0.3,
				x: '100%',
			});

			gsap.fromTo(imageRefs.current[imageList.length-1],{
				x: '-100%',
			},
			{
				duration: 0.3,
				x: '0',
			});
		}else{
			setcurrImg(cur=> cur-1);
			gsap.fromTo(imageRefs.current[num],{
				x: '0',
			},
			{
				duration: 0.3,
				x: '100%',
			});

			gsap.fromTo(imageRefs.current[num-1],{
				x: '-100%',
			},
			{
				duration: 0.3,
				x: '0',
			});
		}
	}

	const handleTicketno = (e) =>{
		let val = e.target.value;
		if(val < 1)
			setTicketno(1);
		else if(val >= pack.tickets)
			setTicketno(pack.tickets);
		else 
			setTicketno(val);
	};

	const handlePackSubmit = (e) =>{
		e.preventDefault();
		if (user){
			dispatch({	
				type: 'SET_PACK',
				packid: id,
				tickets: ticketno
			});

			history.push('/conformation');
		}else{
			dispatch({
				type: 'SET_PATH',
				path: loc.pathname
			});
			history.push('/login');
		}
		
	};

	return (
		<div className="section">
			<div className="section-body packagedetail-body">
				<div className="packagedetail-left">
					<h1 className="page-title">{pack.packagename}</h1>
					
					<div className="packagedetail-imagegroup" id="photos">
						<div className="packagedetail-imagegroupleft" id="photos">
							<div className="left-image-control" onClick={moveToLeft}>
								<i className="fa fa-chevron-left fa-2x" aria-hidden="true"></i>
							</div>
							<div className="right-image-control" onClick={moveToRight}>
								<i className="fa fa-chevron-right fa-2x" aria-hidden="true"></i>
							</div>
							
							{imageList.map((image, index)=>{
								return(
									<img src={image} ref={addToRefs} key={index} alt=""/>
								);
							})}
						</div>
						<div className="packagedetail-imagegroupright" id="photos">
							{imageList.map((image, index)=>{
								return(
									<img src={image} key={index} alt=""/>
								);
							})}
						</div>
					</div>
					<h2 className="packagedetail-title" id="overview">Overview</h2>
					<div className="packagedetail-overview">
						{pack.overview}
					</div>
					<div className='packagedetail-detailbox'>
						<div>
							<h3>Book for tickets here</h3>
							<span className="green lar">NRs. <CurrencyFormat value={pack.price} displayType={'text'} thousandSeparator={true} /></span><strong> /- per person</strong>
						</div>
						<form className="packagedetail-form">
							<input type="number" value={ticketno} onChange={handleTicketno} />
							<span className="x">x</span>
							<div>
								<span className="green">{pack.tickets}</span> tickets available<br/>
								<button onClick={handlePackSubmit}>Buy Tickets Now</button>
							</div>
							<div className="packagedetail-inactivestar"><i className="fa fa-star-o" aria-hidden="true"></i></div>
						</form>
					</div>

					<h2 className="packagedetail-title" id="description">Package Details</h2>

					{description.map( (dep, index) => {
						var splitdata = dep.split('%');
						return(
							<div className="descriptionbox" key={index}>
								<div className='packagedetail-descriptionbox-left'>
									Day {index+1}
								</div>
								<div className='packagedetail-descriptionbox-right'>
									<span key={index} className="description-circle">start</span>
									{splitdata.map((data, index) => {
										if((index+1)%2 === 0){
											if(data === 'return'){
												return(
													<span key={index} className="description-circle">{pack.startlocation} </span>
												);
											}else{
												return(
													<span key={index} className="description-circle">{data} </span>
												);
											}
											
										}else{
											if(data === "plane"){
												return(
													<span key={index} className="description-transportation">
														<i className="fa fa-plane fa-2x" aria-hidden="true"></i>
													</span>
												);
											}else if(data === "bus"){
												return(
													<span key={index} className="description-transportation">
														<i className="fa fa-bus fa-2x" aria-hidden="true"></i>
													</span>
												);
											}

										}
										
									})}
								</div>
							</div>
						);
					})}
					
					<h2 className="packagedetail-title" id="detail">Destination Info</h2>
				</div>
				<div className="packagedetail-right">
					<a href="#photos">Photos</a>
					<a href="#overview">Overview</a>
					<a href="#description">Package Details</a>
					<a href="#detail">Destination Info</a>
					<a href="#hotels">Hotel Details</a>
				</div>
			</div>
		</div>
	);
}

export default Packagedetail;