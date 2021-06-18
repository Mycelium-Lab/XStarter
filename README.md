# XStarter

<span>Current Version <a href="https://awesome-varahamihira-41b940.netlify.app/">Test</a></span>

<h3>Setup</h3>
<p>To set up the application you need to react .env file in the xstarter-app folder. There you need to obtain and specify the following:</p>
<ol>
    <li>Your Airtable API Key</li>
    <li>Your Airtable DB Name</li>
    <li>Your Airtable Table Name</li>
    <li>Your Infura Project ID</li>
</ol>
<p>Your .env file should look as follows:</p>
<pre>
REACT_APP_AIRTABLE_API_KEY=(1)
REACT_APP_AIRTABLE_DB_NAME=(2)
REACT_APP_AIRTABLE_TABLE_NAME=(3)
REACT_APP_INFURA_PROJECT_ID=(4)
</pre>

<h4>Airtable Properties</h4>
<p>For this application we have set the following fields for our table:</p>
<ul>
    <li>name : Single line text</li>
    <li>surname : Single line text</li>
    <li>eth_address : Single line text</li>
    <li>want_to_invest : Number </li>
    <li>twitter : URL</li>
    <li>telegram : URL</li>
</ul>


<h3>Running</h3>
<p>To run the app on localhost, please enter:</p>
```console
cd xstarter-app
npm i 
npm start
```


