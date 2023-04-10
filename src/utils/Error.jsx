import PropTypes from "prop-types";

const Error = ({ errorMessage }) => {
	return (
		<div className="mt-9 text-rose-400 font-bold text-center error-message ">
			<p>Sorry, some error has occured at the moment. Please try again later.</p>
			<p>({errorMessage})</p>
		</div>
	);
};

Error.defaultProps = {
	errorMessage: "Error"
};

Error.propTypes = {
	errorMessage: PropTypes.string,
};

export default Error;