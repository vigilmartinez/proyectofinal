import "./Placestogo.css";

const PlacestogoBody = ({ places }) => {



    const showPlaces = places.map((place) => {
        return (
            <div className="Places">
                <div className="placesItem">
                    <h2>{place.placeTitle}</h2>
                    <p>{place.placeDescription}</p>
                    <img src={place.placeImg} alt="" className="placesImg"/>
                
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
        <div >
            {showPlaces}
        </div>
    )
}

export default PlacestogoBody