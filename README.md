testing-mu
==============================================================================

This isn't really an addon, this repo is supposed to demonstrate the implementation of multiple dummy apps in one addon's repo. The original requirement for this functionality is for the Module Unification implementation so that we can test addons with both MU and Classic apps.

Installation
------------------------------------------------------------------------------

```
npm i
npm start
```

Note: this app is using the **EMBER_CLI_MODULE_UNIFICATION** experiment which you can see in the package.json `start` script.


### Running the dummy applications

once you have run `npm start` you will be able to run the 3 dummy apps:

- [Classic App](http://localhost:4200/classic)
- [Module Unification App](http://localhost:4200/mu)
- [Face app](http://localhost:4200/face) (because why not!)

This implementation was developed [Live on twitch](https://www.twitch.tv/videos/297629488)! If you want to keep track of future implementation work you can [follow me on Twitch](https://www.twitch.tv/real_ate) or I will probably tweet about it so follow me there too [@real_ate](https://twitter.com/real_ate)!
