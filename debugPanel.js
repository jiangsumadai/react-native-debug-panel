
import React, { Component } from 'react';
import { View, Text, FlatList, InteractionManager, Modal, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';

import { EnvironmentInfo } from './environmentInfo';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: 44,
    backgroundColor: 'white',
    borderColor: '#E2E2E2',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  cell: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    height: 49,
    backgroundColor: 'white',
    borderColor: '#E2E2E2',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  closeBtn: {
    position: 'absolute',
    bottom: 30,
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 35,
    borderRadius: 4,
    borderColor: '#666',
    borderWidth: StyleSheet.hairlineWidth,
  },
});

export class DebugPanel extends Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    dismissCallback: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {

    };
  }


  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {

    });
  }

  _renderItem({ item }) {
    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.cell}
        onPress={() => {
          EnvironmentInfo.setCurrentEnv(item.type);
          this.props.dismissCallback();
        }}
      >
        <Text style={{ flex: 1, fontSize: 14, color: '#333' }}>{item.type}</Text>
        <Text style={{ marginRight: item.type === EnvironmentInfo.getCurrentEnv().type ? 10 : 28, maxWidth: 200, fontSize: 14, color: '#666' }}>{item.url}</Text>
        {
          item.type === EnvironmentInfo.getCurrentEnv().type ?
            <Image source={require('./check.png')} style={{ width: 18, height: 12 }} /> :
            null
        }
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <Modal
        transparent
        visible={this.props.visible}
      >
        <View style={styles.container}>
          <Text>
            <Text style={{ fontSize: 16, color: '#333' }}>当前环境: </Text>
            <Text style={{ fontSize: 16, color: 'blue' }}>{EnvironmentInfo.getCurrentEnv().type}</Text>
          </Text>
        </View>
        <FlatList
          style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height - 64, backgroundColor: 'white' }}
          data={EnvironmentInfo.getEnv()}
          renderItem={this._renderItem.bind(this)}
        />
        <TouchableOpacity activeOpacity={0.9} style={styles.closeBtn}
          onPress={() => this.props.dismissCallback()}
        >
          <Text style={{ fontSize: 15, color: '#666' }}>CLOSE</Text>
        </TouchableOpacity>
      </Modal>
    );
  }
}
