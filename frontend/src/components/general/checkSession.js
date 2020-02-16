import URL_DB from './config';


async function sessionIdChecker(setLoggedStatus, setUsername) {
    let SESSID = sessionStorage.getItem('sessid');
    const bodyData = {
        sessionID: SESSID,

    }
    // console.log(SESSID);
    let response;
    try {
        response = await fetch(URL_DB + 'api/sessionlogin', {
            method: "post",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(bodyData)
        });
        response = await response.json();
        //console.log(response);
        if (response.responseValue) {
            setLoggedStatus(true);
            setUsername(response.username);
        }
    }
    catch (err) {
        console.log(err);
    }
    
}


export default sessionIdChecker;