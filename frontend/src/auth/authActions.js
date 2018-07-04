import { toastr } from 'react-redux-toastr'
import axios from 'axios'
import consts from '../consts'

export function login(values) {
    return submit(values, `${consts.OAPI_URL}/login`)
}

export function signup(values) {
    return submit(values, `${consts.OAPI_URL}/signup`)
}

function submit(values, url) {
    return dispatch => {
        axios.post(url, values)
            .then(resp => {
                dispatch([
                    {type: 'USER_FETCHED', payload: resp.data }
                ])
            })
            .catch(function (error) {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log('--response--')
                    console.log(error.response.data);
                    console.log(error.response.status);
                    console.log(error.response.headers);
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    console.log('--request--')
                    console.log(error.request);                    
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('--Error--')
                    console.log('Error', error.message);
                }
                console.log('--config--')
                console.log(error.config)
            })
            /*
            .catch(erroreX => {
                console.log('deu cagada')
                erroreX.response.data.errors.forEach(
                    error => toastr.error('Erro', error))
                    
            })
            */
    }
}

export function logout() {
    return { type: 'TOKEN_VALIDATED', payload: false}
}

export function validateToken(token) {
    return dispatch => {
        if(token) {
            axios.post(`${consts.OAPI_URL}/validateToken`, {token})
                .then(resp => {
                    dispatch({type: 'TOKEN_VALIDATED', payload: resp.data.valid })
                })
                .catch(e => dispatch({type: 'TOKEN_VALIDATED', payload: false }))
        } else {
            dispatch({type: 'TOKEN_VALIDATED', payload: false })
        }
    }
}