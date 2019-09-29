import React from 'react';
import { emphasize, withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {DirMenu} from './Menu';

const StyledBreadcrumb = withStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.grey[100],
		height: theme.spacing(3),
		color: theme.palette.grey[800],
		fontWeight: theme.typography.fontWeightRegular,
		'&:hover, &:focus': {
			backgroundColor: theme.palette.grey[300]
		},
		'&:active': {
			boxShadow: theme.shadows[1],
			backgroundColor: emphasize(theme.palette.grey[300], 0.12)
		}
	}
}))(Chip); // TypeScript only: need a type cast here because https://github.com/Microsoft/TypeScript/issues/26591

const useStyles = makeStyles((theme) => ({
	root: {
		padding: theme.spacing(1)
	},
	avatar: {
		background: 'none',
		marginRight: -theme.spacing(1.5)
	}
}));

function getPathList(path) {
	let list = [];
	if (path !== '/') {
		while (path) {
			let index = path.lastIndexOf('/');
			let name = path.substring(index + 1);
			list.unshift({
				name,
				path
			});
			path = path.substring(0, index);
		}
	}
	list.unshift({name:"home",path:'/'})
	return list;
}

//面包屑导航
export default function CustomizedBreadcrumbs({ path, onChange,onMenu }) {
	const classes = useStyles();
	let pathList = getPathList(path);
	const current = pathList.pop();
	function handleClick(event, path) {
		event.preventDefault();
		onChange(path);
	}

	function showIcon(item){
		if(item.path=='/'){
			return (
				<Avatar className={classes.avatar}>
					<HomeIcon />
				</Avatar>)
		}
	}
	 
	return (
		<Paper elevation={0} className={classes.root}>
			<Breadcrumbs aria-label="breadcrumb">
				{pathList.map((item, key) => {
					return (
						<StyledBreadcrumb
							key={item.path}
							component="a"
							href="#"
							avatar={showIcon(item)}
							label={item.name}
							onClick={(e) => handleClick(e, item.path)}
						/>
					);
				})}
				{current && <DirMenu>
					{(onOpen)=>(
						<StyledBreadcrumb
							avatar={showIcon(current)}
							label={current.name}
							deleteIcon={<ExpandMoreIcon />}
							onDelete={onOpen}
							onClick={onOpen}
						/>
					)}
				</DirMenu>}
			</Breadcrumbs>
		</Paper>
	);
}

