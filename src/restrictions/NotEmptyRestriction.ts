import { Block } from "blockly";
import { BaseRestriction } from "./BaseRestriction";

/**
 * A restriction which checks if the current block is empty.
 */
class NotEmptyRestriction extends BaseRestriction {
  validate(block: Block, allBlocks: Block[]) {
    for (const type of this.types) {
      const inputBlock = block.getInput(type);

      // If the named connection is found...
      if (inputBlock) {
        // but there is no block, error out.
        if (!inputBlock.connection.targetBlock()) return false;
      } else {
        throw new Error(`Block ${block.type} does not have the input ${type} for the NotEmptyRestriction to process.`)
      }
    }

    return true;
  }
}

export { NotEmptyRestriction };
