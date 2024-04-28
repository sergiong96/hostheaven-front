import './_ReviewsHome.scss';

function ReviewsHome() {
    return (
        <section id="home-reviews-container">
            <article id="trust-container" className='review-box'>
                <h3>TrustPilot</h3>
                <div id="starsTrust">
                    <span>
                        <i className="fa-regular fa-star"></i>
                    </span>
                    <span>
                        <i className="fa-regular fa-star"></i>
                    </span>
                    <span>
                        <i className="fa-regular fa-star"></i>
                    </span>
                    <span>
                        <i className="fa-regular fa-star"></i>
                    </span>
                    <span>
                        <i className="fa-regular fa-star"></i>
                    </span>

                </div>
                <p>TrustScore 4.7 &nbsp;| &nbsp;342 Reviews</p>
            </article>
            <article id='capt-container' className='review-box'>
                <div id="starsCapt">
                    <h3>Capterra</h3>
                    <div>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star-half-stroke"></i>
                    </div>
                </div>
                <p>4.5</p>
            </article>
        </section>
    )
}



export default ReviewsHome;