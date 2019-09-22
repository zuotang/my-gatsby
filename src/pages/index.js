import React, { useState } from 'react';
import Layout from '../components/layout';
import FileManager from '../components/fileManager/Manager';
import Button from '@material-ui/core/Button';

const IndexPage = () => {
	const [ open, setOpen ] = useState(false);
	return (
		<Layout autoSize={false}>
			<Button variant="outlined" color="primary" onClick={(e) => setOpen(true)}>
				文件管理
			</Button>
			<FileManager open={open} onClose={(e) => setOpen(false)} />
		</Layout>
	);
};

export default IndexPage;
