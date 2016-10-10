import React from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as actions from '../actions/index'

import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from '!style!css?modules!../styles.css';


import SocialEvents from './social_events/social_events_index'
import ChoresIndex from './chores/chores_index'
import Messages from './messages/messages_index'
import BillsIndex from './bills/bills_index'



class HomeContainer extends React.Component {
  componentWillMount() {
    if (this.props.socialEvents.length == 0) {
      this.props.actions.fetchEvents();
    }

    if (this.props.messages.length == 0) {
      this.props.actions.loadMessages();
    }

    this.props.actions.fetchGroupMembers();
  }

  render() {
    return (
      <Row>
        <Col md>
            <SocialEvents social_events={ this.props.socialEvents } />
            <ChoresIndex chores={ this.props.chores }  group_members={this.props.groupMembers} />
            <BillsIndex bills={ this.props.bills } />
        </Col>
        <Col md>
          <Messages messages={ this.props.messages }/>
      </Col>
      </Row>
    )
  }
}

function mapStateToProps(state) {
  let groupMembers = []
  let socialEvents = []
  let chores = []
  let bills = []
  let messages = []

  if (state.events.length > 0) {
    socialEvents = state.events.filter(event => {
      return event.category === "social"
    })

    chores = state.events.filter(event => {
      return event.category === "chore"
    })

    bills = state.events.filter(event => {
      return event.category === "bill"
    })

    messages = state.messages
  }

  groupMembers = state.members

  return {
    groupMembers: groupMembers,
    socialEvents: socialEvents,
    chores: chores,
    bills: bills,
    messages: messages
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

const componentCreator = connect(mapStateToProps, mapDispatchToProps)
export default componentCreator(HomeContainer)
