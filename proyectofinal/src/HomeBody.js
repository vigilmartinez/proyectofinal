const HomeBody = ({ username, isLoggedIn }) => {
    if (isLoggedIn) {
        return (
            <div className="Home">
                <h1>Home Body</h1>
                <p>Henlo {username.username}</p>
            </div>
        )
    } else {
        return (
            <div className="Home">
                <h1>Home Body</h1>
            </div>

        )
    }

}

export default HomeBody