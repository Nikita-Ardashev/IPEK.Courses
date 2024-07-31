import './login.styl';

import React, { useState } from 'react';
const Login = (): React.JSX.Element => {
	const [login, setLogin] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [isError, setIsError] = useState<boolean>(false);
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
				<button type='button' className='login__submit'>
					Войти
				</button>
			</div>
		</div>
	);
};

export default Login;
