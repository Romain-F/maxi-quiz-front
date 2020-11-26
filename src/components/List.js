import React, { Component } from 'react';
import { api } from '../api';
import {ListElement} from './ListElement';
import { Link } from 'react-router-dom';

class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
        };
    }

    componentDidMount(){
        api.get(this.props.apiUrl)
            .then(
                (res) => {
                    this.setState({
                        isLoaded: true,
                        items: res.data,
                    });
                    
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    render() {
        const { error, isLoaded, items} = this.state;
  
        if(error) {      
            return <div>Erreur : {error.message}</div>;
        } else if(!isLoaded) {
            return <div>Chargement…</div>;
        } else {
            return (
                <ul>
                    <Link to={this.props.linkToCreate}> <li>+</li> </Link>
                    { items.map(item => (
                        <li key={item.id}>
                            <ListElement
                                contentType={this.props.contentType}
                                listItem={item}
                            />
                        </li>
                    )) }
                    
                </ul>
            );
        }
    }
}

export default List;