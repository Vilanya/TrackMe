$('#navbar').load('navbar.html');
$('#footer').load('footer.html');

const API_URL = 'http://localhost:5000/api';

$.get(`${API_URL}/devices`) 
.then(response => {
    response.forEach(device => { 
        $('#devices tbody').append(`
            <tr> 
                <td>${device.user}</td> 
                <td>${device.name}</td>
            </tr>`
        ); 
    });
})
.catch(error => {
    console.error(`Error: ${error}`); 
});

// const response = $.get('http://localhost:3001/devices'); 
// console.log(response);

//const devices = JSON.parse(localStorage.getItem('devices')) || [];

// devices.forEach(function(device) { 
//     $('#devices tbody').append(`
//         <tr> 
//             <td>${device.user}</td> 
//             <td>${device.name}</td>
//         </tr>`
//     );
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

// $('#add-device').on('click', function() { 
//     const user = $('#user').val();
//     const name = $('#name').val(); 
//     devices.push({ user, name }); 
//     localStorage.setItem('devices', JSON.stringify(devices));
//     location.href = '/';
// });

$('#send-command').on('click', function() { 
    const command = $('#command').val(); 
    console.log(`command is: ${command}`);
});

$('#register').on('click', () => { 
    const username = $('#user').val(); 
    const password = $('#password').val(); 
    const confirm = $('#confirm').val(); 
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.find(user => user.name === username);

    if (exists)
    {
        alert("This username already exists.");
    }
    else if (password != confirm)
    {
        alert("The passwords do not match.");
    }
    else
    {
        users.push({name: username, password});
        localStorage.setItem('users', JSON.stringify(users));
        location.href = '/login';
    }
});  

$('#login').on('click', () => { 
    const username = $('#username').val(); 
    const password = $('#password').val(); 
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.find(user => user.name === username);
    const match = users.find(user => user.password === password);

    if (exists && match)
    {
        localStorage.setItem('isAuthenticated', true);
        location.href = '/';
    }
    else
    {
        alert("The username or password is incorrect. Please check and try again.");
    }
});  

const logout = () => { 
    localStorage.removeItem('isAuthenticated'); 
    location.href = '/login';
}