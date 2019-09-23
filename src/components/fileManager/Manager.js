import React, { useState, useEffect } from 'react';
import { getDirContents } from '../../utils/webdav';
import { useAutoQuery } from '../../utils/query';
import { chunkList } from '../../utils/public';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import Breadcrumbs from './Breadcrumbs';
import Fab from '@material-ui/core/Fab';
import BastItem, { handleFileClick } from './Item';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { ItemMenu } from './Menu';


//import Item from './Item';
import { Grid } from 'react-virtualized';

import ChevronLeft from '@material-ui/icons/ChevronLeft';

const Contents = styled.div``;

const Actions = styled.div`display: flex;`;



function Manager({ open, onClose }) {
	//文件列表
	const [ gridList, setGridList ] = useState([]);
	const [ href, setHref ] = useState('/');
	const [anchorEl, setAnchorEl] = React.useState(null);
	const { data, loading } = useAutoQuery(getDirContents, {
		path: href
	});
	const columnLen = 5;
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	useEffect(() => {
		//鼠标右键菜单
		function handleContextMenu(e){
			e.preventDefault();
			let target=document.activeElement;
			if(target && target.getAttribute('d_type')){
				setAnchorEl(target)
			}else{
				setAnchorEl(null)
			}
			console.log('右键')
		}
		document.addEventListener('contextmenu',handleContextMenu);
		return ()=>{
			document.removeEventListener('contextmenu',handleContextMenu)
		}
	},[]);

	useEffect(
		() => {
			if (data.list) {
				let dirList = data.list ? data.list.slice(1) : [];
				setGridList(chunkList(dirList, columnLen));
			}
		},
		[ data.list ]
	);
	function handleMenuClose(e) {
		setAnchorEl(null);
	}

	function handleClose(e) {
		onClose();
	}
	function back() {
		setHref(href.substring(0, href.lastIndexOf('/')));
	}
	function push(path) {
		setHref(path);
	}
	
	let isBack = !(href === '/' || href === '');

	function cellRenderer({ columnIndex, key, rowIndex, style }) {
		let item = gridList[rowIndex][columnIndex];
		if (!item) return null;
		return <BastItem key={item.filename} style={style}  {...item} onClick={e=>{
			handleFileClick(item,push)
		}}/>;
	}

	return (
		<div>
			<Dialog fullScreen={fullScreen} open={open} onClose={handleClose} maxWidth={'xl'}>
				<DialogTitle id="alert-dialog-title">
					<Actions>
						<Fab
							size="small"
							aria-label="delete"
							onClick={(e) => {
								back();
							}}
							disabled={!isBack}
						>
							<ChevronLeft />
						</Fab>
						<Breadcrumbs path={href} onChange={push} onMenu={e=>setAnchorEl(e.target)} />
					</Actions>
					{loading && <LinearProgress />}
				</DialogTitle>
				<DialogContent>
					<ItemMenu  
					anchorEl={anchorEl}
					handleOpen={e=>{
						let item={
							type:anchorEl.getAttribute('d_type'),
							filename:anchorEl.getAttribute('d_filename'),
							basename:anchorEl.getAttribute('d_basename')
						}
						handleFileClick(item,push)
						setAnchorEl(null);
					}} 
					handleMenuClose={e=>{

					}}
					/>
					<Contents>
						{gridList.length > 0 && (
							<Grid
								cellRenderer={cellRenderer}
								columnCount={gridList[0].length}
								columnWidth={800 / columnLen}
								height={600}
								rowCount={gridList.length}
								rowHeight={800 / columnLen}
								width={820}
							/>
						)}
					</Contents>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary">
						取消
					</Button>
					<Button onClick={handleClose} color="primary" autoFocus>
						确定
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default Manager;
