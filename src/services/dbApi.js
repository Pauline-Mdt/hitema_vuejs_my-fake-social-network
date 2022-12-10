const URL_BASE = 'http://localhost:3004'

export async function checkUserPseudo(pseudo) {
    try {
        const response = await fetch(URL_BASE + '/users?pseudo=' + pseudo)
        return await response.json()
    } catch (e) {
        console.log(e)
    }
}

export async function checkUserEmail(email) {
    try {
        const response = await fetch(URL_BASE + '/users?email=' + email)
        return await response.json()
    } catch (e) {
        console.log(e)
    }
}

export async function checkUserEmailAndPassword(identifiers) {
    try {
        const response = await fetch(URL_BASE + '/users?email=' + identifiers.email + '&password=' + identifiers.password)
        return await response.json()
    } catch (e) {
        console.log(e)
    }
}

export async function addUser(user) {
    try {
        const response = await fetch(URL_BASE + '/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (e) {
        console.log(e)
    }
}

export async function updateUser(userId, user) {
    try {
        const response = await fetch(URL_BASE + '/users/' + userId, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        return await response.json()
    } catch (e) {
        console.log(e)
    }
}

export async function getAllPosts() {
    try {
        const response = await fetch(URL_BASE + '/posts?_sort=date&_order=desc')
        return await response.json()
    } catch (e) {
        console.log(e)
    }
}

export async function addPost(post) {
    try {
        console.log(JSON.stringify(post))
        const response = await fetch(URL_BASE + '/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        return await response.json()
    } catch (e) {
        console.log(e)
    }
}

export async function updatePost(post) {
    try {
        const response = await fetch(URL_BASE + '/posts/' + post.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(post)
        })
        return await response.json()
    } catch (e) {
        console.log(e)
    }
}

