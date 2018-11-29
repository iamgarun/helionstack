<div align="center"><strong>A DevOps Suite</strong></div>

<div align="center"><img src="https://api.travis-ci.org/helionstack/helionstack.svg?branch=master" /></div>

# Development

You can follow the steps outlined below to get started with development.

## Pre-requisites

1. NodeJS `version >= 10.0` [Installation](https://nodejs.org/en/)
2. Yarn package manager [Installation](https://yarnpkg.com/lang/en/docs/install/)
3. MongoDB [Installation](https://docs.mongodb.com/manual/installation/)

## Clone

```bash
$ git clone git@github.com:helionstack/helionstack.git
$ cd core
$ git checkout -b development
$ yarn install
```

## Environment Variables

1. `DB_HOST` provide the hostname for your mongodb instance
2. `DB_PORT` provide the port.
3. `DB_NAME` name of the database you want to connect to.

## Run

#### via `Terminal`

1. `yarn dev` to run the local instance in `development` mode with `1` **worker agent** in `cluster`.
   This is ideal for local development environment.

#### via `Webstorm`

1. Click on `Edit configuration` button on top RHS of IDE
2. Click on `+` button to add configurations and select `npm`
3. Add the following settings as depicted in the screenshot below

![Edit Configuration](/docs/edit_configuration.png)

DB Host and DB port contains the IP address and port number of the server where mongoDB is installed and running.

## Contributing

The main purpose of this repository is to continue to evolve `Helionstack`, making it faster and easier to use.
Development of `Helionstack` happens in the open on [repository](git@github.com:helionstack/helionstack.git),
and we are grateful to the team members for contributing bug-fixes and improvements.
Read below to learn how you can take part in improving `Helionstack`.

#### [Contributing Guide](/docs/CONTRIBUTING.md)

Read our [contributing guide](/docs/CONTRIBUTING.md) to learn about our development process,
how to propose bug-fixes and improvements, and how to build and test your changes to `Helionstack`.

## License

[MIT](LICENSE)
