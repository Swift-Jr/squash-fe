import React from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {alertTypes} from '../../services/alerts/types';

export const AlertDisplay = alerts => {
	alerts
		.alerts
		.messages
		.map(alert => {
			switch (alert.style) {
				case alertTypes.BAD_ALERT:
					toast.error(alert.message, alert.options);
					break;
				case alertTypes.GOOD_ALERT:
					toast.success(alert.message, alert.options);
					break;
				default:
			}
			return null;
		});
	return <ToastContainer autoClose={3000}/>;
};

export default AlertDisplay;
