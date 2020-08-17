document.getElementById('search').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput').value;
    const searchResult = document.querySelector('.search-result');

    fetch(`https://api.lyrics.ovh/suggest/${searchInput}`)
    .then(res => res.json())
    .then(data => {
        const element = data.data
        console.log(element);
        for(let i = 0; i< element.length; i++){
            if (i <= 9){
            const songName = element[i].title;
            const artist =element[i].artist.name;
            searchResult.innerHTML += ` <div class="single-result row align-items-center my-3 p-3">
            <div class="col-md-9">
                <h3 class="lyrics-name"> ${songName} </h3>
                <p class="author lead">Album by <span> ${artist} </span></p>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button class="btn btn-success">Get Lyrics</button>
            </div>
        </div>`;
        break;
            }
            
        }
    })
})