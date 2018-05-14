#!/usr/bin/env bash

# Update package installer
sudo apt-get update

# Install latest version of node and npm
curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
sudo apt-get install -y nodejs

# Update npm to latest version
sudo npm install npm@latest -g

# Fix npm server bug
sudo sysctl -w fs.inotify.max_user_instances=1024
sudo sysctl -w fs.inotify.max_user_watches=12288

# Install project packages (node_modules/)
sudo npm install

# Done installing
echo
echo "Done setting up the packages. To run project:"
echo
echo "    ----------------"
echo "   | sudo npm start |"
echo "    ----------------"
echo
echo "You will need to download Expo app on your phone too."
