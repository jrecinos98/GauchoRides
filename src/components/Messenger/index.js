import { GiftedChat } from 'react-native-gifted-chat'
import User from "../../../src/actors/User";


class Messenger extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Hello there',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: {User.currentUser.name},
            avatar: {uri: 'https://graph.facebook.com/' + User.currentUser.fbID + '/picture?type=large'},
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}