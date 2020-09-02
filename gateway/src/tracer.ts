import {
  // BatchRecorder,
  ExplicitContext,
  Tracer,
  sampler,
  ConsoleRecorder,
} from 'zipkin';
// In Node.js, the recommended context API to use is zipkin-context-cls.
import CLSContext from 'zipkin-context-cls';
// import { HttpLogger } from 'zipkin-transport-http';
import fetch from 'node-fetch';
import wrapFetch from 'zipkin-instrumentation-fetch';

const ctxImpl = new CLSContext(); // if you want to use CLS
const xtxImpl = new ExplicitContext(); // Alternative; if you want to pass around the context manually

const recorder = new ConsoleRecorder(); // For easy debugging. You probably want to use an actual implementation, like Kafka or AWS SQS.
// const recorder = new BatchRecorder({
//   logger: new HttpLogger({
//     endpoint: `http://localhost:9411/api/v1/spans`,
//   }),
// });

// Tracer will be a one to many relationship with instrumentation that use it (like express)
export const tracer = new Tracer({
  ctxImpl, // the in-process context
  recorder,
  sampler: new sampler.CountingSampler(0.01), // sample rate 0.01 will sample 1 % of all incoming requests
  traceId128Bit: true, // to generate 128-bit trace IDs. 64-bit (false) is default
  localServiceName: 'my-service', // indicates this node in your service graph
});

export const zipkinFetch = wrapFetch(fetch, {
  tracer,
  serviceName: 'name_service',
});
