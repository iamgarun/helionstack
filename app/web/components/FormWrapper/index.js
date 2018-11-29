/**
 * FormWrapper
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Form } from 'informed';

import FormSubmit from './FormSubmit';

const styles = () => ({});

/* eslint-disable react/prefer-stateless-function */
class FormWrapper extends React.PureComponent {
  render() {
    const { children, getApi = () => {}, onSubmit = () => {}, ...rest } = this.props;
    return (
      <Form
        getApi={formApi => {
          this.formApi = formApi;
          getApi(formApi);
        }}
        {...rest}>
        {React.Children.map(children, child => {
          if (child.type.name === 'FormSubmit') {
            return React.cloneElement(child, {
              onClick: () => {
                this.formApi.submitForm();
                onSubmit(this.formApi);
                this.formApi.reset();
              },
            });
          }

          return React.cloneElement(child);
        })}
      </Form>
    );
  }
}

FormWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  getApi: PropTypes.func,
  onSubmit: PropTypes.func,
};

const FormActions = {
  FormSubmit,
};

export { FormActions };
export default withStyles(styles)(FormWrapper);
