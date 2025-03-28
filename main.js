
const API_KEY = '49581175-342234a142d831192302c8b53';
const API_URL = 'https://pixabay.com/api/';

const form = document.querySelector('.search-form');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

form.addEventListener('submit', async function (e) {
    e.preventDefault(); // Sayfanın yenilenmesini engeller

    const query = form.querySelector('input[name="query"]').value.trim(); // Arama terimi
    if (!query) return;

   
    loader.style.display = 'block';
    gallery.innerHTML = ''; 

    try {

        const response = await fetch(`${API_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`);
        const data = await response.json();

        if (data.hits.length > 0) {
            data.hits.forEach(item => {

                // Her bir görsel için bir kart oluştur
                const imgCard = document.createElement('a');
                imgCard.href = item.largeImageURL;
                imgCard.classList.add('gallery-item');
                imgCard.innerHTML = `
                    <img src="${item.webformatURL}" alt="${item.tags}" />
                    <div class="info">
                        <p>Likes: ${item.likes}</p>
                        <p>Views: ${item.views}</p>
                        <p>Comments: ${item.comments}</p>
                        <p>Downloads: ${item.downloads}</p>
                    </div>
                `;
                gallery.appendChild(imgCard);
            });

            const lightbox = new SimpleLightbox('.gallery a');
            lightbox.refresh();
        } else {
            iziToast.error({
                title: 'Error',
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight'
            });
        }
    } catch (error) {
        iziToast.error({
            title: 'Error',
            message: 'An error occurred. Please try again later.',
            position: 'topRight'
        });
    } finally {
        loader.style.display = 'none'; 
    }
});
