function CariFilm() {
    $('#list-movie').html('');
    $.ajax({
        "url": "https://superheroapi.com/api/2853693571574862/search/"+$('#text-cari').val(),
        "type": "get",
        "dataType": "json"
        // "data": {
        //     "apikey": "eb557778",
        //     "s": 
        // }
        ,
        success: function (heroes) {
            if (heroes.response == "success") {
                film = heroes.results;
                $.each(film, function (i, data) {
                    $('#list-movie').append(`
                    <div class="col-md-4 mb-3">
                        <div class="card">
                            <img src="` + data.image.url + `" class="card-img-top" alt="...">
                            <div class="card-body">
                                <h5 class="card-title">` + data.name + `</h5> 
                                <h6 class="card-subtitle mb-2 text-muted">` + data.Year + `'.</h6>
                                <a href="#" class="card-link" data-toggle="modal" data-target="#exampleModal" data-id="` + data.imdbID + `">Detil Film</a>
                            </div>
                        </div>
                    </div>`);
                });

            } else {
                $('#list-movie').html(`
                <h3>` +
                    heroes.Error + `</h3>`);
            }
        }
    })

}


$('#btnCari').on('click', function () {
    CariFilm();
});

$('#text-cari').on('keyup', function (e) {
    if (e.keyCode == 13) {
        CariFilm();
    }
});

$('#list-movie').on('click', '.card-link', function () {
    $('#movie-detil').html('');
    $.ajax({
        "url": "http://www.omdbapi.com/",
        "type": "get",
        "dataType": "json",
        "data": {
            "apikey": "eb557778",
            "i": $(this).data('id')
        },
        success: function (movie) {
            if (movie.Response == "True") {
                $('#movie-detil').html(`
                    <div class="col-md-4">
                        <img src="` + movie.Poster + `" class="img-fluid" alt="Responsive image">
                    </div>
                    <div class="col-md-8">
                        <ul class="list-group">
                            <li class="list-group-item active">` + movie.Title + `</li>
                            <li class="list-group-item">Rilis: ` + movie.Released + `</li>
                            <li class="list-group-item">Bintang: ` + movie.Actors + `</li>
                            <li class="list-group-item">Sinopsis: ` + movie.Plot + `</li>
                        </ul>
                    </div>
                `)
            } else {
                alert('Terjadi kesalahan saat mengambil data');
            }
        }
    });

})