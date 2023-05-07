
const loginM = () => {
    const data = {
        "email": document.getElementById('emailM').value,
        "password": document.getElementById('passM').value
    }

    fetch('http://localhost:3050/motoristas/login' , {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if(response.ok) {
            return response.text();
        } else {
            throw new Error('Error de autenticación');
        }
    })
    .then(response => {
        window.localStorage.setItem('idMotorista', response);
        window.location.href = 'motoristas.html';
    })
    .catch(error => {
        console.log(error);
    })
}