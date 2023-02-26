const loadPhone = async (searchText, dataLimit) => {
    const URL = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(URL);
    const data = await res.json();
    displayPhone(data.data, dataLimit);
};

const displayPhone = (phone, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerText = ' ';

    // display 6 phones only 
    const showAll = document.getElementById('show-all');
    if(dataLimit && phone.length > 6){
        phone = phone.slice(0, 6);
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }

    // display no phone found 
    const noPhone = document.getElementById('no-phone-found');
    if(phone.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }

    // display all phones 
    phone.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
                <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">This is a longer card with supporting text below as a natural lead-into additional content. This content is a little bit longer.</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal"           data-bs-target="#phoneDetaileModal">Details</button>
            </div>
        </div>
        `;

        phoneContainer.appendChild(phoneDiv);
    });

    // stope Loading...
    toggleSpinner(false);
};

// handle search button click 
document.getElementById('btn-search').addEventListener('click', function(){
    // start Loading... 
    searchProcess();
});

const searchProcess = (dataLimit) =>{
    // start Loading...
    toggleSpinner(true);

    const SearchField = document.getElementById('search-field');
    const searchText = SearchField.value;
    loadPhone(searchText, dataLimit);
}

// Loading Spinner...
const toggleSpinner = isLoading =>{
    const loadingSection = document.getElementById('loading');
    if(isLoading){
        loadingSection.classList.remove('d-none');
    }
    else{
        loadingSection.classList.add('d-none');
    }
};

// not thr best awy to load show all 
document.getElementById('show-all-procuct').addEventListener('click', function(){
    // start Loading...
    searchProcess();
});

// search input field enter key handler 
document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        searchProcess(6);
    }
});

const loadPhoneDetails = async id =>{
    const URL = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(URL);
    const data = await res.json();
    displayPhoneDetaile(data.data);
};

const displayPhoneDetaile = phone =>{
    console.log(phone.brand);
    const mobileTitle = document.getElementById('phoneDetaileModalLabel');
    mobileTitle.innerText = phone.name;

    const phoneDetailes = document.getElementById('phone-detailes');
    phoneDetailes.innerHTML= `
    <img src="${phone.image}">
    <h4><span class="text-primary">Brand: </span>${phone.brand}</h4>
    <p><span class="text-primary">Release Date:</span> ${phone.releaseDate ? phone.releaseDate : 'No Release Date Found..!'}</p>
    <p><span class="text-primary">Storage:</span> ${phone.mainFeatures ? phone.mainFeatures.storage : 'No Storage information'}</p>
    <p><span class="text-primary">Display Size:</span> ${phone.mainFeatures ? phone.mainFeatures.displaySize : 'No Display Size information'}</p>
    `;
};

loadPhone(oppo);