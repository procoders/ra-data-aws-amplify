# ra-data-aws-amplify

A GraphQL data provider for [react-admin](https://github.com/marmelab/react-admin/)
built with [AWS Amplify](https://aws-amplify.github.io/docs/cli/graphql?sdk=js) and tailored to target a simple GraphQL implementation.

- [Installation](#installation)
- [Usage](#installation)
- [Options](#options)

## Installation

Install with:

```sh
npm install --save ra-data-aws-amplify
```

or

```sh
yarn add ra-data-aws-amplify
```

## Usage
```sh
import awsconfig from './aws-exports';
import * as queries from './graphql/queries.js'
import * as mutations from './graphql/mutations.js'
...
componentDidMount() {
    ...
    buildDataProvider({awsconfig, queries, mutations}) 
        .then(dataProvider => this.setState({ dataProvider }))
    ...
}
...
```

## Contributing

Run the tests with this command:

```sh
make test
```
