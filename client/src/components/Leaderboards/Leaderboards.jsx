import React, {useState, useEffect} from 'react'
import {getChallengers, changeRegion} from '../../actions/leaderboards.js';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Region from '../RegionSelect/Region'
import { useParams } from 'react-router-dom';



const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


//row style
const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

//table style
const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});


const Leaderboards = () => 
{
  const classes = useStyles();
  //const history = useHistory();
  const dispatch = useDispatch();
  const [chall, setChall] = useState([]);
  //const [currRegion, setCurrRegion] = useState([]);
  const {newRegion} = useParams();
  const [page, setPage] = useState(0); // [current state, update func] = (default state)
  const [rowsPerPage, setRowsPerPage] = React.useState(50);
  
  const handleChangePage = (event, newPage) =>{
    setPage(newPage);
  };


  useEffect(() => {
    dispatch(getChallengers(newRegion)).then(res => {
      setChall(res.map((item, index) => Object.assign(item, { index })));
     
    }
  );
  },[newRegion]); //[] do something when region changes

  return (
     <div> 
      <Region></Region>
      <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="chall table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">Rank</StyledTableCell>
            <StyledTableCell align="left">Name</StyledTableCell>
            <StyledTableCell align="right">Tier</StyledTableCell>
            <StyledTableCell align="right">LP</StyledTableCell>
            <StyledTableCell align="right">WinRate</StyledTableCell>
            <StyledTableCell align="right">Played</StyledTableCell>
            <StyledTableCell align="right">Wins</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {chall
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((sumData, count) => {
              return (
              <StyledTableRow key = {sumData.id} >
              <StyledTableCell align ="left">{sumData.index + 1}</StyledTableCell>
              <StyledTableCell align="left">{sumData.summonerName}</StyledTableCell>
              <StyledTableCell align="right"> Challenger</StyledTableCell>
              <StyledTableCell align="right">{sumData.leaguePoints}</StyledTableCell>
              <StyledTableCell align="right">win rate</StyledTableCell>
              <StyledTableCell align="right">played</StyledTableCell>
              <StyledTableCell align="right">{sumData.wins}</StyledTableCell>
            </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count ={chall.length}
          rowsPerPage={50}
          page={page}
          onChangePage={handleChangePage}
        />
    </TableContainer>
    </div>
  )
}

export default Leaderboards

   

