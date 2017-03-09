/*!
 * https://github.com/Palindrom/JSONPatchOT
 * JSON-Patch-OT version: 1.0.1
 * (c) 2017 Tomek Wytrebowicz
 * MIT license
 */
declare class JSONPatchOT {    
    public static transform(patch: Object, sequences: Array<Object>);
    public static transformAgainstSingleOp(patch: Object, operationObject: Object);
}
export default JSONPatchOT;