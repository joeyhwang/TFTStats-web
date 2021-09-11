import React, {useState, useEffect, useRef} from 'react'
import {Grid, IconButton, Button, ButtonGroup, Grow, Paper, Popper, MenuItem,MenuList} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import useStyles from './styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useHistory } from 'react-router-dom';

const regions = [ 'BR', 'EUNE', 'EUW', 'JP', 'KR', 'LAN', 'LAS', 'NA', 'OCE', 'TR', 'RU'];
const SearchBar = () => {
    const classes = useStyles();
    const history = useHistory();
    const [open,setOpen] = useState(false);
    const anchorRef = useRef(null);
    const [selectedIndex, setSelectedIndex] = useState(regions.findIndex(r => r === localStorage.getItem('region')) || 0);
    const [region, setRegion] = useState(localStorage.getItem('region') === null ? 'BR' : localStorage.getItem('region')); 
    const [searchText, setSearch] = useState('');

    const handleMenuItemClick = (e, i) => {
        //called when region menu item is clicked: sets the region and closes the menu
        setSelectedIndex(i);
        setRegion([regions[i]]);
        setOpen(false);
    };

    useEffect(() => {
      //run whenever the region value changes, stores region in local storage
      localStorage.setItem('region', region);

    }, [region]);


    const handleToggle = () => {
      //open/close menu
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (e) => {
      //close the region menu
        if (anchorRef.current && anchorRef.current.contains(e.target)) {
          return;
        }
        setOpen(false);
      };

    const handleKeyPress = (e) => {
      //search when user presses enter (13)
      if (e.keyCode === 13) {
        searchSummoner();
      }
    }

    const searchSummoner = () => {
      if (searchText.trim()) {        
        history.push(`/profile/${region.toString().toLowerCase()}/${searchText}`);
        setSearch('');
      } 
    }

    return (
        
        <Grid container direction="row" justify="center" alignItems="center" className ={classes.searchGrid}>
             <ButtonGroup disableElevation variant="contained" className = {classes.region} color="default" ref={anchorRef} aria-label="split button">
            
            <Button style = {{backgroundColor: 'gray', color: 'white'}}  onClick={handleToggle}>
            {regions[selectedIndex]}<ArrowDropDownIcon />
            </Button>
            </ButtonGroup>
            
            <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList id="split-button-menu">
                    {regions.map((region, index) => (
                      <MenuItem
                        key={region}
                        
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                      >
                        {region}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>


        <div className = {classes.searchBarContainer}>
            <div className = {classes.searchInputContainer}>
                <input name = "Search" 
                label = "Search" 
                value = {searchText}
                onKeyDown = {handleKeyPress} 
                className = {classes.searchInput}
                onChange = {(e) => setSearch(e.target.value)}
                ></input>
                <IconButton onClick = {searchSummoner} >
                  <SearchIcon/>
                </IconButton>
            </div>
        </div>
        </Grid>
        
        
    )
}

export default SearchBar
