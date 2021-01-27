import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import HeaderSection from './HeaderSection';
// api service
import Fns from "../services/api-service";

// const AddPostStyle = ({ ...props }) => (
//     <div>
//         <p>AddPost</p>
//     </div>
// );

// const AddPost = (props) => <AddPostStyle {...props} />;
// export default AddPost;

class AddPost extends Component {

    constructor(props) {
        super(props);
        //  console.log('props', this.props.editPostData);
        this.state = {
            title: '',
            text: '',
            summary: '',
            imgUrl: '',
            update: false,
            hideaddpost: false,
            comments: '',
            postId: ''
        };
        this.hideAddPost = this.hideAddPost.bind(this);
    }

    componentDidMount() {
        //  console.log('this.state.update', this.state.update);

        if (Object.keys(this.props.editPostData).length !== 0) {
            this.setState({ update: true });

            let postData = this.props.editPostData;

            //     console.log('post data', postData, postId);

            if (postData) {
                this.setState({
                    title: postData.title,
                    text: postData.text,
                    summary: postData.summary,
                    imgUrl: postData.imgUrl,
                    comments: postData.comments
                })
            }
        }
    }

    // set text state
    handleTextChange = (event) => {
        this.setState({ text: event.target.value })
    }

    // set title state
    handleTitleChange = (event) => {
        this.setState({ title: event.target.value });
    }

    // set summary state
    handleSummaryChange = (event) => {
        this.setState({ summary: event.target.value });
    }

    // add an article or post
    publishPost = () => {
        let publishObj = {
            title: this.state.title,
            summary: this.state.summary,
            text: this.state.text,
            imgUrl: this.state.imgUrl
        }
        console.log('publish', publishObj);
        let addPostRes = Fns.addPost(publishObj);
        addPostRes.then(data => console.log('add Post res', data));
    }

    // update an article or post
    updatePost = () => {
        let publishObj = {
            title: this.state.title,
            summary: this.state.summary,
            text: this.state.text,
            imgUrl: this.state.imgUrl,
            comments: this.state.comments
        }

        let postId = this.props.postId;
        // console.log('update', publishObj);
        // console.log('postId', postId);

        let updatePostRes = Fns.updatePost(publishObj, postId);
        updatePostRes.then(data => {
            console.log('update Post res', data);
            if (data === 1001) {
                // this.props.history.push('/');
                this.setState({ hideaddpost: false });
            }
        });
    }

    // upload image
    imageUpload = (event) => {
        let file = event.target.files[0];
        let uploadRes = Fns.imageUpload(file);
        uploadRes.then(data => data.text()).then(data => {
            this.setState({ imgUrl: data })
            console.log('imgUrl', this.state.imgUrl);
        })
    }

    hideAddPost = () => {
        console.log('clicked');
        this.setState({ hideaddpost: true });
    }

    render() {
        return <div>
            {this.state.hideaddpost ?
                <HeaderSection /> : <div className="main">
                    <section className="add_aritcle_section pt-3 pb-3 shadow-sm">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 col-lg-6">
                                    <p className="unique_color mt-2 mb-0"><i className="fas fa-angle-left mr-2" onClick={this.hideAddPost}></i>{this.state.update === true ? 'Update Article' : 'Add Article'}</p>
                                </div>
                                <div className="col-md-8 col-lg-6 text-right">
                                    {this.state.update === true ?
                                        (<button className="btn btn_equal only-bg-color btn-primary mr-md-2 mr-lg-3 " type="button" onClick={this.updatePost}>Update</button>) :
                                        (<button className="btn btn_equal only-bg-color btn-primary mr-md-2 mr-lg-3 " type="button" onClick={this.publishPost}>Publish</button>)
                                    }
                                    {/* <Link to='/' >
                                <button className="btn btn_equal btn-outline-primary mr-md-2 mr-lg-3 " type="button">Cancel Post</button>
                            </Link> */}
                                    {this.state.update === false ? (<button className="btn btn_equal btn-danger" type="button">Delete Post</button>) : ''}
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="form_add_article pt-5">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-6 col-lg-8">
                                    <form className="aritcle_box" action="" method="">
                                        <div className="form-group">
                                            <input className="form-control b-radius-0 border-0" type="text" placeholder="Enter Blog Title Here"
                                                value={this.state.title} onChange={this.handleTitleChange} />
                                        </div>
                                        <div className="form-group">
                                            <input className="form-control b-radius-0 border-0" type="text" name="" placeholder="Blog Summary"
                                                value={this.state.summary} onChange={this.handleSummaryChange} />
                                        </div>
                                        {/* <div className="form-group">
                    <label className="filelabel">
                      <i className="fas fa-camera mr-md-3"></i>
                      <span className="title">Add Media</span>
                      <input className="FileUpload1" id="FileInput" name="booking_attachment" type="file" onChange={this.imageUpload} />
                    </label>
                  </div> */}
                                        <div className="form-group">
                                            {/* <img className="img-fluid" src={editorImage} alt="text editer" /> */}
                                            <textarea className="form-control" style={{ height: 'auto' }} rows="10" value={this.state.text}
                                                placeholder="Enter Text Here...." onChange={this.handleTextChange}></textarea>
                                        </div>
                                    </form>
                                </div>


                                {/* right-sidebar */}
                                <div className="col-md-6 col-lg-4">
                                    <p className="unique_color mt-2 mb-0">Display To</p>
                                    <form action="">
                                        <div className="input-group mt-3 user_select">
                                            <div className="input-group-prepend">
                                                <span className="pl-5 pr-5 input-group-text b-radius-0 bg-white border-0">All Users</span>
                                            </div>
                                            <select className="form-control b-radius-0 border-right-0 border-top-0 border-bottom-0 border-left">
                                                <option value="">line 1</option>
                                                <option value="">line 2</option>
                                                <option value="">line 3</option>
                                            </select>
                                        </div>

                                        <p className="unique_color mt-4 mb-3 mb-0">Insert Image</p>
                                        <div className="images_box mb-3">
                                            {/* <img className="img-fluid" src={this.state.imgUrl} onError={
                      () => this.img.src = blogImage
                    } alt="inserted one" />
                    <img className="img-fluid" src={blogImage} alt="inserted two" /> */}

                                            {this.state.imgUrl ? (<img className="img-fluid" src={this.state.imgUrl} alt="inserted two" />) : (
                                                <h6>No Image</h6>
                                            )}

                                            <div className="form-group">
                                                <label className="filelabel">
                                                    <i className="fas fa-camera mr-md-3"></i>
                                                    <span className="title">{this.state.update === true ? 'Update Image' : 'Add Image'}</span>
                                                    <input className="FileUpload1" id="FileInput" name="booking_attachment" type="file" onChange={this.imageUpload} />
                                                </label>
                                            </div>

                                        </div>
                                        {/* <button className="btn btn-img-p btn-primary b-radius-0" type="button">Add Image</button> */}
                                        {/* <button className="btn btn-img-p btn-primary float-right b-radius-0" type="button">Delete Image</button> */}

                                        <p className="unique_color mt-4 mb-3 mb-0">Add Tags</p>
                                        <input type="text" className="form-control b-radius tags_box" placeholder="Write your tag" />
                                        <button className="btn b-radius-0 btn-success pt-2 pb-2 pl-4 pr-4 mt-4">Add</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>}

        </div>
    }

}
export default AddPost;



// import React, { Component } from 'react';

// export class AddPost extends Component {
//     render() {

//         return (
//             <div>
//                 <p>AddPost</p>
//             </div>
//         );
//     };
// }