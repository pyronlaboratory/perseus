import React from 'react';
import PropTypes from 'prop-types';

// material imports
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

// material icons
import ClearIcon from '@material-ui/icons/Clear';
import SearchIcon from '@material-ui/icons/Search';

// material datagrid
// import { GridToolbarFilterButton } from '@mui/x-data-grid';

const styles = (theme) => ({
    wrapper: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
    },

    textField: {
        [theme.breakpoints.down('xs')]: {
        width: '100%',
        },
        width: '100%',
        margin: theme.spacing(2),
        '& .MuiSvgIcon-root': {
        marginRight: theme.spacing(0.5),
        },
        '& .MuiInput-underline:before': {
        borderBottom: `1px solid ${theme.palette.divider}`,
        },
    },
});

function SearchToolbar(props) {

    const { classes } = props;

    return (
        <div className={classes.wrapper} data-testid="search-toolbar" >

            {/*
            TO DO: Write a custom filter function to enable search by time 
            <div>
                <GridToolbarFilterButton />
            </div> 
            */}
            <TextField
                variant="standard"
                value={props.value}
                onChange={props.onChange}
                placeholder="Search…"
                className={classes.textField}
                InputProps={{
                    startAdornment: <SearchIcon fontSize="small" />,
                    endAdornment: (
                        <IconButton
                            title="Clear"
                            aria-label="Clear"
                            size="small"
                            style={{ visibility: props.value ? 'visible' : 'hidden' }}
                            onClick={props.clearSearch}
                            data-testid="clear-search-button"
                        >
                            <ClearIcon fontSize="small"/>
                        </IconButton>
                    ),
                }}
            />
        </div>
    );
}

SearchToolbar.propTypes = {
    clearSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};


export default withStyles(styles)(SearchToolbar)