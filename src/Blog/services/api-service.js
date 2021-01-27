const baseUrl = 'https://dugoly.com';
const domain = 'dugoly.com';
const uid = '-MN3mJT-adMyJiaoPAnV';
const BCode = 'bhnjuuyy';

let myHeaders = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

const getAllPosts = async () => {
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    //make sure to serialize your JSON body
    body: JSON.stringify({
      domain, uid, BCode
    })
  };

  let res = await fetch(`${baseUrl}/api/getAllPosts`, requestOptions);
  return res.json();
};


const addPost = async (post) => {
  console.log('post data is ', post);
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    //make sure to serialize your JSON body
    body: JSON.stringify({
      domain, uid, BCode, post
    })
  }

  let res = await fetch(`${baseUrl}/api/addPost`, requestOptions);
  return res.json();

}

const updatePost = async (post, postId) => {
  console.log('post data is ', post, postId);
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    //make sure to serialize your JSON body
    body: JSON.stringify({
      domain, uid, BCode, post, postId
    })
  }

  let res = await fetch(`${baseUrl}/api/editPost`, requestOptions);
  return res.json();

}

const imageUpload = async (photo) => {
  console.log('photo', photo);
  let file = new FormData();
  file.append('file', photo);

  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    //make sure to serialize your JSON body
    body: JSON.stringify({
      domain, uid, BCode, file
    })
  }

  let res = await fetch(`${baseUrl}/upload`, requestOptions);
  console.log('last ', res);
  return res;
}

const editPost = async (post, postId) => {
  console.log('post data is ', post);
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    //make sure to serialize your JSON body
    body: JSON.stringify({
      domain, uid, BCode, post, postId
    })
  }

  let res = await fetch(`${baseUrl}/api/editBlog`, requestOptions);
  return res.json();
}

const addComment = async (postId, arrayOfCommentId, text) => {
  let senderId = uid;
  console.log('add comment');
  let requestOptions = {
    method: "POST",
    headers: myHeaders,
    //make sure to serialize your JSON body
    body: JSON.stringify({
      domain, uid, BCode, postId, arrayOfCommentId, senderId, text
    })
  }

  let res = await fetch(`${baseUrl}/api/addComment`, requestOptions);
  return res.json();
}

export default {
  getAllPosts, addPost, updatePost, imageUpload, editPost, addComment
}








