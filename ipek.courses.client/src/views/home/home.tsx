import './home.styl';

import React from 'react';
import { Link } from 'react-router-dom';
const Home = (): React.JSX.Element => {
	return (
		<div className='home'>
			<h1>
				Изучайте материалы разных профессий вместе с <span>ипэк.курсы</span>
			</h1>
			<h2>Бесплатная онлайн платформа для учащихся Ижевского промышленно- экономического колледжа</h2>
			<Link to={'/login'} className='home__login '>
				Войти в аккаунт
			</Link>
		</div>
	);
};

export default Home;
