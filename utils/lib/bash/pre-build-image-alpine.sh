#!/bin/bash

# Ensure the script is executed with root privileges
if [ "$(id -u)" -ne 0 ]; then
    echo "This script must be run as root" >&2
    exit 1
fi

# Update and install necessary packages
apk update && \
apk upgrade && \
apk add bash binutils git nano jq wget openssh-client \
        curl zip unzip busybox sudo net-tools \
        build-base gcc openssl-dev git \
        file zlib-dev \
        util-linux rsync

# Modify existing group and user ids if necessary
if getent group ${GID} > /dev/null; then
    groupmod -g $((GID+3333)) $(getent group ${GID} | cut -d: -f1)
fi

if getent passwd ${UID} > /dev/null; then
    usermod -u $((UID+3333)) $(getent passwd ${UID} | cut -d: -f1)
fi

# Add new OS user and group
echo "GID: ${GID}, APPGRP: ${APPGRP}, APPUSR: ${APPUSR}"
addgroup -g ${GID} ${APPGRP}
adduser -D -h "${HOME_DIR}" -G ${APPGRP} -s "/bin/bash" -u ${UID} ${APPUSR}

# Setup user home directory
mkdir -p "${HOME_DIR}"
chown ${APPUSR}:${APPGRP} "${HOME_DIR}"

# Configure sudoers file for the new user and group
echo "${APPUSR} ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
echo "${APPGRP} ALL=(ALL) NOPASSWD: /usr/bin/npm" >> /etc/sudoers

# Setup project directory and bashrc for user
mkdir -p ${HOME_PROJECT_DIR}
echo "export PS1='\$(date +\"%F %T\") \u@\h  \w \n '" >> ${HOME_DIR}/.bashrc
echo "cd ${HOME_PROJECT_DIR}" >> ${HOME_DIR}/.bashrc
chown -R ${APPUSR}:${APPGRP} ${HOME_DIR}
chmod -R 0775 ${HOME_DIR}
