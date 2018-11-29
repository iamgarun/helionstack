/**
 *
 * InputField
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { asField } from 'informed';
import classNames from 'classnames';
import { FormControl, InputLabel, FormHelperText, Input } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  formControl: {
    width: '100%',
    marginBottom: 12,
  },
  errorText: {
    color: theme.palette.error.main,
  },
});

/* eslint-disable react/prefer-stateless-function */
class InputField extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.initialValue || '',
    };
  }

  handleChange = e => {
    const { onChange = () => {} } = this.props;
    const { setValue } = this.props.fieldApi;
    const currValue = e.target.value.trimStart();

    setValue(currValue);
    this.setState({ value: currValue }, () => {
      onChange(currValue);
    });
  };

  render() {
    const {
      fieldApi,
      className,
      fieldState,
      classes,
      /* eslint-disable react/prop-types */ forwardedRef,
      label,
      initialValue,
      ...rest
    } = this.props;

    const error = fieldState.error ? `*${label} ${fieldState.error}` : null;

    return (
      <React.Fragment>
        <FormControl className={classNames(classes.formControl, className)}>
          <InputLabel htmlFor={label}>{label}</InputLabel>
          <Input error={!!error} value={this.state.value} onChange={this.handleChange} {...rest} />
        </FormControl>
      </React.Fragment>
    );
  }
}

InputField.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  fieldApi: PropTypes.object.isRequired,
  fieldState: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  initialValue: PropTypes.any,
  onChange: PropTypes.func,
  field: PropTypes.string.isRequired,
};

export default asField(withStyles(styles)(InputField));
