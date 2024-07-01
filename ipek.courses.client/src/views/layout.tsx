import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import { type IUser, user } from '@/common/api/api';
import Header from '@/common/ui/header/header';

import { GlobalContext } from './globalContext';

const Layout = (): React.JSX.Element => {
	const [dataUser, setDataUser] = useState<IUser | null>(null);
	const token = localStorage.getItem('token');
	const location = useLocation();
	useEffect(() => {
		if (token !== null) {
			user()
				.then((r) => {
					setDataUser(r);
					return r;
				})
				.catch((e) => {
					console.error(e);
				});
		}
	}, [location]);
	return (
		<GlobalContext.Provider value={{ user: dataUser }}>
			<Header />
			<Outlet />
		</GlobalContext.Provider>
	);
};

export default Layout;
