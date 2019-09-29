import React, { useState, useEffect, useRef } from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {fileStore} from './Manager';

import Grow from '@material-ui/core/Grow';
import styled from 'styled-components';


const FileMenu = styled(Paper)`
    position:fixed;
    background:white;
    z-index:99999;
    top:${(p) => p.position.y - 5}px;
    left:${(p) => p.position.x - 5}px;
`;

export const ItemMenu = React.memo(function() {
	const [ data, setData ] = useState(null);
	const [position,setPosition]=useState({x:0,y:0});
	useEffect(() => {
		//鼠标右键菜单
		function handleContextMenu(e) {
			let target = document.activeElement;
			e.preventDefault();
			let filename=target && target.getAttribute('d_filename')
			//右键菜单处理
			if (filename) {
				let resData = fileStore.source[filename]
				function open(){
					//数据
					setData(resData);
					setPosition({
						x: e.clientX,
						y: e.clientY
					});
				}
				setTimeout(open,60)
			} else {
				setData(null);
			}
		}
		document.addEventListener('contextmenu', handleContextMenu);
		return () => {
			document.removeEventListener('contextmenu', handleContextMenu);
		};
	}, []);

	//用来添加鼠标按下事件
	const menuEl = useRef(null);
	useEffect(() => {
		function handleMouseDown(e) {
			setData(null);
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
			<FileMenu position={position} ref={menuEl}>
				<List component="nav" aria-label="main mailbox folders">
					<ListItem button onClick={e=>{
						fileStore.open(data);
						setData(null);
					}}>
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
			</FileMenu>
		</Grow>
	);
});



// 文件夹菜单
export function DirMenu({children}) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
	  {children && children(handleClick)}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>新建</MenuItem>
        <MenuItem onClick={handleClose}>上传</MenuItem>
        <MenuItem onClick={handleClose}>更名</MenuItem>
        <MenuItem onClick={handleClose}>属性</MenuItem>
      </Menu>
    </div>
  );
}