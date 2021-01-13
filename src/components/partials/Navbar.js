import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useStateValue } from'../StateProvider';

function Navbar() {
	const [{user}, dispatch] = useStateValue();
	const history = useHistory();
	const loc =useLocation();

	const linkLogin = () =>{
		history.push('/login');
	};

	const linkSignup = () =>{
		history.push('/signup');
	};

	return (
		<div className="navbar">
			<div className="navbody">
				<Link to='/' className="logo">TravelSoul</Link>

				{user?
				<div className="navitems">
					<Link to='/dashboard' className="navitem">{user.email}</Link>
					<Link to='/packages' className="navitem">Packages</Link>
					<Link to='/contactus' className="navitem">Contact Us</Link>
				</div>
				:
				<div className="navitems">
					<span className="navitem" onClick={linkLogin}>LogIn</span>
					<span className="navitem" onClick={linkSignup}>SignUp</span>
					<Link to='/packages' className="navitem">Packages</Link>
					<Link to='/contactus' className="navitem">Contact Us</Link>
				</div>
				}
			</div>
		</div>
	);
}

export default Navbar;