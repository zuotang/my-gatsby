import React, { useState, useEffect } from 'react';
import { getDirContents } from '../../utils/webdav';
import { useAutoQuery } from '../../utils/query';

import styled from 'styled-components';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import LinearProgress from '@material-ui/core/LinearProgress';
import Breadcrumbs from './Breadcrumbs';
import Fab from '@material-ui/core/Fab';
import BastItem, { onOpen } from './Item';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { ItemMenu } from './Menu';
import useFileRouter from './FileRouter';
import NameDialog from './NameDialog'

import { Grid } from 'react-virtualized';

import ChevronLeft from '@material-ui/icons/ChevronLeft';
import SortBtn, { useFileSort } from './Sort';

const Contents = styled.div``;

const Actions = styled.div`display: flex;`;

const Right = styled.div`margin-left: auto;`;


//所有文件数据塞入fileStore,通过filename作为key
export let fileStore={
	source:{},
};


function Manager({ open, onClose }) {
	//ui主题
	const theme = useTheme();
	//文件管理器路由
	const fileRouter = useFileRouter();
	//选择的文件
	const [ select, setSelect ] = useState({});

	//请求接口
	const { data, loading,updateCache } = useAutoQuery(getDirContents, {
		path: fileRouter.path
	});

	//注册到全局对象中方便调用
	//添加文件夹
	fileStore.addDir=function(){
		
	}
	//删除文件或文件夹
	fileStore.delFile=function (){

	}
	//修改文件名称
	fileStore.rename=function (){

	}
	fileStore.open=function(fileItem){
		onOpen(fileItem, fileRouter.push);
	}
	
	useEffect(()=>{
		if(data.list){
			fileStore.source={};
			for(let i in data.list){
				let item=data.list[i];
				fileStore.source[item.filename]=item;
			}
		}
	},[data.list])
	const columnLen = 5;
	//排序
	const { gridList, sort, sortIndex, setSortIndex, sortObj } = useFileSort(data.list, columnLen);

	//媒体查询是否需要全屏显示
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
	
	//渲染项
	function cellRenderer({ columnIndex, key, rowIndex, style }) {
		let data = gridList[rowIndex][columnIndex];
		if (!data) return null;
		return (
			<BastItem
				active={!!select[data.filename]}
				key={data.filename}
				style={style}
				data={data}
				onFocus={(e) => {
					setSelect({ [data.filename]: data });
				}}
				onBlur={(e) => {
					setSelect({ [data.filename]: null });
				}}
				onDoubleClick={(e) => {
					onOpen(data, fileRouter.push);
				}}
			/>
		);
	}

	return (
		<div>
			
			<Dialog fullScreen={fullScreen} open={open} onClose={onClose} maxWidth={'xl'}>
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
						<Breadcrumbs 
						path={fileRouter.path} 
						onChange={fileRouter.push}
						/>
						<Right>
							<SortBtn sortIndex={sortIndex} sortObj={sortObj} setSortIndex={setSortIndex} />
						</Right>
					</Actions>
					{loading && <LinearProgress />}
				</DialogTitle>
				<DialogContent>
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
						<NameDialog />
					</Contents>
				</DialogContent>
			</Dialog>
			 <ItemMenu  />
		</div>
	);
}

export default Manager;
