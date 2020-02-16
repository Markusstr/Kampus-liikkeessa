import crypto from 'crypto';

function sessionIdAccess() {
    let SESSID = sessionStorage.getItem('sessid');
    //console.log(SESSID);

    if (SESSID !== null) {
        return SESSID;
    }
    else {
        const temp = crypto.randomBytes(16).toString('base64');
        const SESSID = crypto.createHash('sha512').update(temp).digest('hex')
        sessionStorage.setItem('sessid', SESSID);
        return SESSID;
    }
}

export default sessionIdAccess;
