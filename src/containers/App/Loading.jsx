import React from 'react';

import style from './styles.module.css';

export const Loading = () => {
	return (
		<div className={style.loadingContainer}><div className={style.loading}>
			<div/>
		</div>
			<p>Loading</p>
		</div>
	);
};

export default Loading;
