import axios from 'axios';
import { FETCH_JOBS, LIKE_JOB, CLEAR_LIKED_JOBS } from './types';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';

const JOB_QUERY_PARAMS = {
    publisher : '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript',
};

const buildJobsUrl = (zip) => {
    const query = qs.stringify({ ...JOB_QUERY_PARAMS, l:zip});
    return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async (dispatch) => {
    try{
        console.log('calling');
        let zip = await reverseGeocode(region);
        const url = buildJobsUrl(zip);
        console.log('URL:', url);
        let {data} = await axios.get(url);
        dispatch({type: FETCH_JOBS, payload: data});
        console.log('jobs data: ', data);
        callback();
    }
    catch (e){
        console.error('ERROR : ', e)
    }
};


export const likeJob = (job) => {
    return {
        type: LIKE_JOB,
        payload: job
    }
};


export const clearLikedJobs = () => {
    console.log('delete')
    return {
        type: CLEAR_LIKED_JOBS,
    }
};