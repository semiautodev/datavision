import React, {useState, useEffect } from 'react';
import './App.css';
import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { listBlogs,listPosts,listComments } from './graphql/queries';
import { createBlog as createBlogMutation, createPost as createPostMutation, createComment as createCommentMutation, deleteBlog as deleteBlogMutation, deletePost as deletePostMutation, deleteComment as deleteCommentMutation } from './graphql/mutations';

const initialFormState = { name: '', description: '' }



function App() {
    const[ dataCards, setDataCards] = useState([]);
    const[formData,setFormData] = useState(initialFormState);
    
    useEffect(() => {
        fetchDataCard();
    }, []);
    
    async function fetchDataCard() {
        const apiData = await API.graphql({query:listBlogs });
        setDataCards(apiData.data.listBlogs.items);
    }
    
     async function createBlog() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createBlogMutation, variables: { input: formData } });
    setDataCards([ ...dataCards, formData ]);
    setFormData(initialFormState);
  }

  async function deleteBlog({ id }) {
    const newDataCardArray = dataCards.filter(dataCards => dataCards.id !== id);
    setDataCards(newDataCardArray);
    await API.graphql({ query: deleteBlogMutation, variables: { input: { id } }});
  }
    
    
  return (
    <div className="App">
     <h1>My Data Card App</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Card name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Card description"
        value={formData.description}
      />
      <button onClick={createBlog}>Create Card</button>
      <div style={{marginBottom: 30}}>
        {
          dataCards.map(dataCards => (
            <div key={dataCards.id || dataCards.name}>
              <h2>{dataCards.name}</h2>
              <p>{dataCards.description}</p>
              <button onClick={() => deleteBlog(dataCards)}>Delete Card</button>
            </div>
          ))
        }
      </div>
      <AmplifySignOut/>
    </div>
  );
}

export default withAuthenticator (App);
