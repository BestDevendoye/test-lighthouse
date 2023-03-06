// eslint-disable-next-line import/no-extraneous-dependencies
import { describe, expect, test } from '@jest/globals';
import { cacheConsole, consoleWaitUntil, mockConsole, removeMockConsole } from '../lib/console-mock.js';

describe('Inspect script', () => {
  test('script: should execute the lighthouse inspection', async () => {
    mockConsole();

    process.env.WEBINSPECTOR_DEBUG = true;
    process.env.WEBINSPECTOR_HEADLESS = true;
    process.env.WEBINSPECTOR_FLOW_CONFIG_PATH = './samples/empty.js';
    process.env.WEBINSPECTOR_OUTPUT = './reports';
    process.env.WEBINSPECTOR_DISABLE_ERRORS = true;

    process.stdout.write('OK 0\n');
    await import('./inspect.js');
    await consoleWaitUntil(/\[done\]/i);
    process.stdout.write('OK 2\n');

    expect(cacheConsole.lastLog).toEqual({ message: '[info] [Web Inspector] [DONE]', type: 'info' });

    removeMockConsole();
  }, 30000);
});
