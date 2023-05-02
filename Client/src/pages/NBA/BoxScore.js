import axios from 'axios';
import { formatDate } from '../../Scoreboard/functionalSB/formatDate';

const HTTPClient = axios.create({
    baseURL: 'http://data.nba.com',
});

const getBoxScore = ({
    year,
    month,
    day,
    gameID,
}) => HTTPClient({
    method: 'GET',
    url: `/data/5s/json/cms/noseason/game/${formatDate({ year, month, day })}/${gameID}/boxscore.json`,
}).then((res) => res.data);

export {
    getBoxScore
};