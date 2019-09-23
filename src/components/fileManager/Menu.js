import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
//import { handleFileClick } from './Item';

export const ItemMenu=React.memo(function({anchorEl,handleOpen,handleMenuClose}){
    return 	<Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleOpen}>打开</MenuItem>
            <MenuItem onClick={handleMenuClose}>重命名</MenuItem>
            <MenuItem onClick={handleMenuClose}>删除</MenuItem>
            <MenuItem onClick={handleMenuClose}>属性</MenuItem>
        </Menu>
})