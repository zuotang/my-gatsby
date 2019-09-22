import React from 'react';
import defaultIcon from '../../images/icons/file_default.png';
import folderIcon from '../../images/icons/folder.png';
import imgIcon from '../../images/icons/img.png';
import mp3Icon from '../../images/icons/mp3.png';
import htmlIcon from '../../images/icons/html.png';
import textIcon from '../../images/icons/text.png';
import styled from 'styled-components';

const File = styled.div`
	word-break: break-word;
	white-space: pre-line;
	overflow: hidden;
	.item {
		font-size: 12px;
		&:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
		margin: 20px;
		width: calc(100% - 40px);
		height: calc(100% - 40px);
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		img {
			max-width: 100%;
			max-height: calc(100% - 40px);
			height: 100%;
			display: block;
		}
	}
`;

export const getTypeObj = ({ push, ...item }) => {
	let icon, onClick;

	if (item.type === 'directory') {
		icon = folderIcon;
		onClick = (e) => {
			push(item.filename);
		};
	} else if (item.type === 'file') {
		const extend = item.basename.substring(item.basename.lastIndexOf('.') + 1).toLowerCase();
		if (/jpg|png|gif/.test(extend)) {
			icon = `http://home.tangzuo.cc:8282${item.filename.replace('.', '.100x100.')}`;
			onClick = (e) => {
				window.open(`http://home.tangzuo.cc:8282${item.filename}`, '_blank');
			};
		} else if (extend === 'mp4' || extend === 'mp3') {
			icon = mp3Icon;
			onClick = (e) => {
				window.open(`http://home.tangzuo.cc:8282${item.filename}`, '_blank');
			};
		} else if (extend === 'html' || extend === 'xml') {
			icon = htmlIcon;
			onClick = (e) => {
				window.open(`http://home.tangzuo.cc:8282${item.filename}`, '_blank');
			};
		} else if (extend === 'txt' || extend === 'js' || extend === 'json' || extend === 'md') {
			icon = textIcon;
			onClick = (e) => {
				window.open(`http://home.tangzuo.cc:8282${item.filename}`, '_blank');
			};
		} else {
			icon = defaultIcon;
			onClick = () => {
				alert('未知文件');
			};
		}
	}
	return {
		...item,
		icon,
		onClick
	};
};

function BastItem({ filename, basename, icon, type, onClick, style }) {
	return (
		<File style={style} title={filename} onClick={onClick}>
			<div className="item">
				<img src={icon} alt="Logo" />
				<div className="title">{basename}</div>
			</div>
		</File>
	);
}

export default BastItem;
