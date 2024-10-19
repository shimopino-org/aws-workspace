import { registerInstrumentations } from "@opentelemetry/instrumentation"
import { AwsLambdaInstrumentation } from "@opentelemetry/instrumentation-aws-lambda";
import { AwsInstrumentation } from "@opentelemetry/instrumentation-aws-sdk";
import { NodeTracerProvider } from "@opentelemetry/sdk-trace-node";
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-base';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { Tracer } from '@aws-lambda-powertools/tracer';


const provider = new NodeTracerProvider();
provider.register();

registerInstrumentations({
  instrumentations: [
    new AwsLambdaInstrumentation(),
    new AwsInstrumentation({
      suppressInternalInstrumentation: true,
    }),
  ]
})

provider.addSpanProcessor(new BatchSpanProcessor(new OTLPTraceExporter()));

export const tracer = new Tracer({ serviceName: 'todo-app' });