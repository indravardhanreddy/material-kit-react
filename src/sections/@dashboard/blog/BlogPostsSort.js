import PropTypes from 'prop-types';
// @mui
import { MenuItem, TextField } from '@mui/material';
import { useState } from 'react';

// ----------------------------------------------------------------------

BlogPostsSort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func,
};

export default function BlogPostsSort({ options, onSort }) {

  const [optionVal, setOptionVal] = useState('Popular')
  return (
    <TextField select size="small" value="latest" onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
