import './login.styl';

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth } from '@/common/api/api';
import { type IToken, type ITokenError } from '@/common/api/types';

const Login = (): React.JSX.Element => {
	const [login, setLogin] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isError, setIsError] = useState<boolean>(false);
	const navigate = useNavigate();
	const a = (): void => {
		auth({ login, password })
			.then((r) => {
				if ((r as ITokenError).error !== undefined) {
					setIsError(true);
					return;
				}
				localStorage.setItem('token', (r as IToken).access_token);
				setIsError(false);
				navigate('/profile');
				return r;
			})
			.catch((e) => {
				setIsError(true);
				console.error(e);
			});
	};
	return (
		<div className='login'>
			<div className='login__box'>
				<h1>Вход</h1>
				<div className='login__box-fields'>
					<input
						type='text'
						placeholder='Логин'
						name='login'
						autoComplete='login'
						onChange={(e) => {
							setLogin(e.currentTarget.value);
						}}
					/>
					<input
						type='password'
						placeholder='Пароль'
						name='password'
						autoComplete='current-password'
						onChange={(e) => {
							setPassword(e.currentTarget.value);
						}}
					/>
					{<p style={{ opacity: isError ? 1 : 0 }}>Неправильный логин или пароль</p>}
				</div>
				<button type='button' className='login__submit' onClick={a}>
					Войти
				</button>
			</div>
		</div>
	);
};

export default Login;
