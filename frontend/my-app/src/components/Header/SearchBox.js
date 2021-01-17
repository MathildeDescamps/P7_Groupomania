import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router-dom';

export default function SearchBox(props) {

  const [value, setValue] = useState(null);
  const history = useHistory();

  return (
    <Autocomplete
      id="search-box"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        if (newValue) window.location.pathname = "/profile/" + newValue.id; 
      }}
      options={props.userList}
      clearOnEscape
      getOptionLabel={(option) => option.firstname + ' ' + option.lastname}
      style={{ width: 300, backgroundColor: 'white', outline: 'none', }}
      renderInput={(params) => <TextField {...params} label="Rechercher un collègue..." variant="outlined" />}
    />
  );
}

