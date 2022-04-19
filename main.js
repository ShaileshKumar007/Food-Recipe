const searchBtn = document.getElementById('search-btn-content');
const searchInp = document.getElementById('content');
const mealList = document.getElementById('meal');
const mealDetailContent = document.querySelector('.food-detail-content');
const reciepeCloseBtn = document.getElementById('close-receipe-btn');


// Adding event listeners
searchBtn.addEventListener('click', searchFood);

mealList.addEventListener('click', (e) => {
    e.preventDefault();
    if(e.target.classList.contains('get-reciepe')){
        let item = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item.dataset.id}`).then(res => res.json()).then(data => foodReciepe(data.meals));
    }
});

searchInp.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        let searchInp = document.getElementById('content').value.trim();
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInp}`).then(res => res.json()).then(data => {
            let html = "";
            if(data.meals){
                data.meals.forEach(meal => {
                html += `
                        <div class="meal-card" data-id = "${meal.idMeal}">
                            <div class="meal-pic">
                                <img src="${meal.strMealThumb}" alt="food">
                            </div>
                            <div class="meal-name">
                                <h3>${meal.strMeal}</h3>
                                <a href="#" class="get-reciepe">Reciepe</a>
                            </div>
                        </div>
                        `;
                })
                mealList.classList.remove("sorryResponse");
            }
            else{
                html+= "Sorry. Unable to find your food"
                mealList.classList.add("sorryResponse");
            }
            mealList.innerHTML = html;
        })
    }
});

reciepeCloseBtn.addEventListener('click', () => {
    mealDetailContent.parentElement.classList.remove('showtheDetails');
});



// function to search food with mouse
function searchFood(){
    let searchInp = document.getElementById('content').value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInp}`).then(res => res.json()).then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
               html += `
                    <div class="meal-card" data-id = "${meal.idMeal}">
                        <div class="meal-pic">
                            <img src="${meal.strMealThumb}" alt="food">
                        </div>
                        <div class="meal-name">
                            <h3>${meal.strMeal}</h3>
                            <a href="#" class="get-reciepe">Reciepe</a>
                        </div>
                    </div>
                    `;
            })
            mealList.classList.remove("sorryResponse");
        }
        else{
            html+= "Sorry. Unable to find your food"
            mealList.classList.add("sorryResponse");
        }
        mealList.innerHTML = html;
    })
}


// helper function for fetch in fullReciepe(e)
function foodReciepe(food){
    food = food[0];
    let html = `
            <h2 class="food-title">${food.strMeal}</h2>
            <p class="category">${food.strCategory}</p>
            <div class="instructions">
                <h3>instructions:</h3>
                <p>${food.strInstructions}</p>
            </div>
            <div class="food-img">
                <img src="${food.strMealThumb}" alt="food">
            </div>
            <div class="receipe-link">
                <a href="${food.strYoutube}" target="_blank">Watch Video</a>
        </div>
    `;
    mealDetailContent.innerHTML = html;
    mealDetailContent.parentElement.classList.add('showtheDetails');
}
