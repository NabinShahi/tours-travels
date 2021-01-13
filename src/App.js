import React, { useEffect } from 'react';
import './App.css';
import { useStateValue } from'./components/StateProvider';

import Navbar from './components/partials/Navbar';
import Home from './components/Home';
import Packages from './components/remaining/Packages';
import Packagedetail from './components/remaining/Packagedetail';
import Contactus from './components/remaining/Contactus';
import Conformation from './components/remaining/Conformation';
import Login from './components/remaining/Login';
import Signup from './components/remaining/Signup';
import Dashboard from './components/remaining/Dashboard';

import { auth } from './components/Firebase';

import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

function App() {
	const [{user}, dispatch] = useStateValue();

	useEffect(() => {
		auth.onAuthStateChanged(authUser=>{
			if (authUser){
				console.log(authUser);
				dispatch({
					type: 'SET_USER',
					user: authUser
				});
			}else{
				dispatch({
					type: 'SET_USER',
					user: null
				});
			}
		})
	}, [])

	return (
		<Router>
			<div className="App">
				<Navbar/>
				<Switch>
					<Route path="/login" exact={true}>
						<Login />
					</Route>
					<Route path="/signup" exact={true}>
						<Signup />
					</Route>
					
					<Route path="/dashboard" exact={true}>
						<Dashboard />
					</Route>
					<Route path="/conformation" exact={true}>
						<Conformation />
					</Route>

					<Route path="/package/:id" exact={true}>
						<Packagedetail />
					</Route>
					<Route path="/packages" exact={true}>
						<Packages />
					</Route>
					<Route path="/contactus" exact={true}>
						<Contactus />
					</Route>
					<Route path="/" exact={true}>
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;