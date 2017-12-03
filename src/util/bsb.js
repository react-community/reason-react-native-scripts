const stream = require('stream');
const execa = require('execa');
const Writable = require('stream').Writable;
const split = require('split');
const stdout = new Writable();
const stderr = new Writable();
import log from './log';

let _resolveOnInitialize;

stdout._write = (data, encoding, next) => {
  if (data.toString().includes('> Finish compiling')) {
    if (_resolveOnInitialize) {
      _resolveOnInitialize();
      _resolveOnInitialize = null;
    }
  }
  log.withTimestamp(`[bsb] ${data.toString()}`);
  next();
};

stderr._write = (data, encoding, next) => {
  if (data.toString().includes('refmt version missing')) {
    next();
  } else {
    log.withTimestamp(`[bsb] ${data.toString()}`);
    next();
  }
};

export async function spawnBsbWatcherAsync() {
  let cp;
  await new Promise(resolve => {
    _resolveOnInitialize = resolve;

    cp = execa(
      'bsb',
      ['-make-world', '-clean-world', '-w'],
      ['pipe', 'pipe', null]
    );

    cp.stdout.pipe(split()).pipe(stdout);
    cp.stderr.pipe(split()).pipe(stderr);
  });

  return { bsbChildProcess: cp };
}
