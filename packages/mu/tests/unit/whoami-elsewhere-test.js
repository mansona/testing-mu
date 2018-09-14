import { module, test } from 'qunit'
import config from '../../config/environment'

module(config.modulePrefix + '-tests')

test('it works - overloading!', function(assert) {
  assert.ok(true);
})
