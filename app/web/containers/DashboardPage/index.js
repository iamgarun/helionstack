import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';

import injectReducer from '../../helpers/injectReducer';
import injectSaga from '../../helpers/injectSaga';

import reducer from './reducer';
import saga from './saga';

import * as selectors from './selectors';

import MenuBar from '../../components/MenuBar';

const styles = {
  root: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

class DashboardPage extends React.PureComponent {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Helmet>
          <title>Helionstack | Dashboard</title>
        </Helmet>
        <MenuBar>Dashboard</MenuBar>
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
  dashboardState: selectors.makeSelectDashboardState(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashboardPage', reducer });
const withSaga = injectSaga({ key: 'dashboardPage', saga });

DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(withStyles(styles)(DashboardPage));
