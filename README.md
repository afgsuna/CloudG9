# CloudG9
We deployed the app in heruko here:https://projektgrupp9.herokuapp.com/

Our app is a note taking web app. It has three different stages. The first one is a signup stage
where you create an account that you can login in with. After the account has been created
then you can move on to the second stage and login to the application. After that the third
stage begins where you can use the app. The things you can do are, create notes, edit notes
and remove notes. Everything gets saved in the database where the app is saved in heroku. It
is runnable through local host and heroku. If you login with one account then you cannot see
other peoples notes. This is the security feature of the app.

<table>
  <tbody>
    <tr>
        <th>Tool</th>
        <th>Why we chose it</th>
    </tr>
    <tr>
        <td>Node.js</td>
        <td>
            <ul>
                <li>popular and well-documented</li>
                <li>uses JS as main application</li>
                <li>robust framework</li>
            </ul>
        </td>
    </tr>
    <tr>
      <td>Express.js</td>
      <td>makes it much easier to handle http requests</td>
    </tr>
    <tr>
      <td>MongoDB cloud</td>
      <td>
        <ul>
          <li>noSQL DBs like MongoDB are easier to scale</li>
          <li>No relationships needed for makingin the database </li>
          <li>well-documented</li>
          <li>free cloud hosting of the database</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>Heroku</td>
      <td>Host the backend in Heroku</td>
    </tr>
    <tr>
      <td>dotenv</td>
      <td>login security</td>
    </tr>
    <tr>
      <td>ejs</td>
      <td>saves a lot of lines of code, especially given that I need to rewrite the same code so many times when creating new to-do lists</td>
    </tr>
    <tr>
      <td>Passport</td>
      <td>Use this for the authentication of the application</td>
    </tr>
  </tbody>
</table>

