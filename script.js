
const inputText = document.querySelector('#inputText');
const addButton = document.querySelector('#addButton');
const list = document.querySelector('#list');
const main = document.querySelector('#input-btn-container')
const button = document.getElementById("info-button");
const descriptionContainer = document.querySelector(".description-container");
const closeInfo = document.getElementById("close-container");

const statsButton = document.getElementById("stats-button");
const statsContainer = document.querySelector(".stats-container");
const closeStats = document.getElementById("close-stats-container");


closeStats.addEventListener("click", function() {
    statsContainer.classList.toggle("active");
    if (descriptionContainer.classList.contains("active")) {
        descriptionContainer.classList.remove("active");
    }

});

statsButton.addEventListener("click", function() {
    statsContainer.classList.toggle("active");
    if (descriptionContainer.classList.contains("active")) {
        descriptionContainer.classList.remove("active");
    }
});

closeInfo.addEventListener("click", function() {
    descriptionContainer.classList.toggle("active");
    if (statsContainer.classList.contains("active")) {
        statsContainer.classList.remove("active");
    }
});

button.addEventListener("click", function() {
    descriptionContainer.classList.toggle("active");
    if (statsContainer.classList.contains("active")) {
        statsContainer.classList.remove("active");
    }
});

window.onload = function() {
    // Generate random color with 25% transparency for the add button
    function getRandomColor() {
        var letters = "0123456789ABCDEF";
        var color = "#";
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color + "40";
    }
    
    // Set the color of the add button
    document.getElementById("addButton").style.backgroundColor = getRandomColor();
};



// Show message when user has reached max character limit
inputText.addEventListener('input', function (event) {
    const newDiv = document.createElement("div");
    newDiv.id = "newDiv";
    newDiv.innerHTML = '<p>You\'ve reached the 10,000 character limit</p>';

    if (this.value.length === 10000) {
        main.prepend(newDiv);
    } else if (this.value.length < 10000) {
        const removedDiv = document.getElementById("newDiv");
        if (removedDiv) {
            removedDiv.remove();
        }
    }
});

addButton.addEventListener('click', addItem);
inputText.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        addItem();
    }
});


// ******************************************************************* //
// ******************************************************************* //
// ******************************************************************* //

let maxTimeDiff = 0;
let longestPost;
fetch('get-data.php')
.then(res => res.json())
.then(data => {
    // Iterate over the data and create a new li element for each row
    data.forEach(row => {
        
        const li = document.createElement('li');
        // Set the background color of the li element to the saved color
        li.style.backgroundColor = row.color;
        /// Create a new Date object from the addedAt timestamp
        const addedAt = row.time;

        // Calculate the number of days between the current date and the addedAt date
        const currentDate = Date.now();
        const timeDiff = currentDate - addedAt;

         // Check if this post has lasted longer than the previous ones
        if (timeDiff > maxTimeDiff) {
            maxTimeDiff = timeDiff;
            longestPost = row;
            saveLongestPost(longestPost,maxTimeDiff) 
        } else {
            getLongestPost();
        }
        const diffSeconds = Math.ceil(timeDiff / (1000));
        let diffMinutes = Math.ceil(diffSeconds / 60);
        let diffHours = Math.ceil(diffMinutes / 60);
       

        let postLength = "";

        if (diffSeconds <= 60) {
            postLength = `${diffSeconds}s`;
        } else if (diffMinutes <= 60) {
            postLengthSeconds = Math.floor(diffSeconds % 60);
            postLengthMinutes = Math.floor(diffMinutes);
            postLength = `${postLengthMinutes}m ${postLengthSeconds}s`;
        } else if (diffHours <= 24) {
            postLengthMinutes = Math.floor(diffMinutes % 60);
            postLengthHours = Math.floor(diffHours);
            postLength = `${postLengthHours}h ${postLengthMinutes}m`;
        } else {
            postLengthDays = Math.floor(diffHours / 24);
            postLengthHours = Math.floor(diffHours % 24);
            postLengthMinutes = Math.floor(diffMinutes % 60);
            postLength = `${postLengthDays}d ${postLengthHours}h ${postLengthMinutes}m`;
        }
        li.innerHTML = `<p class="content">${row.text}</p>`;

        // Create a new div element to wrap the timeSinceAdded and delete button
        const infoDiv = document.createElement('div');
        infoDiv.innerHTML = `<p class="time">${postLength}</p>`;

        // Create a new button element
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<svg class="trash" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 8v16h18v-16h-18zm5 12c0 .552-.448 1-1 1s-1-.448-1-1v-8c0-.552.448-1 1-1s1 .448 1 1v8zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-8c0-.552.448-1 1-1s1 .448 1 1v8zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-8c0-.552.448-1 1-1s1 .448 1 1v8zm4-15.375l-.409 1.958-19.591-4.099.409-1.958 5.528 1.099c.881.185 1.82-.742 2.004-1.625l5.204 1.086c-.184.882.307 2.107 1.189 2.291l5.666 1.248z"/></svg>';
        deleteButton.setAttribute('data-id', row.id);
        deleteButton.addEventListener('click', deleteItem);

        // Append the button to the div element
        infoDiv.appendChild(deleteButton);

        // Append the div element to the li element
        li.appendChild(infoDiv);
        // Insert the li element to the beginning of the ul
        list.appendChild(li);
    });
    if (maxTimeDiff === 0) {
        getLongestPost()
    }
});



function getLongestPost() {
    fetch('get-longest-post.php')
    .then(res => res.json())
    .then(data => {
        
        data.forEach(row => {
            updateLongestPost(row)
        })
        
    })
}

function saveLongestPost(longestPost, maxTimeDiff) {
    longestPost['timeDiff'] = maxTimeDiff
    fetch('save-to-stats.php', { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            }, 
        body: JSON.stringify(longestPost)
    })
    .then(res => res.text())
    .then((dataFromPHP) => {
        parsedData = JSON.parse(dataFromPHP);
        updateLongestPost(parsedData)
        
    })
}

function updateLongestPost(parsedData) {
    const statsText = document.getElementById('longest-post-text');
    const statsTime = document.getElementById('longest-post-time');
    const subtitle = document.getElementById('subtitle');

    const timeSeconds = Math.ceil(parsedData.time / (1000));
    let timeMinutes = Math.ceil(timeSeconds / 60);
    let timeHours = Math.ceil(timeMinutes / 60);

    let postLength = "";
    

    if (timeSeconds <= 60) {
        postLength = `${timeSeconds}s`;
    } else if (timeMinutes <= 60) {
        postLengthSeconds = Math.floor(timeSeconds % 60);
        postLengthMinutes = Math.floor(timeMinutes);
        postLength = `${postLengthMinutes}m ${postLengthSeconds}s`;
    } else if (timeHours <= 24) {
        postLengthMinutes = Math.floor(timeMinutes % 60);
        postLengthHours = Math.floor(timeHours);
        postLength = `${postLengthHours}h ${postLengthMinutes}m`;
    } else {
        postLengthDays = Math.floor(timeHours / 24);
        postLengthHours = Math.floor(timeHours % 24);
        postLengthMinutes = Math.floor(timeMinutes % 60);
        postLength = `${postLengthDays}d ${postLengthHours}h ${postLengthMinutes}m`;
    }

    statsText.innerHTML = `${parsedData.text}`;
    statsTime.innerHTML = `Lasted: ${postLength}`;
    subtitle.innerHTML = `Longest Post: <span class="front-page-time">${postLength}</span>`
    statsText.style.backgroundColor = parsedData.color;
}



function addItem() {
    if (inputText.value.trim().length === 0) {
        return;
    }

    const post = {
        time: Date.now(),
        text: inputText.value.replace(/\n/g, '\\n'),
        color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.25)`,
    } 

    fetch('save-to-database.php', { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            }, 
        body: JSON.stringify(post)
    })
    .then(res => res.text())
    .then((dataFromPHP) => {
        parsedData = JSON.parse(dataFromPHP);
        
        
        // Create a new li element
        const li = document.createElement('li');

        // Set the background color of the li element to the saved color
        li.style.backgroundColor = parsedData.color;

   
        /// Create a new Date object from the addedAt timestamp
        const addedAt = parsedData.time
        // Calculate the number of days between the current date and the addedAt date
        const currentDate = Date.now();
        const timeDiff = currentDate - addedAt;
        const diffSeconds = Math.ceil(timeDiff / (1000));

        let diffMinutes = Math.ceil(diffSeconds / 60);
        let diffHours = Math.ceil(diffMinutes / 60);
        let diffDays = Math.ceil(diffHours / 24);
        
        let timeSinceAdded = "";

        if (diffSeconds <= 60) {
            timeSinceAdded = `${diffSeconds}s`;
        } else if (diffMinutes <= 60) {
            timeSinceAdded = `${diffMinutes - 1}m`;
        } else if (diffHours <= 24) {
            timeSinceAdded = `${diffHours - 1}h`;
        } else {
            timeSinceAdded = `${diffDays - 1}d`;
        }

        li.innerHTML = `<p class="content">${parsedData.text}</p>`;

        // Create a new div element to wrap the timeSinceAdded and delete button
        const infoDiv = document.createElement('div');
        infoDiv.innerHTML = `<p class="time">${timeSinceAdded}</p>`;

        // Create a new button element
        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<svg class="trash" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 8v16h18v-16h-18zm5 12c0 .552-.448 1-1 1s-1-.448-1-1v-8c0-.552.448-1 1-1s1 .448 1 1v8zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-8c0-.552.448-1 1-1s1 .448 1 1v8zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-8c0-.552.448-1 1-1s1 .448 1 1v8zm4-15.375l-.409 1.958-19.591-4.099.409-1.958 5.528 1.099c.881.185 1.82-.742 2.004-1.625l5.204 1.086c-.184.882.307 2.107 1.189 2.291l5.666 1.248z"/></svg>';
        deleteButton.setAttribute('data-id', parsedData.id);
        deleteButton.addEventListener('click', deleteItem);

        // Append the button to the div element
        infoDiv.appendChild(deleteButton);

        // Append the div element to the li element
        li.appendChild(infoDiv);

        // Insert the li element to the beginning of the ul
        list.insertBefore(li, list.firstChild);
        inputText.value = '';
    })

}


function deleteItem(event) {
    const id = event.target.dataset.id;
    const deleteBtn = event.target.closest("button");
    const buttonId = deleteBtn.dataset.id;
    const listItem = event.target.closest("li");
    listItem.remove();

    // Add code here to delete the item from the database
    fetch('delete-from-database.php', { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            }, 
        body: JSON.stringify(buttonId)
    })
    .then(res => res.text())
}