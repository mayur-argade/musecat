import React from 'react'
import './instagram.css'

const InstagramCard = ({ data }) => {
    return (
        <div class="feed">
            <section class="username">
                <div class="image">
                    <a href="https://www.instagram.com/kentury_/"><img src="https://i1.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1" /></a>
                </div>
                <div class="id">
                    <a href="https://www.instagram.com/kentury_/">kentury_</a>
                </div>
            </section>
            <section class="post">
                <img src="https://i0.wp.com/myadventuresacrosstheworld.com/wp-content/uploads/2018/03/rice-fields-bali-spa-1-e1522157798920.jpg?resize=1000%2C667&ssl=1" />
            </section>
            <section class="btn-group">
                <button type="button" class="btn-love"><i class="far fa-heart fa-lg"></i></button>
                <button type="button" class="btn-comment"><i class="far fa-comment fa-lg"></i></button>
                <button type="button" class="btn-share"><i class="fas fa-share fa-lg "></i></button>
                <button type="button" class="btn-bookmark"><i class="far fa-bookmark fa-lg"></i></button>
            </section>
            <section class="caption">
                <p class="like">20 likes</p>
                <p><b><a class="id" href="https://www.instagram.com/kentury_">kentury_</a></b> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam rutrum, purus ut consequat convallis, nulla nisl tincidunt nulla, sed pulvinar. </p>
                <p class="time">5 minute ago</p>
            </section>
        </div>
    )
}

export default InstagramCard