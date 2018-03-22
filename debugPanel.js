
import React, { Component } from 'react';
import { View, Text, FlatList, InteractionManager, Modal, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
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
  addBtn: {
    position: 'absolute',
    bottom: 80,
    right: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: 35,
    borderRadius: 4,
    borderColor: '#666',
    borderWidth: StyleSheet.hairlineWidth,
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
  editContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  editView: {
    paddingLeft: 10,
    paddingRight: 10,
    width: 280,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  textInput: {
    marginTop: 10,
    width: 260,
    fontSize: 18,
    color: 'blue',
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
      newEnv: '',
      newEnvDetail: '',
      environmentData: EnvironmentInfo.getEnv(),
      editViewAvailable: false,
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

  _saveEnv() {
    let newData = [...this.state.environmentData, { type: this.state.newEnv, url: this.state.newEnvDetail }];
    EnvironmentInfo.setEnv(newData);
    this.setState({
      environmentData: newData,
      editViewAvailable: false,
    });
  }

  _renderEditView() {
    if (this.state.editViewAvailable) {
      return (
        <View style={styles.editContainer}>
          <View style={styles.editView}>
            <TextInput
              underlineColorAndroid={'transparent'}
              placeholder={'输入环境的名称，如dev、pro'}
              style={styles.textInput}
              value={this.state.newEnv}
              maxLength={20}
              onChangeText={(inputText) => {
                this.setState({ newEnv: inputText });
              }}
            />
            <TextInput
              underlineColorAndroid={'transparent'}
              placeholder={'输入域名'}
              style={styles.textInput}
              value={this.state.newEnvDetail}
              maxLength={100}
              onChangeText={(inputText) => {
                this.setState({ newEnvDetail: inputText });
              }}
            />
            <TouchableOpacity activeOpacity={0.9} style={{ marginTop: 10, marginBottom: 10 }}
              onPress={() => this._saveEnv()}
            >
              <Text style={{ fontSize: 15, color: 'blue' }}>完成</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return null;
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
          data={this.state.environmentData}
          renderItem={this._renderItem.bind(this)}
        />
        <TouchableOpacity activeOpacity={0.9} style={styles.addBtn}
          onPress={() => this.setState({ editViewAvailable: true })}
        >
          <Text style={{ fontSize: 15, color: 'blue' }}>新增</Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.9} style={styles.closeBtn}
          onPress={() => this.props.dismissCallback()}
        >
          <Text style={{ fontSize: 15, color: '#666' }}>CLOSE</Text>
        </TouchableOpacity>
        {this._renderEditView()}
      </Modal>
    );
  }
}
