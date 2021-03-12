import React from 'react';
import './App.css';
//import { API } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';


function App() {
    
    async function lightSwitchOn() {
   
        fetch('https://cloud.hubitat.com/api/43805768-6bc2-477b-b5e2-b80c642fafdd/apps/36/devices/7/on?access_token=2f7e7f53-929a-450d-a283-bf3e05bf2685')
    }  
    
    async function lightSwitchOff() {
        fetch('https://cloud.hubitat.com/api/43805768-6bc2-477b-b5e2-b80c642fafdd/apps/36/devices/7/off?access_token=2f7e7f53-929a-450d-a283-bf3e05bf2685')

    }
  return (
    <div className="App">
     <h1>My Lamp App</h1>
      
      <div style={{marginBottom: 30}}>
        
        <button onClick= {lightSwitchOn} >Switch On</button>
        <button onClick= {lightSwitchOff} >Switch Light Off</button>
      </div>
      <AmplifySignOut/>
    </div>
  );
}

export default withAuthenticator (App);
