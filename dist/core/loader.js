import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';
/**
 * Load a YAML flow file from disk and return the parsed Flow definition.
 */
export function loadFlowFile(filePath) {
    const absPath = path.isAbsolute(filePath) ? filePath : path.join(process.cwd(), filePath);
    const fileContents = fs.readFileSync(absPath, 'utf-8');
    return parseFlowYAML(fileContents);
}
/**
 * Parse a YAML string into a UXFlowDefinition object.
 */
export function parseFlowYAML(source) {
    const doc = yaml.load(source);
    validateFlow(doc);
    return doc;
}
function validateFlow(flow) {
    if (!flow || typeof flow !== 'object' || !flow.goals) {
        throw new Error('Invalid flow: missing goals root');
    }
    // Basic shape validation. Extend as needed.
}
