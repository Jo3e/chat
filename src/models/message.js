import superMap from 'can-connect/can/super-map/';
import tag from 'can-connect/can/tag/';
import Map from 'can-map';
import 'can-map-define';
import List from 'can-list';
import io from 'steal-socket.io';

export const Message = Map.extend({
  define: {}
});

Message.List = List.extend({
  Map: Message
}, {});

export const messageConnection = superMap({
  url: 'http://chat.donejs.com/api/messages',
  idProp: 'id',
  Map: Message,
  List: Message.List,
  name: 'message'
});

tag('message-model', messageConnection);

const socket = io('http://chat.donejs.com');

socket.on('messages created',
  message => messageConnection.createInstance(message));
socket.on('messages updated',
  message => messageConnection.updateInstance(message));
socket.on('messages removed',
  message => messageConnection.destroyInstance(message));

export default Message;
