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
import { ItemMenu,useMenu} from './Menu';
import useFileRouter from './FileRouter';

import { Grid } from 'react-virtualized';

import ChevronLeft from '@material-ui/icons/ChevronLeft';

const Contents = styled.div``;

const Actions = styled.div`display: flex;`;


function Manager({ open, onClose }) {
	//ui主题
	const theme = useTheme();
	//文件管理器路由
	const fileRouter=useFileRouter();
	//选择的文件
	const [select,setSelect]=useState({});
	//文件列表数据
	const [ gridList, setGridList ] = useState([]);
	//请求接口
	const { data, loading } = useAutoQuery(getDirContents, {
		path: fileRouter.path
	});
	const columnLen = 5;
	useEffect(
		() => {
			if (data.list) {
				let dirList = data.list ? data.list.slice(1) : [];
				setGridList(chunkList(dirList, columnLen));
			}
		},
		[ data.list ]
	);
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	function handleClose(e) {
		onClose();
	}

	const menu=useMenu(fileRouter.push);

	//渲染项
	function cellRenderer({ columnIndex, key, rowIndex, style }) {
		let data = gridList[rowIndex][columnIndex];
		if (!data) return null;
		return <BastItem 
		active={!!select[data.filename]}
		key={data.filename} 
		style={style}  
		data={data}
		onFocus={e=>{
			console.log('test',data)
			setSelect({[data.filename]:data})
		}}
		onBlur={e=>{
			setSelect({[data.filename]:null})
		}}
		onDoubleClick={e=>{
			handleFileClick(data,fileRouter.push)
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
								fileRouter.back();
							}}
							disabled={!fileRouter.isBack}
						>
							<ChevronLeft />
						</Fab>
						<Breadcrumbs path={fileRouter.path} onChange={fileRouter.push} />
					</Actions>
					{loading && <LinearProgress />}
				</DialogTitle>
				<DialogContent>
					<Contents  >
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
				
			</Dialog>
			{menu.data && <ItemMenu  {...menu}  />}
		</div>
	);
}

export default Manager;
