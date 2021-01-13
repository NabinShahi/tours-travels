import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../Firebase';
import { useStateValue } from'../StateProvider';

function Login() {
	const [{path}, dispatch] = useStateValue();
	const history = useHistory();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const signin = (e) =>{
		e.preventDefault();
		auth.signInWithEmailAndPassword(email,password).then((auth)=>{
			const currpath = path;
			dispatch({
				type: 'SET_PATH',
				path: '/'
			});
			if(auth){
				history.replace(path);
			}
		}).catch(error=>alert(error.message))
	}

	return (
		<div className="login">
			<form>
				<div>
					<label htmlFor="email">Email</label>
					<input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
				</div>

				<div>
					<label htmlFor="password">Password</label>
					<input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
				</div>

				<button onClick={signin}>Log In</button>
			</form>
		</div>
	);
}

export default Login;