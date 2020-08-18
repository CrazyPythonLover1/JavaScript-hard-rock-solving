document.getElementById('search').addEventListener('click',searchMusic)


const searchInput = document.getElementById('searchInput');


searchInput.addEventListener('keypress', function(){
    if(event.keyCode === 13){
        searchMusic();
    }
})


function searchMusic(){

    const searchResult = document.querySelector('.search-result');
    searchResult.innerHTML = '';
    document.getElementById('lylicsDetail').innerHTML = '';

    const inputValue = searchInput.value;
    fetch(`https://api.lyrics.ovh/suggest/${inputValue}`)
    .then(res => res.json())
    .then(data => {
        storedData = data;
        const element = data.data
        console.log(element);
        for(let i = 0; i< element.length; i++){
            const songTitle = element[i].title;
            const artist =element[i].artist.name;
            const id = element[i].id;
            searchResult.innerHTML += ` <div class="single-result row align-items-center my-3 p-3">
                                            <div class="col-md-6">
                                                <h3 class="lyrics-name"> ${songTitle} </h3>
                                                <p class="author lead">Album by <span> ${artist} </span></p>
                                            </div>
                                            <div class="col-md-6 text-md-right text-center">
                                            <a href="#lylicsDetail"><button onClick="getDetail(${id})" class="btn btn-success">Get Details</button></a>
                                                <a href="#lylicsDetail"> <button onClick="getLyrics(${id})" class="btn btn-success">Get Lyrics</button> </a>
                                            </div>
                                        </div>`

        if (i == 9){
        break;
            }
            
        }
    })
}

function getDetail(id){
    for (let i = 0; i<10; i++){
        const data = storedData.data[i];
        if (data.id == id){
            const songID = data.id;
            const duration = data.duration;
            const hour = parseInt(duration/3600);
            const min = parseInt((duration%3600)/60);
            const sec = parseInt((duration%3600)%60);
            const songTitle = data.title;
            const artist = data.artist.name;
            const img = data.album.cover_medium;
            const download = data.link;
            const preview = data.preview;
            document.getElementById('lylicsDetail').innerHTML += `<div class="details">
                                                                <h2 class="text-success mb-4">Song Details</h2>
                                                                <img src="${img}" alt="">
                                                                <h3>Song ID: ${songID}</h3>
                                                                <h3>Song Title: ${songTitle}</>
                                                                <h3>Artist Name: ${artist}</h3>
                                                            </div>`
            if(hour == 0 && min == 0){
                document.getElementById('lylicsDetail').innerHTML += `<div class="details">
                                                                    <h3>Duration: ${sec} sec</h3>
                                                                </div>`
            }else if(hour == 0){
                document.getElementById('lylicsDetail').innerHTML += `<div class="details">
                                                                    <h3>Duration: ${min} min ${sec} sec</h3>
                                                                </div>`
            } else{
                document.getElementById('lylicsDetail').innerHTML += `<div class="details">
                                                                    <h3>Duration: ${hour} hour ${min} min ${sec} sec</h3>
                                                                </div>`
            }
            document.getElementById('lylicsDetail').innerHTML += `<div class="details">
                                                                        <h3><a target="_blank" href="${download}">Click for downloading</a></h3>
                                                                        <h3 class="preview"><a target="_blank" href="${preview}">Click for song preview</a></h3>
                                                                    </div>`

        }
    }
}


function getLyrics(id){
    for (let i = 0; i < 10; i++) {
        const data = storedData.data[i];
        if(data.id == id){
            const artistName = data.artist.name;
            const songTitle = data.title;
            fetch(`https://api.lyrics.ovh/v1/${artistName}/${songTitle}`)
            .then(res => res.json())
            .then(data => {
                let lyrics = data.lyrics;
                if(lyrics == undefined){
                    lyrics = `Song Lyrics Not Found. Try for another song`;
                }
                document.getElementById('lylicsDetail').innerHTML += `<div class="single-lyrics text-center">
                                                                            <button class="btn go-back">&lsaquo;</button>
                                                                            <h2 class="text-success mb-4">Song Lyrics</h2>
                                                                            <h5>${lyrics}</h5>
                                                                        </div>`
            })
        }
    }
    
}
