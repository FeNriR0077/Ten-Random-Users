import Users from "src/pages";
import UserProvider from "src/contexts";

const App = () => (
	<div className="App">
		<UserProvider>
			<Users />
		</UserProvider>
	</div>
);

export default App;
