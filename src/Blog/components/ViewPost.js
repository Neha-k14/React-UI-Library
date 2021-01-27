import React, { Component } from 'react';
import Comments from './Comments';
import HeaderSection from './HeaderSection';

// images
//import postImage from "../assets/images/post-1.jpg";
//import profileImage from '../assets/images/profile-pic.jpg';
const postImage = 'https://firebasestorage.googleapis.com/v0/b/dugoly-a24b5.appspot.com/o/profile-photo%2F-MO5nm_jO0pcHl0nRg_f?alt=media&token=token';
const profileImage = 'https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583336/AAA/4.jpg';

// service
import Fns from "../services/api-service";

class ViewPost extends Component {

    constructor(props) {
        super(props);

        this.state = {
            postData: '',
            comments: '',
            commentText: '',
            replyText: '',
            replydivCSS: 'none',
            replyDivId: '',
            hideaddpost: false
        }
    }

    componentDidMount() {
        //  console.log('dladsf', this.props.location.state);
        this.setState({ postData: this.props.viewPostData });
        this.setState({ comments: this.props.viewPostData.comments })

    }

    // change comment text
    handleCommentText = (event) => {
        this.setState({ commentText: event.target.value });
    }

    // reply comment text
    handleReplyCommentText = (event) => {
        this.setState({ replyText: event.target.value });
    }

    //reply comment
    replyComment(maincommentId, innercommentId) {
        let postId = this.props.viewPostId;
        // console.log('main  ', maincommentId);
        // console.log('jjksdkfjv');
        // console.log('inner  ', innercommentId);

        //console.log(Object.keys(this.state.comments));

        // if (maincommentId in this.state.comments) {

        // }


        // Object.keys(this.state.comments[maincommentId]).forEach(function (key, index) {

        // })

        // console.log('main', maincommentId);

        // console.log('comments', this.state.comments);
        let commentRes = Fns.addComment(postId, [maincommentId, innercommentId], this.state.replyText);
        commentRes.then(data => console.log('replied to comment ', data));
    };

    //toggle Comment Div

    toggleCommentDiv = (event) => {
        const id = event.target.dataset.id;
        this.setState({ replyDivId: id });

    };

    // add comment for a blog
    addComment = () => {
        console.log('adding comment', this.state.commentText);
        let postId = this.props.viewPostId;

        let commentRes = Fns.addComment(postId, [], this.state.commentText);
        commentRes.then(data => console.log('add comment res', data));
    }

    // hide post 
    hideAddPost = () => {
        console.log('clicked');
        this.setState({ hideaddpost: true });
    }

