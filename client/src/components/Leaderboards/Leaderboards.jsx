import React, {useState, useEffect} from 'react'
import {getLeaderboards} from '../../actions/leaderboards';
import { useDispatch, useSelector } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Table, TableBody,TableCell,TableContainer, TableHead,TableRow,Paper,TablePagination} from '@material-ui/core';
import Region from '../RegionSelect/Region'
import { useParams, Link, useHistory } from 'react-router-dom';
import { Container } from '@material-ui/core';

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
  //const [currRegion, setCurrRegion] = useState([]);
  const {region, tier} = useParams();
  const [page, setPage] = useState(0); // [current state, update func] = (default state)
  const [rowsPerPage] = useState(50);
  const {data} = useSelector((state) => state.leaderboards)
  const history = useHistory();
  const leaderboards = data ? data.entries : [] 
  const handleChangePage = (event, newPage) =>{
    setPage(newPage);
  };


  useEffect(() => {
    dispatch(getLeaderboards(region, tier))
  
  },[dispatch, region, tier]); //[] do something when region changes

  return (
     <div> 
     <Container>
     {data ? 
     <>
      <Region history = {history}></Region>
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
          {leaderboards.sort((a,b) => {
            return b.leaguePoints - a.leaguePoints
          })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((sumData, count) => {
              return (
              <StyledTableRow key = {sumData.summonerId} >
              <StyledTableCell align ="left">{count +1 + page*50}</StyledTableCell>
              <StyledTableCell align="left">
              <Link style = {{textDecoration: "none", color: "black"}} to = {`/profile/${region.toLowerCase()}/${sumData.summonerName}`}>{sumData.summonerName}</Link>
              </StyledTableCell>
              <StyledTableCell align="right">{data.tier}</StyledTableCell>
              <StyledTableCell align="right">{sumData.leaguePoints}</StyledTableCell>
              <StyledTableCell align="right">{(sumData.wins / (sumData.wins+sumData.losses) * 100).toFixed(2)}%</StyledTableCell>
              <StyledTableCell align="right">{sumData.wins+sumData.losses}</StyledTableCell>
              <StyledTableCell align="right">{sumData.wins}</StyledTableCell>
            </StyledTableRow>
            );
          })}
        </TableBody>
      </Table>
      <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count ={leaderboards.length}
          rowsPerPage={50}
          page={page}
          onChangePage={handleChangePage}
        />
    </TableContainer>
    </>
    : 
    <div>loading</div>}
    </Container>
    </div>
  )
}

export default Leaderboards

   

