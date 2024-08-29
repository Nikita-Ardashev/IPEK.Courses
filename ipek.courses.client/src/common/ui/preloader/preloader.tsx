import './preloader.sass';

import React from 'react';

const Preloader = (): React.JSX.Element => {
	return (
		<div className='box-preloader'>
			<span className='box-preloader__preloader'></span>
		</div>
	);
};

export default Preloader;
