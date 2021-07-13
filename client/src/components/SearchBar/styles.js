import {makeStyles} from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    searchBarContainer: {
      display: "flex",
      flexDirection: "column",
      width: "36em",
      height: "3.8em",
      backgroundColor: "#fff",
      borderRadius: "6px",
      boxShadow: "0px 2px 12px 3px rgba(0, 0, 0, 0.14)",
    },
    searchInputContainer: {
        width: "100%",
        minHeight: "4em",
        display: "flex",    
        alignItems: "center",
        
        position: "relative",
        padding: "2px 15px", 
    },
    searchInput: {
        width: "100%",
        height: "90%",
        outline: "none",
        border: "none",
        fontSize: "1.5em",
        color: "#12112e",
        fontWeight: "500",
        
        backgroundColor: "transparent",
        
    },
    region: {
      height: "3.8em",
      boxShadow: "0px 2px 12px 3px rgba(0, 0, 0, 0.14)",
    }
    
  }));

  export default useStyles;