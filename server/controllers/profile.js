import express from 'express';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

const API_KEY = process.env.API_KEY;

export const getSummonerBySearch = async (req,res) => {

    var {region, name} = req.params;
    var puuid = "";
    var id = "";
    var profileJson = new Object();
    var count = 10;
    //remove blank spaces from name variable
    name = name.replace(/\s+/g, '');
    console.log(`get summoner by search region: ${region}, name: ${name}` )
    
    let {finalRegion, country} = findRegionAndCountry(region);
    
    //create profile link to fetch profile data from riot api
    const profileLink = encodeURI(`https://${finalRegion}.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}?api_key=${API_KEY}`); 
    console.log(profileLink);

    //fetch profile information and use puuid to find match history
    fetch(profileLink)
    .then(res2 => res2.json())
    .then(json => 
        {
            puuid = json['puuid'];
            id = json['id'];
            profileJson = json;
            //get summoner match ids
            return fetch(encodeURI(`https://${country}.api.riotgames.com/tft/match/v1/matches/by-puuid/${puuid}/ids?count=${count}&api_key=${API_KEY}`));
            
        }
    ).then(matchResponse => matchResponse.json())
    .then (matchJson => 
        {
        console.log(matchJson);
        profileJson = {...profileJson, matchJson};
        //get summoner details (rank, wins, losses)
        return fetch(encodeURI(`https://${finalRegion}.api.riotgames.com/tft/league/v1/entries/by-summoner/${id}?api_key=${API_KEY}`));
        }
    ).then(summonerDetailsResp => summonerDetailsResp.json())
    .then (summonerDetailsJson => 
        {
            //return combined json of all 3 calls to front-end
            profileJson = {profileJson, summonerDetailsJson};
            res.status(200).json({data: profileJson});
        }
    ).catch(err => {
        console.log(err);
        res.status(404).json({message: err.message});
    });
}


export const getMatchDetails = async (req,res) => {

    var {region, match} = req.params;

    console.log(`getting match by match id ${match}`);

    //find region and country
    let {finalRegion, country} = findRegionAndCountry(region);
    
    //call riot api to fetch match details
    const matchLink = encodeURI(`https://${country}.api.riotgames.com/tft/match/v1/matches/${match}?api_key=${API_KEY}`);
    console.log(matchLink);

    fetch(matchLink)
    .then(res => res.json())
    .then(matchJson => 
        {            
            console.log(matchJson);
            //return match details in json format to front-end
            res.status(200).json({data: matchJson});
        }
    )
    .catch(err => {
        console.log(err);
        res.status(404).json({message: err.message});
    });

}


function findRegionAndCountry(region) {
    //converts parameter region to a specific region and country that riot api uses
    var country = "";
    switch (region) {
        case "br":
            region = "br1";
            country = "americas";
            break;
        case "euw":
            region = "euw1";
            country = "europe";
            break;
        case "eune":
            region = "eun1";
            country = "europe";
            break;
        case "jp":
            region = "jp1";
            country = "asia";
            break;
        case "kr":
            region = "kr";
            country = "asia";
            break;
        case "lan":
            region = "la1";
            country = "americas";
            break;
        case "las":
            region = "la2";
            country = "americas";
            break;
        case "na":
            region = "na1";
            country = "americas";
            break;
        case "oce":
            region = "oc1";
            country = "americas";
            break;
        case "tr":
            region = "tr1";
            country = "europe";
            break;
        case "ru":
            region = "ru";
            country = "europe";
            break;
        default:
            region = "na1";
            country = "americas";
    }
    var finalRegion = region;
    return {finalRegion,country};
}