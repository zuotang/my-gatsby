/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require('path');
// You can delete this file if you're not using it

exports.createPages = ({ actions = true }) => {
	const { createPage } = actions;

	createPage({
		path: '/tz',
		matchPath: '/tz/*',
		component: path.resolve(`src/pages/page-2.js`),
		context: {
			id: 'hello-world'
		}
	});
};
