## About Gaucho Rides
Gaucho Rides is an application developed for UCSB and SBCC students to organize shared rides with fellow students more conveniently and efficiently than the Facebook groups. Gaucho Rides facilitates the hassle of finding, creating and requesting rides. Furthermore, Gaucho Rides provides a rating system so that users can rate each other based on their driving ability and their reliability as either a driver or a passenger. 

Gaucho Rides is a multi-platform application developed for android and iOS using facebook's [React Native](https://facebook.github.io/react-native/) framework. React native allows us to create an application for iOS and Android by using a single code base that works on both platforms. 


## Setup Project

### Automatic Installation
For your convenience we have provided a setup script in the root directory of the project. It is generally okay to ignore any warnings during installation as most of these are optional dependencies which do not affect your ability to start the project.

1. Clone this repository: `git clone https://github.com/jrecinos98/GauchoRides.git`
2. Switch to project's root: `cd GauchoRides`
3. Run setup script: `./setup.sh`

Additionally, we have provided a script to uninstall all the installed components. Run `./unsetup.sh` on root of project and they will be removed automatically.

### Manual Installation 
In order to run the application you will need to have node and npm installed in your machine. These instructions work on Linux and possibly Windows if using bash. Not tested on a Mac.
To get version 9.x (latest stable version as of 05/12/18) of Node.js run following commands: 

1. Clone this repository: `git clone https://github.com/jrecinos98/GauchoRides.git`
2. Switch to project's root: `cd GauchoRides`
3. Update packager: `sudo apt-get update`
4. Install node.js: `sudo apt-get install -y nodejs`
5. Update node.js to version 9.x: `curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -`
6. Install node.js: `sudo apt-get install -y nodejs`
7. Install npm: `sudo apt-get install -y npm`
8. Update npm: `sudo npm install npm@latest -g`
7. Install project libraries: `sudo npm install`

