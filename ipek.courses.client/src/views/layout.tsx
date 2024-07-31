import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/common/ui/header/header';
const Layout = (): React.JSX.Element => {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
};

export default Layout;
