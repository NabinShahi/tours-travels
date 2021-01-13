import React, { useState, useEffect } from 'react';
import { useStateValue } from'../StateProvider';
import './Conformation.css';
import { db } from '../Firebase';
import CurrencyFormat from 'react-currency-format';

function Conformation() {
	const [{pack, user}] = useStateValue();

	const [tempPack, setTempPack] = useState({});
	const [checkval, setCheckval] = useState(false);
	const [selectval, setSelectval] = useState({payment: 'none', selected: false});
	const [phoneval, setPhoneval] = useState({phone: '', validated: false});
	const [ticketval, setTicketval] = useState(pack.tickets);
	const [total, setTotal] = useState(0);

	useEffect(()=>{	
		if(pack.id){
			db.collection("project").doc(pack.id)
			.get().then(data=>{
				setTempPack(data.data());
				console.log(data.data());
				setTotal(data.data().price * ticketval);
			});
		}
		
	}, []);

	const handleCheck =(e)=>{
		setCheckval(!checkval);
	};

	const handleTicket =(e)=>{
		const temp = e.target.value;
		if (temp <= 1){
			setTicketval(1);
			setTotal(tempPack.price);
		}else if(temp >= tempPack.tickets){
			setTicketval(tempPack.tickets);
			setTotal(tempPack.tickets * tempPack.price);
		}else{
			setTicketval(temp);
			setTotal(temp * tempPack.price);
		}
		
	};

	const handlePhone =(e)=>{
		if (e.target.value === ''){
			setPhoneval({phone: e.target.value, validated: false});
		}else{
			setPhoneval({phone: e.target.value, validated: true});
		}
	};

	const handleSelect =(e)=>{
		if (e.target.value === 'none'){
			setSelectval({payment: e.target.value, selected: false});
		}else{
			setSelectval({payment: e.target.value, selected: true});
		}
		
	};

	if ( pack.id && user){
		return (
			<div className="section">
				<div className="section-body">
					<h1 className="conformation-title">Conformation Page</h1>
					<div className="conformation-inputgroup">
						<small className="conformation-inputinfo">Confirm your tickets</small>
						<div className="conformation-inputbar">
							<label htmlFor="tickets">Tickets: </label>
							<div className="conformation-input">
								<input type="number" name="tickets" value={ticketval} onChange={handleTicket}/> for "{tempPack.packagename}"
							</div>
						</div>
					</div>
					<div className="conformation-inputgroup">
						<small className="conformation-inputinfo">Confirm your phone number</small>
						<div className="conformation-inputbar">
							<label htmlFor="phoneno">Phone Number: </label>
							<div className="conformation-input">
								<input type="text" name="phoneno" value={phoneval.phone} onChange={handlePhone}/>
							</div>
						</div>
					</div>
					<div className="conformation-inputgroup">
						<small className="conformation-inputinfo">Confirm your payment method</small>
						<div className="conformation-inputbar">
							<label htmlFor="paymethod">Payment Method: </label>
							<div className="conformation-input">
								<select name="paymethod" value={selectval.paymentval} onChange={handleSelect}>
									<option value="none">None</option>
									<option value="esewa">Esewa</option>
								</select>
							</div>
						</div>
					</div>

					<div className="conformation-terms">
						<h3>Our Terms and Conditions:</h3>
						<ol>
							<li>The ticket cost only covers the transpotation fare, accomodation fare and food ( breakfst, lunch and dinner ).
							 The customer is responsible for any extra charges (entry fees, souveniers and extra services). </li>
							<li>Customer are requested to travel as per the direction of the guide and not wander around without the asking the 
							guide.</li>
							<li>Provide correct Contact info to website or correct it to the guide in case we have to contact you.</li>
							<li>Keep close eye on your baggage, cash and other items. We will not be held responsible for any baggage or cash lost during the travel.</li>
						</ol>
						<input type="checkbox" checked={checkval} onChange={handleCheck}/>Please tick the box
						<div><small><strong>By clicking the checkbox, you agreed to all of our terms.</strong></small></div>
					</div>
					
					<div className="conformatiobutton">
						<button disabled={!(checkval && selectval.selected && ticketval!==0)}>Place Order</button>
					</div>
					<p className="conformation-final">{ticketval} tickets worth NRs. <CurrencyFormat value={total} displayType={'text'} thousandSeparator={true} /></p>
				</div>
			</div>
		);
	}else{
		return(
			<div>Access Denied</div>
		);
	}
	
}

export default Conformation;