import RoutesConfig from './RoutesConfig';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-tooltip/dist/react-tooltip.css';
import 'styles/index.scss';
import Container from 'containers/Connector';
import BlockExplorer from 'containers/BlockExplorer';
import {
  RecoilRoot,
}
from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchInterval: 3000000,
			refetchOnWindowFocus: false,
		},
	},
});
function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient} contextSharing={true}>
        <BlockExplorer.Provider>
        <Container.Provider>
          <RoutesConfig />
          <ToastContainer
            hideProgressBar
            theme="colored"
          />
        </Container.Provider>
      </BlockExplorer.Provider>  
      </QueryClientProvider>
    </RecoilRoot>
  );
}
export default App;