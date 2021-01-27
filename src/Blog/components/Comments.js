import React, { Component } from 'react';
// service
import Fns from "../services/api-service";

function Comment({ comment, id, handleReply, replyDivId, handleText, replyText, addComment, postId, allComments, commentText }) {
    var nestedComments;
    //console.log('comment', comment)

    Object.keys(comment).forEach(function (key, i) {
        //console.log(`${comment} : ${typeof comment[key]}`)
        //console.log('comment[key]', typeof comment[key]);
        // console.log('key', key);
        //console.log('l', Object.keys(comment).length);
        if (typeof comment[key] == 'object') {

            console.log('length', comment[key]);

            nestedComments = <Comment key={key} comment={comment[key]} type="child" id={key} handleReply={handleReply} replyDivId={replyDivId} handleText={handleText} addComment={addComment} replyText={replyText} postId={postId} allComments={allComments} commentText={comment[key].text} />
        } else {
            // console.log('not object', comment[key])
            { nestedComments }
        }
    });
    //  console.log('nestedComments', nestedComments)

    return (
        // <div style={{ "marginLeft": "25px", "marginTop": "10px" }}>
        //     <div>{comment.text}</div>
        //     {nestedComments}
        // </div>
        <div style={{ "marginLeft": "25px", "marginTop": "10px" }}>
            <div className="row" style={{ "marginTop": "10px" }}>

                <div className="col-md-1">
                    <img src="https://res.cloudinary.com/dxfq3iotg/image/upload/v1574583336/AAA/4.jpg" alt="user" width="40" className="b-radius" />
                </div>
                <div className="comment-text col-md-11">
                    <div className="comment-footer mb-2">
                        <span className="mr-3">Selena</span>
                        <span className="text-muted mr-3">April 14, 2019</span>
                        <button type="button" className="btn btn-cyan btn-sm">Edit</button>
                    </div>

                    {/* <p className="m-b-15 d-block font-medium">{comment.text}</p> */}
                    <p className="m-b-15 d-block font-medium">{commentText}</p>
                    {/* Reply Comment Div */}
                    <div className="col-sm-6 p-0 text-right" id={id}
                        style={(replyDivId === id) ? { display: 'block' } : { display: 'none' }}
                    >
                        <textarea className="form-control border-unique" rows="3" placeholder="Write Your Comment Here"
                            value={replyText} onChange={handleText}></textarea>

                        <button type="button" className="btn text-white unique-bg mt-3" onClick={() => Fns.addComment(id, allComments)}>Reply</button>
                    </div>
                    {/* Reply Comment Div End*/}

                    <div className="comment-footer">
                        <button type="button" className="btn-cus btn-info btn-sm mr-3" data-id={id} onClick={(e) => handleReply(id, e)}>Reply</button>
                        <button type="button" className="btn-cus btn-danger btn-sm">Delete</button>
                    </div>
                </div>

            </div>
            {nestedComments}
        </div>

    )
}


// oFunctions.keys.previous = function (o, id) {
//     var keys = Object.keys(o),
//         idIndex = keys.indexOf(id),
//         nextIndex = idIndex -= 1;
//     if (idIndex === 0) {
//         //we're at the beginning, there is no previous
//         return;
//     }
//     console.log('keys[nextIndex]', keys[nextIndex]);
//     var nextKey = keys[nextIndex]
//     return nextKey;
// };

export class Comments extends Component {

    constructor(props) {
        super(props);
        //  console.log('comm', this.props.commentsObj);
        this.state = {
            comments: '',
            replyDivId: '',
            postId: ''
        }
    }
    componentDidMount() {

        this.setState({ comments: this.props.commentsObj })
        this.setState({ postId: this.props.postId })

    }

    //toggle Comment Div

    toggleCommentDiv = (cid) => {
        // const id = event.target.dataset.id;
        // console.log('id', cid);
        this.setState({ replyDivId: cid });

    };

    // reply comment text
    handleReplyCommentText = (event) => {
        this.setState({ replyText: event.target.value });
    }

    //
    getKeys = (id, commentsList) => {
        console.log('id', id);
        let path = [];

        console.log('in', Object.keys(commentsList).indexOf(id));
        if (Object.keys(commentsList).indexOf(id) >= 0) {
            // Do Something
            path.push(id);

        }
        // Object.keys(commentsList).forEach(function (k, i) {
        //     //console.log('k', k);
        //     if (k === id) {
        //         console.log('in');
        //         //console.log('in', Object.keys(commentsList).indexOf(id));
        //         path.push(id);

        //     } else {
        //         //console.log(`k:${k} : i${i}`)
        //         //console.log(Object.keys(commentsList)[i]);
        //         path.push(Object.keys(commentsList)[i]);
        //         path.push(Object.keys(commentsList[k])[i])

        //     }

        console.log('path', path);
        return path;

        //     // if (!(id in commentsList[k])) {

        //     //     //  var keys = Object.keys(this.state.comments);
        //     //     console.log('!i', index);
        //     // } else {

        //     //     console.log('i', index);
        //     //     console.log('yes', id);
        //     // }

        // });



        // var keys = Object.keys(this.state.comments).sort(function (a, b) { return a - b; });
        // console.log('keys', keys);
        // var index = keys.indexOf(k);
        // console.log('i', index);
        // if ((i === -1 && index > 0) || (i === 1 && index < keys.length - 1)) { index = index + i; }
        // console.log('comments', this.state.comments[keys]);
        // return this.state.comments[keys[index]];
    }

    replyComment = (maincommentId, allComments) => {
        let postId = this.state.postId;
        console.log('mainCommentId', maincommentId)
        let commentPath = this.getKeys(maincommentId, allComments);
        // const index = allComments.indexOf(maincommentId)
        // console.log('index', index)
        // var index = Object.keys(this.state.comment).indexOf(maincommentId);

        // let path = this.getKeys(maincommentId, -1);
        // console.log('index', index);

        // console.log('main', maincommentId);
        // console.log('text', this.state.replyText);
        //this.setState({ replyText: '' });

        let commentRes = Fns.addComment(postId, commentPath, this.state.replyText);
        commentRes.then(data =>
            console.log('replied to comment ', data),
            this.setState({ replyText: '' }));
    };


    render() {
        return (
            <div>
                {
                    // Object.keys(comments).map((comment) => (
                    //     console.log(comments[comment])
                    //     //     // console.log(`${comments[comment]}: ${typeof comments[comment]}`)
                    // ))


                    Object.keys(this.state.comments || this.state.comments !== undefined).map((comment) => {
                        //  console.log('this.state.comments', this.state.comments[comment])
                        //let commentPathIds = 
                        return (
                            <Comment allComments={this.state.comments} key={comment} comment={this.state.comments[comment]} id={comment} handleReply={this.toggleCommentDiv} replyDivId={this.state.replyDivId} handleText={this.handleReplyCommentText} replyText={this.state.replyText}
                                addComment={this.replyComment} postId={this.state.postId} commentText={this.state.comments[comment].text} />
                        )
                    })
                }
            </div>
        );
    }
}


export default Comments;