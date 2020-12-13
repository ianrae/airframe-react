import React from 'react';
import PropTypes from 'prop-types';

const FooterText = (props) => (
	<React.Fragment>
		(C) { props.year } Ian Rae. All Rights Reserved. Datamend is builtusing { props.desc }. 
	</React.Fragment>
)
FooterText.propTypes = {
    year: PropTypes.node,
	name: PropTypes.node,
	desc: PropTypes.node,
};
FooterText.defaultProps = {
    year: "2020",
    name: "Airframe",
    desc: "Bootstrap 4, React 16 (latest), NPM, and Airframe."
};

export { FooterText };
