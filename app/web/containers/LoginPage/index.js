import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Grid, Typography, CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import ReactFullPage from '@fullpage/react-fullpage';
import { GithubLoginButton } from 'react-social-login-buttons';
import { withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import Logo from '../../asset/images/logo.png';

import * as appActions from '../App/actions';
import * as appSelectors from '../App/selectors';

import reducer from './reducer';
import saga from './saga';

import injectReducer from '../../helpers/injectReducer';
import injectSaga from '../../helpers/injectSaga';

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    width: 150,
    marginBottom: 30,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class LoginPage extends React.PureComponent {
  handleLogin = () => {
    const { dispatch, loginProcessActive } = this.props;
    if (loginProcessActive) {
      return null;
    }

    dispatch(appActions.loginUser('github'));
  };

  render() {
    const { classes, loginProcessActive } = this.props;

    return (
      <div className={classes.root}>
        <Helmet>
          <title>Identity | Dashboard</title>
        </Helmet>
        <ReactFullPage
          licenseKey="OPEN-SOURCE-GPLV3-LICENSE"
          render={() => (
            <ReactFullPage.Wrapper>
              <div className="section">
                <Grid container alignItems="center" justify="center" direction="column">
                  <img src={Logo} className={classes.logo} />
                  <Typography variant="h5">
                    Welcome to{' '}
                    <Typography color="primary" component="span" variant="h5" style={{ display: 'initial' }}>
                      HPE
                    </Typography>
                    {' | '}
                    <Typography color="secondary" component="span" variant="h5" style={{ display: 'initial' }}>
                      Avalon
                    </Typography>
                  </Typography>
                  <br />
                  <br />
                  {loginProcessActive ? (
                    <CircularProgress />
                  ) : (
                    <GithubLoginButton onClick={this.handleLogin}>
                      <span>Login with GitHub Enterprise</span>
                    </GithubLoginButton>
                  )}
                </Grid>
              </div>
            </ReactFullPage.Wrapper>
          )}
        />
      </div>
    );
  }
}

/* TODO {label:"help wanted"} implement mapStateToProps */
export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const mapStateToProps = createStructuredSelector({
  loginProcessActive: appSelectors.makeSelectLoginProcessActive(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loginProcessActive: PropTypes.bool.isRequired,
};

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
)(withStyles(styles)(LoginPage));
