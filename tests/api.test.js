const dotenv = require('dotenv'); 
const axios = require('axios'); 

dotenv.config();

const { API_URL } = process.env;

test('test device array', () => { 
    expect.assertions(1);
    return axios.get(`${API_URL}/devices`)
        .then(resp => resp.data) 
        .then(resp => {
            expect(resp[0].user).toEqual('alex'); 
        });
});

test('test user devices', () => { 
    expect.assertions(1);
    return axios.get(`${API_URL}/users/alex/devices`)
        .then(resp => resp.data) 
        .then(resp => {
            expect(resp[0].name).toEqual("Alex's iPhone"); 
        });
});

test('test device history', () => { 
    expect.assertions(1);
    return axios.get(`${API_URL}/devices/5f1c42b2f449e2284fe727e5/device-history`)
        .then(resp => resp.data) 
        .then(resp => {
            expect(resp[0].ts).toEqual("1529542230"); 
        });
});

test('test registration', async(done) => {
    newUser = {
        name: "test",
        password : "test123",
        isAdmin : "1"
    };
    let res = await axios.post(`${API_URL}/registration`, newUser)
        //console.log(res.data);
        expect(res.data).toBe('User already exists');
        done()
});

test('test authenticate', async(done) => {
    User = {
        user: "test",
        password : "test123"
        
    };
    let res = await axios.post(`${API_URL}/authenticate`, User)
        //console.log(res.data.message);
        expect(res.data.message).toBe('Authenticated successfully');
        done()
});