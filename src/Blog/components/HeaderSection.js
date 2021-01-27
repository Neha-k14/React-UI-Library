import React, { Component, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import AddPost from './AddPost';
// images
//import postImage from "../assets/images/post-1.jpg";
const postImage = 'https://firebasestorage.googleapis.com/v0/b/dugoly-a24b5.appspot.com/o/profile-photo%2F-MO5nm_jO0pcHl0nRg_f?alt=media&token=token';
// api service
import Fns from "../services/api-service";
import ViewPost from './ViewPost';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: '',
            isLoaded: false,
            allPost: {},
            showaddpost: false,
            editPostData: {},
            postId: '',
            showviewPost: false,
            viewPostData: '',
            viewPostId: ''
        };
        this.showAddPost = this.showAddPost.bind(this);
        this.goback = this.showAddPost.bind(this);
        this.readMore = this.readMore.bind(this);
    }
    componentDidMount() {
        let res = Fns.getAllPosts();
        res.then(data => {
            console.log(data)
            this.setState({ allPost: data });
            console.log('all post', this.state.allPost);
        });
    }

    showAddPost = () => {
        this.setState({ showaddpost: true });
    }

    editPost = (postdata, postid) => {
        //console.log('postdata', postdata);
        // console.log('postid', postid);
        this.setState({ showaddpost: true });
        this.setState({ editPostData: postdata, postId: postid });
    }

    readMore = (postdata, postid) => {
        console.log('clicked');
        this.setState({ showaddpost: false });
        this.setState({ showviewPost: true });
        this.setState({ viewPostData: postdata });
        this.setState({ viewPostId: postid });

        // setTimeout(() => {
        //     console.log('showaddpost',this)
        // }, 2000);
    }

    render() {
        return <div className="main header">


            {this.state.showviewPost ? <div>
                <ViewPost viewPostData={this.state.viewPostData} viewPostId={this.state.viewPostId} />
            </div> : <div>
                    {(this.state.showaddpost) ?
                        <div>
                            <section className="add_post_section">
                                <AddPost editPostData={this.state.editPostData} postId={this.state.postId} />
                            </section>
                        </div> :
                        <div>
                            <section className="head_section">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <h3>Header Section</h3>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className="post_section">
                                <div className="container light_bg pt-3 pl-5 pr-5 pb-3">
                                    <div className="row">
                                        <div className="col-md-12 pt-1">
                                            <div className="btn_block">
                                                <button className="btn-cus b-radius btn-sm unique-bg text-white" type="" onClick={this.showAddPost}>Add Post</button>
                                                <hr className="unique-bg" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* one-post */}
                                    {Object.keys(this.state.allPost).map((postId, i) =>
                                        (<div key={i} className="row bg-white pt-2 pb-2 mt-3 ml-lg-4 mr-lg-4">
                                            {i % 2 !== 0 ? (<div className="col-md-3">
                                                <div className="post_img">
                                                    {/* <img className="img-fluid" src={postImage} alt="post-1" /> */}
                                                    <img src={this.state.allPost[postId].imgUrl || postImage} width="100%" height="120px" alt="blogimg" />
                                                </div>
                                            </div>) : ''}
                                            <div className="col-md-9 post_content">
                                                <h2>{this.state.allPost[postId].title}</h2>
                                                <p>{this.state.allPost[postId].text}</p>
                                                <div className="flex">
                                                    {/* <Link to={{ pathname: '/viewPost', state: { postData: this.state.allPost[postId], postId: postId } }}> */}
                                                    <button className="btn-cus btn-success btn-sm" type="" onClick={() => this.readMore(this.state.allPost[postId], postId)}>Read More</button>

                                                    <button className="btn-cus btn-danger btn-sm float-right" type="">Delete</button>

                                                    <button className="btn-cus btn-info btn-sm float-right mr-2" type="" onClick={() => this.editPost(this.state.allPost[postId], postId)}>Edit</button>

                                                </div>
                                            </div>
                                            {i % 2 === 0 ? (<div className="col-md-3">
                                                <div className="post_img">
                                                    {/* <img className="img-fluid" src={postImage} alt="post-1" /> */}
                                                    <img src={this.state.allPost[postId].imgUrl || postImage} width="100%" height="120px" alt="blogImg" />
                                                </div>
                                            </div>) : ''}
                                        </div>)
                                    )}

                                </div>
                            </section>

                        </div>
                    }
                </div>
            }


        </div>
    }
}
export default Header;


// const HeaderStyle = ({ ...props }) => (

// <div className="main header">
//     {/* <p>{showPost}</p> */}
//     <section className="head_section">
//         <div className="container">
//             <div className="row">
//                 <div className="col-md-12">
//                     <h3>Header Section</h3>
//                 </div>
//             </div>
//         </div>
//     </section>
//     <section className="post_section">
//         <div className="container light_bg pt-3 pl-5 pr-5 pb-3">
//             <div className="row">
//                 <div className="col-md-12 pt-1">
//                     <div className="btn_block">

//                         {/* <a href="/addPost"> */}
//                         <button className="btn-cus b-radius btn-sm unique-bg text-white" type="" onClick={showAddPost}>Add Post</button>
//                         {/* </a> */}


//                         {/* <Link to="/addPost">
//                                 Add Post
//                             </Link> */}


//                         {/* <Route> */}
//                         {/* <Link to="/addPost">
//                                 <button className="btn-cus b-radius btn-sm unique-bg text-white" type="">Add Post</button>
//                             </Link> */}

//                         {/* </Route> */}

//                         {/* <Router>
//                                 <Route exact path='/addPost' component={AddPost}>Add Post</Route>
//                             </Router> */}

//                         <hr className="unique-bg" />
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </section>
//     {/* {props.showPost ?
//         <section className="add_post_section">
//             <AddPost />
//         </section> :
//         ''} */}

// </div>
// );


// const Header = (props) => <HeaderStyle {...props} />;
// export default Header;
