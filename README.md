# reason-react-native-scripts

Early, experimental version of BuckleScript / ReasonReact / bs-react-native support integrated into [Create React Native App](https://github.com/react-community/create-react-native-app) to make starting a Reason project with React Native dead simple.

## Use it

```
yarn global add create-react-native-app
create-react-native-app HelloWorldRe --scripts-version reason-react-native-scripts
cd HelloWorldRe
yarn start
```

## Development

`yarn && yarn start` will start a watcher that will build artifacts and place them in the build directory.
