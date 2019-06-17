# atlas-base

# RESTful API

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Clone this repository unto your system

```
git clone https://github.com/ampersandlabs-io/atlas-node-base.git
```

### Run using docker

```
docker-compose up
```
 

## Development culture

* Never work in master.
* One branch per feature.
* Write tests.
* Pull the latest changes in master before creating a new branch ```git pull origin master```.
* Never merge to master locally, always use PR on bitbucket.
* Commit frequently.

## Testing

To run tests

```
./scripts/run-tests
```

### Deployment

After work in your branch is complete, push it to bitbucket and create a pull request to merge it into master. 
Once your pull request is approved and merged into master, it would be automatically deployed to the test server on heroku.

## Built With

* [NodeJs](https://nodejs.org/) - The web framework used
* [NPM](https://npmjs.com/) - Dependency Management


## License

This project is licensed under the ISC License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc

