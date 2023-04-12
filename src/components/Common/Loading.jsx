import loadingImg from "src/assets/loading.gif";
const Loading = () => (
	<div className="loading">
		<img
			src={loadingImg}
			alt="loading"
			className="block w-1/3 mx-auto loading-image"
		/>
	</div>
);

export default Loading;
