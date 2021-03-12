import React, {useState, useEffect } from 'react';
import './App.css';
import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listBlogs,listPosts,listComments } from './graphql/queries';
import { createBlog as createBlogMutation, createPost as createPostMutation, createComment as createCommentMutation, deleteBlog as deleteBlogMutation, deletePost as deletePostMutation, deleteComment as deleteCommentMutation } from './graphql/mutations';

const initialFormState = { name: '', description: '' }



function App() {
    const[ blogs, setBlogs] = useState([]);
    const[formData,setFormData] = useState(initialFormState);
    
    useEffect(() => {
        fetchBlogs();
    }, []);
    
    async function fetchBlogs() {
        const apiBlog = await API.graphql({query:listBlogs });
        setBlogs(apiBlog.data.listBlogs.items);
    }
    
     async function createBlog() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createBlogMutation, variables: { input: formData } });
    setBlogs([ ...blogs, formData ]);
    setFormData(initialFormState);
  }

  async function deleteBlog({ id }) {
    const newBlogArray = blogs.filter(blogs => blogs.id !== id);
    setBlogs(newBlogArray);
    await API.graphql({ query: deleteBlogMutation, variables: { input: { id } }});
  }
    

    async function lightSwitchOn() {
   
        fetch('http://192.168.1.109/apps/api/36/devices/7/on?access_token=2f7e7f53-929a-450d-a283-bf3e05bf2685')
    }  
    
    async function lightSwitchOff() {
        fetch('http://192.168.1.109/apps/api/36/devices/7/off?access_token=2f7e7f53-929a-450d-a283-bf3e05bf2685')

    }
  return (
    <div className="App">
     <h1>My Light App</h1>
      
      <div style={{marginBottom: 30}}>
        
        <button onClick= {lightSwitchOn} >Light On</button>
        <button onClick= {lightSwitchOff} >Switch Light Off</button>
      </div>
      <AmplifySignOut/>
    </div>
  );
}

export default withAuthenticator (App);
