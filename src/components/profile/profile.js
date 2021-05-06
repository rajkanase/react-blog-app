import React from "react";
import Auth from './../../classes/auth';

export default class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: ''
        };
    }

    componentDidMount() {
        this.fetchProfile();
    }

    fetchProfile = () => {
        const requestOptions = {
            method: 'GET',
            headers: { 'Content-Type': 'application/json', 'Authorization': Auth.getToken() }
        };
        fetch(`${Auth.getBaseURL()}/profile`, requestOptions).then(data => data.json()).then(res => {
            console.log('res', res);
            if (res.success) {
                this.setState({
                    username: res.user.username,
                    email: res.user.email
                });
            } else {
                alert('Get Profile Failed', res.message);
            }
        }, error => {
            console.log('error', error);
            alert('Error', error.message);
        });
    }

    render() {
        return (
            <div className="jumbotron m-3">
                <div>Email ID - {this.state.email}</div>
                <div>Username - {this.state.username}</div>
            </div>
        )
    }
}