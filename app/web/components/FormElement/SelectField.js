/**
 *
 * SelectField
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { asField } from 'informed';
import Select from 'react-select';
import { Grid, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 250,
    '&.hasError': {
      borderColor: 'red',
    },
  },
  loader: {
    marginRight: 8,
  },
  errorText: {
    color: theme.palette.error.main,
  },
});

/* eslint-disable react/prefer-stateless-function */
class SelectField extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: props.isMulti ? [] : '',
      isLoading: true,
      data: [],
    };
  }

  componentWillMount() {
    const { loadData, defaultValue } = this.props;

    if (!_.isArray(loadData)) {
      return loadData.then(response => {
        const resp = response.data.data;
        this.setState({ isLoading: false, data: resp });
      });
    }

    return this.setState({ isLoading: false, data: loadData, value: defaultValue });
  }

  componentWillReceiveProps(nextProps) {
    const { loadData, fetching } = nextProps;

    if (fetching && this.state.value !== '') {
      this.setState({ value: '' });
    }

    if (!_.isArray(loadData)) {
      return loadData.then(response => {
        const resp = response.data.data;
        this.setState({ isLoading: false, data: resp });
      });
    }

    return this.setState({ isLoading: false, data: loadData });
  }

  handleChange = input => {
    const { onChange = () => {}, selector, isMulti } = this.props;
    const { data } = this.state;
    const { setValue } = this.props.fieldApi;

    if (isMulti) {
      const { value } = this.state;
      const computedArr = _.filter(data, item => _.find(input, { value: item[selector.key] }));
      const transformedArr = this.mapData(computedArr);
      const finalArr = !_.isEmpty(transformedArr) ? _.unionBy(value, transformedArr, 'value') : transformedArr;

      setValue(computedArr);
      this.setState({ value: finalArr }, () => {
        onChange(computedArr);
      });

      return null;
    }

    const dataObject = _.find(data, { [selector.key]: input.value });
    setValue(dataObject);

    this.setState({ value: input }, () => {
      onChange(dataObject);
    });
  };

  mapData = values => {
    const { selector } = this.props;
    return selector.key
      ? _.map(values, record => ({ value: record[selector.key], label: record[selector.value] }))
      : _.map(values, selector.process);
  };

  render() {
    const {
      fieldApi,
      fieldState,
      classes,
      /* eslint-disable react/prop-types */ forwardedRef,
      label,
      placeholder,
      selector,
      disabled,
      fetching,
      filter,
      isMulti,
      ...rest
    } = this.props;
    const { isLoading, data } = this.state;
    const error = fieldState.error ? `*${label} ${fieldState.error}` : null;
    const showLoader = fetching === undefined ? isLoading : fetching && !disabled;
    const values = filter ? filter(data) : data;
    const options = this.mapData(values);

    const attrs = {
      placeholder,
      options,
      isMulti,
      value: this.state.value,
      className: classes.formControl,
      isLoading: showLoader,
      onChange: this.handleChange,
      isDisabled: isLoading || disabled,
    };

    return (
      <React.Fragment>
        <Grid container direction="row" justify="flex-start" alignItems="center">
          {!placeholder && (
            <Grid item lg={3}>
              <Typography color="textPrimary">{label}</Typography>
            </Grid>
          )}

          <Grid item>
            <Select {...rest} {...attrs} />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

SelectField.propTypes = {
  classes: PropTypes.object.isRequired,
  fieldApi: PropTypes.object.isRequired,
  fieldState: PropTypes.object.isRequired,
  filter: PropTypes.func,
  label: PropTypes.string,
  onChange: PropTypes.func,
  fetching: PropTypes.bool,
  selector: PropTypes.object.isRequired,
  loadData: PropTypes.oneOfType([PropTypes.instanceOf(Promise), PropTypes.array]),
  field: PropTypes.string.isRequired,
};

export default asField(withStyles(styles)(SelectField));
