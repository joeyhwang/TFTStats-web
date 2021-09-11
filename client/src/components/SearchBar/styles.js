import {makeStyles} from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
    searchGrid: {
      height: '50px',
    },
    searchBarContainer: {
      display: "flex",
      flexDirection: "column",
      width: "50%",
      backgroundColor: "#fff",
      borderRadius: "6px",
      boxShadow: "0px 2px 12px 3px rgba(0, 0, 0, 0.14)",
    },
    searchInputContainer: {
        width: "100%",
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
        fontSize: "22px",
        fontWeight: "500",
        backgroundColor: "white",
        
    },
    region: {
      boxShadow: "0px 2px 12px 3px rgba(0, 0, 0, 0.14)",
      height: '100%',
    }
    
  }));

  export default useStyles;