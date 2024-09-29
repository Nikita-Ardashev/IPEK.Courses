import './preloader.sass';

import React, { memo } from 'react';

const Preloader = memo(function Preloader() {
	return (
		<div className='box-preloader'>
			<span className='box-preloader__preloader'></span>
		</div>
	);
});

export default Preloader;