    render() {
        let post = this.state.postData;
        //   let comments = this.state.comments || {};

        return (<div>
            {this.state.hideaddpost ? <HeaderSection /> : <div className="main">

                <section className="review_aritcle_section pt-3 pb-3">
                    <div className="container">
                        {/* hadding-top */}
                        <div className="row">

                            <div className="col-md-12">
                                <p className="unique_color mt-2 mb-0"><i className="fas fa-angle-left mr-2" onClick={this.hideAddPost} ></i>Back</p>
                                <h2 className="text-center">{post.title}</h2>
                                <hr className="unique-bg" />
                            </div>
                        </div>
                        {/* airtcle-information-header */}
                        <div className="row text-center text-md-left">
                            <div className="col-md-10">
                                <p className="mt-2 mb-0 text-uppercase text-truncate small d-md-inline">November 26, 2020</p>
                                <button className="btn unique-dark text-white ml-md-4 btn-sm mr-md-4" type=""><i className="fas fa-share-alt"></i> | Share</button>
                                <a className="btn btn-sm unique-bg text-white rounded-circle size_equel mr-md-4" href="/#"><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-sm unique-bg text-white rounded-circle size_equel mr-md-4" href="/#"><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-sm unique-bg text-white rounded-circle size_equel mr-md-4" href="/#"><i className="fab fa-instagram"></i></a>
                                <a className="btn btn-sm unique-bg text-white rounded-circle size_equel" href="/#"><i className="fab fa-pinterest-p"></i></a>
                            </div>
                            <div className="col-md-2 text-md-right">
                                <p className="mt-2 mb-0 text-uppercase text-truncate small d-inline">By Omer</p>
                            </div>
                        </div>
                        {/* airtcle-image */}
                        <div className="row mt-4 mb-2 text-center">
                            <div className="col-md-12">
                                <img className="img-fluid" src={this.state.postData.imgUrl || postImage} alt="airtcle" />

                                {/* airtcle summeary */}
                                <p className="font-italic text-uppercase mt-2 mb-0 pl-lg-5 pr-lg-5 font-weight-normal">
                                    <span className="unique_color">Summary: </span> {post.summary}
                                </p>
                            </div>
                        </div>
                        <hr className="unique-bg" />

                        <div className="row mt-4 mb-2">
                            {/* airtcle summeary */}
                            <div className="col-md-12">
                                <p className="mt-3 mb-0 pl-lg-5 pr-lg-5 font-weight-normal text-light-gray pr-lg-5 w-75">
                                    {post.text}
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="comment_section light_blue pt-3 pb-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-7">
                                <p className="mt-2 mb-0 mr-3 d-inline"><i className="fas fa-tags rotate90 mr-3"></i> Tags:</p>
                                <button type="button" className="btn-cus text-white btn-danger btn-sm">Blog</button>
                                <button type="button" className="btn-cus text-white btn-warning btn-sm">SEO</button>
                                <button type="button" className="btn-cus text-white btn-info btn-sm">Bing</button>
                                <button type="button" className="btn-cus text-white btn-primary btn-sm">Google</button>
                            </div>

                            <div className="col-md-5 text-center text-md-right">
                                <button className="btn unique-dark text-white ml-4 btn-sm mr-lg-4" type=""><i className="fas fa-share-alt"></i> | Share</button>
                                <a className="btn btn-sm unique-bg text-white rounded-circle size_equel mr-lg-4" href="/#"><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-sm unique-bg text-white rounded-circle size_equel mr-lg-4" href="/#"><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-sm unique-bg text-white rounded-circle size_equel mr-lg-4" href="/#"><i className="fab fa-instagram"></i></a>
                                <a className="btn btn-sm unique-bg text-white rounded-circle size_equel" href="/#"><i className="fab fa-pinterest-p"></i></a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="add_comment_section pt-3 pb-3">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                {/* <button type="button" className="btn btn-info b-radius-0 show-comment-btn" data-toggle="collapse" data-target="#showComment" aria-expanded="true" aria-controls="showComment">Show Comment</button> */}
                                <div className="add_comment">
                                    <h3 className="mt-2 mb-2">Comments</h3>
                                    <form action="">
                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label">
                                                <div className="text-center">
                                                    <img className="img-fluid profile-pic" src={profileImage} alt="User Comment profile pic" />
                                                    <div className="mt-1">
                                                        <h5 className="card-title">Selena</h5>
                                                    </div>
                                                </div>
                                            </label>
                                            <div className="col-sm-8 pt-2 text-right">
                                                <textarea className="form-control border-unique" rows="3" placeholder="Write Your Comment Here"
                                                    value={this.state.commentText} onChange={this.handleCommentText}></textarea>

                                                <button type="button" className="btn unique-bg mt-3" onClick={this.addComment}>Add Comment</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="">

                                    <div className="comment-widgets">
                                        {/* Comment Row */}
                                        <Comments commentsObj={this.props.viewPostData.comments} postId={this.props.viewPostId} />

                                        {/* Comment Row */}
                                    </div>
                                </div>

                                {/* load more comments */}
                                <div className="collapse mt-3" id="loadmore">

                                    <div className="comment-widgets">
                                        {/* Comment Row */}
                                        <div className="d-flex flex-row comment-row m-t-0 pl-md-5 ml-md-5">
                                            <div className="p-2 mr-2">
                                                <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583336/AAA/4.jpg" alt="user" width="50" className="b-radius" />
                                            </div>
                                            <div className="comment-text w-100">
                                                <div className="comment-footer mb-2">
                                                    <span className="mr-3">Selena</span>
                                                    <span className="text-muted mr-3">April 14, 2019</span>
                                                    <button type="button" className="btn btn-cyan btn-sm">Edit</button>
                                                </div>

                                                <p className="m-b-15 d-block font-medium">This is awesome website. I would love to comeback again. </p>

                                                <div className="col-sm-6 p-0 text-right">
                                                    <textarea className="form-control border-unique" rows="3" placeholder="Write Your Comment Here"
                                                        value={this.state.commentText} onChange={this.handleCommentText}></textarea>

                                                    <button type="button" className="btn text-white unique-bg mt-3" onClick={this.addComment}>Add Comment</button>
                                                </div>

                                                <div className="comment-footer">
                                                    <button type="button" className="btn-cus btn-info btn-sm mr-3">Reply</button>
                                                    <button type="button" className="btn-cus btn-danger btn-sm">Delete</button>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Comment Row */}
                                    </div>

                                </div>


                                <hr className="unique-dark" />

                                <div className="text-center">
                                    <button type="button" className="btn btn-success b-radius-0 show-comment-btn" data-toggle="collapse" data-target="#loadmore" aria-expanded="false" aria-controls="loadmore">Load More Comments</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div >
            }
        </div>


        );
    }

}

export default ViewPost;