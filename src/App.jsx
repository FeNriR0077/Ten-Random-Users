import Users from "src/pages";
import UserContextProvider from "./contexts";

const App = () => (
	<div className="App">
		<UserContextProvider>
			<Users />
		</UserContextProvider>
	</div>
);

export default App;
