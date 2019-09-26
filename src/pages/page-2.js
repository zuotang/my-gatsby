import React, { useState, useEffect } from 'react';
import { getDirContents } from '../utils/webdav';
import { useAutoQuery } from '../utils/query';
import { chunkList } from '../utils/public';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import LinearProgress from '@material-ui/core/LinearProgress';
import Breadcrumbs from '../components/fileManager/Breadcrumbs';
import Fab from '@material-ui/core/Fab';
import BastItem, { onOpen } from '../components/fileManager/Item';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { ItemMenu, useMenu } from '../components/fileManager/Menu';
import useFileRouter from '../components/fileManager/FileRouter';

import { Grid } from 'react-virtualized';

import ChevronLeft from '@material-ui/icons/ChevronLeft';

const Contents = styled.div``;

const Actions = styled.div`display: flex;`;

function Page2({ open, onClose }) {
	//ui主题
	const theme = useTheme();
	//文件管理器路由
	const fileRouter = useFileRouter();
	//选择的文件
	const [ select, setSelect ] = useState({});
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

	const menu = useMenu({
		onOpen(data) {
			onOpen(data, fileRouter.push);
		}
	});

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
			{menu.data && <ItemMenu {...menu} />}
		</div>
	);
}

export default Page2;
