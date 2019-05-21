/* eslint-disable no-unused-vars */
const api = process.env.VUE_APP_API;

const getRecentPosts = async (count) => {
    const res = await fetch(`${api}/collections/get/posts`);
    const resBody = await res.json();
    return resBody.entries;
};

const getPostById = async (id) => {
    const res = await fetch(`${api}/collections/get/posts`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            filter: {_id: id}
        })
    });
    const resBody = await res.json();
    return resBody.entries[0];
};

export {getRecentPosts, getPostById};
