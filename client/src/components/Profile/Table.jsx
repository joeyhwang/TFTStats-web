import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@material-ui/core'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 13,
  },
  body: {
    fontSize: 12,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    backgroundColor: '#272727',
    
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    
  },
  champIcon: {
    height:'35px',
    width: '35px'
  },
});

export default function CustomizedTables(props) {
  const classes = useStyles();


  const championBorderColor = (rarity) => {
    switch (rarity) {
      case 0:
        return 'lightGray';
      case 1:
        return 'lightGreen';
      case 2:
        return 'aqua';
      case 3:
        return 'magenta';
      default:
        return 'gold';
    }
  }

  const sortObject = (dict) => {
    var items = Object.keys(dict).map((key) => {
      return [key, dict[key]];
    });
    
    items.sort((first, second) => {

      return second[1][1] - first[1][1];
    });
    
    return items
  }
  
  return (
    <div>
    <TableContainer  style = {{border: '2px solid gray' ,maxHeight :'715px', borderRadius: '2px'}}>
      <Table className={classes.table} stickyHeader aria-label="sticky table" >
        <TableHead>
          <TableRow>
            <StyledTableCell>Champ</StyledTableCell>
            <StyledTableCell >Games</StyledTableCell>
            <StyledTableCell >Place</StyledTableCell>
            <StyledTableCell >Top%</StyledTableCell>
            <StyledTableCell >Win%</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        
          {sortObject(props.dict).map((item,index) => (
            
            <StyledTableRow key={index}>
              <StyledTableCell component="th" scope="row">
                <img className = {classes.champIcon} alt = {item[0].substring(5)} src = {`/champions/${item[0]}.png`} 
                title = {`${item[0].substring(5)}`} style = {{border: `2px ${championBorderColor(item[1][0])} solid`}} />
              </StyledTableCell>
              <StyledTableCell style ={{color:'white'}}>{item[1][1]}</StyledTableCell>
              <StyledTableCell style ={{color:'white'}} >{Math.round(item[1][2] / item[1][1] *10)/10}</StyledTableCell>
              <StyledTableCell style ={{color:'white'}} >{Math.round((item[1][3] / item[1][1]) *100 ) }</StyledTableCell>
              <StyledTableCell style ={{color:'white'}}>{ Math.round((item[1][4] / item[1][1]) *100)  }</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      </div>
  );
}