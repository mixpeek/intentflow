import { UXFlowDefinition } from './types';
/**
 * Load a YAML flow file from disk and return the parsed Flow definition.
 */
export declare function loadFlowFile(filePath: string): UXFlowDefinition;
/**
 * Parse a YAML string into a UXFlowDefinition object.
 */
export declare function parseFlowYAML(source: string): UXFlowDefinition;
