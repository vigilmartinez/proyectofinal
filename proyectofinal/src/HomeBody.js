const HomeBody = ({ username, isLoggedIn }) => {
    if (isLoggedIn) {
        return (
            <div>
                <h1>Home Body</h1>
                <p>Henlo</p>
            </div>
        )
    } else {
        return (
            <h1>Home Body</h1>
        )
    }

}

export default HomeBody