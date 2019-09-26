import React, { useState, useEffect, useRef } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';

import Grow from '@material-ui/core/Grow';
import styled from 'styled-components';

const Menu = styled(Paper)`
    position:fixed;
    background:white;
    z-index:99999;
    top:${(p) => p.position.y - 5}px;
    left:${(p) => p.position.x - 5}px;
`;

export function useMenu({ onOpen }) {
	const [ data, setData ] = useState(null);

	useEffect(() => {
		//鼠标右键菜单
		function handleContextMenu(e) {
			let target = document.activeElement;
			e.preventDefault();
			//右键菜单处理
			if (target && target.getAttribute('d_type')) {
				let resData = {
					type: target.getAttribute('d_type'),
					filename: target.getAttribute('d_filename'),
					basename: target.getAttribute('d_basename')
				};
				//数据
				setData({
					...resData,
					x: e.clientX,
					y: e.clientY
				});
			} else {
				setData(null);
			}
		}
		document.addEventListener('contextmenu', handleContextMenu);
		return () => {
			document.removeEventListener('contextmenu', handleContextMenu);
		};
	}, []);

	function handleMenuClose() {
		setData(null);
	}

	function handleOpen() {
		onOpen(data);
		handleMenuClose();
	}
	return { handleOpen, handleMenuClose, data };
}

export const ItemMenu = React.memo(function({ data, handleOpen, handleMenuClose, onSelect }) {
	//用来添加鼠标按下事件
	const menuEl = useRef(null);
	useEffect(() => {
		function handleMouseDown(e) {
			handleMenuClose();
		}
		//点击菜单项时不隐藏菜单
		function handleMenu(e) {
			e.preventDefault();
			e.stopPropagation();
		}
		let menu = menuEl.current;
		document.addEventListener('mousedown', handleMouseDown);
		menu.addEventListener('mousedown', handleMenu);
		return () => {
			document.removeEventListener('mousedown', handleMouseDown);
			menu.removeEventListener('mousedown', handleMenu);
		};
	}, []);
	return (
		<Grow in={!!data} style={{ transformOrigin: '0 0 0' }}>
			<Menu position={{ x: data.x, y: data.y }} ref={menuEl}>
				<List component="nav" aria-label="main mailbox folders">
					<ListItem button onClick={handleOpen}>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary="打开" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<DeleteIcon />
						</ListItemIcon>
						<ListItemText primary="删除" />
					</ListItem>
					<ListItem button>
						<ListItemIcon>
							<HelpOutlineIcon />
						</ListItemIcon>
						<ListItemText primary="属性" />
					</ListItem>
				</List>
			</Menu>
		</Grow>
	);
});
