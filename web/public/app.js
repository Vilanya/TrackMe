$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

//const { response } = require("express");

const API_URL = 'https://api-pied.vercel.app/api'; //'http://localhost:5000/api';

const currentUser = localStorage.getItem('user');

if (currentUser) { 
    $.get(`${API_URL}/users/${currentUser}/devices`) 
    .then(response => {
        response.forEach((device) => { 
            $('#devices tbody').append(`
                <tr data-device-id=${device._id}> 
                    <td>${device.user}</td> 
                    <td>${device.name}</td>
                </tr>` 
            );
        }); 
        $('#devices tbody tr').on('click', (e) => {
            const deviceId = e.currentTarget.getAttribute('data-device-id'); 
            $.get(`${API_URL}/devices/${deviceId}/device-history`) 
            .then(response => {
                //console.log(response); 
                response.map(sensorData => { 
                    $('#historyContent').append(`
                        <tr>
                            <td>${sensorData.ts}</td> 
                            <td>${sensorData.temp}</td> 
                            <td>${sensorData.loc.lat}</td> 
                            <td>${sensorData.loc.lon}</td>
                        </tr> `
                    );
                });
                $('#historyModal').modal('show');
            });
        });
    })
    .catch(error => { 
        console.error(`Error: ${error}`);
    }); 
} else {
    const path = window.location.pathname;
    if (path !== '/login' && path !== '/registration') {
        location.href = '/login'; 
    }
}

const devices = JSON.parse (localStorage.getItem('devices')) || [];

// $.get(`${API_URL}/devices`) 
// .then(response => {
//     response.forEach(device => { 
//         $('#devices tbody').append(`
//             <tr> 
//                 <td>${device.user}</td> 
//                 <td>${device.name}</td>
//             </tr>`
//         ); 
//     });
// })
// .catch(error => {
//     console.error(`Error: ${error}`); 
// });

$('#add-device').on('click', () => { 
    const name = $('#name').val(); 
    const user = $('#user').val(); 
    const sensorData = [];
  
    const body = {
        name,
        user,
        sensorData
    };

    $.post(`${API_URL}/devices`, body) 
    .then(response => {
        location.href = '/'; 
    })
    .catch(error => { console.error(`Error: ${error}`);
    }); 
});

$('#send-command').on('click', function() { 
    const command = $('#command').val(); 
    console.log(`command is: ${command}`);
});

$('#register').on('click', () => {
    const user = $('#user').val();
    const password = $('#password').val(); 
    const confirm = $('#confirm').val();
    if (password != confirm){
        $('#message').append(`<p class="alert alert-danger">'Passwords do not match'</p>`); 
    } else {
        $.post(`${API_URL}/registration`, { user, password }) 
        .then((response) => {
            if (response.success) {
                location.href = '/login';
            } else {
                $('#message').append(`<p class="alert alert-danger">${response}</p>`); 
            }
        });
    }
});

$('#login').on('click', () => {
    const user = $('#username').val();
    const password = $('#password').val(); 
    $.post(`${API_URL}/authenticate`, { user, password }) 
    .then((response) =>{
        console.log("response");
        console.log(response);
        if (response.success) {
            localStorage.setItem('user', user); 
            localStorage.setItem('isAdmin', response.isAdmin); 
            localStorage.setItem('isAuthenticated',true);
            location.href = '/';
        } else {
            $('#message').append(`<p class="alert alert-danger">${response}</p>`); 
        }
    }); 
});

const logout = () => { 
    localStorage.removeItem('user'); 
    location.href = '/login';
}


// $('#register').on('click', () => { 
//     const username = $('#user').val(); 
//     const password = $('#password').val(); 
//     const confirm = $('#confirm').val(); 
//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     const exists = users.find(user => user.name === username);

//     if (exists)
//     {
//         alert("This username already exists.");
//     }
//     else if (password != confirm)
//     {
//         alert("The passwords do not match.");
//     }
//     else
//     {
//         users.push({name: username, password});
//         localStorage.setItem('users', JSON.stringify(users));
//         location.href = '/login';
//     }
// });  

// $('#register').on('click', () => {
//     const user = $('#user').val();
//     const password = $('#password').val(); 
//     const confirm = $('#confirm').val();
//     if (password != confirm){
//         // response = 'Passwords do not match';
//         $('#message').append(`<p class="alert alert-danger">${'Passwords do not match'}</p>`); 
//     }
//     $.post(`${API_URL}/registration`, { user, password, confirm}) 
//     .then((response) =>{
//         if (response.success) {
//             localStorage.setItem('user', user); 
//             localStorage.setItem('password', password);
//             localStorage.setItem('isAdmin', response.isAdmin); 
//             location.href = '/login';
//         } else {
//             $('#message').append(`<p class="alert alert-danger">${response}</p>`); 
//         }
//     }); 
// });

// $('#login').on('click', () => { 
//     const username = $('#username').val(); 
//     const password = $('#password').val(); 
//     const users = JSON.parse(localStorage.getItem('users')) || [];
//     const exists = users.find(user => user.name === username);
//     const match = users.find(user => user.password === password);

//     if (exists && match)
//     {
//         localStorage.setItem('isAuthenticated', true);
//         location.href = '/';
//     }
//     else
//     {
//         alert("The username or password is incorrect. Please check and try again.");
//     }
// });  