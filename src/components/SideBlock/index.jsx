import React from 'react';
import s from './SideBlock.module.scss';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';

/* export */ const SideBlock = ({ title, children }) => {
	return (
		<Paper classes={{ root: s.root }}>
			<Typography variant='h6' classes={{ root: s.title }}>
				{title}
			</Typography>
			{children}
		</Paper>
	);
};
