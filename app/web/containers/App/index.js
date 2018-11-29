import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Scrollbars } from 'react-custom-scrollbars';
import { ToastContainer } from 'react-toastify';
import io from 'socket.io-client';
import { SocketProvider } from 'socket.io-react';
import _ from 'lodash';
import { blue, orange } from '@material-ui/core/colors';

import subscriber from '../../helpers/subscriber';
import routes from './routes';

const socket = io.connect('http://localhost:7001');
const palette = {
  primary: blue,
  secondary: orange,
  contrastText: '#ffffff',
  type: 'light',
};

const theme = createMuiTheme({
  palette: {
    type: palette.type,
    primary: {
      light: palette.primary[100],
      main: palette.primary[500],
      dark: palette.primary[700],
      contrastText: palette.contrastText,
    },
    secondary: {
      light: palette.secondary[100],
      main: palette.secondary[500],
      dark: palette.secondary[700],
      contrastText: palette.contrastText,
    },
  },
  typography: {
    useNextVariants: true,
  },
});

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };

    subscriber.init(socket);
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    const { isLoading } = this.state;

    return (
      <Scrollbars style={{ height: '100vh' }}>
        <MuiThemeProvider theme={theme}>
          <SocketProvider socket={socket}>
            {isLoading ? (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  zIndex: 9999,
                  background: '#3e464c',
                  overflow: 'hidden',
                }}
              />
            ) : null}
            <ToastContainer />
            <Switch>
              <Route path="/home/" component={Child} />
            </Switch>
          </SocketProvider>
        </MuiThemeProvider>
      </Scrollbars>
    );
  }
}

const Child = () => {
  return (
    <React.Fragment>
      <Switch>
        {_.map(routes, (route, index) => (
          <Route key={index} path={`/home${route.path}`} component={route.component} />
        ))}
      </Switch>
    </React.Fragment>
  );
};

export default App;
