# GauchoRides

## Table of Contents
* [About Gaucho Rides](#about-gaucho-rides)
* [Demo](#demo)
* [Setup Project](#setup-project)
  * [Automatic Installation](#automatic-installation)
  * [Manual Installation](#manual-installation)
* [Run Project](#run-project)
  * [Run on Physical Device](#run-on-physical-device)
  * [Run On Emulator](#run-on-emulator)
* [Project Structure](#project-structure)
  * [Login Screen](#login-screen)
  * [Home Screen](#home-screen)
   * [Create Ride Screen](#create-ride-screen)
   * [Create Request Screen](#create-request-screen)
  * [Request Screen](#request-screen)
  * [History Tab](#history-tab)
  * [Profile Tab](#profile-tab)
  * [Settings Screen](#settings-screen)
* [Available Scripts](#available-scripts)
  * [npm start](#npm-start)
  * [npm test](#npm-test)
  * [npm run ios](#npm-run-ios)
  * [npm run android](#npm-run-android)
  * [npm run eject](#npm-run-eject)
* [Troubleshooting](#troubleshooting)
  * [Node Command Not Found](#node-command-not-found)
  * [Npm Stuck at "Starting Packager"](#npm-stuck-at-starting-packager)
  * ["Unable to Start Server" Error](#unable-to-start-server-error)
  * [Unable to Login](#unable-to-login)
  * [Networking](#networking)
  * [iOS Simulator won't open](#ios-simulator-wont-open)
  * [QR Code does not scan](#qr-code-does-not-scan)
* [Updating to New Releases](#updating-to-new-releases)
* [Writing and Running Tests](#writing-and-running-tests)
    
<br>
    
## About Gaucho Rides
Gaucho Rides is an application developed for UCSB and SBCC students to organize shared rides with fellow students more conveniently and efficiently than the Facebook groups. Gaucho Rides facilitates the hassle of finding, creating and requesting rides. Furthermore, Gaucho Rides provides a rating system so that users can rate each other based on their driving ability and their reliability as either a driver or a passenger. 

Gaucho Rides is a multi-platform application developed for android and iOS using facebook's [React Native](https://facebook.github.io/react-native/) framework. React native allows us to create an application for iOS and Android by using a single code base that works on both platforms. 

<br>

## Demo

A demonstration video found at: https://youtu.be/bXdifCvLfNc

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

<br>

## Run Project
Make sure Node and Npm have been installed by running `nodejs -v` and `npm -v`.

### Run On Physical Device
1. Download [Expo App](https://expo.io) app on your phone from App Store or Google Play Store.
2. On project's root directory, run: `sudo npm start`
3. Press `d` on the the terminal to run the project in production mode. In this mode warning messages are dismissed to emulate how the finished app would work.
4. Open the Expo App and scan the QR code on the terminal. Alternatively, you can press `s` on terminal if you would like to receive a link through text message (Not guaranteed to work on Android).
5. Wait until the app finishes building (loading bar is at the bottom).

### Run On Emulator
When the packager starts you have the option to run the application on an android emulator (use [Genymotion](https://docs.genymotion.com/latest/Content/01_Get_Started/Installation.htm)) or iOS Simulator through Xcode (only works on a Mac).

1. Be sure to start the emulator of your choice.
2. On project's root directory, run: `sudo npm start`
3. Once you have selected the method you want to run the application with, wait until the Javascript bundle finishes building and the application is launched.

You may encounter warnings when you run the project. It is generally okay to ignore them as they do not impede you from testing the app.

For more option and scripts available read the [Available Scripts](#available-scripts) section.

<br>

## Project Structure

### Login Screen
Upon opening the app you will be met with the log-in screen. Here you have the option to log in with your University email or thorough Facebook.  Unfortunately, while the app is in development Facebook only allows registered testers and developers to authenticate using their Facebook account. Therefore, your profile page within the app will not contain your image or name. Furthermore, you will want to sign up using an university email that contains .edu.

To sign up follow these steps:
  1. Fill out the field that says: 'Email' with your University email.
  2. Enter your desired password (6 characters or more).
  3. **DO NOT PRESS LOGIN**. 
  4. Below the 'Continue with Facebook' there is a text box that reads: "Don't have an account? Sign Up." Press that button and wait for the confirmation dialog. This will authenticate you on Firebase and allow you to login.

### Home Screen
Once you are authenticated you will be sent to the Home screen. Here you will find the core functionality of our app.

- **Search Bar**:
  We have yet to completely implement the searching functionality, so instead of searching the database, a polyline will be created from the specified origin to the destination. In the future the functionality will be as has been described above.

  - On the upper right hand corner you can find the search icon. Pressing it reveals the Search Area.
  - In the search area you can specify your origin, destination, and desired departure date. 
  - After specifying your search query, press the submit button to search the database and all available rides matching the info entered will be displayed.

- **Floating Button**:
  The floating button will bring up the option of whether to create a ride or to request a ride. Pressing on either option will send you to a separate screen.
  
- **Menu options**:
  Pressing the icon on the upper left hand corner will give the option to view the rides as a list or in the map. (Not functional yet)
  
#### Create Ride Screen
If 'Create Ride' is selected in floating button in homescreen you will be sent to this screen.
In this screen you can create a ride and store it in our database by filling in the fields and clicking on create ride.
After creating a ride it will be displayed in the History tab (May need to pull to refresh)

#### Create Request Screen
If 'request a ride' is selected in floating button in homeswcreen you will open up this screen.
In this screen you can request a ride by setting your desired origin and destination and set the amount that you'd be willing to pay. When a ride is requested it will show on the requested screen and will be listed in your ride history under the requests tab.

### Request Screen
This screen will display all the rides that have been requested by other users and also the ones you have created. Here you will be able to see the requester profile if the profile image is tapped. If you are interested in adding this passenger to a ride that matches your origin and destination you can do it from this screen.


### History Tab
A list view of all the rides that have been created by the user, all the rides they have taken as passengers and all the rides that they have requested.
It contains all the information relating to that ride.

### Profile Tab
 - If you logged in using Facebook, your profile image and your name, will be displayed. Otherwise it will be empty. 
 - Below the profile image we have the rating bar where you can see what people think of your driving skills among other things.
 - On the upper right hand corner you have the settings icon that opens up the settings page.

### Settings Screen 
 - In the settings screen you are given the option to change the app color theme and the map themes. 
 - Changing a theme will force the app to refresh.

Also, you can log out from the app and return to the login screen by pressing the logout button.

<br>

## Available Scripts
- To run the project (Normal): `sudo npm start`
- To run the project (Clear cache): `sudo npm start --reset-cache`
- To run the project (IOS): `npm run ios`
- To run the project (Android): `npm run android`
- To test the project (Jest): `npm test`
- To eject from build script: `npm run eject`

<br>

## Troubleshooting

### Unable to Run Setup Script (/bin/bash^M: bad interpreter)
  - Fix by running: `sed -i -e 's/\r$//' setup.sh`

### Node Command Not Found
  - First, check if nodejs is installed (`nodejs -v`). If not, please follow the steps from **Setup Project** section.
  - If nodejs is installed, run: `sudo ln -s /usr/bin/nodejs /usr/bin/node`
  
### Npm Stuck at "Starting Packager"
  - Restart with sudo: `sudo npm start`
  
### Unable to Start Server
  - Run command1: `sudo sysctl -w fs.inotify.max_user_instances=1024`
  - Run command2: `sudo sysctl -w fs.inotify.max_user_watches=12288`

### Unable to Login
   - Verify that you have a nework connection and that it is turned on.
   - Use a university email that ends with .edu
   - No account? Please click on signup instead of login.
   - Forgot Password? Contact us so we can reset your account and allow you to login.

### Network Issue
- Check Network: verify that your phone and computer are on the same network and that they can reach each other
- Check Firewall: verify firewall access from your device to your computer on ports 19000 and 19001.
- Try opening a web browser on your phone and opening the URL that the packager script prints, replacing `exp://` with `http://`.
So, for example, if underneath the QR code in your terminal you see:
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

### iOS Simulator won't open
If you're on a Mac, there are a few errors that users sometimes see when attempting to npm run ios:

    "non-zero exit code: 107"
    "You may need to install Xcode" but it is already installed

There are a few steps you may want to take to troubleshoot these kinds of errors:

  - Make sure Xcode is installed and open it to accept the license agreement if it prompts you. You can install it from the Mac App Store.
  - Open Xcode's Preferences, the Locations tab, and make sure that the Command Line Tools menu option is set to something. Sometimes when the CLI tools are first installed by Homebrew this option is left blank, which can prevent Apple utilities from finding the simulator. Make sure to re-run npm/yarn run ios after doing so.
  - If that doesn't work, open the Simulator, and under the app menu select Reset Contents and Settings.... After that has finished, quit the Simulator, and re-run npm/yarn run ios.

### QR Code does not scan
If you're not able to scan the QR code, make sure your phone's camera is focusing correctly, and also make sure that the contrast on the two colors in your terminal is high enough. For example, WebStorm's default themes may not have enough contrast for terminal QR codes to be scannable with the system barcode scanners that the Expo app uses.

If this causes problems for you, you may want to try changing your terminal's color theme to have more contrast, or running Create React Native App from a different terminal. You can also manually enter the URL printed by the packager script in the Expo app's search bar to load it manually.

For other errors, try following the hints/instructions on the terminal. Also, feel free to contact us for any unsolvable error.

<br>

## Updating to New Releases
You should only need to update the global installation of `create-react-native-app` very rarely, ideally never.

Updating the `react-native-scripts` dependency of your app should be as simple as bumping the version number in `package.json` and reinstalling your project's dependencies.

Upgrading to a new version of React Native requires updating the `react-native`, `react`, and `expo` package versions, and setting the correct `sdkVersion` in `app.json`. See the [versioning guide](https://github.com/react-community/create-react-native-app/blob/master/VERSIONS.md) for up-to-date information about package version compatibility.

## Writing and Running Tests

This project is set up to use [jest](https://facebook.github.io/jest/) for tests. You can configure whatever testing strategy you like, but jest works out of the box. Create test files in directories called `__tests__` or with the `.test` extension to have the files loaded by jest. See the [the template project](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/App.test.js) for an example test. The [jest documentation](https://facebook.github.io/jest/docs/en/getting-started.html) is also a wonderful resource, as is the [React Native testing tutorial](https://facebook.github.io/jest/docs/en/tutorial-react-native.html).
