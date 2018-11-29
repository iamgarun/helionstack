/**
 *
 * SwitchField
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { asField } from 'informed';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 250,
  },
  loader: {
    marginRight: 8,
  },
  errorText: {
    color: theme.palette.error.main,
  },
  iOSSwitchBase: {
    '&$iOSChecked': {
      color: theme.palette.common.white,
      '& + $iOSBar': {
        backgroundColor: '#52d869',
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  iOSChecked: {
    transform: 'translateX(15px)',
    '& + $iOSBar': {
      opacity: 1,
      border: 'none',
    },
  },
  iOSBar: {
    borderRadius: 13,
    width: 42,
    height: 26,
    marginTop: -13,
    marginLeft: -21,
    border: 'solid 1px',
    borderColor: theme.palette.grey[400],
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  iOSIcon: {
    width: 24,
    height: 24,
  },
  iOSIconChecked: {
    boxShadow: theme.shadows[1],
  },
});

/* eslint-disable react/prefer-stateless-function */
class SwitchField extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      checked: false,
    };
  }

  handleChange = input => {
    const { onChange = () => {} } = this.props;
    const { setValue } = this.props.fieldApi;
    const currValue = input.target.checked;

    setValue(currValue);
    this.setState({ checked: currValue }, () => {
      onChange(currValue);
    });
  };

  render() {
    const {
      fieldApi,
      fieldState,
      classes,
      /* eslint-disable react/prop-types */ forwardedRef,
      label,
      ...rest
    } = this.props;
    const error = fieldState.error ? `*${label} ${fieldState.error}` : null;

    return (
      <React.Fragment>
        <FormGroup row>
          <FormControlLabel
            control={
              <Switch
                classes={{
                  switchBase: classes.iOSSwitchBase,
                  bar: classes.iOSBar,
                  icon: classes.iOSIcon,
                  iconChecked: classes.iOSIconChecked,
                  checked: classes.iOSChecked,
                }}
                disableRipple
                checked={this.state.checked}
                onChange={this.handleChange}
                value="checked"
              />
            }
            label={label}
          />
        </FormGroup>
      </React.Fragment>
    );
  }
}

SwitchField.propTypes = {
  classes: PropTypes.object.isRequired,
  fieldApi: PropTypes.object.isRequired,
  fieldState: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  field: PropTypes.string.isRequired,
};

export default asField(withStyles(styles)(SwitchField));
