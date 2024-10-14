module.exports = async ({ github, context, core }) => {
  try {
    const environment = core.getInput("environment");
    const sampleValue = core.getInput("sample_value");
    console.log(`Hello ${environment}!`);
    console.log(`Hello ${sampleValue}!`);

    // コンテキスト情報の取得
    console.log(`Event Name: ${context.eventName}`); // workflow_dispatch
    console.log(`Workflow: ${context.workflow}`); // GitHub Actions Playground
    console.log(`Actor: ${context.actor}`); // shimopino

    const time = new Date().toTimeString();
    core.setOutput("time", time);
  } catch (error) {
    core.setFailed(error.message);
  }
};
