
A app may have many environments, such as development, test, production.
It would take much time to change environment, so we need a panel to increase efficiency.

## Demo

<img src="https://github.com/jiangsumadai/react-native-debug-panel/blob/master/screenshot.png?raw=true" width="540" height="960">

## Install

```shell
$ npm install react-native-debug-panel --save
```

## Usage
1.Copy environment.json to your project root directory, and edit the file.

2.yourFile.js

import React, { Component } from 'react';

import { View, Text, TouchableOpacity } from 'react-native';

import { DebugPanel, EnvironmentInfo } from 'react-native-debug-panel';

export default class MyComponent extends Component {

  constructor (props) {
    
    super(props);

    this.state = {

      debugPanelVisible: false,

    };

  }

  render() {

    return (

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

        <TouchableOpacity activeOpacity={1.0} onPress={() => this.setState({ debugPanelVisible: true })}>

          <Text style={{ fontSize: 20, color: 'blue' }}>{`当前环境：\n${EnvironmentInfo.getCurrentEnv().url}\n点击切换`}</Text>

        </TouchableOpacity>

        <DebugPanel

          visible={this.state.debugPanelVisible}

          dismissCallback={() => this.setState({ debugPanelVisible: false })}

        />

      </View>

    );

  }
  
}
```

## API

### EnvironmentInfo

#### getCurrentEnv()

Get the current environment which returns type and url.

## License

MIT
