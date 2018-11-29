import React from 'react';
import PropTypes from 'prop-types';

class FormSubmit extends React.PureComponent {
  render() {
    const { onClick, children } = this.props;

    return (
      <React.Fragment>
        <div onClick={onClick}>{React.Children.toArray(children)}</div>
      </React.Fragment>
    );
  }
}

FormSubmit.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
};

export default FormSubmit;
