



// Event listener for input event on the password field
document.getElementById('YourPassword').addEventListener("input", function () {
    let strength = Strength(this.value);
    let container = document.querySelector(".container");
    if (strength <= 2) {
        container.classList.add("weak");
        container.classList.remove("moderate", "strong");
    } else if (strength >= 2 && strength <= 4) {
        container.classList.remove("weak", "strong");
        container.classList.add("moderate");
    } else {
        container.classList.remove("weak", "moderate");
        container.classList.add("strong");
    }
    UpdateTimeToCrack();
});


// Function to show/hide password
const showHidePassword = () => {
    let password = document.getElementById('YourPassword');
    let toggler = document.getElementById('toggler');
    if (password.type === 'password') {
        password.type = 'text';
        toggler.classList.add('fa-eye-slash');
    } else {
        toggler.classList.remove('fa-eye-slash');
        password.type = 'password';
    }
};

document.getElementById('toggler').addEventListener('click', showHidePassword);

// Function to display password tips
function displayPasswordTips() {
    // Create a container element for the tips
    let tipsContainer = document.createElement('div');
    tipsContainer.classList.add('password-tips-container');

    // Add the tips content
    tipsContainer.innerHTML = `
        <p>Password Tips:</p>
        <ul>
            <li>A password SHOULD include a combination of letters, numbers, and characters.</li>
            <li>A password SHOULD NOT be shared with any other account.</li>
            <li>DO NOT INCLUDE personal information(address,name,phone number...).</li>
            <li>A password SHOULD NOT contain any consecutive letters or numbers.</li>
            <li>AVOID common words or patterns.</li>
            <li>Consider using our PASSWORD GENERATOR.</li>



        </ul>
    `;

    // Position the container relative to the icon
    let iconPosition = document.getElementById('passwordTipsIcon').getBoundingClientRect();
    tipsContainer.style.top = iconPosition.top + iconPosition.height + 'px';
    tipsContainer.style.left = iconPosition.left + 'px';

    // Append the container to the document body
    document.body.appendChild(tipsContainer);

    // Event listener for mouseleave event on the container to remove it
    tipsContainer.addEventListener('mouseleave', function () {
        tipsContainer.remove();
    });
}

// Event listener for mouseenter event on the password tips icon
document.getElementById('passwordTipsIcon').addEventListener('mouseenter', displayPasswordTips);

// Event listener for mouseleave event on the password tips icon
document.getElementById('passwordTipsIcon').addEventListener('mouseleave', function () {
    let tipsContainer = document.querySelector('.password-tips-container');
    if (tipsContainer) {
        tipsContainer.remove();
    }
});




// Event listener for mouseleave event on the password tips container
document.addEventListener('mouseleave', function (event) {
    if (!event.relatedTarget || !event.relatedTarget.closest('.password-tips-container')) {
        let tipsContainer = document.querySelector('.password-tips-container');
        if (tipsContainer) {
            tipsContainer.remove();
        }
    }
});

// Event listener to submit the password form
document.getElementById('passwordForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Retrieve the password from the input field
    let password = document.getElementById('YourPassword').value;

    // Send the password data to the server for validation
    fetch('/add_password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'password': password,
            'strength': 'strong' // Set the strength to 'strong' for simplicity
        })
    })
        .then(response => {
            if (response.ok) {
                console.log('Password added successfully');
                // Optionally, perform any actions after successful password addition
            } else {
                console.error('Failed to add password');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
});