Alternatively, you can install [yarn](https://yarnpkg.com/lang/en/docs/install/#debian-stable) instead of npm. For every script simply replace npm by yarn. For example, `npm start` becomes `yarn start`.
1. `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
2. `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`
3. `sudo apt-get update`
4. `sudo apt-get install yarn`


## Run Project
Make sure Node and Npm have been installed by running `nodejs -v` and `npm -v`.

### Running On Physical Device
1. Download [Expo App](https://expo.io) app on your phone from App Store or Google Play Store.
2. On project's root directory, run: `sudo npm start`
3. Press `s` on terminal and input the phone number.
4. Open link from text message to open Expo app.
5. Wait until the app finishes building (loading bar is at the bottom).

### Running On Emulator
1. When the packager loads you have the option to run the application on an android emulator (use [Genymotion](https://docs.genymotion.com/latest/Content/01_Get_Started/Installation.htm)) or iOS Simulator through Xcode (only works on a Mac).
2. On project's root directory, run: `sudo npm start`
3. Once you have selected the method you want to run the application with, wait until the Javascript bundle finishes building and the application is launched.

For more option and scripts available read below.


## Error Q & A
- `node` command is not found.
  - First, check if nodejs is installed (`nodejs -v`). If not, please follow the steps from **Setup Project** section.
  - If nodejs is installed, run: `sudo ln -s /usr/bin/nodejs /usr/bin/node`
- `npm start` is stuck at "Starting Packager...".
  - Restart with sudo: `sudo npm start`
- `npm start` can't start due to error "Unable to start server".
  - Run command1: `sudo sysctl -w fs.inotify.max_user_instances=1024`
  - Run command2: `sudo sysctl -w fs.inotify.max_user_watches=12288`
For other errors, try follow the hints/instructions on the terminal. Also, feel free to contact us for any unsolvable error.

## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

##### Using Android Studio's `adb`

1. Make sure that you can run adb from your terminal.
2. Open Genymotion and navigate to `Settings -> ADB`. Select “Use custom Android SDK tools” and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

##### Using Genymotion's `adb`

1. Find Genymotion’s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/`.
2. Add the Genymotion tools directory to your path (instructions for [Mac](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/), [Linux](http://www.computerhope.com/issues/ch001647.htm), and [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)).
3. Make sure that you can run adb from your terminal.

#### `npm run eject`

This will start the process of "ejecting" from Create React Native App's build scripts. You'll be asked a couple of questions about how you'd like to build your project.

**Warning:** Running eject is a permanent action (aside from whatever version control system you use). An ejected app will require you to have an [Xcode and/or Android Studio environment](https://facebook.github.io/react-native/docs/getting-started.html) set up.

## Troubleshooting

### Networking

If you're unable to load your app on your phone due to a network timeout or a refused connection, a good first step is to verify that your phone and computer are on the same network and that they can reach each other. Create React Native App needs access to ports 19000 and 19001 so ensure that your network and firewall settings allow access from your device to your computer on both of these ports.

Try opening a web browser on your phone and opening the URL that the packager script prints, replacing `exp://` with `http://`. So, for example, if underneath the QR code in your terminal you see:

```
exp://192.168.0.1:19000
```

Try opening Safari or Chrome on your phone and loading

```
http://192.168.0.1:19000
```

and

```
http://192.168.0.1:19001
```

If this works, but you're still unable to load your app by scanning the QR code, please open an issue on the [Create React Native App repository](https://github.com/react-community/create-react-native-app) with details about these steps and any other error messages you may have received.

If you're not able to load the `http` URL in your phone's web browser, try using the tethering/mobile hotspot feature on your phone (beware of data usage, though), connecting your computer to that WiFi network, and restarting the packager. If you are using a VPN you may need to disable it.


## Updating to New Releases

You should only need to update the global installation of `create-react-native-app` very rarely, ideally never.

Updating the `react-native-scripts` dependency of your app should be as simple as bumping the version number in `package.json` and reinstalling your project's dependencies.

Upgrading to a new version of React Native requires updating the `react-native`, `react`, and `expo` package versions, and setting the correct `sdkVersion` in `app.json`. See the [versioning guide](https://github.com/react-community/create-react-native-app/blob/master/VERSIONS.md) for up-to-date information about package version compatibility.

## Writing and Running Tests

This project is set up to use [jest](https://facebook.github.io/jest/) for tests. You can configure whatever testing strategy you like, but jest works out of the box. Create test files in directories called `__tests__` or with the `.test` extension to have the files loaded by jest. See the [the template project](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/App.test.js) for an example test. The [jest documentation](https://facebook.github.io/jest/docs/en/getting-started.html) is also a wonderful resource, as is the [React Native testing tutorial](https://facebook.github.io/jest/docs/en/tutorial-react-native.html).

## Environment Variables

You can configure some of Create React Native App's behavior using environment variables.

### Configuring Packager IP Address

When starting your project, you'll see something like this for your project URL:

```
exp://192.168.0.2:19000
```

The "manifest" at that URL tells the Expo app how to retrieve and load your app's JavaScript bundle, so even if you load it in the app via a URL like `exp://localhost:19000`, the Expo client app will still try to retrieve your app at the IP address that the start script provides.

In some cases, this is less than ideal. This might be the case if you need to run your project inside of a virtual machine and you have to access the packager via a different IP address than the one which prints by default. In order to override the IP address or hostname that is detected by Create React Native App, you can specify your own hostname via the `REACT_NATIVE_PACKAGER_HOSTNAME` environment variable:

Mac and Linux:

```
REACT_NATIVE_PACKAGER_HOSTNAME='my-custom-ip-address-or-hostname' npm start
```

Windows:
```
set REACT_NATIVE_PACKAGER_HOSTNAME='my-custom-ip-address-or-hostname'
npm start
```

The above example would cause the development server to listen on `exp://my-custom-ip-address-or-hostname:19000`.

## Adding Flow

Flow is a static type checker that helps you write code with fewer bugs. Check out this [introduction to using static types in JavaScript](https://medium.com/@preethikasireddy/why-use-static-types-in-javascript-part-1-8382da1e0adb) if you are new to this concept.

React Native works with [Flow](http://flowtype.org/) out of the box, as long as your Flow version matches the one used in the version of React Native.

To add a local dependency to the correct Flow version to a Create React Native App project, follow these steps:

1. Find the Flow `[version]` at the bottom of the included [.flowconfig](.flowconfig)
2. Run `npm install --save-dev flow-bin@x.y.z` (or `yarn add --dev flow-bin@x.y.z`), where `x.y.z` is the .flowconfig version number.
3. Add `"flow": "flow"` to the `scripts` section of your `package.json`.
4. Add `// @flow` to any files you want to type check (for example, to `App.js`).

Now you can run `npm run flow` (or `yarn flow`) to check the files for type errors.
You can optionally use a [plugin for your IDE or editor](https://flow.org/en/docs/editors/) for a better integrated experience.

To learn more about Flow, check out [its documentation](https://flow.org/).

## Sharing and Deployment

Create React Native App does a lot of work to make app setup and development simple and straightforward, but it's very difficult to do the same for deploying to Apple's App Store or Google's Play Store without relying on a hosted service.

### Publishing to Expo's React Native Community

Expo provides free hosting for the JS-only apps created by CRNA, allowing you to share your app through the Expo client app. This requires registration for an Expo account.

Install the `exp` command-line tool, and run the publish command:

```
$ npm i -g exp
$ exp publish
```

### Building an Expo "standalone" app

You can also use a service like [Expo's standalone builds](https://docs.expo.io/versions/latest/guides/building-standalone-apps.html) if you want to get an IPA/APK for distribution without having to build the native code yourself.

### Ejecting from Create React Native App

If you want to build and deploy your app yourself, you'll need to eject from CRNA and use Xcode and Android Studio.

This is usually as simple as running `npm run eject` in your project, which will walk you through the process. Make sure to install `react-native-cli` and follow the [native code getting started guide for React Native](https://facebook.github.io/react-native/docs/getting-started.html).

#### Should I Use ExpoKit?

If you have made use of Expo APIs while working on your project, then those API calls will stop working if you eject to a regular React Native project. If you want to continue using those APIs, you can eject to "React Native + ExpoKit" which will still allow you to build your own native code and continue using the Expo APIs. See the [ejecting guide](https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md) for more details about this option.

