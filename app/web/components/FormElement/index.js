/**
 *
 * FormElement
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import InputField from './InputField';
import SelectInputField from './SelectField';
import SwitchField from './SwitchField';

const styles = () => ({});
const generateValidator = validator => {
  const generateStringValidator = type => {
    switch (type) {
      case 'empty':
        return value => {
          return !value || value === '' || _.isEmpty(value) ? 'is required' : null;
        };
      default:
        return () => null;
    }
  };

  if (_.isString(validator)) {
    return generateStringValidator(validator);
  }

  return validator ? validator : null;
};

/* eslint-disable react/prefer-stateless-function */
class FormElement extends React.PureComponent {
  render() {
    const { label, field, validate, category = 'text', ...rest } = this.props;
    const validator = generateValidator(validate);
    const fieldAttrs = {
      label,
      field,
      validate: validator,
      validateOnChange: validator ? true : null,
      validateOnBlur: validator ? true : null,
      ...rest,
    };

    switch (category) {
      case 'text':
        return <InputField {...fieldAttrs} />;
      case 'select':
        return <SelectInputField {...fieldAttrs} />;
      case 'switch':
        return <SwitchField {...fieldAttrs} />;
      default:
        return null;
    }
  }
}

FormElement.propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  category: PropTypes.string,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
};

export { InputField, SelectInputField, SwitchField };
export default withStyles(styles)(FormElement);
