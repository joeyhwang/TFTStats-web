import React, {useState} from 'react'
import Box from '@material-ui/core/Box';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useParams } from 'react-router-dom';
import useStyles from './styles';


const Region = ({history}) => {
    const classes = useStyles()

    const {region} = useParams();
    const [selected, setRegion] = useState(region.toUpperCase());
    const handleRegion = (event, newRegion) => {        
        setRegion(newRegion);
        history.push(`/leaderboards/${newRegion.toLowerCase()}/challenger`);
          
    };

    return(
        <Box textAlign='center' className = {classes.regionBox}>
            <ToggleButtonGroup
             value={selected}
             exclusive = {true}
             onChange={handleRegion}
             aria-label="text alignment"
             >
                <ToggleButton className = {classes.toggleButton} value="BR">BR</ToggleButton>
                <ToggleButton className = {classes.toggleButton} value="EUNE">EUNE</ToggleButton>
                <ToggleButton className = {classes.toggleButton} value="EUW">EUW</ToggleButton>
                <ToggleButton className = {classes.toggleButton} value="JP">JP</ToggleButton>
                <ToggleButton className = {classes.toggleButton} value="KR">KR</ToggleButton>
                <ToggleButton className = {classes.toggleButton} value="LAN">LAN</ToggleButton>
                <ToggleButton className = {classes.toggleButton} value="LAS">LAS</ToggleButton>
                <ToggleButton className = {classes.toggleButton} value="NA">NA</ToggleButton>
                <ToggleButton className = {classes.toggleButton} value="OCE">OCE</ToggleButton>
                <ToggleButton className = {classes.toggleButton} value="TR">TR</ToggleButton>
                <ToggleButton className = {classes.toggleButton} value="RU">RU</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}

export default Region