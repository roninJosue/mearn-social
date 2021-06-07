const listNewsFeed = async(params, credentials, signal) => {
    try {
        let response = await fetch(`/api/posts/feed/${params.userId}`, {
            method: 'GET',
            signal: signal,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${credentials.t}`
            }
        })

        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

const listByUser = async (params, credentials) => {
    try {
        let response = await fetch(`/api/post/by/${params.userId}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${credentials.t}`
            }
        })
        return await response.json()
    } catch (err) {
        console.log(err)
    }
}

export {
    listNewsFeed,
    listByUser
}