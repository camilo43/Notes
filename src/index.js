const React = require ('react')
const ReactDOM = require ('react-dom/client');
const { FormsAxiosPostModule } = require ('./FormsAxiosPost_Module.jsx');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>  
    <FormsAxiosPostModule></FormsAxiosPostModule>   
  </React.StrictMode>
);



