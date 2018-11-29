import createMemoryHistory from 'history/createMemoryHistory';
import createBrowserHistory from 'history/createBrowserHistory';
let history = null;

try {
  history = createBrowserHistory();
} catch (e) {
  history = createMemoryHistory();
}

export default history;
