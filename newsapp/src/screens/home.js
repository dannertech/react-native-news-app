import React, { PureComponent } from 'react';
import { Text, View, ActivityIndicator, Alert } from 'react-native';
import { Container, Header, Body, Title, Content, Left, Button, Icon, List, ListItem} from 'native-base';
import DataItem from '../components/list_item';
import { getArticlesBySource } from '../services/news';

export class HomeScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            data: null, 
            isError: false
        }
    }

    componentDidMount() {
        getArticlesBySource().then(data => {
            this.setState({
                isLoading: false,
                data: data
            })
        }, error=>{
            console.log("I ran into an error")
        })
    
    }

    render(){
        let view = this.state.isLoading ? (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator animating={this.state.isLoading} color="#00f0ff" />
            <Text style={{marginTop: 8}} children="Please wait..."/>
            </View>
        ) : (
            <List dataArray={this.state.data} renderRow={(item) => {
                return(
                <ListItem>
                    <DataItem data={item} />
                </ListItem>
                 )}} />
        )
        return(
            <Container>
                <Header style={{backgroundColor: '#9400D3'}}>
                    
                        <Button transparent>
                        <Icon style={{ color: 'white' }} name='menu'/>
                        </Button>
                       
                    <Body>
                        <Title children="World News App" style={{ color: 'white'}} />
                    </Body>
                </Header>
                <Content contentContainerStyle={{backgroundColor: '#fff'}} padder={false}>
                 {view}
                </Content>
            </Container>
        )
    }

}