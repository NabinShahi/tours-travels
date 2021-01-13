import React from 'react';
import './Searchcard.css';
import { useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

function Searchcard({pack}) {
	const history = useHistory();

	const goToDetails=()=>{
		history.push(`/package/${pack.id}`);
	}

	return (
		<div className="searchcard" onClick={goToDetails}>
			<div className="searchcard-body">
				<div className="searchcard-title">{pack.packagename}</div>
				<div className="searchcard-start">{pack.startlocation}</div>
				<div className="searchcard-time">{pack.duration.day} Days, {pack.duration.night} Nights</div>
				<div className="searchcard-price"><CurrencyFormat value={pack.price} displayType={'text'} thousandSeparator={true} prefix={'NRs. '} /></div>
				<div className="searchcard-more"><span>More Info</span></div>
			</div>
		</div>
	);
}

export default Searchcard;