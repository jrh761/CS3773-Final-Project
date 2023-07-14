# CS3773-Final-Project

## Setup

### Install docker

Install docker:

- [Ubuntu 22.04 Docker Install Guide](https://docs.docker.com/engine/install/ubuntu/)
- [Window 10/11 Docker Install Guide](https://docs.docker.com/desktop/install/windows-install/)

### Install npm

Install npm:

- [Windows 10/11 npm Install Guide](https://medium.com/devops-with-valentine/how-to-install-node-js-and-npm-on-windows-10-windows-11-139442f90f12)

This shows how to install npm globally, but if you want to keep your dependencies more contained, you can use a `conda` environment with `npm` as a package. This helps keep your development environment clean.

### Alternative: Set up npm in conda environment

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

## Running the project

Build and start all services

```bash
docker-compose up --build
```

**If you get any errors, make sure to reboot your pc and try again. If it was your first time installing docker, you will ned to reboot for it to function.**

## Connecting to database

Make sure the docker containers are running:

```bash
docker exec -it cs3773-final-project-db-1 psql -U postgres
```

Connect to the db:

```bash
psql -U postgres
```

Create the database:

```sql
CREATE DATABASE myshop;
```

## Sequelize

Run migrations:

```bash
docker exec -it cs3773-final-project-server-1 bash

npx sequelize-cli db:migrate
```
