#cloud-config
#add default root user
users:
  - name: posdesia_admin
    groups: sudo
    sudo: ['ALL=(ALL) NOPASSWD:ALL']
    shell: /bin/bash
    home: /home/posdesia_admin
    lock_passwd: true
    ssh-authorized-keys:
      - ${user_ssh_key}
#disable root ssh login
disable_root: true

#install deps
package_update: true
packages:
    - centos-release-scl
    - nodejs:12

#move in files
write_files:
    - encoding: b64
      content: ${posdesia_node}
      path: /tmp/posdesia

#shell commands to stand everything up
runcmd:
    #firewall config
    #general housekeeping
    - yum update
    - mkdir /var/posdesia
    - mv /tmp posdesia /var/posdesia
    #npm deps
    - npm install pm2 -g
    #start application
    - cd /var/posdesia && npm install
    - pm2 start index.js

