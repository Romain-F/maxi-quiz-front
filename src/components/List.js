import React, { Component } from 'react';
import API from '../api';
import ListElement from './ListElement';

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
        API.get(this.props.content)
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
                    {items.map(item => (
                        <li key={item.name}>
                            <ListElement
                                listContent={this.props.listContent}
                                listItem={item}
                            />
                        </li>
                    ))}
                    <li><p>+</p></li>
                </ul>
            );
        }
    }
}

export default List;