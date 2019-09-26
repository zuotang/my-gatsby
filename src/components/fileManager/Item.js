import React,{useState} from 'react';
import defaultIcon from '../../images/icons/file_default.png';
import folderIcon from '../../images/icons/folder.png';
import imgIcon from '../../images/icons/img.png';
import mp3Icon from '../../images/icons/mp3.png';
import rarIcon from '../../images/icons/rar.png';
import zipIcon from '../../images/icons/zip.png';
import htmlIcon from '../../images/icons/html.png';
import textIcon from '../../images/icons/text.png';
import styled from 'styled-components';
import calssNames from 'classnames';

const File = styled.div`
	word-break: break-word;
	white-space: pre-line;
	overflow: hidden;
	.item {
		font-size: 12px;
		&:hover {
			background-color: rgba(0, 0, 0, 0.1);
		}
		&.active{
			background-color: rgba(0, 0, 0, 0.2);		
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

//图片的缩略图
const ImageThumb=React.memo(function({url}){
	const [showUrl,setShowUrl]=useState(false)
	return <>
		<img src={url} style={{display:showUrl?'block':'none'}} alt="Logo" draggable="false" onLoad={e=>{
			setShowUrl(true)
		}} />
		<img src={imgIcon} style={{display:showUrl?'none':'block'}} alt="Logo" draggable="false"  />
	</>
},()=>true)

function getExt(name){
	return name.substring(name.lastIndexOf('.') + 1).toLowerCase();
}
//处理图标
export function getIcon(item){
	if (item.type === 'directory') {
		return folderIcon;
	} else if (item.type === 'file') {
		const extend = getExt(item.basename);
		if (/jpg|png|gif/.test(extend)) {
			return <ImageThumb url={`http://home.tangzuo.cc:8282/site_cache${item.filename.replace(/(.*).(jpg|gif|png)$/, '$1.100x100.$2')}`} />
		} else if (/mp4|mp3/.test(extend)) {
			return mp3Icon;
		} else if (/html|xml/.test(extend)) {
			return htmlIcon;
		} else if (/txt|js|json|md/.test(extend)) {
			return textIcon;
		}  else if (/rar|tar/.test(extend)) {
			return rarIcon
		}else if (/zip|gz/.test(extend)) {
			return zipIcon
		}else {
			return defaultIcon;
		}
	}
}
//处理文件打开
export function onOpen(item,push){
	function openWindow(e){
		window.open(`http://home.tangzuo.cc:8282${item.filename}`, '_blank');
	}
	if (item.type === 'directory') {
		return push(item.filename);
	} else if (item.type === 'file') {
		const extend = getExt(item.basename);
		if (/jpg|png|gif/.test(extend)) {
			return openWindow();
		} else if (/mp4|mp3/.test(extend)) {
			return openWindow();
		} else if (/html|xml/.test(extend)) {
			return openWindow();
		} else if (/txt|js|json|md/.test(extend)) {
			return openWindow();
		} else {
			return openWindow();
		}
	}
}


const BastItem=React.memo(function({ style,active,data,...other }) {
	let icon=getIcon(data);
	let iconElement;
	//图标渲染
	if(typeof icon==="object" && icon.props){
		iconElement=icon;
	}else{
		iconElement=<img src={icon} alt="Logo" draggable="false" />
	}
	return (
		<File style={style}   >
			<div 
			d_type={data.type} 
			d_basename={data.basename} 
			d_filename={data.filename} 
			tabIndex="0" 
			className={calssNames("item",active && 'active')}
			{...other}
			draggable >
				{iconElement}
				<div className="title">{data.basename}</div>
			</div>
		</File>
	);
},(p, n) =>(p.active==n.active && p.style == n.style))

export default BastItem;
