//! Image'e basıldığında sayfayı yeniliyor. 

const image = document.querySelector('.image');

image.addEventListener('click', function() {
    location.reload();
});

//* Sign up ile bilgileri localStorage'a kaydediyorum

const signUpButton = document.getElementById('signUpButton');

//* Sign-Up formunun submit olayını dinleme işlemini gerçekleştiriyorum.
document.getElementById('sign-up-form').addEventListener('submit', function(event) {
    event.preventDefault();

    //! DOM ile girilen değerleri alıyorum

    const name = document.getElementById('name').value;
    const surname = document.getElementById('surname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const rePassword = document.getElementById('re-password').value;

    //* Girilen şifreler aynı mı değilse hata ver!
    if (password !== rePassword) {
        alert('Passwords do not match! Please re-enter.');
        return;
    }

    //* LocalStorage'e kaydedeceğim kişinin nesnesini oluşturdum.
    const user = {
        name: name,
        surname: surname,
        email: email,
        password: password
    };

    //* Stringfy ile girilen kişiyi browsera kaydettim.
    localStorage.setItem('currentUser', JSON.stringify(user));

    alert('Sign-up successful 💫');
});

