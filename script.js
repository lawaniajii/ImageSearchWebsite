const accesskey="m7LnpezmvVicloKPeMlz8FigDL_YZzQ5Tn9wS4pi0oA";

const FormEl=document.querySelector("form");
const InputEl = document.getElementById("search-input");
const SearchResultsEl = document.querySelector(".Search-Results");
const ShowMoreEl = document.getElementById("Show-more");

let inputData ="";
let page =1;

async function searchImages() {
    inputData = InputEl.value; 
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;
    const response=await fetch (url);
    const data = await response.json();
    const results = data.results;
    console.log(results);

    if (page ===1){
        SearchResultsEl.innerHTML ="";
         
    }
    results?.map((result) => {
        const ImageWrapper = document.createElement("div");
        ImageWrapper.classList.add("Search-Result");
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imagelink = document.createElement("a");
        imagelink.href =  result.links.html;
        imagelink.target = "_blank";
        imagelink.textContent = result.alt_description;

        ImageWrapper.appendChild(image);
        ImageWrapper.appendChild(imagelink);
        SearchResultsEl.appendChild(ImageWrapper);
    });
    page++;
    if(page > 1){
        ShowMoreEl.style.display = "block";
    }
}

FormEl.addEventListener("submit" ,(event) =>  {
    event.preventDefault();
    page = 1;
    searchImages();
})

ShowMoreEl.addEventListener("click" ,() =>  {
     searchImages();
})


