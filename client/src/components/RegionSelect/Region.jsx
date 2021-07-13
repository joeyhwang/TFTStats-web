import React, {useState, useEffect, setState} from 'react'
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import {useDispatch} from 'react-redux';
import {changeRegion} from '../../actions/leaderboards.js';
import { useHistory, useLocation } from 'react-router-dom';



const Region = () => {

    const dispatch = useDispatch();
    const history = useHistory();
    const [selected, setRegion] = useState('NA');
    const [postData, setPostData] = useState({region: ''})

    const handleRegion = (event, newRegion) => {
          setRegion(newRegion);
          dispatch((setPostData(changeRegion(postData))));
          if(selected != "NA")
          {
              history.push(`/leaderboards/${newRegion.toLowerCase()}`);
          }
          
    };
    /*
    useEffect(() => {
        //dispatch((setPostData(changeRegion(postData))));
         history.push(`/leaderboards/${selected.toLowerCase()}`);
      }, [selected]);
    */

    return(
        <Box textAlign='center'>
            <ToggleButtonGroup
             value={selected}
             exclusive = {true}
             onChange={handleRegion}
             aria-label="text alignment"
             >
                <ToggleButton value="BR">BR</ToggleButton>
                <ToggleButton value="EUNE">EUNE</ToggleButton>
                <ToggleButton value="EUW">EUW</ToggleButton>
                <ToggleButton value="JP">JP</ToggleButton>
                <ToggleButton value="KR">KR</ToggleButton>
                <ToggleButton value="LAN">LAN</ToggleButton>
                <ToggleButton value="LAS">LAS</ToggleButton>
                <ToggleButton value="NA">NA</ToggleButton>
                <ToggleButton value="OCE">OCE</ToggleButton>
                <ToggleButton value="TR">TR</ToggleButton>
                <ToggleButton value="RU">RU</ToggleButton>
            </ToggleButtonGroup>
        </Box>
    );
}

export default Region