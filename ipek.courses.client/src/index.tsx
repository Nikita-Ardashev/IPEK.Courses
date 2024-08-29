import './index.sass';

import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Constructor from './views/course/contstructor/constructor';
import CourseEdit from './views/course/edit/edit';
import CourseGroups from './views/course/groups/groups';
import Group from './views/group/group';
import Home from './views/home/home';
import Layout from './views/layout';
import Login from './views/login/login';
import Profile from './views/profile/profile';

const root = document.getElementById('root');
if (root == null) {
	console.error('No root element found');
} else {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <Layout />,
			children: [
				{ path: '/', element: <Home />, index: true },
				{ path: 'login', element: <Login /> },
				{ path: 'profile', element: <Profile /> },
				{ path: 'group', element: <Group /> },
				{ path: 'course/edit', element: <CourseEdit /> },
				{ path: 'course/groups', element: <CourseGroups /> },
				{ path: 'course/constructor/test', element: <Constructor type='test' /> },
				{
					path: 'course/constructor/theory',
					element: <Constructor type='theory' />,
				},
				{ path: 'course/constructor/code', element: <Constructor type='code' /> },
			],
		},
	]);
	ReactDOM.createRoot(root).render(
		<React.StrictMode>
			<RouterProvider router={router} />
		</React.StrictMode>,
	);
}
