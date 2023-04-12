import PropTypes from "prop-types";

const Error = ({ errorMessage }) => {
	return (
		<div className="font-bold text-center mt-9 text-rose-400 error-message ">
			<p>
        		Sorry, some error has occured at the moment. Please try again later.
			</p>

			<p>({errorMessage})</p>
		</div>
	);
};

Error.defaultProps = {
	errorMessage: "Error",
};

Error.propTypes = {
	errorMessage: PropTypes.string,
};

export default Error;
