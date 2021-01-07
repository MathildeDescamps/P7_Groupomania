import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const UrlAPI = 'http://localhost:3000/api/';

export default function SearchBox() {

  const [userList, setUserList] = useState([]);
  const [value, setValue] = useState(null);
  const history = useHistory();

  useEffect ( () => {
        axios.get(UrlAPI + 'users')
        .then(result => result.data)
        .then(data => setUserList(data))
  }, []);

  return (
    <Autocomplete
      id="search-box"
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
        (newValue && history.push("/profile/" + newValue.id)); 
      }}
      options={userList}
      clearOnEscape
      getOptionLabel={(option) => option.firstname + ' ' + option.lastname}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Rechercher un collègue..." variant="outlined" />}
    />
  );
}

