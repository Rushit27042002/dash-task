var loginData = localStorage.getItem("loginData");
if (!loginData) {
    location.replace("../index.html");
}
// Submit data to the localStorage
function submitForm() {
    // Retrieve form values
    let id = document.getElementById("id").value;
    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let email = document.getElementById("email").value;

    // Create new data object
    let newData = {
        id: id,
        name: name,
        age: age,
        email: email
    };

    // Retrieve existing data from localStorage, or initialize an empty array if there's no existing data
    let existingData = JSON.parse(localStorage.getItem("userData")) || [];

    // Check if data with the same id already exists
    let existingIndex = existingData.findIndex(item => item.id === id);

    if (existingIndex !== -1) {
        // Replace existing data with the new one
        existingData[existingIndex] = newData;
    } else {
        // Add the new data object to the array if it doesn't already exist
        existingData.push(newData);
    }

    // Store the updated array in localStorage
    localStorage.setItem("userData", JSON.stringify(existingData));
    alert("User data has been stored in localStorage");

    // Reset the form
    location.replace("dashboard.html")
    document.getElementById("dataForm").reset();
    showData();

}

// Show data into webpage
showData();

function showData(data) {
    let tableBody = document.getElementById("dataBody");
    tableBody.innerHTML = ''; // Clear previous data

    // Retrieve data array from localStorage if no data passed
    let existingData = data || JSON.parse(localStorage.getItem("userData")) || [];

    // Map over the array to create an array of table rows                
    let rows = existingData.map(data => {
        return `
            <br>
            <tr>
                <td>${data.id}</td>
                <td>${data.name}</td>
                <td>${data.age}</td>
                <td>${data.email}</td>
                <td>
                    <button onClick="editData('${data.id}')">Edit</button>
                    <button onclick="deleteRow('${data.id}')">Delete</button>
                </td>
            </tr>
        `;
    });
    // Join the array of rows and set the innerHTML of the table body
    tableBody.innerHTML = rows.join("");
}

// Function to delete a row
function deleteRow(id) {
    // Retrieve existing data from localStorage
    let existingData = JSON.parse(localStorage.getItem("userData")) || [];

    // Filter out the data with the specified ID
    let newData = existingData.filter(data => data.id !== id);

    // Store the updated array in localStorage
    localStorage.setItem("userData", JSON.stringify(newData));

    // Re-render the table
    showData();
}

// Function to delete all data
function deleteData() {
    localStorage.removeItem("userData"),
    document.getElementById("dataBody").innerHTML = ''; // Clear table data
}

// Function to sort data by age
function sortData() {
    let sortValue = document.getElementById("sortSelect").value;
    let existingData = JSON.parse(localStorage.getItem("userData")) || [];
    let sortedData = existingData.sort((a, b) => {
        if (sortValue === "asc") {
            return a.age - b.age;
        } else {
            return b.age - a.age;
        }
    });
    showData(sortedData);
}

// Function to search data
function searchData() {
    let searchValue = document.getElementById("searchInput").value.toLowerCase();
    let existingData = JSON.parse(localStorage.getItem("userData")) || [];
    let searchData = existingData.filter(data =>
        data.id.toLowerCase().includes(searchValue) ||
        data.name.toLowerCase().includes(searchValue) ||
        data.age.toString() === searchValue ||
        data.email.toLowerCase().includes(searchValue)
    );
    showData(searchData);
}

//logout function that  clears the local storage and redirects back to index.html page
function logout(){
    localStorage.removeItem("loginData");
    history.replaceState(null, null,"../index.html")
    location.replace("../index.html");
}

//editdata for edit existing records
function editData(id) {
    // Open the form for adding new data
    addNewData();

    // Retrieve existing data from localStorage
    let existingData = JSON.parse(localStorage.getItem("userData")) || [];

    // Find the data object with the specified ID
    let rowData = existingData.find(data => data.id === id);

    // Populate the form fields with the data of the selected row
    document.getElementById("id").value = rowData.id;
    document.getElementById("name").value = rowData.name;
    document.getElementById("age").value = rowData.age;
    document.getElementById("email").value = rowData.email;

    // Disable the ID input to make it uneditable
    document.getElementById("id").disabled = true;
}


//================================style scripts====================================

function addNewData() {
    let form = document.getElementById("add-data");
    form.style.display = "flex";
}
function cancelForm() {
    let form = document.getElementById("add-data");
    form.style.display = "none";
}