import React, { useEffect } from 'react';
import './Packagecard.css';
import { useHistory } from 'react-router-dom';
import CurrencyFormat from 'react-currency-format';

function Packagecard({pack}) {
	const history = useHistory();

	const goToDetails=()=>{
		history.push(`/package/${pack.id}`);
	}

	return (
		<div className="packagecard" onClick={goToDetails}>
			<div className="packagecard-body">
				<div className="packagecard-title">
					<div className="left">{pack.packagename}</div>
					<div className="right"><CurrencyFormat value={pack.price} displayType={'text'} thousandSeparator={true} prefix={'NRs. '} /></div>
				</div>
				<div className="packagecard-info">
					<div className="packagecard-desc">
						<div>Destination</div>
						<div>Start Location</div>
						<div>Duration</div>
					</div>
					<div className="packagecard-value">
						<div>{pack.destination}</div>
						<div>{pack.startlocation}</div>
						<div>{pack.duration.day} Days, {pack.duration.night} Nights</div>
						<div className="packagecard-more">Click for Details ...</div>
					</div>
				</div>
			</div>
			<div className="packagecard-image">
				<img src={pack.image1[0]} alt=""/>
			</div>
		</div>
	);
}

export default Packagecard;