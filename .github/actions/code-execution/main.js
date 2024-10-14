module.exports = async ({ github, context, core }) => {
  try {
    const environment = core.getInput("environment");
    const sampleValue = core.getInput("sample-value");
    console.log(`Hello ${environment}!`);
    console.log(`Hello ${sampleValue}!`);

    // コンテキスト情報の取得
    console.log(`Event Name: ${context.eventName}`);
    console.log(`Workflow: ${context.workflow}`);
    console.log(`Actor: ${context.actor}`);

    const time = new Date().toTimeString();
    core.setOutput("time", time);
  } catch (error) {
    core.setFailed(error.message);
  }
};
