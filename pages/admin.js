import React from 'react'
import axios from 'axios'
import SignUp from '../components/formComponents/SignUp'
import ConfirmSignUp from '../components/formComponents/ConfirmSignUp'
import SignIn from '../components/formComponents/SignIn'
import Inventory from '../components/Inventory'
import { url, authRoute } from '../utils/urlProvider'


class Admin extends React.Component {
  state = { formState: 'signIn', isAdmin: false }
  constructor(props) {
    super(props);
    if(typeof window !== "undefined" && !window.localStorage.getItem('jwt'))
      this.state = { formState: 'signIn', isAdmin: false }
    else 
      this.state = { formState: 'signedIn', isAdmin: true }
  }
  toggleFormState = (formState) => {
    this.setState(() => ({ formState }))
  }
  async componentDidMount() {
    // check and update signed in state
  }
  signUp = async (form) => {
    const { username, email, password } = form
    // sign up
    this.setState({ formState: 'confirmSignUp' })
  }
  confirmSignUp = async (form) => {
    const { username, authcode } = form
    // confirm sign up
    this.setState({ formState: 'signIn' })
  }
  signIn = async (form) => {
    const { username, password } = form
    if (!username || !password) {
			setError('invalid username or password');
			return;
		}

    try{
      const res = await axios
      .post(`${url + authRoute}/login`, {username, password});
			window.localStorage.setItem('jwt', res.data.token);
      // signIn
      this.setState({ formState: 'signedIn', isAdmin: true })
    } catch(err){
      console.log(err);
      return;
    }
  }
  signOut = async() => {
    // sign out
    this.setState({ formState: 'signIn' })
  }

  render() {
    const { formState, isAdmin } = this.state
    const renderForm = (formState, state) => {
      switch(formState) {
        case 'signUp':
          return <SignUp {...state} signUp={this.signUp} toggleFormState={this.toggleFormState} />
        case 'confirmSignUp':
          return <ConfirmSignUp {...state} confirmSignUp={this.confirmSignUp} />
        case 'signIn':
          return <SignIn {...state} signIn={this.signIn} toggleFormState={this.toggleFormState} />
        case 'signedIn':
          return isAdmin ? <Inventory {...state} signOut={this.signOut} /> : <h3>Not an admin</h3>
        default:
          return null
      }
    }
    
    return (
      <div className="flex flex-col">
        <div className="max-w-fw flex flex-col">
          <div className="pt-10">
            <h1 className="text-5xl font-light">Admin Panel</h1>
          </div>
          {
            renderForm(formState)
          }
        </div>
      </div>
    )
  }
}

export default Admin