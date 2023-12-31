//! Image'e basıldığında sayfayı yeniliyor. 

const image = document.querySelector('.image');

image.addEventListener('click', function() {
    location.reload();
});


document.getElementById('signInForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('currentUser'));

    const enteredEmail = document.getElementById('email').value;
    const enteredPassword = document.getElementById('password').value;

    if (storedUser && enteredEmail === storedUser.email && enteredPassword === storedUser.password) {
        alert('Login Successful💫'); 
        window.location.href = 'Main.html'; 
    } else {
        alert('Invalid credentials! Please try again.'); 
    }
});


const router = document.getElementById('up');

router.addEventListener('click', function() {
    window.location.href = 'Sign-up.html';
});


