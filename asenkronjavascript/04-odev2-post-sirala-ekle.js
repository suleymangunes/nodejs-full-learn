// konsol ekrarninda post siralama
// yeni post olusturmma
// ve postlari siralayan program

let posts = [
    { title: 'post 1', author: 'author 1', date: '2018' },
    { title: 'post 2', author: 'author 2', date: '2019' },
    { title: 'post 3', author: 'author 3', date: '2020' },
    { title: 'post 4', author: 'author 4', date: '2021' },
]

let listPosts = () => {
    posts.map(post => {
        console.log(post.title, post.author, post.date)
    })
}

let addPosts = () => {
    let promiseAddPost = new Promise((resolve, reject) => {
        posts.push({ title: 'post 5', author: 'author 5', date: '2022' })
        resolve('Kitap eklendi')
    })

    return promiseAddPost
}

async function addListPosts() {
    try {
        let response = await addPosts()
        console.log(response)
        listPosts()
    } catch (error) {
        console.log('hata olustu')
    }
}

addListPosts()