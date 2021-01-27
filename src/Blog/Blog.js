import React from 'react';
import './assets/css/style.css';
import './assets/css/bootstrap.min.css';
import './assets/js/717387f64e.js';
import Header from './components/HeaderSection.js';
import { withCookies, Cookies } from 'react-cookie';

const BlogStyle = ({ ...props }) => (
    <div>
        <Header></Header>
    </div>
);

const Blog = (props) => <BlogStyle {...props} />;

export default Blog;