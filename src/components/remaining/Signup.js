import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../Firebase';
import { useStateValue } from'../StateProvider';

function Signup() {
	const [{path}, dispatch] = useStateValue();
	const history = useHistory();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const register = (e) =>{
		e.preventDefault();
		auth.createUserWithEmailAndPassword(email,password).then((auth)=>{
			const currpath = path;
			dispatch({
				type: 'SET_PATH',
				path: '/'
			});
			if(auth){
				history.replace(currpath);
			}		
			
		}).catch(error=>alert(error.message))
	}
	return (
		<div className="signup">
			<form>
				<div>
					<label htmlFor="email">Email</label>
					<input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)}/>
				</div>

				<div>
					<label htmlFor="password">Password</label>
					<input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
				</div>

				<button onClick={register}>Sign Up</button>
			</form>
		</div>
	);
}

export default Signup;