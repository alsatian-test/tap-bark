import { IOutputProvider } from "./output-provider.i";
import { ResultType } from "../result-type";
import { Assertion } from "../external/tap-parser";
const chalk = require("chalk");

export class OutputProvider implements IOutputProvider {
    public getResultMessage(type: ResultType, typeCount: number, totalCount: number): string {
        switch (type) {
            case ResultType.PASS:
                return chalk.green(`Pass: ${typeCount}/${totalCount}`);

            case ResultType.FAIL:
                return chalk.red(`Fail: ${typeCount}/${totalCount}`);

            case ResultType.IGNORE:
                return chalk.yellow(`Ignore: ${typeCount}/${totalCount}`);
        }

        return undefined;
    }

    public getTestFixtureMessage(name: string): string {
        return `# [${name}]`;
    }

    public getTestMessage(name: string): string {
        return ` --- ${name}`;
    }

    public getFailureMessage(assertion: Assertion): string {

        const failureTitle = chalk.red("FAIL: ") + chalk.bold(assertion.name) + "\n";

        if (assertion.diag) {
            let output = failureTitle + assertion.diag.message + "\nExpected: " + assertion.diag.data.expect + "\n  Actual: " + assertion.diag.data.got;

            if (assertion.diag.data.stack_base64) {
                output = output + "\n=====\n" + new Buffer(assertion.diag.data.stack_base64, 'base64').toString('ascii') + "\n=====";
            }

            return output;
        }

        return failureTitle + "Failure reason unknown.";
    }
}
