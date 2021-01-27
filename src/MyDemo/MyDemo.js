import React from 'react';


const MyDemoStyle = ({ ...props }) => (
    <div className='main'>
        <section className='add_aritcle_section pt-3 pb-3 shadow-sm'>
            <div className='container'>
                <div className='row'>
                    <p>Working !!!!!!! {props.name}</p>
                </div>
            </div>
        </section>
    </div>
);

const MyDemo = (props) => <MyDemoStyle {...props} />;

export default MyDemo;