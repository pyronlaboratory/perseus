import React, { useState, useEffect, useRef } from 'react';

// material imports
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';

// material datagrid
import { DataGrid } from '@mui/x-data-grid';

// dashboard components
import SearchToolbar from '../SearchToolbar/SearchToolbar';

// api hooks
import { getCourseSummary } from "../../hooks/getCourseSummary";

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

const useStyles = makeStyles(() => ({
  paper: {
    maxWidth: 1064,
    margin: 'auto',
    overflow: 'hidden',
  }
}));

function DataTable() {

  const classes = useStyles();
  
  const componentIsMounted = useRef(true);
  
  const getUsername = (params) => {
    return `${params.getValue(params.id, 'user_firstname') || ''} ${
      params.getValue(params.id, 'user_lastname') || ''
    }`;
  }

  const [searchText, setSearchText] = useState('');
  const [dataset, setDataset] = useState([]);
  const [rows, setRows] = useState([]);
    
  // setting columns for datagrid
  const dataColumns = [
    {
      headerName: "User ID", 
      field: "user_id", 
      hide: true, 
      description: "User ID", 
      width: 150
    },
    {
      headerName: "Firstname", 
      field: "user_firstname", 
      hide: true, 
      description: "Firstname", 
      width: 150
    },
    {
      headerName: "Lastname", 
      field: "user_lastname",
      hide: true,  
      description: "Lastname", 
      width: 150
    },
    {
      field: 'Name',
      headerName: 'Username',
      width: 160,
      description: 'Username',
      valueGetter: getUsername,
      sortComparator: (v1, v2) => v1.toString().localeCompare(v2.toString()),
    },
    {
      headerName: "Course", 
      field: "course_name", 
      description: "Course Name",
      width: 250
    },
    {
      headerName: "Course ID", 
      field: "course_id", 
      hide: true, 
      description: "Course ID", 
      width: 150
    },
    {
      headerName: "Started At", 
      field: "course_started_at", 
      description: "Course Started At", 
      width: 180,
      valueFormatter: (params) => {
        const valueFormatted = new Date(params.value).toDateString();
        return `${valueFormatted}`;
      }
    },
    {
      headerName: "Finished At", 
      field: "course_finished_at", 
      description: "Course Finished At", 
      width: 180,
      valueFormatter: (params) => {
        const valueFormatted = new Date(params.value).toDateString();
        return `${valueFormatted}`;
      }
    },
    {
      headerName: "Completion Time", 
      field: "course_completion_time", 
      description: "Course Completion Time (in days)", 
      minWidth: 150,
      flex: 1,
      valueFormatter: (params) => {
        const valueFormatted = Math.round(((params.value)/86400) * 10) / 10;
        return `${valueFormatted}`;
      },
    },
  ]

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);

    const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
    const filteredRows = dataset.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };


  // fetching course summary
  useEffect(() => {
    getCourseSummary()
      .then(response => {
          if (componentIsMounted.current) {
              setDataset(response);
              setRows(response);
          }
      })
      .catch(err => {
          console.log(err);
      });
      return () => {
          componentIsMounted.current = false;
      };
  }, []);

  return (
    <Paper className={classes.paper}>
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid 
          components={{ Toolbar: SearchToolbar }}
          columns={dataColumns}
          rows={rows}
          componentsProps={{
            toolbar: {
              value: searchText,
              onChange: (event) => requestSearch(event.target.value),
              clearSearch: () => requestSearch(''),
            },
          }}
      />
    </div>
    </Paper>

  );
}

export default DataTable;