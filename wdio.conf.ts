export const config: WebdriverIO.Config = {
   runner: "local",
   tsConfigPath: "./tsconfig.json",
   specs: ["./features/**/*.feature"],
   exclude: [],
   maxInstances: 10,
   capabilities: [
     {
       browserName: "chrome",
     },
   ],
   logLevel: "error",
   bail: 0,
   baseUrl: "http://localhost:3000",
   waitforTimeout: 10000,
   connectionRetryTimeout: 120000,
   connectionRetryCount: 3,
   framework: "cucumber",
   reporters: [
     ['spec', {}],
     ['allure', {
      outputDir: 'allure-results', 
      disableWebdriverStepsReporting: true,
      disableWebdriverScreenshotsReporting: false,
      disableHooks: true,
      useCucumberStepReporter: true
     }]
   ],
   cucumberOpts: {
     require: ["./features/step-definitions/*.ts"],
     backtrace: false,
     requireModule: [],
     dryRun: false,
     failFast: false,
     name: [],
     ignoreHooks: true,
     snippets: true,
     source: true,
     strict: false,
     tagExpression: '@UI or @API',
     timeout: 60000,
     ignoreUndefinedDefinitions: true,
     format: ["@cucumber/pretty-formatter"],
     formatOptions: {
       snippetInterface: "async-await",
     },
   },
};