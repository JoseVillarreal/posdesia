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
    - git
    - nodejs:12

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
    - cd /var/posdesia && git clone git@github.com:JoseVillarreal/posdesia.git
    - npm install
    - PGUSER={$postgres_user} \
      PGHOST={$database.endpoint} \
      PGPASSWORD={$postgres_pass} \
      PGDATABASE=posdesia-db \
      PGPORT=3211 \
    - pm2 start index.js

