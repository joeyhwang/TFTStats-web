import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

const router = express.Router();

dotenv.config();
const API_KEY = process.env.API_KEY;

export const getTierSummoners = async (req, res) => {

    let {tier,region} = req.params;
    console.log(`${region}`);
    let link = ''
    let {finalRegion} = findRegion(region);
    switch (tier) {
        case 'diamond': case 'platinum': case 'gold': case 'silver': case 'bronze': case 'iron':    
            link = encodeURI(`https://${finalRegion}.api.riotgames.com/tft/league/v1/entries/${tier.toUpperCase()}/I?page=1&api_key=${API_KEY}`);
            break;
        default:
            link = encodeURI(`https://${finalRegion}.api.riotgames.com/tft/league/v1/${tier}?api_key=${API_KEY}`);

    }
    console.log(link)
    fetch(link)
    .then(res => res.json())
    .then(json => {
           
            res.status(200).json({data: json});
            
        }    
    )
    .catch (err => {
        console.log(err);
        res.status(404).json({ message: error.message });
    });
}


function findRegion(region) {
    switch(region.toUpperCase()) {
        case "BR":
            region = "br1"
            break;
        case "EUW":
            region = "euw1"
            break;
        case "EUNE":
            region = "eun1"
            break;
        case "JP":
            region = "jp1"
            break;
        case "KR":
            region = "kr"
            break;
        case "LAN":
            region = "la1"
            break;
        case "LAS":
            region = "la2"
            break;
        case "NA":
            region = "na1"
            break;
        case "OCE":
            region = "oc1"
            break;
        case "TR":
            region = "tr1"
            break;
        case "RU":
            region = "ru"
            break;
        default:
            region = "na1"
            break;
    }
    var finalRegion = region;
    return {finalRegion};

}
