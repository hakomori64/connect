import React from 'react';
import withAuthorization from '../../Auth/Session/withAuthorization';
import RequestForm from './RequestForm';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/styles';
import { CardMedia, Typography, Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';


const PopUp = styled.div`
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 10px;
    background-color: rgba(0,0,0, 0.5);
`;

const PopupInner = styled.div`
    position: absolute;
    left: 10%;
    right: 10%;
    top: 10%;
    bottom: 10%;
    margin: auto;
    border-radius: 20px;
    background: white;
    overflow: auto;
`;

const styles = makeStyles({
    card: {
        maxWidth: 345,
    }
});

/**
 * This component should be used as below
 * <Request user_id={user_id} closePopup={this.closePopup.bind(this)} set_id={have_want_set_id} />>
 */
class Request extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            have_want_set: {},
            matched_have_want_sets: [],
        };
    }

    loadHaveWantSet = authUser => {
        console.log(this.props.set_id);
        this.props.firebase.store
            .collection('users')
            .doc(authUser.userID)
            .collection('have_want_set')
            .doc(this.props.set_id)
            .get().then(doc => {
                this.setState({
                    have_want_set: doc.data(),
                });
                console.log(this.state.have_want_set);
            });
    }

    checkMatchedHaveWant = have_want_set => {
        const my_have_want_set = have_want_set;
        console.log(my_have_want_set);
        const candidate_have_want_set = this.props.user_info.have_want_set;
        console.log(candidate_have_want_set);
        Object.keys(candidate_have_want_set).forEach(set_name => {
            if (
                (candidate_have_want_set[set_name].have.filter(value => my_have_want_set.want)).length &&
                (candidate_have_want_set[set_name].want.filter(value => my_have_want_set.have)).length
            ) {
                console.log(candidate_have_want_set[set_name]);
                const { matched_have_want_sets } = this.state;
                matched_have_want_sets.push(candidate_have_want_set[set_name]);
                this.setState({matched_have_want_sets});
            };
        })

    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextProps.authUser && !this.props.authUser) {
            this.loadHaveWantSet(nextProps.authUser);
        }

        if (Object.keys(nextState.have_want_set).length && !(Object.keys(this.state.have_want_set).length)) {
            this.checkMatchedHaveWant(nextState.have_want_set);
        }

        return true;
    }

    render() {
        let matched_set = <div>Loading Matched Sets ...</div>;
        if (this.state.matched_have_want_sets.length) {
            matched_set = this.state.matched_have_want_sets.map(set => (
                <div>
                    <div>
                        have:
                    </div>
                    <div>
                        {set.have.map(have => <li key={have}>{have}</li>)}
                    </div>
                    <div>
                        want:
                    </div>
                    <div>
                        {set.want.map(want => <li key={want}>{want}</li>)}
                    </div>
                    <div>description:</div>
                    <div>
                        {set.description}
                    </div>
                </div>
            ))
        }
        return (
            <PopUp>
                <PopupInner>
                    <Card className={styles.card} key={this.props.userID}>
                        <CardMedia
                            component="img"
                            alt={this.props.user_info.username}
                            height="140"
                            image={this.props.user_info.icon_url}
                            title={this.props.user_info.username}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.user_info.username}
                            </Typography>
                            <Typography gutterBottom variant="h5" component="h3">
                                {this.props.user_info.email}
                            </Typography>
                            <Grid container spacing={2}>
                            <Grid item>
                                {this.props.user_info.description}
                            </Grid>
                            <Grid item>
                                マッチ内容
                            </Grid>
                            <Grid item>
                                <List>
                                    {matched_set}
                                </List>
                            </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <RequestForm to={this.props.user_info.userID} />
                            <Button size="small" color="primary" onClick={this.props.closePopup}>
                                Close PopUp
                            </Button>
                        </CardActions>
                    </Card>
                </PopupInner>
            </PopUp>
        )
    }
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Request);
