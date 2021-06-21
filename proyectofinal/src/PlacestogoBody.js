import "./Placestogo.css";

const PlacestogoBody = (places) => {
    const showPlaces = places.places.map((place) => {
        return (
            <div>
                <div>
                    <h2>{place.placeTitle}</h2>
                    <p>{place.placeDescription}</p>
                    <img src={place.placeImg} alt="" />
                </div>
                <div>
                <iframe
                title={place.placeTitle}
                src={place.placeCoords}
                width="400"
                height="300"
                allowfullscreen=""
                loading="lazy">
                </iframe>
                </div>
            </div >
        )
    })

    return (
        <div className="Places">
                {showPlaces}
        </div>
    )
}

export default PlacestogoBody