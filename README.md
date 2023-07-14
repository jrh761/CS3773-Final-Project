# CS3773-Final-Project

## Setup

### Windows

First you need to install WSL:

Make sure you navigate to "Turn Windows features on or off" and check the following:

- Virtual Machine Platform
- Windows Hypervisor Platfrom
- Windows Subsystem for Linux

Then follow this guide:

- [Install WSL](https://learn.microsoft.com/en-us/windows/wsl/install)

Make sure you are running WSL 2

```
wsl -l -v
```

### Install docker

Install docker:

- [Ubuntu 22.04 Docker Install Guide](https://docs.docker.com/engine/install/ubuntu/)
- [Window 10/11 Docker Install Guide](https://docs.docker.com/desktop/install/windows-install/)

### Install npm

Install npm:

- [Windows 10/11 npm Install Guide](https://medium.com/devops-with-valentine/how-to-install-node-js-and-npm-on-windows-10-windows-11-139442f90f12)

This shows how to install npm globally, but if you want to keep your dependencies more contained, you can use a `conda` environment with `npm` as a package. This helps keep your development environment clean.

### Alternative: Set up npm in conda environment linux or WSL

#### Linux/Windows

Install miniconda

- [How to install miniconda](https://docs.conda.io/en/latest/miniconda.html)

Create conda environment from the environment file

```bash
conda env create --file environment.yml
```

If you want a different environment name you can add it with `--name`

```bash
conda env create --file environment.yml --name <new_environment_name>
```

_Alternative_ Create conda environment from scratch:

```bash
conda create -n shopping-project -c conda-forge nodejs

# After env is create, install docker-compose
pip install docker-compose
```

Activate conda environment to use npm

```bash
conda activate shopping-project
```

Test npm

```bash
npm --version
```

If you are prompted to update npm, do it

```bash
npm install -g npm@<version-listed> # Example: npm install -g npm@9.8.0
```

**Note, you will only be able to use npm/node when you conda environment is activated. If you see that npm is not found, you do not have your conda environment activated**

## Install node packages

```bash
cd client
npm install

cd ..
cd server
npm install
```

## Running the project

Build and start all services

```bash
docker-compose up --build
```

On your first time setting up this project, you will need to create the initial database table.

After all of your images are brought up you will need to go into the database container and create the initial database:

Open a new shell and enter the following command:

```bash
docker exec -it cs3773-final-project-db-1 psql -U postgres
```

Create the database:

```sql
CREATE DATABASE myshop;
```

After you created the database, you can stop the containers with CTRL+C and rerun:

```bash
docker-compose up --build
```

## Connecting to database

Make sure the docker containers are running:

```bash
docker exec -it cs3773-final-project-db-1 psql -U postgres
```

## Sequelize

Run migrations:

```bash
docker exec -it cs3773-final-project-server-1 bash

npx sequelize-cli db:migrate
```
