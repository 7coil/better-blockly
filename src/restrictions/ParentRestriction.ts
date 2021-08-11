import { Block } from "blockly";
import { BaseRestriction } from "./BaseRestriction";

/**
 * A restriction which checks if a specified block is on top of the current block.
 */
class ParentRestriction extends BaseRestriction {
  validate(block: Block, allBlocks: Block[]) {
    const parentBlock = block.getParent();
    return this.types.includes(parentBlock.type);
  }
}

export { ParentRestriction };
