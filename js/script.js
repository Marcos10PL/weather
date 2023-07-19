$(document).ready(function() 
{
    const key = 'bd276e2c3c04cf592fda6a20a26c30c2';

    $(document).on('keypress', (e) => { (e.which == 13) && findUrl() });
    $('header button').click(() => findUrl());

    const findUrl = () =>
    {
        const city = $('header input').val();
        const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${city}&appid=${key}`;
        weather(url);
    }
    
    async function weather(url)
    {
        const response = await fetch(url);

        if(response.status == 404)
        {
            $('main > div').html('');
            $('.city').html("Błędna miejscowość");
        }
        else
        {
            const data = await response.json();
            const img = await $('<img >', {src : `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`});

            $('.city').html(data.name);
            $('.cloud').html(img);
            $('.temperature').html(`${Math.round(data.main.temp)}&#x2103;`);
            $('.temperature-felt').html(`Odczucie ${Math.round(data.main.feels_like)}&#x2103;`);
            $('.wind').html(`<i class="fa-solid fa-wind"></i> ${Math.round(data.wind.speed)} km/h`);
            $('.humidity').html(`<i class="fa-solid fa-droplet"></i> ${data.main.humidity} %`);
            $('.pressure').html(`<i class="fa-solid fa-globe"></i> ${data.main.pressure} hPa`);
        }
    }
});

